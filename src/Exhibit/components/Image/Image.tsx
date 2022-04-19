import React from 'react';
import { Utils } from '@hocgin/ui';
import { Img } from 'react-image';
import { SyncOutlined, FileExclamationOutlined } from '@ant-design/icons';
import { ConfigContext } from '@/config-provider';
import './Image.less';

export interface ImageProps {
  /**
   * 链接地址
   */
  src: string;
  /**
   * 图片描述
   */
  alt?: string;
  prefixCls?: string;
}

let Index: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  let suffix = Utils.Lang.getSuffix(src) || 'N/A';
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('exhibit--Image', props.prefixCls);
  return (
    <div className={prefixCls}>
      <div className={'photoShot'}>
        <div className={'photoImg'}>
          <Img
            src={[src]}
            loader={<SyncOutlined spin style={{ fontSize: '32px' } as any} />}
            unloader={
              <FileExclamationOutlined style={{ fontSize: '32px' } as any} />
            }
            className={'photo'}
            alt={alt || src}
          />
        </div>
      </div>
      {suffix !== '' && <div className={'indicator'}>{suffix}</div>}
    </div>
  );
};
export default Index;
