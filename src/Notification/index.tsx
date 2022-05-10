/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';

import { NotificationIndicator as Indicator } from './components/NotificationIndicator';
import { NotificationBox as Box } from './components/NotificationBox';


type NotificationType = {
  Indicator: typeof Indicator;
  Box: typeof Box;
};
const Notification: NotificationType = {
  Indicator, Box,
};

export default Notification;
