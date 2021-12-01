import Lang from './lang';
import { Model } from './dva/model';
import { Struct } from './result';

export default class {
  static Struct: typeof Struct = Struct;
  static Lang: typeof Lang = Lang;
  static Model: typeof Model = Model;
}
