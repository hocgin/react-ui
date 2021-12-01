export class Model {
  /**
   * umi 函数
   * @param model
   * @param effects Function
   * @returns {string}
   */
  static dispatchType(model: any, effects: any) {
    return `${model.namespace}/${effects.name}`;
  }
}
