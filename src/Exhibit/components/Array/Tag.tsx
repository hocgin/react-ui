import React from 'react';
import styles from './Image.less';
import { Exhibit } from '@hocgin/ui';

export interface TagProps {
  /**
   * 内容
   */
  value: string[];
}

class Index extends React.Component<TagProps> {
  static defaultProps = {
    src: [],
  };

  render() {
    let { value } = this.props;
    return (
      <div className={styles.component}>
        {value.map((i) => (
          <Exhibit.Text.Tag>{i}</Exhibit.Text.Tag>
        ))}
      </div>
    );
  }
}

export default Index;
