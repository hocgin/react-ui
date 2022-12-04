import { RabbitKit } from '@hocgin/hkit';
import { HttpResult } from '@/Utils/interface';
import { message } from 'antd';

export default class StructKit extends RabbitKit {
  /**
   * 响应失败自动弹出提示
   * @param result
   */
  public static showErrorMessageIfExits(result?: HttpResult<any>): boolean {
    if (RabbitKit.isSuccess(result)) {
      return true;
    }

    if (result?.message) {
      message.error(result.message).then(console.debug);
    }
    return false;
  }

}
