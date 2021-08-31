import Request from './request';
import { Ui } from './ui';
import { DateFormat } from './format';

let index: any = {};
index.Request = Request;
index.Ui = Ui;
index.Format = {
  DateFormat,
};
index.POST = (url: string, body: any, headers?: any) => {
  return Request(`${url}`, { method: 'POST', body: body || {}, headers: headers });
};

export default index;
