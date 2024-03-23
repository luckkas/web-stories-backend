import { UseCaseInterface } from '@domain/contract/http-router.contract';
import { UserProps, UserRepositoryInterface } from './user.contract';
import { User } from './user.model';
import { BadRequestError} from '@domain/error/semantic.error';
import { applicationConfiguration } from '@infra/config';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import crypto from 'crypto'
export class SignUpUseCase implements UseCaseInterface {
  constructor(private repository: UserRepositoryInterface){}

  async execute(user: User): Promise<void> {
    await this.repository.signUp(user)
  }
}

export const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
}

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

export class LoginUseCase implements UseCaseInterface {
  constructor(private repository: UserRepositoryInterface){}

  async execute(props: UserProps): Promise<string> {
    const user = await this.repository.find(props.username)

    if(!user || !(await bcrypt.compare(props.password, user.password))) {
      throw new BadRequestError('Invalid username or password')
    }

    return jwt.sign({userId: user.id},
    generateSecretKey(),
    {expiresIn: applicationConfiguration.tokenExpirationTime})
  }

}
