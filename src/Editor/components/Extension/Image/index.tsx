import React from 'react';
import TipTapImage from '@tiptap/extension-image';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Extension } from '@tiptap/core';
import { Image as UiImage } from './Image';


export interface FontSizeOptions {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size attribute
       */
      setFontSize: (fontSize: string) => ReturnType,
      /**
       * Unset the font size attribute
       */
      unsetFontSize: () => ReturnType,
    };
  }
}


const Image = TipTapImage.extend<any>({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: element => element.style.width,
        renderHTML: attributes => ({
          style: `width: ${attributes.width}`,
        }),
      },
      height: {
        default: null,
        parseHTML: element => element.style.height,
        renderHTML: attributes => ({
          style: `height: ${attributes.height}`,
        }),
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(UiImage);
  },

});

export { Image };
