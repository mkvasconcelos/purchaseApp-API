import { prisma } from '@/config';

async function createUser(name: string, email: string, password: string) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}

const authenticationRepository = {
  createUser,
};

export default authenticationRepository;
