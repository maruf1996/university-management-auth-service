import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { generateUserId } from './user.utils';
import { User } from './users.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId();
  user.id = id;
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  const createdUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
