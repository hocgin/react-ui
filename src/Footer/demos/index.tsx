import React from 'react';
import {Footer} from '@hocgin/ui';
import {Divider} from "antd";

export default () => {
  return <>
    <Footer />
    <Divider />
    <Footer copyTitle={<></>} />
    <Divider />
    <Footer footerInfo={<></>} />
  </>;
};
