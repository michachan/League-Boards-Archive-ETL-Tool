import fs, { PathOrFileDescriptor } from 'fs';
import zlib from 'zlib';

const extractFile = async (
  filePath: PathOrFileDescriptor,
): Promise<Record<string, any>> =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) return reject(error);
      return zlib.gunzip(data, (err, result) => {
        if (err) return reject(err);
        return resolve(JSON.parse(result.toString('utf8')));
      });
    });
  });

export default extractFile;
