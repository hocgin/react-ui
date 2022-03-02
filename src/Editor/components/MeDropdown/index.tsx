import * as React from 'react';
import styles from './index.less';
import { Button, Dropdown, Menu } from 'antd';
import { CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useInterval } from 'ahooks';
import classnames from 'classnames';

interface MenuInfo {
  key: string;
  title?: any;
  header?: any;
  onAction: () => any | undefined;
  onMatched?: () => boolean | undefined;
}

const Index: React.FC<{
  className?: string;
  titleClassName?: string;
  menus?: MenuInfo[];
  defaultValue?: any;
  onClick?: (key: string) => void;
  mode?: 'vertical' | 'horizontal' | 'inline';
}> = ({ className, titleClassName, onClick, menus = [], defaultValue, mode }) => {
  let [key, setKey] = useState<string>('none');
  let matchMenu = (key: string) => menus?.find((item) => item.key === key);

  let menuTitle = matchMenu(key)?.title ?? defaultValue;
  let onAction = (key: string) => matchMenu(key)?.onAction();
  useInterval(() => {
    let matchedMenu: MenuInfo = menus?.filter(
      ({ onMatched }) => onMatched?.() || false,
    )?.[0];
    if (matchedMenu?.key !== key) {
      setKey(matchedMenu?.key);
    }
  }, 1000);
  return (
    <Button type='text'
            className={classnames(styles.dropdown, className)}
            onTouchStart={(e) => e.preventDefault()}
    >
      <Dropdown
        overlayClassName={classnames({
          [styles.horizontal]: mode === 'horizontal',
        })}
        overlay={
          <Menu selectedKeys={[key]}
                onClick={({ key }) => {
                  setKey(key);
                  onAction(key);
                  onClick?.(key);
                }}
          >
            {(menus || []).map(({ key, header }) => (
              <Menu.Item className={styles.menu} key={key}>{header}</Menu.Item>
            ))}
          </Menu>
        }
        trigger={['click']}
      >
        <span className={classnames(styles.selectedValue)}>
          <span className={classnames(titleClassName)}>{menuTitle}</span> <CaretDownOutlined
          className={styles.caretDown} />
        </span>
      </Dropdown>
    </Button>
  );
};

export default Index;
