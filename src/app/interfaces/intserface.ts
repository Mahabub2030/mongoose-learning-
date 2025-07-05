
interface IUser {
  fastName: string;
  lastName: string;
    email: string;
    password: string,
    role:'user' | 'admin'
}

export default IUser;
