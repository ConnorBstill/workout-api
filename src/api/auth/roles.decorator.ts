import { SetMetadata } from '@nestjs/common';

export const MinRole = (minRole: number) => SetMetadata('minRole', minRole);
