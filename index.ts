import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import questions from './src/questions';

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

  console.log({ filePaths });

  // Clears out the existing tables
  // await prisma.riotPost.deleteMany();
  // await prisma.comment.deleteMany();
  // await prisma.discussion.deleteMany();
  // await prisma.user.deleteMany();
  // await prisma.application.deleteMany();

  // Get a list of applications and users on first pass,
  // then do bulk on discussions, comments, and riotposts

  // queue.push();
})();
