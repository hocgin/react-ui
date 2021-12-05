import React from 'react';
import { Tree, TreeSelect } from 'antd';
import { Struct } from '../result';
import { FileInfo, TreeNode } from '@/Utils/interface';
import { SmileOutlined, HeartOutlined, HomeOutlined } from '@ant-design/icons';

export default class Dom {
  /**
   * 自定义组件前缀
   * @param type
   */
  static columnPrefix(type: string): string {
    return `ui__${type}`;
  }

  /**
   * 获取图标
   * @param name
   */
  static getIcon(name?: string): JSX.Element {
    const IconMap: Record<string, any> = {
      SmileOutlined: <SmileOutlined />,
      HeartOutlined: <HeartOutlined />,
      HomeOutlined: <HomeOutlined />,
    };
    return IconMap[name || 'default'];
  }

  /**
   * 转为 Upload 文件
   * @param url
   * @param filename
   * @param index
   */
  static asFile({ url, filename }: FileInfo, index: number) {
    return {
      uid: index,
      url,
      status: 'done',
      name: filename,
    };
  }

  /**
   * 树型选择器
   * <Tree.Select/>
   * @param data
   * @return {unknown[]}
   */
  static renderTreeSelectNodes(data: TreeNode[]) {
    return (data || []).map((item: TreeNode) => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeSelect.TreeNode
            key={`${item.id}`}
            value={item.id}
            title={item.title}
            dataRef={item}
          >
            {this.renderTreeSelectNodes(item.children)}
          </TreeSelect.TreeNode>
        );
      }
      return (
        <TreeSelect.TreeNode
          value={item.id}
          key={`${item.id}`}
          title={item.title}
          dataRef={item}
        />
      );
    });
  }

  /**
   * 树型控件
   * <Tree/>
   * @param data
   * @return {unknown[]}
   */
  static renderTreeNodes(data: TreeNode[]) {
    return (data || []).map((item: TreeNode) => {
      if (item.children && item.children.length > 0) {
        return (
          <Tree.TreeNode
            key={`${item.id}`}
            // @ts-ignore
            value={item.id}
            title={item.title}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return (
        <Tree.TreeNode
          // @ts-ignore
          value={item.id}
          key={`${item.id}`}
          title={item.title}
          dataRef={item}
        />
      );
    });
  }

  static isSuccess = Struct.isSuccess;
  static showErrorMessageIfExits = Struct.showErrorMessageIfExits;
  static getErrorMessage = Struct.getErrorMessage;
  static getPagingList = Struct.getPagingList;
  static fastGetPagingList = Struct.fastGetPagingList;
  static getPagingPagination = Struct.getPagingPagination;
  static fastPagingPagination = Struct.fastPagingPagination;
  static getTableData = Struct.getTableData;
  static fastGetTableData = Struct.fastGetTableData;

  /**
   * 获取域名
   */
  static getDomain() {
    if (typeof window === 'undefined') {
      return '/';
    }
    return `${window.location.protocol}//${window.location.host}`;
  }

  /**
   * 下载文件
   * @param event
   * @param url
   * @param filename
   */
  static downloadUrl(event: MouseEvent, { url, filename = 'unknown' }: any) {
    event.preventDefault();
    event.stopPropagation();
    const aElement = document.createElement('a');
    document.body.appendChild(aElement);
    aElement.style.display = 'none';
    aElement.href = url;
    aElement.target = '_blank';
    aElement.download = filename;
    aElement.click();
    document.body.removeChild(aElement);
  }
}
