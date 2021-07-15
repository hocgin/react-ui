import React, { Component } from 'react';

const failure: string = 'http://cdn.hocgin.top/file/failure.ico';
const favicon: string = 'http://cdn.hocgin.top/file/favicon.ico';

interface EggsProps {
  children?: string;
  csl?: boolean;
  doc?: boolean;
}

interface EggsState {
}

class Index extends Component<EggsProps, EggsState> {
  private static defaultProps = {
    csl: true,
    doc: true,
  };
  c: any;
  u: any;

  constructor(props: any, context: any) {
    super(props, context);
    this.egg1();
    this.egg2();
  }

  componentDidMount() {
    this.u = document.title;
    this.getOrCreateIcon();
    window?.addEventListener('visibilitychange', this.onChangeTitle);
  }

  componentWillUnmount() {
    window?.removeEventListener('visibilitychange', this.onChangeTitle);
  }

  render() {
    let { children } = this.props;
    return <>{children}</>;
  }

  onChangeTitle = () => {
    const { doc } = this.props;
    if (doc) {
      let link = this.getOrCreateIcon();
      if (document.hidden) {
        link.href = failure;
        document.title = '崩溃啦！';
        clearTimeout(this.c);
      } else {
        link.href = favicon;
        document.title = '又好了！' + this.u;
        this.c = setTimeout(() => {
          document.title = this.u;
        }, 2e3);
      }
    }
  };

  getOrCreateIcon = () => {
    let link: any = document.querySelector('link[rel*=\'icon\']');
    if (link === null) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    return link;
  };

  /**
   * 动态添加注释
   */
  egg1 = () => {
    let hours = [
      '🕐',
      '🕑',
      '🕒',
      '🕓',
      '🕔',
      '🕕',
      '🕖',
      '🕗',
      '🕘',
      '🕙',
      '🕚',
      '🕛',
      '🕜',
      '🕝',
      '🕞',
      '🕟',
      '🕠',
      '🕡',
      '🕢',
      '🕣',
      '🕤',
      '🕥',
      '🕦',
      '🕧',
    ];
    let date = new Date();
    let location = window?.location;

    let text = `${hours[date.getHours()]} ${date}
   _                     _
  | |__   ___   ___ __ _(_)_ __
  | '_ \\ / _ \\ / __/ _\` | | '_ \\
  | | | | (_) | (_| (_| | | | | |
  |_| |_|\\___/ \\___\\__, |_|_| |_|
                   |___/
>> ${location.protocol}//${location.hostname}${
      location.port ? `:${location.port}` : ''
    }`;
    let commentEl = document.createComment(text);
    document.insertBefore(commentEl, document.documentElement);
  };

  egg2 = () => {
    let { csl } = this.props;

    if (csl) {
      console.log(
        '\n %c HOCGIN %c https://hocg.in \n\n',
        'color: #fff; background: #030307; padding:5px 0;',
        'background: #fadfa3; padding:5px 0;',
      );
    }
  };
}

export default Index;
