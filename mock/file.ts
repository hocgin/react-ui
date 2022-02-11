import { success } from './_utils/result';
import Mock from 'mockjs';

// http://mockjs.com/examples.html
export default {
  'POST /api/com/file/upload': (req: any, res: any) => {
    return res.json(success(Mock.Random.image('100x100')));
  },
  'GET /api/com/file/upload': (req: any, res: any) => {
    return res.json(success(Mock.Random.image('100x100')));
  },
};
