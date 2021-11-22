import Request from './request';
import Lang from './lang';
import { Ui } from './ui';
import { DateFormat } from './format';
import { Config } from './config';
import { Model } from './model';

const Utils = class {
  static Request: typeof Request = Request;
  static Config: typeof Config = Config;
  static Lang: typeof Lang = Lang;
  static Model: typeof Model = Model;
  static Ui: typeof Ui = Ui;
  static Format: any = {
    DateFormat,
  };
};
export default Utils;
