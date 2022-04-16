import React from 'react';
import { Exhibit } from '@hocgin/ui';

export interface ImageProps {
  /**
   * 链接地址
   */
  src: string[];
}

class Index extends React.Component<ImageProps> {
  static defaultProps = {
    src: [],
  };

  render() {
    let { src } = this.props;
    return (
      <div>
        {src.map((url) => (
          <Exhibit.Image.Image src={url} />
        ))}
      </div>
    );
  }
}

export default Index;
