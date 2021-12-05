import Table from './Table';
import FileUpload from './FileUpload';
import TreeSelect from './TreeSelect';
import Select from './Select';
import RadioButton from './RadioButton';
import Radio from './Radio';
import Checkbox from './Checkbox';
import PageLayout from './PageLayout';
import PageContainer from './PageContainer';
import ExhibitSchemaConfig from './Schema/ExhibitSchemaConfig';
import ArchiveSchemaConfig from './Schema/ArchiveSchemaConfig';
import TableSchemaConfig from './Schema/TableSchemaConfig';
import DeleteSchemaConfig from './Schema/DeleteSchemaConfig';

export default class Promise {
  static Table: typeof Table;
  static FileUpload: typeof FileUpload;
  static Select: typeof Select;
  static TreeSelect: typeof TreeSelect;
  static RadioButton: typeof RadioButton;
  static Radio: typeof Radio;
  static Checkbox: typeof Checkbox;
  static ExhibitSchemaConfig: typeof ExhibitSchemaConfig;
  static ArchiveSchemaConfig: typeof ArchiveSchemaConfig;
  static TableSchemaConfig: typeof TableSchemaConfig;
  static DeleteSchemaConfig: typeof DeleteSchemaConfig;
  static PageLayout: typeof PageLayout;
  static PageContainer: typeof PageContainer;
}
