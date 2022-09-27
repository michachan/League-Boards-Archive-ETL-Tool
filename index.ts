import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';

// import prisma from './lib/prisma';
import questions from './src/questions';
import { fileQueue } from './src/queue';

(async () => {
  const { isStartConfirmed } = await inquirer.prompt(questions);
  if (!isStartConfirmed) return;

  const pathArgs = [
    fileURLToPath(import.meta.url),
    '..',
    '..',
    'extractedarchives',
    'na',
  ];
  const pathName = path.join(...pathArgs);
  const fileNames = fs.readdirSync(pathName);

  if (!fileNames.length) return;

  const filePaths = fileNames.map((fileName) => path.join(pathName, fileName));

  // Clear out the existing tables
  // await prisma.content.deleteMany();
  // await prisma.comment.deleteMany();
  // await prisma.discussion.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.application.deleteMany();

  // Get a list of applications and users on first pass,
  // then do bulk on discussions, comments, and riotposts

  // We want to stage as much in memory and batch as possible,
  // so we should read the files multiple times.

  // Applications & Users (first pass)
  // Threads & Comments > Content (second pass)
  // 2 passes, but allows for batching, for faster insertions at the cost of 2n reads

  // If we do a linear 1-time pass through, we'll have to wait on user creation on
  // connectOrCreate, which would be inefficient.
  // You cannot have connectOrCreate in batch operations.
  // Run-times using the one-time pass through reached over 8 hours,
  // albeit with high data integrity.

  // If we stage all the data into buckets while doing one pass through,
  // we'd exceed heap limits. Right?

  fileQueue.push(filePaths, (err: any) => {
    if (err) console.log(err);
  });
})();
