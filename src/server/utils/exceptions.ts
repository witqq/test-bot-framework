let __extends = (this && this.__extends) || function (d, b) {
  for (let p in b) if (b.hasOwnProperty(p)) {
    d[p] = b[p];
  }
  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

export const BaseException = (function (_super) {
  __extends(Exception, _super);
  function Exception(msg) {
    _super.call(this, msg);
  }

  return Exception;
}(Error)) as any as { new(msg: string): Error; };