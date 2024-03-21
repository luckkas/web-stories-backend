import { SignUpProps, UserRepositoryInterface } from './user.contract'
import { SignUpController } from './user.controller'
import { User } from './user.model'
import { SignUpUseCase } from './user.usecase'

let users: User[] = []
const mockUserRepository: UserRepositoryInterface = {
  signUp: async (user: User): Promise<void> => {
    users.push(user)
  }
}

describe('UserFeatures', () => {
  describe('SignUp', () => {
    const signUpUseCase = new SignUpUseCase(mockUserRepository)
    const signController = new SignUpController(signUpUseCase)
    users = []

    it('Should be sign up a new user', async () => {
      const props = {username: 'lucas', password: '123', email: 'lucas@example.com'}
      await signController.handle(props)
      expect(users[0].username).toEqual(props.username)
      expect(users[0].password).toEqual(props.password)
      expect(users[0].email).toEqual(props.email)
    })
  })

})
