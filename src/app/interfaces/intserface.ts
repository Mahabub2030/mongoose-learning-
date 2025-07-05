import { Model } from "mongoose";

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

export interface UserInsanceMethods {
  hasPassword(password: string): string;
}
export interface UserStaicMethod extends Model<IUser> {
  hasPassword(password: string): string;
}
