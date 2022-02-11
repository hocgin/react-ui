import { success } from './_utils/result';

// http://mockjs.com/examples.html
export default {
  'GET /api/worked': (req: any, res: any) => {
    return res.json(success());
  },
};
