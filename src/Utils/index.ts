import { default as Lang } from './lang';
import { Model } from './dva/model';
import { Struct } from './result';
import { default as Dom } from './dom';
import { default as Format } from './format';
import * as Request from '@/Request';

type UtilsType = {
  Lang: typeof Lang,
  Model: typeof Model,
  Struct: typeof Struct,
  Dom: typeof Dom,
  Format: typeof Format,
  Request: typeof Request,
};


let Utils: UtilsType = {
  Lang, Model, Struct, Dom, Format, Request,
};
export default Utils;
