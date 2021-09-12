/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Archive } from '@hocgin/ui';
import styles from './index.less';
import {
  ArchiveColumn,
  DatetimeAttach,
  InputTextarea,
  RadioAttach,
  SelectAttach,
} from '@/Archive/components/interface';
import { Button } from 'antd';

let columns: ArchiveColumn[] = [
  {
    title: '标题',
    key: 'name1',
  },
  {
    title: '标题',
    key: 'name2',
    required: true,
    type: 'input.number',
    rules: [{ required: true, message: '请输入权限名称' }],
  },
  {
    title: '标题',
    key: 'name3',
    type: 'switch',
  },
  {
    title: '标题',
    key: 'datetime4',
    type: 'datetime',
    attach: {
      showTime: true,
    } as DatetimeAttach,
  },
  {
    title: '标题',
    key: 'datetime5',
    type: 'datetime.range',
    attach: {} as DatetimeAttach,
  },
  {
    title: '标题',
    key: 'name6',
    type: 'input.textarea',
    placeholder: 'input.textarea',
    attach: {
      allowClear: true,
    } as InputTextarea,
  },
  {
    title: '标题标题',
    key: 'name7',
    type: 'radio.button',
    placeholder: 'radio',
    tooltip: '提示信息',
    attach: {
      options: [
        {
          key: 'k1',
          value: 'k1v',
        },
        {
          key: 'k11',
          value: 'k12v',
        },
      ],
    } as RadioAttach,
  },
  {
    title: '标题标题x',
    key: 'name8',
    type: 'select',
    placeholder: 'select',
    attach: {
      options: [
        {
          key: 'k1',
          value: 'k1v',
        },
        {
          key: 'k11',
          value: 'k12v',
        },
      ],
    } as SelectAttach,
  },
  {
    title: '标题标题x',
    key: 'name9',
    type: 'select.multiple',
    placeholder: 'select.multiple',
    attach: {
      options: [
        {
          key: 'k1',
          value: 'k1v',
        },
        {
          key: 'k11',
          value: 'k12v',
        },
      ],
    } as SelectAttach,
  },
];
export default () => {
  return (
    <>
      <Archive columns={columns}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Archive>
    </>
  );
};
