import React from 'react';

export default ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => <h1 className={className}>{title}</h1>;
