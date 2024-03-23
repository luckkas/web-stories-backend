import { UserRepositoryInterface } from './user.contract'
import { LoginController, SignUpController } from './user.controller'
import { User } from './user.model'
import { hashPassword, LoginUseCase, SignUpUseCase } from './user.usecase'

let users: User[] = []
const mockUserRepository: UserRepositoryInterface = {
  signUp: async (user: User): Promise<void> => {
    users.push(user)
  },
  find: async (username: string): Promise<User | undefined> => {
    if (username === 'lucas')
      return Promise.resolve(new User('lucas', 'lucas@example.com', await hashPassword('123')))

    return Promise.resolve(undefined)
  },
}

describe('UserFeatures', () => {
  describe('SignUp', () => {
    const signUpUseCase = new SignUpUseCase(mockUserRepository)
    const signController = new SignUpController(signUpUseCase)
    users = []

    it('Should be sign up a new user', async () => {
      const props = { username: 'lucas', password: '123', email: 'lucas@example.com' }
      await signController.handle(props)
      expect(users[0].username).toEqual(props.username)
      expect(users[0].password).toEqual(props.password)
      expect(users[0].email).toEqual(props.email)
    })
  })

  describe('Login', () => {
    const loginUseCase = new LoginUseCase(mockUserRepository)
    const loginController = new LoginController(loginUseCase)

    it('Should be login', async () => {
      const response = await loginController.handle({
        username: 'lucas',
        password: '123',
      })
      expect(response.length).toEqual(192)
    })

    it('Should be throw an error', async () => {
      expect(
        loginController.handle({
          username: 'lucas1',
          password: '123',
        }),
      ).rejects.toThrow()
    })
  })
})
