import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const env = process.env.NODE_ENV ? '.' + process.env.NODE_ENV : '';

let p = path.join(process.cwd(), `.env${env}`);
if (!fs.existsSync(p)) {
  p = path.join(process.cwd(), `.env`);
}

const dotEnvOptions = {
  path: p,
};
dotenv.config(dotEnvOptions);

export default dotenv;
