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

async function findByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

async function findById(id: number) {
  return prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });
}

async function readUser() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

const userRepository = {
  createUser,
  findByEmail,
  findById,
  readUser,
};

export default userRepository;
