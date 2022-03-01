import React, {
  useState, useEffect, forwardRef, useImperativeHandle,
} from 'react';
import { SuggestionKeyDownProps } from '@tiptap/suggestion/dist/packages/suggestion/src/suggestion';
import styles from './MentionList.less';
import classnames from 'classnames';
import { Mention } from '@/Editor/components/Extension/Suggestion/Mention/Suggestion';

export default forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index] as Mention;

    if (item) {
      props?.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: SuggestionKeyDownProps) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className={styles.items}>
      {props.items.length
        ? props.items.map((item: Mention, index: number) => (
          <button
            className={classnames(styles.item, {
              [styles.isSelected]: index === selectedIndex,
            })}
            key={index}
            onClick={() => selectItem(index)}>
            {item}
          </button>
        ))
        : <div className={styles.item}>No result</div>
      }
    </div>
  );
});
