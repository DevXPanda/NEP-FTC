// Infrastructure — bcrypt adapter implementing the application IPasswordHasher port.
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordHasher } from '../../application/ports/password-hasher.port';

const SALT_ROUNDS = 12;

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, SALT_ROUNDS);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
