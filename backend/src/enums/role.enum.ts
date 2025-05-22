import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  MEMBER = 'MEMBER',
  OWNER = 'OWNER',
  GUEST = 'GUEST',
}

registerEnumType(Role, { name: 'Role' });
