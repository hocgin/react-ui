import React, { useContext, useState } from 'react';
import { Modal } from 'antd';
import ProProvider from '@ant-design/pro-provider';
import ProDescriptions, {
  ProDescriptionsProps,
} from '@ant-design/pro-descriptions';
import { SchemeColumns, handleSchemeColumns } from '../scheme';

interface ExhibitSchemaProps extends ProDescriptionsProps {
  trigger?: JSX.Element;
}

// @formatter: off
const ArchiveSchema: React.FC<ExhibitSchemaProps> = ({
                                                       columns = [],
                                                       children,
                                                       ...rest
                                                     }) => {
  // @formatter: on
  const values = useContext(ProProvider);
  let value = {
    ...values,
    valueTypeMap: {
      ...SchemeColumns,
    },
  };

  return (
    <ProProvider.Provider value={value}>
      <ProDescriptions columns={handleSchemeColumns(columns)} {...rest}>
        {children}
      </ProDescriptions>
    </ProProvider.Provider>
  );
};

const ArchiveSchemaModal: React.FC<ExhibitSchemaProps> = ({
                                                            trigger,
                                                            request,
                                                            ...rest
                                                          }) => {
  let [visible, setVisible] = useState(false);
  let [initial, setInitial] = useState(false);
  let triggerEl =
    trigger &&
    React.cloneElement(trigger, {
      onClick: () => {
        setVisible(true);
        setInitial(true);
      },
    });

  return (
    <>
      {triggerEl}
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <ArchiveSchema
          params={{ initial }}
          request={async (params: Record<string, any>) =>
            initial ? request?.(params) : Promise.resolve({} as any)
          }
          {...rest}
        />
      </Modal>
    </>
  );
};

const ArchiveSchemaWrapper: React.FC<ExhibitSchemaProps> = ({
                                                              trigger,
                                                              ...rest
                                                            }) => {
  return (
    <>
      {trigger ? (
        <ArchiveSchemaModal trigger={trigger} {...rest} />
      ) : (
        <ArchiveSchema {...rest} />
      )}
    </>
  );
};

export default ArchiveSchemaWrapper;
