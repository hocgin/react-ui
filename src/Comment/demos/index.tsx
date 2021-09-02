import React from 'react';
import { Comment } from '@hocgin/ui';

let dataSource = {
  current: 10,
  total: 10,
  size: 10,
  records: [
    {
      cid: 22,
      id: 1,
      likes: 0,
      disliked: 0,
      content: '666',
      author: {
        id: 1,
        title: 'hocgin',
        avatarUrl: '',
        href: '',
      },
      replier: {
        id: 1,
        title: 'hocgin',
        avatarUrl: '',
        href: '',
      },
      datetime: '',
      comments: {
        records: [],
        current: 10,
        total: 10,
        size: 10,
      },
    },
  ],
};

export default () => {
  return (
    <Comment.Group
      landed={true}
      url={'https://api-dev.hocgin.top/com/client/comment/article/1'}
      author={'善良的用户'}
      headers={{ ['X-Username']: 'hocgin', ['X-Source']: 'react-ui' }}
    />
  );
};
