import { User } from './user.model'

export type SignUpProps = {
  username: string
  email: string
  password: string
}

export type UserProps = {
  username: string
  password: string
}

export interface UserRepositoryInterface {
  signUp(user: User): Promise<void>
  find(username: string): Promise<User | undefined>
}
