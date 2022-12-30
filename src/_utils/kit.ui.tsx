import React from 'react';
import { message, Tree, TreeSelect, Upload } from 'antd';
import { StructKit } from '@/_utils';
import { FileInfo, TreeNode } from '@/_types';
import { SmileOutlined, HeartOutlined, HomeOutlined } from '@ant-design/icons';

export default class UIKit {
  public static COLUMN_PREFIX = 'hui.';

  /**
   * 自定义组件前缀
   * @param type
   */
  public static columnPrefix(type: string): string {
    return UIKit.COLUMN_PREFIX + `${type}`;
  }

  /**
   * 获取 Window, 时刻提醒要进行 SSR 组件处理
   */
  public static getWindow(): undefined | Window {
    if (typeof window === 'undefined') {
      return undefined;
    }
    return window;
  }

  /**
   * 获取图标
   * @param name
   */
  public static getIcon(name?: string): JSX.Element {
    const IconMap: Record<string, any> = {
      SmileOutlined: <SmileOutlined />,
      HeartOutlined: <HeartOutlined />,
      HomeOutlined: <HomeOutlined />,
    };
    return IconMap[name || 'default'];
  }

  /**
   * 转为 Upload 文件(本地)
   * @param url
   * @param filename
   * @param index
   */
  public static asFile({ url, filename }: FileInfo, index: number) {
    return {
      uid: index,
      url,
      status: 'done',
      name: filename,
    };
  }

  /**
   * 转为远程文件
   */
  public static asServerFile({ url, name }: any): FileInfo {
    return { url, filename: name };
  }

  /**
   * 树型选择器
   * <Tree.Select/>
   * @param data
   * @return {unknown[]}
   */
  public static renderTreeSelectNodes(data: TreeNode[]) {
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
  public static renderTreeNodes(data: TreeNode[]) {
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

  public static showErrorMessageIfExits = StructKit.showErrorMessageIfExits;

  // 解析错误信息
  public static showErrorMessage = (e: Error) => message.error(e.message);

  /**
   * 下载文件
   * @param event
   * @param url
   * @param filename
   */
  public static downloadUrl(
    event: MouseEvent,
    { url, filename = 'unknown' }: any,
  ) {
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

  /**
   * 校验文件信息
   * @param types 文件类型, image/jpeg,image/png,image/gif
   * @param maxSize 文件大小, 2 * 1024 * 1024
   * @param file 待校验的文件
   */
  public static validFile = (types = '', maxSize: number, file: any): any => {
    let meetType = types.split(',').includes(file.type);
    if (!meetType) {
      message.error('请上传正确的文件格式!');
      return Upload.LIST_IGNORE;
    }
    let meetSize = file.size <= maxSize;
    if (!meetSize) {
      message.error('请确认上传的图片大小!');
      return Upload.LIST_IGNORE;
    }

    let image = new Image();
    image.onload = function () {
      let width = image.width;
      let height = image.height;
      console.log(width + '======' + height);
    };
    image.src = file;
    return meetType && meetSize;
  };
}
