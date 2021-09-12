import Request from './request';
import Lang from './lang';
import { Ui } from './ui';
import { DateFormat } from './format';
import { Config } from './config';
import { Model } from './model';

const Utils = class {
  static Request: typeof Request;
  static Config: typeof Config;
  static Lang: typeof Lang;
  static Model: typeof Model;
  static Ui: typeof Ui;
  static Format: any;
};
Utils.Request = Request;
Utils.Config = Config;
Utils.Lang = Lang;
Utils.Model = Model;
Utils.Ui = Ui;
Utils.Format = {
  DateFormat,
};
export default Utils;
