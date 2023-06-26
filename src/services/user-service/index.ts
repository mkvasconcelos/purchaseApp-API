import userRepository from '@/repositories/user-repository';

async function findNameUser(userId: number) {
  const name = await userRepository.findById(userId);
  return name;
}

const userService = {
  findNameUser,
};

export default userService;
