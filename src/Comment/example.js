let root = {
  current: 10,
  total: 10,
  size: 10,
  records: [{
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
  }],
};

// 顶级评论 POST {url}/_paging
// 子级评论 POST {url}/comment/1/_paging
// 评论 POST {url}/comment
// 点赞 POST {url}/comment/1/like
// 倒赞 POST {url}/comment/1/dislike
// 举报 POST {url}/comment/1/report
