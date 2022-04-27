import Utils from '@/Utils';
import { ConfigProvider } from '@/index';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { HtmlTagType } from '@/Utils/lang';
import { Anchor } from 'antd';

const listDirectory = (content?: string) => {
  return Utils.Lang.matchHtmlTag(content, 'h[1-6]');
};

type TreeDirectory = HtmlTagType & {
  id: number;
  key: string;
  level: number;
  children?: TreeDirectory[];
  parentId?: number;
};
export const treeDirectory = (content?: string) => {
  let result: TreeDirectory[] = [];
  let directory: HtmlTagType[] = listDirectory(content);

  let directoryList: TreeDirectory[] = [];

  // 1. 补充层级关系
  directory
    .map((item, index) => {
      let name = item.name;
      let level = parseInt(name.replace('h', '').replace('H', ''));
      return {
        ...item,
        id: index + 1,
        level,
        parentId: undefined,
      };
    })
    .forEach((item, index) => {
      if (index === 0) {
        directoryList.push({ ...item });
        return;
      }
      let parentId;
      for (let i = index - 1; i >= 0; i--) {
        let preNode = directoryList[i];
        if (preNode.level < item.level) {
          parentId = preNode.id;
          break;
        } else if (preNode.level == item.level) {
          parentId = preNode.parentId;
          break;
        }
      }
      directoryList.push({ ...item, parentId });
    });
  console.log('补充层级关系', directoryList);

  // 2. 构建树形结构
  directoryList.forEach((item, index) => {
    let parentId = item.parentId;
    if (!parentId) {
      result.push(item);
      return;
    }
    let parentNode = directoryList.find((node) => node.id === parentId);
    if (parentNode) {
      parentNode.children = parentNode.children || [];
      parentNode.children.push(item);
    }
  });
  console.log('构建树形结构', result);
  return result;
};

const renderAnchorLink = (data: TreeDirectory[] = []) => {
  return (data || []).map((item: TreeDirectory) => {
    let title = `${item.text}`;
    let href = `#${title}`;
    if (item.children && item.children.length > 0) {
      return (
        <Anchor.Link
          key={item.id}
          href={href}
          title={<div className={'anchor-link-title'}>{title}</div>}
        >
          {renderAnchorLink(item.children)}
        </Anchor.Link>
      );
    }
    return (
      <Anchor.Link
        key={item.id}
        href={href}
        title={<div className={'anchor-link-title'}>{title}</div>}
      />
    );
  });
};

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  content?: string;
}> = ({ ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  let prefixCls = getPrefixCls('directory', props.prefixCls);
  const [targetOffset, setTargetOffset] = useState<number | undefined>(
    undefined,
  );
  useEffect(() => {
    setTargetOffset(window.innerHeight / 3);
  }, []);
  let data = treeDirectory(props.content);
  return (
    <div className={classnames(`${prefixCls}`, props.className)}>
      <Anchor affix={false} targetOffset={targetOffset}>
        {renderAnchorLink(data)}
      </Anchor>
    </div>
  );
};

export default Index;
