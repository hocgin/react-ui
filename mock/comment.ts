import { success } from './_utils/result';
import Mock from 'mockjs';
import { UserType } from '@/Utils/interface';

// http://mockjs.com/examples.html
export default {
  'GET /ums/account': (req: any, res: any) =>
    res.json(
      success({
        id: 1,
        nickname: 'hocgin',
        username: 'hocgin',
        avatar: Mock.Random.image('100x100'),
      }),
    ),
  'POST /ums/user/_complete': (req: any, res: any) =>
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
  'POST /com/comment/:refType/:refId/like': (req: any, res: any) =>
    res.json(success(mockData())),
  'POST /com/comment/:refType/:refId/dislike': (req: any, res: any) =>
    res.json(success(mockData())),
  'POST /com/comment/:refType/:refId/report': (req: any, res: any) =>
    res.json(success(mockData())),
  'POST /com/comment/:refType/:refId/reply': (req: any, res: any) =>
    res.json(success(mockData())),
  'POST /com/comment/:refType/:refId/_scroll': (req: any, res: any) =>
    res.json(
      success({
        nextId: 1,
        hasMore: true,
        records: [mockData()],
      }),
    ),
  'POST /com/comment/:refType/:refId/_paging': (req: any, res: any) =>
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
    content: '@string()',
    hasReply: '@bool()',
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
