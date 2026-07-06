import { IPasswordHasher } from '../../application/ports/password-hasher.port';
export declare class BcryptPasswordHasher implements IPasswordHasher {
    hash(plain: string): Promise<string>;
    compare(plain: string, hash: string): Promise<boolean>;
}
