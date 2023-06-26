import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '@/repositories/user-repository';
import { conflictError, invalidCredentialsError } from '@/errors';

async function signUp(name: string, email: string, password: string) {
  const user = await userRepository.findByEmail(email);
  if (user) throw conflictError('Email already in use.');
  const hashedPassword = bcrypt.hashSync(password, 10);
  return await userRepository.createUser(name, email, hashedPassword);
}

async function signIn(email: string, password: string): Promise<string> {
  const user = await userRepository.findByEmail(email);
  const userPassword = user.password;
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
  const userId = user.id;
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
}

const authenticationService = {
  signUp,
  signIn,
};

export default authenticationService;
