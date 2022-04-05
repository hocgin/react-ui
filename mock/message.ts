import { success } from './_utils/result';
import mockjs from 'mockjs';
import { datetime } from './_utils/common';

// http://mockjs.com/examples.html
export default {
  'POST /api/com/message/_scroll': (req: any, res: any) => {
    return res.json(
      success({
        hasMore: false,
        nextId: '1',
        records: [mockMessage(req.params.messageType)],
      }),
    );
  },
  'POST /api/com/message/chat/_scroll': (req: any, res: any) => {
    return res.json(
      success({
        hasMore: true,
        nextId: '1',
        records: [mockMessage(req.params.messageType)],
      }),
    );
  },
  'POST /api/com/message/chat/last/_scroll': (req: any, res: any) => {
    return res.json(
      success({
        hasMore: true,
        nextId: '1',
        records: [mockMessage(req.params.messageType)],
      }),
    );
  },
  'POST /api/com/message/personal/send': (req: any, res: any) => {
    return res.json(success());
  },
  'GET /api/com/message/stat': (req: any, res: any) => {
    return res.json(
      success(
        mockjs.mock({
          unreadTotalCount: '@integer(0, 100)',
          unreadSystemCount: '@integer(0, 100)',
          unreadPersonCount: '@integer(0, 100)',
          unreadNoticeCount: '@integer(0, 100)',
        }),
      ),
    );
  },
};

const mockMessage = (messageType: any) => {
  return mockjs.mock({
    id: '@id',
    messageType: messageType,
    senderUserAvatarUrl: '@image(100x100)',
    senderUserName: '@cname',
    senderUser: '@id',
    receiverUserAvatarUrl: '@image(100x100)',
    receiverUserName: '@cname',
    receiverUser: '@id',
    title: '@cname(2, 10)',
    linkUrl: '@url()',
    description: '@string(0, 300)',
    sendAt: datetime(),
    readAt: datetime(),
    noticeMessage: {
      eventType: null,
      eventTypeName: null,
      refType: null,
      refTypeName: null,
      refObject: {
        id: null,
        title: null,
      },
      content: '@paragraph(0, 300)',
    },
    systemMessage: {
      content: '@paragraph(0, 300)',
    },
    personalMessage: {
      content: '@string(0, 100)',
    },
  });
};
