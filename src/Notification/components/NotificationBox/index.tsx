import React from 'react';

const ChatCard: React.FC<{
  avatarUrl?: any;
  title?: string;
  dot?: boolean;
  content?: string;
  createdAt?: string;
}> = () => {
  return <div>ChatCard</div>;
};


export const NotificationBox: React.FC<{
  className?: string;
  defaultParams?: any;
}> = (props, ref) => {
  return <div> 加载中 </div>;
};

