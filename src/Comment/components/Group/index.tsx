import React, { Component } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import Comment from '../Comment';
import Editor from '../Editor';
import { Utils } from '@hocgin/ui';
import InfiniteScroll from 'react-infinite-scroller';
import { Pagination, List, Skeleton, Affix, Avatar } from 'antd';
import { DateFormat } from '@/Utils/format';

// 加载下一页。分页子
interface GroupProps {
  // 请求头
  headers?: any;
  // 请求路径
  url?: string;
  // 每页数量
  size?: number;
  // 默认请求体
  body?: any;
  // 用户名
  author?: string;
  // 用户头像
  avatar?: string;
  // 是否登陆
  landed?: boolean;
  // 默认提示语
  placeholder?: string;
}

interface GroupState {
}

class Index extends Component<GroupProps, GroupState> {
  private static defaultProps = {
    headers: {},
    body: {},
    size: 10,
    landed: false,
  };

  state = {
    hasMore: true,
    loading: false,
    loadMore: false,
    dataSource: [],
    total: 0,
    subComments: {},
    avatar: null,
    author: null,
    replyId: null,
    replyTitle: null,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    let { loading, total, hasMore, dataSource, replyId, replyTitle } = this.state;
    let { author, avatar, placeholder, landed } = this.props;
    return (<div className={classNames(styles.commentGroup)}>
      <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.onLoadMore.bind(this)}
                      hasMore={!loading && hasMore} useWindow={true}>
        <List className={styles.comments} loading={loading}
              itemLayout='horizontal' header={`${total} 评论`} dataSource={dataSource}
              renderItem={(item: any) => (<List.Item>
                <Comment className={styles.ske} title={item?.author?.nickname} href={item?.author?.href}
                         content={`${item?.content}`} avatar={(<Avatar size={45} src={`${item?.author?.avatarUrl}`} />)}
                         id={item?.id} onChangeReply={this.onChangeReply.bind(this)} landed={landed}
                         onClickLike={this.onClickLike.bind(this)} onClickDisliked={this.onClickDisliked.bind(this)}
                         likes={item?.likes} disliked={item?.disliked} action={item?.action}
                         datetime={`${DateFormat.defRelativeFromNow(item?.datetime)}`}>
                  {item?.hasReply && (<SubComments parentId={item?.id} url={this.url} headers={this.headers}
                                                   onClickLike={this.onClickLike.bind(this)}
                                                   onClickDisliked={this.onClickDisliked.bind(this)}
                                                   landed={landed} onChangeReply={this.onChangeReply.bind(this)} />)}
                </Comment>
              </List.Item>)} />
      </InfiniteScroll>
      <AffixEditor title={author} placeholder={placeholder} avatar={avatar}
                   onClickReply={this.onClickReply.bind(this)} landed={landed}
                   replyId={replyId} replyTitle={replyTitle} />
    </div>);
  }

  onLoadMore(page: number) {
    this.paging(page, this.size);
  };

  onChangeReply(cid?: number, title?: string) {
    this.setState({ replyId: cid, replyTitle: title });
  }

  onClickLike(cid?: number) {
    Utils.POST(`${this.url}/${cid}/like`, { ...this.body }, this.headers).then((result: any) => {
      if (!result?.success) {
        return;
      }
    });
  }

  onClickDisliked(cid?: number) {
    Utils.POST(`${this.url}/${cid}/dislike`, { ...this.body }, this.headers).then((result: any) => {
      if (!result?.success) {
        return;
      }
    });
  }

  onClickReply(cid?: number, content?: string) {
    Utils.POST(`${this.url}/comment`, { id: cid, content, ...this.body }, this.headers).then((result: any) => {
      if (!result?.success) {
        return;
      }
    });
  }

  paging(page?: number, size?: number) {
    this.setState({
      loading: true,
    }, () => {
      Utils.POST(`${this.url}/_paging`, { page, size, ...this.body }, this.headers).then((result: any) => {
        if (!result?.success) {
          return;
        }
        let { records = [], total = 0 } = result?.data;
        this.setState(({ dataSource }: any) => ({
          hasMore: records.length !== 0,
          total,
          dataSource: [...dataSource, ...records],
        }));
      }).finally(() => this.setState({ loading: false }));
    });
  };

  get body() {
    return this.props?.body;
  }

  get headers() {
    return this.props?.headers;
  }

  get url() {
    return this.props?.url;
  }

  get size() {
    return this.props.size;
  }
}

//
interface SubCommentsProps {
  // 父评论ID
  parentId: number;
  headers?: any;
  url?: string;
  size?: number;
  // 登陆状态
  landed?: boolean;
  onChangeReply?: (cid?: number, title?: string) => void;
  onClickDisliked?: (cid?: number) => void;
  onClickLike?: (cid?: number) => void;
}

interface SubCommentsState {
}

class SubComments extends Component<SubCommentsProps, SubCommentsState> {

  state = {
    hasMore: true,
    loading: false,
    loadMore: false,
    dataSource: [],
    total: 0,
    page: 1,
    current: 1,
  };

  componentDidMount() {
    let { page } = this.state;
    let { parentId } = this.props;
    this.pagingByParentId(parentId, page, this.size);
  }

  render() {
    let { onChangeReply, onClickDisliked, onClickLike, landed } = this.props;
    let { dataSource, hasMore, current, loading, total } = this.state;
    return (<>
      <List className={styles.subComments} loading={loading} loadMore={true}
            itemLayout='horizontal' dataSource={dataSource} renderItem={(item: any) => (<List.Item>
        <Skeleton avatar loading={item?.loading} active>
          <Comment type='small' title={item?.author?.nickname} href={item?.author?.href}
                   id={item?.id} onChangeReply={onChangeReply}
                   onClickDisliked={onClickDisliked} onClickLike={onClickLike} landed={landed}
                   replyId={item?.replyId} replyAvatar={item?.replier?.avatarUrl} replyTitle={item?.replier?.nickname}
                   content={<> {item?.content} </>} avatar={(<Avatar size={30} src={`${item?.author?.avatarUrl}`} />)}
                   likes={item?.likes} disliked={item?.disliked} action={item?.action}
                   datetime={`${DateFormat.defRelativeFromNow(item?.datetime)}`} /></Skeleton>
      </List.Item>)} />
      <Pagination className={styles.pagination} hideOnSinglePage size='small' total={total}
                  defaultCurrent={1} current={current}
                  onChange={this.onChangePagination.bind(this)} showTotal={(total) => `共 ${total} 条`} />
    </>);
  }

  pagingByParentId(parentId?: number, page?: number, size?: number) {
    this.setState({
      loading: true,
    }, () => {
      // 发起请求
      Utils.POST(`${this.url}/comment/${parentId}/_paging`, { page, size }, this.headers).then((result: any) => {
        if (!result?.success) {
          return;
        }
        let { records = [], total = 0, current } = result?.data;
        this.setState(({ dataSource }: any) => ({
          hasMore: records.length !== 0,
          total,
          current,
          dataSource: [...records],
        }));
      }).finally(() => this.setState({ loading: false }));
    });
  }

  onChangePagination(page?: number, pageSize?: number) {
    let { parentId } = this.props;
    this.pagingByParentId(parentId, page, pageSize);
  }

  get headers() {
    return this.props?.headers;
  }

  get url() {
    return this.props?.url;
  }

  get size() {
    return this.props?.size;
  }
}

//
interface AffixEditorProps {
  replyId?: any,
  replyTitle?: any,
  title?: string;
  landed?: boolean;
  placeholder?: string;
  avatar?: string;
  onClickReply?: (cid?: number, text?: string) => void;
}

interface AffixEditorState {
}

class AffixEditor extends Component<AffixEditorProps, AffixEditorState> {

  render() {

    let { title, landed, placeholder, avatar, replyTitle, replyId, onClickReply } = this.props;
    return (<div className={styles.editor}>
      <Affix offsetBottom={0}>
        <Editor title={title} replyTitle={replyTitle} replyId={replyId} placeholder={placeholder} avatar={avatar}
                landed={landed} onClickReply={onClickReply} />
      </Affix>
    </div>);
  }
}

export default Index;
