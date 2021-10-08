import Request from './request';
import Lang from './lang';
import { Ui } from './ui';
import { DateFormat } from './format';
import Config from './config';

let index = {
  Request: Request,
  Config: Config,
  Lang: Lang,
  Ui: Ui,
  Format: {
    DateFormat,
  },
  POST: (url: string, body: any, headers?: any) => {
    return Request(`${url}`, { method: 'POST', body: body || {}, headers: headers });
  },
};
export default index;
