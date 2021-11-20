import React from 'react';
import styles from './Image.less';
import type Avatar from './Avatar';
import { Utils } from '@hocgin/ui';
import { Img } from 'react-image';
import { SyncOutlined, FileExclamationOutlined } from '@ant-design/icons';

export interface ImageProps {
  /**
   * 链接地址
   */
  src: string;
  /**
   * 图片描述
   */
  alt?: string;
}

class Index extends React.Component<ImageProps> {
  static Avatar: typeof Avatar;

  static defaultProps = {};

  render() {
    let { src, alt } = this.props;
    let suffix = this.suffix;
    return (
      <div className={styles.component}>
        <div className={styles.photoShot}>
          <div className={styles.photoImg}>
            <Img
              src={[src]}
              loader={<SyncOutlined spin style={{ fontSize: '32px' }} />}
              unloader={
                <FileExclamationOutlined style={{ fontSize: '32px' }} />
              }
              className={styles.photo}
              alt={alt || src}
            />
          </div>
        </div>
        {suffix !== '' && <div className={styles.indicator}>{suffix}</div>}
      </div>
    );
  }

  get suffix() {
    let { src } = this.props;
    return Utils.Lang.getSuffix(src) || 'N/A';
  }
}

export default Index;