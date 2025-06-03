import { User } from '@prisma/client';
import { UserType } from 'src/types/user.type';

export function toUserType(item: User): UserType {
  return {
    id: item.id,
    email: item.email,
  };
}
