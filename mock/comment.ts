import { success } from './_utils/result';
import Mock from 'mockjs';
import { UserType } from '@/_types';

// http://mockjs.com/examples.html
export default {
  'GET /api/ums/account': (req: any, res: any) =>
    res.json(
      success({
        id: 1,
        nickname: 'hocgin',
        username: 'hocgin',
        avatar: Mock.Random.image('100x100'),
      }),
    ),
  'POST /api/ums/user/_complete': (req: any, res: any) =>
    res.json(
      success([
        {
          id: 1,
          nickname: 'hocgin',
          username: 'hocgin',
          avatar: Mock.Random.image('100x100'),
        },
      ]),
    ),
  'POST /api/com/comment/:refType/:refId/like': (req: any, res: any) =>
    res.json(success(mockData())),
  'POST /api/com/comment/:refType/:refId/dislike': (req: any, res: any) =>
    res.json(success(mockData())),
  'POST /api/com/comment/:refType/:refId/report': (req: any, res: any) =>
    res.json(success(mockData())),
  'POST /api/com/comment/:refType/:refId/reply': (req: any, res: any) => {
    res.json(
      success({
        ...mockData(),
        replyId: !!req?.body?.commentId ? req?.body?.commentId : null,
      }),
    );
  },
  'POST /api/com/comment/:refType/:refId/_scroll': (req: any, res: any) =>
    res.json(
      success({
        nextId: new Date().getTime(),
        hasMore: true,
        records: [mockData()],
      }),
    ),
  'POST /api/com/comment/:refType/:refId/_paging': (req: any, res: any) =>
    res.json(
      success({
        current: 1,
        total: 12,
        size: 10,
        records: [mockData()],
      }),
    ),
};

let mockData = () => {
  return Mock.mock({
    id: '@integer()',
    replyId: 1,
    likes: '@integer(0, 10)',
    disliked: '@integer(0, 10)',
    action: 'none',
    content: '@cparagraph(1, 1000)',
    hasReply: '@bool()',
    idx: '@integer(0, 3)',
    author: mockUser(),
    replier: mockUser(),
  });
};

let mockUser = () => {
  return {
    id: 1,
    title: 'hocgin',
    avatarUrl: Mock.Random.image('100x100'),
  } as UserType;
};
