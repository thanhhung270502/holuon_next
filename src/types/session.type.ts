import { User } from '@/types';

export type Session = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
