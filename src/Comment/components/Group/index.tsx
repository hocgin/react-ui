import React, { Component, ReactNode } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import Comment from '../Comment';
import Editor from '../Editor';
import { Utils } from '@hocgin/ui';
import InfiniteScroll from 'react-infinite-scroller';
import { Pagination, List, Skeleton, Affix, Avatar, message } from 'antd';
import { DateFormat } from '@/Utils/format';

let mockSubComments = () => {
  return ({
    dataSource: [],
    hasMore: false,
    loading: false,
    current: 1,
    total: 0,
  });
};

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
    avatar: null,
    author: null,
    replyId: null,
    replyTopId: null,
    replyTitle: null,
    page: 1,
    jumpFlag: null,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    let { loading, total, hasMore, dataSource, replyId, replyTitle, jumpFlag } = this.state;
    let { author, avatar, placeholder, landed } = this.props;
    return (<div className={classNames(styles.commentGroup)}>
      <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.onLoadMore.bind(this)}
                      hasMore={!loading && hasMore} useWindow={true}>
        <List className={styles.comments} loading={loading} locale={{ emptyText: '赶快来评论一下吧～' }}
              itemLayout='horizontal' header={`${total} 评论`} dataSource={dataSource}
              renderItem={(item: any) => {
                return (<List.Item>
                  <Comment title={item?.author?.nickname} href={item?.author?.href}
                           content={`${item?.content}`}
                           className={classNames(styles.ske)}
                           avatar={(<Avatar size={45} src={`${item?.author?.avatarUrl}`} />)}
                           id={item?.id} landed={landed}
                           jumpFlag={jumpFlag}
                           onJump={this.onClickJump.bind(this)}
                           onChangeReply={(cid?: number, title?: string, callback?: () => void) => this.onChangeReply && this.onChangeReply(cid, title, item?.id)}
                           onClickLike={this.onClickLike.bind(this)} onClickDisliked={this.onClickDisliked.bind(this)}
                           likes={item?.likes} disliked={item?.disliked} action={item?.action}
                           datetime={`${DateFormat.defRelativeFromNow(item?.datetime)}`}>
                    {item?.hasReply && (<SubComments parentId={item?.id} url={this.url} headers={this.headers}
                                                     dataSource={item?.dataSource} size={10}
                                                     jumpFlag={jumpFlag}
                                                     onJump={this.onClickJump.bind(this)}
                                                     onClickLike={this.onClickLike.bind(this)}
                                                     onClickDisliked={this.onClickDisliked.bind(this)}
                                                     onPage={this.pagingByParentId.bind(this)}
                                                     landed={landed} onChangeReply={this.onChangeReply.bind(this)} />)}
                  </Comment>
                </List.Item>);
              }} />
      </InfiniteScroll>
      <AffixEditor title={author} placeholder={placeholder} avatar={avatar}
                   onClickReply={this.onClickReply.bind(this)} landed={landed}
                   replyId={replyId} replyTitle={replyTitle} onClearReply={this.onClearReply.bind(this)} />
    </div>);
  }

  onLoadMore(page: number) {
    this.setState({ page }, () => this.paging(page, this.size));
  };

  onChangeReply(cid?: number, title?: string, replyTopId?: any) {
    this.setState({ replyId: cid, replyTitle: title, replyTopId: replyTopId });
  }

  onClearReply() {
    this.setState({ replyId: null, replyTitle: null, replyTopId: null });
  }

  onRefreshPage() {
    let { page } = this.state;
    this.paging(page, this.size);
  }

  onClickJump(flag: any) {
    this.setState({ jumpFlag: flag });
  }

  onClickLike(cid?: number) {
    Utils.POST(`${this.url}/${cid}/like`, { ...this.body }, this.headers).then((result: any) => {
      if (Utils.Ui.showErrorMessageIfExits(result)) {
        // success
        return;
      }
    });
  }

  onClickDisliked(cid?: number) {
    Utils.POST(`${this.url}/${cid}/dislike`, { ...this.body }, this.headers).then((result: any) => {
      if (Utils.Ui.showErrorMessageIfExits(result)) {
        // success
        return;
      }
    });
  }

  onClickReply(cid?: number, content?: string) {
    if (!content || `${content}`.length <= 0) {
      message.warn('请输入评论内容');
      return;
    }

    let callback = (result: any) => {
      if (Utils.Ui.showErrorMessageIfExits(result)) {
        // @ts-ignore
        this.setState(({ dataSource, replyTopId }) => {
          if (replyTopId) {
            let topComment = (dataSource || []).find(({ id }: any) => id === replyTopId) || {};
            topComment.hasReply = true;
            topComment.dataSource = topComment.dataSource || mockSubComments();
            topComment.dataSource.dataSource = [...topComment?.dataSource?.dataSource, result?.data];
          } else {
            dataSource = [...dataSource, result?.data];
          }
          return ({ dataSource });
        });
      }
    };
    Utils.POST(`${this.url}/comment`, {
      id: cid, content, ...this.body,
    }, this.headers).then(callback);
  }

  /**
   * 分页顶级评论
   * @param page
   * @param size
   */
  paging(page?: number, size?: number) {
    this.setState({
      loading: true,
    }, () => {
      Utils.POST(`${this.url}/_paging`, { page, size, ...this.body }, this.headers).then((result: any) => {
        if (Utils.Ui.showErrorMessageIfExits(result)) {
          let { records = [], total = 0, pages, current } = result?.data;
          this.setState(({ dataSource }: any) => ({
            hasMore: current < pages,
            total,
            dataSource: [...dataSource, ...records],
          }));
          return;
        }
      }).finally(() => this.setState({ loading: false }));
    });
  };

  /**
   * 分页子级评论
   * @param parentId
   * @param page
   * @param size
   */
  pagingByParentId(parentId?: number, page?: number, size?: number) {
    let { dataSource } = this.state;
    let comment: any = (dataSource || []).find(({ id }: any) => id === parentId);
    let subComment: any = (comment.dataSource = {});
    this.setState(() => {
      subComment.loading = true;
      return { dataSource };
    }, () => {
      // 发起请求
      Utils.POST(`${this.url}/comment/${parentId}/_paging`, { page, size }, this.headers).then((result: any) => {
        if (Utils.Ui.showErrorMessageIfExits(result)) {
          let { records = [], total = 0, current, pages } = result?.data;
          subComment.dataSource = [...records];
          subComment.hasMore = current < pages;
          subComment.total = total;
          subComment.current = current;
          this.setState({ dataSource });
          return;
        }
      }).finally(() => this.setState(() => {
        subComment.loading = false;
        return { dataSource };
      }));
    });
  }


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
  dataSource?: any,
  // 登陆状态
  landed?: boolean;
  onChangeReply?: (cid?: number, title?: string, replyTopId?: any) => void;
  onClickDisliked?: (cid?: number) => void;
  onPage?: (parentId?: number, page?: number, size?: number) => void;
  onClickLike?: (cid?: number) => void;
  onJump?: (flag: any) => void;
  jumpFlag?: any;
}

interface SubCommentsState {
}

class SubComments extends Component<SubCommentsProps, SubCommentsState> {

  private static defaultProps = {
    dataSource: {
      loading: false,
      total: 0,
      current: 1,
      dataSource: [],
    },
  };

  state = {
    loadMore: false,
  };

  componentDidMount() {
    this.onRefreshPage();
  }

  render() {
    let { onChangeReply, onClickDisliked, onClickLike, landed, dataSource, parentId, onJump, jumpFlag } = this.props;
    return (<>
      <List className={styles.subComments} loading={dataSource?.loading} loadMore={true}
            itemLayout='horizontal' dataSource={dataSource?.dataSource} renderItem={(item: any) => (<List.Item>
        <Skeleton avatar loading={item?.loading} active>
          <Comment type='small' title={item?.author?.nickname} href={item?.author?.href}
                   id={item?.id} onJump={onJump} jumpFlag={jumpFlag}
                   onChangeReply={(cid?: number, title?: string, callback?: () => void) => onChangeReply && onChangeReply(cid, title, parentId)}
                   onClickDisliked={onClickDisliked} onClickLike={onClickLike} landed={landed}
                   replyId={item?.replyId} replyAvatar={item?.replier?.avatarUrl} replyTitle={item?.replier?.nickname}
                   content={<> {item?.content} </>} avatar={(<Avatar size={30} src={`${item?.author?.avatarUrl}`} />)}
                   likes={item?.likes} disliked={item?.disliked} action={item?.action}
                   datetime={`${DateFormat.defRelativeFromNow(item?.datetime)}`} /></Skeleton>
      </List.Item>)} />
      <Pagination className={styles.pagination} hideOnSinglePage size='small' total={dataSource?.total}
                  defaultCurrent={1} current={dataSource?.current}
                  onChange={this.onChangePagination.bind(this)} showTotal={(total) => `共 ${total} 条`} />
    </>);
  }

  onRefreshPage() {
    let { parentId, dataSource, onPage } = this.props;
    onPage && onPage(parentId, dataSource?.current || 1, this.size);
  }

  onChangePagination(page?: number, pageSize?: number) {
    let { parentId, onPage } = this.props;
    onPage && onPage(parentId, page, pageSize);
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
  onClearReply?: () => void;
  onJump?: (flag: any) => void;
}

interface AffixEditorState {
}

class AffixEditor extends Component<AffixEditorProps, AffixEditorState> {

  render() {
    let {
      title,
      landed,
      placeholder,
      avatar,
      replyTitle,
      replyId,
      onClickReply,
      onClearReply,
      onJump,
    } = this.props;
    return (<div className={styles.editor}>
      <Affix offsetBottom={0}>
        <Editor title={title} replyTitle={replyTitle} replyId={replyId} placeholder={placeholder} avatar={avatar}
                landed={landed} onClickReply={onClickReply} onClearReply={onClearReply} onJump={onJump} />
      </Affix>
    </div>);
  }
}

export default Index;
