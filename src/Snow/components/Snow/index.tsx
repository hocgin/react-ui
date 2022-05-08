import React, { Component } from 'react';

interface SnowProps {
  isShow?: boolean;
  children?: any;
}

class Index extends Component<SnowProps> {
  static defaultProps = {
    isShow: true,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    let { isShow } = this.props;
    if (isShow) {
      this.getOrCreateSnowContainer();
      this.loadScript(
        `https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.1.min.js`,
        () => this.loadScript(`https://cdn.hocgin.top/snowy.js`),
      );
    }
  }

  getOrCreateSnowContainer() {
    let sc = document.querySelector('.snow-container');
    if (sc != null) {
      return sc;
    }
    let divEl = document.createElement('div');
    divEl.className += 'snow-container';
    divEl.style.position = 'fixed';
    divEl.style.top = '0';
    divEl.style.left = '0';
    divEl.style.width = '100vw';
    divEl.style.height = '100vh';
    divEl.style.pointerEvents = 'none';
    divEl.style.zIndex = '100001';
    document.body.appendChild(divEl);
    return divEl;
  }

  loadScript(url: string, onload?: any) {
    let script = document.createElement('script');
    script.async = true;
    script.onload = onload;
    script.src = url;
    document.head.appendChild(script);
  }

  render() {
    return <>{this.props?.children}</>;
  }
}

export default Index;
