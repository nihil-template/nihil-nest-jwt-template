export interface UserWithOutPassword {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayload {
  username: string;
  email: string;
}
