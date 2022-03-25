import service from './service';
import { UseAction } from '@/Notification/components/types';

export default () => ({
  scrollWithNoticeMessage: async (args: any) =>
    await service.scrollByMessage('notice_message', args),
  scrollWithSystemMessage: async (args: any) =>
    await service.scrollByMessage('system_message', args),
  scrollWithPersonalMessage: async (args: any) =>
    await service.scrollByChatMessage('personal_message', args),
  scrollLastChatWithPersonalMessage: async (args: any) =>
    await service.scrollByLastChatUser('personal_message', args),
  sendWithPersonalMessage: async (args: any) =>
    await service.sendPersonalMessage(args),
  stat: async () =>
    await service.stat(),
} as UseAction);


