import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  OWNER = 'OWNER',
  GUEST = 'GUEST',
}

registerEnumType(Role, { name: 'Role' });
