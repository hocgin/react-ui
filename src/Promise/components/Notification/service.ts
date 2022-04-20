import { useGet, usePost } from '@/index';
import Dom from '@/Utils/dom';

type MessageType = 'system_message' | 'personal_message' | 'notice_message';

export default class {
  static scrollByMessage(messageType?: MessageType, payload: any = {}) {
    return usePost(`/api/com/message/_scroll`, {
      data: { messageType, ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static scrollByChatMessage(messageType?: MessageType, payload: any = {}) {
    return usePost(`/api/com/message/chat/_scroll`, {
      data: { messageType, ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static scrollByLastChatUser(messageType?: MessageType, payload: any = {}) {
    return usePost(`/api/com/message/chat/last/_scroll`, {
      data: { messageType, ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static sendPersonalMessage(payload: any = {}) {
    return usePost(`/api/com/message/personal/send`, {
      data: { ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static stat() {
    return useGet(`/api/com/message/stat`)
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }
}
