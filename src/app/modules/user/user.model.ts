import { v4 as uuidv4 } from 'uuid';

type UserProps = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


export class User {
  public id: string;
  public username: string;
  public email: string;
  public password: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    username: string,
    email: string,
    password: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromDatabase(data: any): User {
    return new User(
      data.username,
      data.email,
      data.password,
      new Date(data.createdAt),
      new Date(data.updatedAt)
    );
  }

  toDatabase(): UserProps {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  update({ username, email, password }: Partial<User>): void {
    if (username) this.username = username;
    if (email) this.email = email;
    if (password) this.password = password;
    this.updatedAt = new Date();
  }
}
