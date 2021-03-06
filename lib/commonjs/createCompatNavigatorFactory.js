"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCompatNavigatorFactory;

var React = _interopRequireWildcard(require("react"));

var _native = require("@react-navigation/native");

var _CompatScreen = _interopRequireDefault(require("./CompatScreen"));

var _ScreenPropsContext = _interopRequireDefault(require("./ScreenPropsContext"));

var _createCompatNavigationProp = _interopRequireDefault(require("./createCompatNavigationProp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function createCompatNavigatorFactory(createNavigator) {
  // @ts-expect-error: isCompat may or may not exist
  if (createNavigator.isCompat) {
    throw new Error("The navigator is already in compat mode. You don't need to wrap it in 'createCompatNavigatorFactory'.");
  }

  const createCompatNavigator = (routeConfig, navigationConfig = {}) => {
    const Pair = createNavigator();

    const {
      order,
      defaultNavigationOptions,
      navigationOptions: parentNavigationOptions
    } = navigationConfig,
          restConfig = _objectWithoutProperties(navigationConfig, ["order", "defaultNavigationOptions", "navigationOptions"]);

    const routeNames = order !== undefined ? order : Object.keys(routeConfig);

    function Navigator({
      screenProps
    }) {
      var _React$useContext;

      const parentRouteParams = (_React$useContext = React.useContext(_native.NavigationRouteContext)) === null || _React$useContext === void 0 ? void 0 : _React$useContext.params;
      const screens = React.useMemo(() => routeNames.map(name => {
        let getScreenComponent;
        let initialParams;
        const routeConfigItem = routeConfig[name];

        if ('getScreen' in routeConfigItem) {
          getScreenComponent = routeConfigItem.getScreen;
          initialParams = routeConfigItem.params;
        } else if ('screen' in routeConfigItem) {
          getScreenComponent = () => routeConfigItem.screen;

          initialParams = routeConfigItem.params;
        } else {
          getScreenComponent = () => routeConfigItem;
        }

        const screenOptions = ({
          navigation,
          route
        }) => {
          // @ts-expect-error: navigationOptions may exists on the component, but TS is dumb
          const routeNavigationOptions = routeConfigItem.navigationOptions;
          const screenNavigationOptions = getScreenComponent().navigationOptions;

          if (routeNavigationOptions == null && screenNavigationOptions == null) {
            return undefined;
          }

          const options = typeof routeNavigationOptions === 'function' || typeof screenNavigationOptions === 'function' ? {
            navigation: (0, _createCompatNavigationProp.default)(navigation, route, {}),
            navigationOptions: defaultNavigationOptions || {},
            screenProps
          } : {};
          return _objectSpread(_objectSpread({}, typeof routeNavigationOptions === 'function' ? routeNavigationOptions(options) : routeNavigationOptions), typeof screenNavigationOptions === 'function' ? screenNavigationOptions(options) : screenNavigationOptions);
        };

        return /*#__PURE__*/React.createElement(Pair.Screen, {
          key: name,
          name: name,
          initialParams: _objectSpread(_objectSpread({}, parentRouteParams), initialParams),
          options: screenOptions
        }, () => /*#__PURE__*/React.createElement(_CompatScreen.default, {
          getComponent: getScreenComponent
        }));
      }), [parentRouteParams, screenProps]);
      return /*#__PURE__*/React.createElement(_ScreenPropsContext.default.Provider, {
        value: screenProps
      }, /*#__PURE__*/React.createElement(Pair.Navigator, _extends({}, restConfig, {
        screenOptions: defaultNavigationOptions
      }), screens));
    }

    Navigator.navigationOptions = parentNavigationOptions;
    return Navigator;
  };

  Object.defineProperties(createCompatNavigator, {
    isCompat: {
      get() {
        return true;
      }

    },
    router: {
      get() {
        throw new Error("It's no longer possible to access the router with the 'router' property.");
      },

      set() {
        throw new Error("It's no longer possible to override the router by assigning the 'router' property.");
      }

    }
  });
  return createCompatNavigator;
}
//# sourceMappingURL=createCompatNavigatorFactory.js.map