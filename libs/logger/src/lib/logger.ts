import pino from 'pino';
import * as fs from 'node:fs';
import * as path from 'node:path';

const LOGS_DIR = process.env['LOGS_DIR'];
const LOG_LEVEL = process.env['LOG_LEVEL'];

const fileTransport = LOGS_DIR
  ? pino.transport({
      target: 'pino/file',
      options: { destination: createLogSessionFile() },
    })
  : undefined;

export const log = pino(
  {
    level: LOG_LEVEL ?? 'info',
  },
  fileTransport
);

function createLogSessionFile() {
  if (!LOGS_DIR) {
    throw new Error('Missing param LOGS_DIR.');
  }
  if (!fs.existsSync(LOGS_DIR)) {
    throw new Error('Logs dir does not exist.');
  }
  const baseName = `${new Date().toISOString()}.log`;
  const fullName = path.join(LOGS_DIR, baseName);
  fs.writeFileSync(fullName, '');
  return fullName;
}
