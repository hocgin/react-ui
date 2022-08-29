import React from 'react';
import { UseAction } from './type';
import { Tree, Space, Tooltip, Card, Alert } from 'antd';
import classnames from 'classnames';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { ReloadOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { useRequest, useMount } from 'ahooks';
import { TreeNode } from '@/Utils/interface';
import ProProvider from '@ant-design/pro-provider';
import {
  handleSchemeColumns,
  SchemeColumns,
} from '@/Promise/components/Schema/scheme';
import { ConfigContext } from '@/ConfigProvider';
import Utils from '@/Utils';
import Dom from '@/Utils/dom';

const SearchBar: React.FC<{
  config: ConfigType;
}> = ({ config = {} }) => {
  let { columns = [] } = config;
  const values = useContext(ProProvider);
  let value = {
    ...values,
    valueTypeMap: {
      ...SchemeColumns,
    },
  };

  return (
    <Card>
      <ProProvider.Provider value={value}>
        <BetaSchemaForm
          layoutType={'QueryFilter'}
          columns={handleSchemeColumns(columns)}
        />
      </ProProvider.Provider>
    </Card>
  );
};

type ConfigType = {
  useAction: UseAction;
  title?: string | any;
  columns?: any[];
  toolBarRender?: (action: any) => any[];
  tableAlertOptionRender?: ({ selectedRowKeys }: any) => any;
};

const Index: React.FC<{
  config: ConfigType;
  prefixCls?: string;
}> = ({ config = {}, ...props }, ref) => {
  let {
    tableAlertOptionRender,
    title,
    toolBarRender,
    useAction,
    columns = [],
  } = config;
  let [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  let [selectedRows, setSelectedRows] = useState<any[]>([]);
  let [data, setData] = useState<TreeNode[]>([]);
  let [params, setParams] = useState<any>({});

  let service = Utils.Lang.nilService(useAction?.tree, []);
  let tree = useRequest(service, {
    manual: true,
    onSuccess: (data: TreeNode[]) => setData(data),
  });
  useMount(() => {
    tree.runAsync({ ...params });
  });

  const values = useContext(ProProvider);
  let value = {
    ...values,
    valueTypeMap: {
      ...SchemeColumns,
    },
  };

  const option =
    tableAlertOptionRender &&
    tableAlertOptionRender({
      onCleanSelected: () => {
        setSelectedRowKeys([]);
        setSelectedRows([]);
      },
      selectedRowKeys,
      selectedRows,
    });
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls(
    'promise-schema--TreeSchemaConfig',
    props.prefixCls,
  );
  return (
    <Space direction={'vertical'} className={prefixCls}>
      <Card>
        <ProProvider.Provider value={value}>
          <BetaSchemaForm
            layoutType={'QueryFilter'}
            columns={handleSchemeColumns(columns)}
            onFinish={async (values: any) => {
              await setParams({ ...values });
              tree.runAsync({ ...values, ...params });
              return true;
            }}
          />
        </ProProvider.Provider>
      </Card>
      <Card>
        <div className={classnames('toolbar', 'toolbarExt')}>
          <div className={'toolbarTitle'}>{title}</div>
          <Space size={16}>
            <Space>
              {toolBarRender &&
                toolBarRender({ reload: () => tree.runAsync({ ...params }) })}
            </Space>
            <Space size={12}>
              <Tooltip title={'刷新'}>
                <ReloadOutlined onClick={() => tree.runAsync({ ...params })} />
              </Tooltip>
            </Space>
          </Space>
        </div>
        {selectedRowKeys.length > 0 && tableAlertOptionRender && (
          <Alert
            className={'alert'}
            message={
              <div className={'tableAlertOption'}>
                {option ? <div>{option}</div> : null}
              </div>
            }
          />
        )}
        <Tree
          onSelect={(rows, target) => {
            let selectedRowKeys: any[] = [];
            let selectedRows: any[] = [];
            if (target?.selected) {
              // @ts-ignore
              let data = target.node?.dataRef;
              let selectNodeId = data?.id;
              selectedRows = [data];
              selectedRowKeys = [selectNodeId];
            }
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
          }}
        >
          {Dom.renderTreeNodes(data)}
        </Tree>
      </Card>
    </Space>
  );
};

export default Index;
