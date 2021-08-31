import { message } from 'antd';

export class Ui {
  static isSuccess(result?: any) {
    return result && result.success;
  }

  showErrorMessageIfExits(result?: any) {
    if (Ui.isSuccess(result)) {
      return true;
    }
    console.debug('请求发生错误:', result);
    if (result.message) {
      message.error(result.message).then(console.debug);
    }
    return false;
  };

}
