import { ControllerInterface } from '@domain/contract/http-router.contract'
import { SignUpProps, UserProps } from './user.contract'
import { LoginUseCase, SignUpUseCase } from './user.usecase'
import { CheckProps } from '@domain/decorator/check-props.decorator'
import { User } from './user.model'

export class SignUpController implements ControllerInterface {
  constructor(private useCase: SignUpUseCase) {}

  @CheckProps(['username', 'email', 'password'])
  async handle(props: SignUpProps): Promise<void> {
    const user = new User(props.username, props.email, props.password)
    await this.useCase.execute(user)
  }
}

export class LoginController implements ControllerInterface {
  constructor(private useCase: LoginUseCase) {}

  @CheckProps(['username', 'password'])
  async handle(props: UserProps): Promise<string> {
    return this.useCase.execute(props)
  }
}
