interface IUser {
  fastName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
}

export default IUser;
