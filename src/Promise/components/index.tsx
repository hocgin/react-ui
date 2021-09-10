import Table from './Table';
import FileUpload from './FileUpload';
import TreeSelect from './TreeSelect';
import Select from './Select';
import ArchiveModal from './ArchiveModal';

export default class Promise {
  static Table: typeof Table;
  static FileUpload: typeof FileUpload;
  static Select: typeof Select;
  static TreeSelect: typeof TreeSelect;
  static ArchiveModal: typeof ArchiveModal;
}
