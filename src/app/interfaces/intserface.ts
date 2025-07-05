export interface IAddress{
  city: string,
  street: string,
  zip:number
}


export interface IUser {
  fastName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  address: IAddress;
}

export default IUser;
