import React from 'react';

export const SchemeColumns = (columns: any[]): any[] => {
  return columns.map(SchemeColumn);
};

const SchemeColumn = (column: any): any => {
  return column;
};
