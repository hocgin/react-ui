import { useGet, usePost } from '@hocgin/hkit';
import { StructKit, UIKit } from '@/_utils';

type MessageType = 'system_message' | 'personal_message' | 'notice_message';

export default class {
  static scrollByMessage(messageType?: MessageType, payload: any = {}) {
    return usePost(`/api/com/message/_scroll`, {
      data: { messageType, ...payload },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static scrollByChatMessage(messageType?: MessageType, payload: any = {}) {
    return usePost(`/api/com/message/chat/_scroll`, {
      data: { messageType, ...payload },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static scrollByLastChatUser(messageType?: MessageType, payload: any = {}) {
    return usePost(`/api/com/message/chat/last/_scroll`, {
      data: { messageType, ...payload },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static sendPersonalMessage(payload: any = {}) {
    return usePost(`/api/com/message/personal/send`, {
      data: { ...payload },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static stat() {
    return useGet(`/api/com/message/stat`)
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }
}
