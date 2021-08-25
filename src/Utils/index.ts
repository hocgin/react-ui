import Request from './request';

let index: any = {};
index.Request = Request;
index.POST = (url: string, body: any, headers?: any) => {
  return Request(`${url}`, { method: 'POST', body: body || {}, headers: headers });
};
export default index;
