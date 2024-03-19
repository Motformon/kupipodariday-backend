import { compare } from 'bcrypt';

export const compareHashPassword = async (
  password: string,
  hashPassword: string,
) => {
  return await compare(password, hashPassword);
};
