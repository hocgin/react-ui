import React, { useEffect, useRef } from 'react';
import './style';

const Index: React.FC<{
  children: HTMLElement;
}> = (props) => {
  const ref = useRef<any>();
  useEffect(() => ref.current.replaceWith(props.children), []);
  return <div ref={ref} />;
};

export default Index;
