import React = require("react");
import * as PropTypes from "prop-types";
export const MOBXSTORES = "mobxStores";

export function ensureContext(target: Function) {
  if (!("contextTypes" in target)) {
    target["contextTypes"] = {};
  }
  const contextTypes = target["contextTypes"];
  if (!(MOBXSTORES in contextTypes)) {
    contextTypes[MOBXSTORES] = (props, propName, componentName, location, propFullName, secret) => {
      return PropTypes.object(props, propName, componentName, location, propFullName,
        "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
    };
  }
}

export function injectStore(name: string, required?: boolean) {
  return (target: Object, propertyKey: string) => {
    ensureContext(target.constructor);
    Object.defineProperty(target, propertyKey, {
      get: function (this: React.Component<Readonly<any>, Readonly<any>>) {
        const res = this.props[name] || this.context[MOBXSTORES][name];
        if (required && !res) {
          throw new Error(`Cant find required store "${name}" to inject`);
        }
        return res;
      },
      enumerable: false,
      configurable: false
    });
  };
}
