import { ID } from '@/Utils/interface';

export interface UserInfo {
  id: ID;
  username: string;
  nickname: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  gender?: string;
  genderName?: string;
}
