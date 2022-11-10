import { randomBytes } from 'crypto';

const genHex = (bytesSize: number): Promise<string> =>
  new Promise((resolve) => {
    randomBytes(bytesSize, (_, buf) => {
      resolve(buf.toString('hex'));
    });
  });

export default genHex;
