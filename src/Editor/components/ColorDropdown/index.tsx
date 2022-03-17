import React from 'react';
import { Popover, Button } from 'antd';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import styles from './index.less';
import Icon, { CaretDownOutlined } from '@ant-design/icons';

const Index: React.FC<{
  renderIcon?: (color: string) => any;
  onClick?: (color: string) => void;
}> = ({ renderIcon, onClick }) => {
  let [color, setColor] = useState<string>('#000');
  return (
    <div className={styles.colorDropdown}>
      <Button
        type="text"
        onClick={onClick?.bind(this, color)}
        className={styles.leftBtn}
      >
        <Icon component={renderIcon?.bind(this, color)} />
      </Button>
      <Popover
        content={
          <SketchPicker
            color={color}
            onChangeComplete={(color: any) => setColor(color.hex)}
          />
        }
        trigger="click"
      >
        <Button type="text" className={styles.rightBtn}>
          <CaretDownOutlined />
        </Button>
      </Popover>
    </div>
  );
};

export default Index;
