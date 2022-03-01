import * as React from 'react';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Extension } from '@tiptap/core';

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

const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',
  addOptions() {
    return {
      types: [],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            parseHTML: element => element.style.fontSize,
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {
                  ...attributes,
                };
              }
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ commands }: any) => {
        return this.options.types.every(type => commands.updateAttributes(type, { fontSize: fontSize }));
      },

      unsetFontSize: () => ({ commands }) => {
        return this.options.types.every(type => commands.resetAttributes(type, 'fontSize'));
      },
    };
  },

  addKeyboardShortcuts() {
    return {};
  },
});

export { FontSize };
