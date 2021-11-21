import React from 'react';
import { message, Tree, TreeSelect } from 'antd';
import memoizeOne from 'memoize-one';
import { FileInfo, HttpResult, IPage, TreeNode } from '@/Utils/interface';
import { SmileOutlined, HeartOutlined, HomeOutlined } from '@ant-design/icons';
import { Utils } from '@/index';

export class Ui {
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

  /**
   * 响应是否成功
   * @param result
   */
  static isSuccess(result?: HttpResult<any>) {
    return result && result.success;
  }

  /**
   * 响应失败自动弹出提示
   * @param result
   */
  static showErrorMessageIfExits(result?: HttpResult<any>) {
    if (Ui.isSuccess(result)) {
      return true;
    }
    console.debug('请求发生错误:', result);
    if (result?.message) {
      message.error(result.message).then(console.debug);
    }
    return false;
  }

  /**
   * 获取 FORM 提交表单的错误信息
   * @param errors
   */
  static getErrorMessage(errors: any) {
    if (errors.errorFields && errors.errorFields.length > 0) {
      return errors.errorFields[0].errors[0];
    }

    console.log(errors);
    let keys = Object.keys(errors || {});
    if (keys.length > 0) {
      return errors[keys[0]].message;
    }
  }

  /**
   * 获取 paging 对象的列表数据
   * @param paging
   * @return {*|*[]}
   */
  static getPagingList(paging: IPage) {
    if (!paging) {
      return [];
    }
    return paging.records || [];
  }

  static fastGetPagingList = memoizeOne(this.getPagingList);

  /**
   * 获取分页的设置对象
   * @param paging
   * @return {{}}
   */
  static getPagingPagination(paging: IPage) {
    if (!paging) {
      return {};
    }
    return {
      total: paging.total,
      pageSize: paging.size,
      current: paging.current,
    };
  }

  static fastPagingPagination = memoizeOne(this.getPagingPagination);

  /**
   * 获取表单分页数据结构
   * @param paging
   */
  static getTableData(paging: IPage) {
    return {
      list: Ui.fastGetPagingList(paging),
      pagination: Ui.fastPagingPagination(paging),
    };
  }

  static fastGetTableData = memoizeOne(this.getTableData);

  /**
   * 获取域名
   */
  static getDomain() {
    if (Utils.Lang.isServer()) {
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
