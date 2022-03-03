import * as React from 'react';
import { TableCell as TipTapTableCell } from '@tiptap/extension-table-cell';

const TableCell = TipTapTableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: element => element.style.backgroundColor,
        renderHTML: attributes => {
          return {
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});


export { TableCell };
