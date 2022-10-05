import { Injectable } from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class HashingService {
  async hash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    return result;
  }

  async validateHash(storedHash: string, password: string, salt: string) {
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const userHash = hash.toString('hex');

    if (storedHash === userHash) {
      return true;
    }
    return false;
  }
}
