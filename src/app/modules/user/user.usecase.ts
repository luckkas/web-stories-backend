import { UseCaseInterface } from '@domain/contract/http-router.contract';
import { UserRepositoryInterface } from './user.contract';
import { User } from './user.model';


export class SignUpUseCase implements UseCaseInterface {
  constructor(private repository: UserRepositoryInterface){}

  async execute(user: User): Promise<void> {
    await this.repository.signUp(user)
  }
}
