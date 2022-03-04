import { success } from './_utils/result';

// http://mockjs.com/examples.html
export default {
  'GET /api/rcm/doc/:id': (req: any, res: any) =>
    res.json(
      success({
        id: req.params.id,
        description: '测试文档',
        content: '测试文档内容',
      }),
    ),
  'GET /api/rcm/doc/:id/content': (req: any, res: any) =>
    res.json(
      success({
        id: req.params.id,
        contentId: 666,
        description: '测试文档',
        content: '测试文档内容',
      }),
    ),
  'POST /api/rcm/doc/:id/content': (req: any, res: any) => res.json(success()),
  'POST /api/rcm/doc/:id/publish': (req: any, res: any) => res.json(success()),
  'POST /api/rcm/doc/:id/history': (req: any, res: any) =>
    res.json(
      success([
        {
          id: req.params.id,
          draft: true,
          title: '测试版本名称',
          createdAt: '测试文档内容',
        },
        {
          id: req.params.id,
          draft: false,
          title: '测试版本名称',
          createdAt: '测试文档内容',
        },
      ]),
    ),
  'POST /api/rcm/doc/:id/rollback': (req: any, res: any) => res.json(success()),
  'POST /api/rcm/doc/version/:contentId/name': (req: any, res: any) =>
    res.json(success()),
};
