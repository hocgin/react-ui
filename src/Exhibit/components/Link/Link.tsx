import React from 'react';
import Site from './Site';
import File from './File';
import Download from './Download';

export interface LinkProps {}

class Index extends React.Component<LinkProps> {
  static Site: typeof Site;
  static File: typeof File;
  static Download: typeof Download;
  static defaultProps = {};

  render(): JSX.Element {
    return <div />;
  }
}

export default Index;
