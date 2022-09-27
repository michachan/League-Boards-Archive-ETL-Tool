import { cargoQueue, queue } from 'async';
import { PathOrFileDescriptor } from 'fs';
import { MAX_CARGO_SIZE, MAX_QUEUE_WORKERS } from './constants';
import extractFile from './extract';
import { transformUsers } from './transform';

export const fileQueue = queue(
  async (filePath: PathOrFileDescriptor, callback) => {
    try {
      const parsedFile = await extractFile(filePath);
      await transformUsers(parsedFile.discussion);
    } catch (err) {
      console.log(err);
    }
    callback();
  },
  MAX_QUEUE_WORKERS,
);

fileQueue.drain(() => {
  console.log('All files processed.');
});

fileQueue.error((err, task) => {
  console.log(task, err);
});

export const userQueue = cargoQueue(
  async (userObjects: Record<string, any>[], callback) => {
    try {
      console.log({ userObjects });
    } catch (err) {
      console.log(err);
    }
    callback();
  },
  1,
  MAX_CARGO_SIZE,
);

userQueue.drain(() => {
  console.log('All users processed.');
});

userQueue.error((err, task) => {
  console.log(task, err);
});
