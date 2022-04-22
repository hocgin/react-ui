import React from 'react';
import { Exhibit } from '@/index';

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
      <div>
        {value.map((i) => (
          <Exhibit.Text.Tag>{i}</Exhibit.Text.Tag>
        ))}
      </div>
    );
  }
}

export default Index;
