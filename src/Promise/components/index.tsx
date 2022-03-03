import Table from './Table';
import FileUpload from './FileUpload';
import TreeSelect from './TreeSelect';
import Select from './Select';
import Search from './Search';
import Encoding from './Encoding';
import RadioButton from './RadioButton';
import Radio from './Radio';
import Checkbox from './Checkbox';
import Comment from './Comment';
import ExhibitSchemaConfig from './Schema/ExhibitSchemaConfig';
import ArchiveSchemaConfig from './Schema/ArchiveSchemaConfig';
import TableSchemaConfig from './Schema/TableSchemaConfig';
import DeleteSchemaConfig from './Schema/DeleteSchemaConfig';
import TreeSchemaConfig from './Schema/TreeSchemaConfig';

import PageLayout from './PageLayout';
import PageContainer from './PageContainer';
import { EditorPage } from './Page';
import UserAvatar from './UserAvatar';

export default class Promise {
  static Table: typeof Table = Table;
  static FileUpload: typeof FileUpload = FileUpload;
  static Select: typeof Select = Select;
  static Encoding: typeof Encoding = Encoding;
  static Search: typeof Search = Search;
  static TreeSelect: typeof TreeSelect = TreeSelect;
  static RadioButton: typeof RadioButton = RadioButton;
  static Radio: typeof Radio = Radio;
  static Checkbox: typeof Checkbox = Checkbox;
  static Comment: typeof Comment = Comment;

  static ExhibitSchemaConfig: typeof ExhibitSchemaConfig = ExhibitSchemaConfig;
  static ArchiveSchemaConfig: typeof ArchiveSchemaConfig = ArchiveSchemaConfig;
  static TableSchemaConfig: typeof TableSchemaConfig = TableSchemaConfig;
  static DeleteSchemaConfig: typeof DeleteSchemaConfig = DeleteSchemaConfig;
  static TreeSchemaConfig: typeof TreeSchemaConfig = TreeSchemaConfig;

  static PageLayout: typeof PageLayout = PageLayout;
  static PageContainer: typeof PageContainer = PageContainer;
  static UserAvatar: typeof UserAvatar = UserAvatar;

  static ViewEditorPage: typeof EditorPage = EditorPage;
}
