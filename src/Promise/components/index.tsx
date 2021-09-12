import Table from './Table';
import FileUpload from './FileUpload';
import TreeSelect from './TreeSelect';
import Select from './Select';
import ArchiveModal from './ArchiveModal';
import RadioButton from './RadioButton';
import Radio from './Radio';
import Checkbox from './Checkbox';
import ArchiveSchema from './ArchiveSchema';
import ExhibitSchema from './ExhibitSchema';
import ExhibitSchemaConfig from './ExhibitSchemaConfig';
import ArchiveSchemaConfig from './ArchiveSchemaConfig';

export default class Promise {
  static Table: typeof Table;
  static FileUpload: typeof FileUpload;
  static Select: typeof Select;
  static TreeSelect: typeof TreeSelect;
  static ArchiveModal: typeof ArchiveModal;
  static ArchiveSchema: typeof ArchiveSchema;
  static ArchiveSchemaConfig: typeof ArchiveSchemaConfig;
  static RadioButton: typeof RadioButton;
  static Radio: typeof Radio;
  static Checkbox: typeof Checkbox;
  static ExhibitSchema: typeof ExhibitSchema;
  static ExhibitSchemaConfig: typeof ExhibitSchemaConfig;
}
