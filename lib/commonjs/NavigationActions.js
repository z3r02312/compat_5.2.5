"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigate = navigate;
exports.back = back;
exports.setParams = setParams;

var _native = require("@react-navigation/native");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function navigate({
  routeName,
  params,
  key,
  action
}) {
  if (action !== undefined) {
    throw new Error('Sub-actions are not supported for `navigate`. Remove the `action` key from the options.');
  }

  return _native.CommonActions.navigate({
    name: routeName,
    key: key,
    params: params
  });
}

function back(options) {
  return (options === null || options === void 0 ? void 0 : options.key) != null ? state => _objectSpread(_objectSpread({}, _native.CommonActions.goBack()), {}, {
    source: options.key,
    target: state.key
  }) : _native.CommonActions.goBack();
}

function setParams({
  params,
  key
}) {
  return _objectSpread(_objectSpread({}, _native.CommonActions.setParams(params)), key !== undefined ? {
    source: key
  } : null);
}
//# sourceMappingURL=NavigationActions.js.map