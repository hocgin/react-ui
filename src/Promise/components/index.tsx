import Table from './Table';
import FileUpload from './FileUpload';
import TreeSelect from './TreeSelect';
import Select from './Select';
import RadioButton from './RadioButton';
import Radio from './Radio';
import Checkbox from './Checkbox';
import ArchiveSchema from './ArchiveSchema';
import ExhibitSchema from './ExhibitSchema';
import TableSchema from './TableSchema';
import ExhibitSchemaConfig from './ExhibitSchemaConfig';
import ArchiveSchemaConfig from './ArchiveSchemaConfig';
import TableSchemaConfig from './TableSchemaConfig';
import DeleteSchemaConfig from './DeleteSchemaConfig';
import PageLayout from './PageLayout';
import PageContainer from './PageContainer';

export default class Promise {
  static Table: typeof Table;
  static FileUpload: typeof FileUpload;
  static Select: typeof Select;
  static TreeSelect: typeof TreeSelect;
  static RadioButton: typeof RadioButton;
  static Radio: typeof Radio;
  static Checkbox: typeof Checkbox;
  static ArchiveSchema: typeof ArchiveSchema;
  static ExhibitSchema: typeof ExhibitSchema;
  static TableSchema: typeof TableSchema;
  static ExhibitSchemaConfig: typeof ExhibitSchemaConfig;
  static ArchiveSchemaConfig: typeof ArchiveSchemaConfig;
  static TableSchemaConfig: typeof TableSchemaConfig;
  static DeleteSchemaConfig: typeof DeleteSchemaConfig;
  static PageLayout: typeof PageLayout;
  static PageContainer: typeof PageContainer;
}
