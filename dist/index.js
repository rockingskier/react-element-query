'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _proptypes = require('proptypes');

var _proptypes2 = _interopRequireDefault(_proptypes);

var _lodash = require('lodash.identity');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.sortby');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.first');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.isnumber');

var _lodash8 = _interopRequireDefault(_lodash7);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = void 0;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var isBrowser = typeof window !== 'undefined';

var ElementQuery = (_class = (_temp = _class2 = function (_PureComponent) {
  _inherits(ElementQuery, _PureComponent);

  function ElementQuery(props) {
    _classCallCheck(this, ElementQuery);

    var _this = _possibleConstructorReturn(this, (ElementQuery.__proto__ || Object.getPrototypeOf(ElementQuery)).call(this, props));

    _this.state = { size: props.default, sizes: ElementQuery.sortSizes(_this.props.sizes) };
    return _this;
  }

  _createClass(ElementQuery, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._isMounted = true;

      ElementQuery.register({
        component: this,
        sizes: this.state.sizes,
        node: this.node
      });

      ElementQuery.sizeComponent({
        component: this,
        sizes: this.state.sizes,
        node: this.node
      }

      // wait a few frames then check sizes again
      );(0, _raf2.default)(function () {
        return (0, _raf2.default)(function () {
          if (_this2._isMounted) {
            ElementQuery.sizeComponent({
              component: _this2,
              sizes: _this2.state.sizes,
              node: _this2.node
            });
          }
        });
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState({ sizes: ElementQuery.sortSizes(newProps.sizes) });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
      ElementQuery.unregister(this);
    }
  }, {
    key: 'setSize',
    value: function setSize(size) {
      this.setState({ size: size });
    }
  }, {
    key: 'setNode',
    value: function setNode(node) {
      this.node = node;
    }
  }, {
    key: 'makeChild',
    value: function makeChild(child, className) {
      // just add our new class name onto the chilren, this alleviates the need to
      // create a wrapper div
      var classNames = [];
      var existingClassName = child.props.className;
      if (existingClassName) classNames.push(existingClassName);
      if (className) classNames.push(className);

      return (0, _react.cloneElement)(child, {
        className: classNames.join(' '),
        ref: this.setNode
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var size = isBrowser ? this.state.size : this.props.default;
      var className = size ? this.props.makeClassName(size) : '';
      var children = this.props.children;

      var child = Array.isArray(children) && _react.Children.count(children) === 1 ? children[0] : children;

      // because we're going to just apply the className onto the child, we can
      // only accept one. React doesn't let us return an array of children.
      // returning a wrapper div is undesirable because it creates un-expected DOM
      // like real element queries, this enables the user to do things like wrap
      // an `<li>` in an element query and not break HTML semantics, or use
      // element query and not break expectations around things like flexbox.
      return this.makeChild(_react.Children.only(child), className);
    }
  }], [{
    key: 'listen',


    // use only one global listener … for perf!
    value: function listen() {
      window.addEventListener('resize', ElementQuery.onResize);
      ElementQuery._isListening = true;
    }
  }, {
    key: 'unListen',
    value: function unListen() {
      window.removeEventListener('resize', ElementQuery.onResize);
      ElementQuery._isListening = false;
    }
  }, {
    key: 'register',
    value: function register(_ref) {
      var component = _ref.component,
          sizes = _ref.sizes,
          onResize = _ref.onResize,
          node = _ref.node;

      if (!isBrowser) return;

      ElementQuery._componentMap.set(component, {
        sizes: sizes,
        node: node
        // if a custom onResize callback is passed, e.g. using this lib just for
        // the resize event listener, use that. Else, assume we're sizing the
        // component
        , onResize: onResize || ElementQuery.sizeComponent
      });

      if (!ElementQuery._isListening && isBrowser) ElementQuery.listen();
    }
  }, {
    key: 'unregister',
    value: function unregister(component) {
      if (!isBrowser) return;

      ElementQuery._componentMap.delete(component);
      if (!ElementQuery._componentMap.size && isBrowser) ElementQuery.unListen();
    }
  }, {
    key: 'sizeComponents',
    value: function sizeComponents() {
      ElementQuery._componentMap.forEach(function (componentOptions, component) {
        componentOptions.onResize({ component: component,
          sizes: componentOptions.sizes,
          node: componentOptions.node
        });
      });
    }
  }, {
    key: 'sizeComponent',
    value: function sizeComponent(_ref2) {
      var component = _ref2.component,
          _ref2$sizes = _ref2.sizes,
          sizes = _ref2$sizes === void 0 ? [] : _ref2$sizes,
          node = _ref2.node;

      if (!node) return;

      var width = node.clientWidth;
      var smallestSize = (0, _lodash6.default)(sizes);

      var matchedSize = '';
      var matchedWidth = smallestSize.width;

      // use Array#some() here because #forEach() has no early exit
      sizes.some(function (test) {
        // check for:
        // 1. the el width is greater or equal to the test width
        // 2. the el width is greater or equal to the min test width
        if (width >= test.width && width >= matchedWidth) {
          matchedSize = test.name;
          matchedWidth = test.width;
          return false;
        }
        // once that condition isn't true, we've found the correct match; bail
        return true;
      });
      component.setSize(matchedSize);
    }

    // becuase we're going to itterate through by size, we need to ensure that the
    // sizes are sorted

  }, {
    key: 'sortSizes',
    value: function sortSizes(sizes) {
      return (0, _lodash4.default)(sizes, 'width');
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      if (ElementQuery._frame) _raf2.default.cancel(ElementQuery._frame);
      ElementQuery._frame = (0, _raf2.default)(ElementQuery.sizeComponents);
    }
  }]);

  return ElementQuery;
}(_react.PureComponent), _class2.propTypes = {
  children: _proptypes2.default.node.isRequired,
  default: _proptypes2.default.string,
  sizes: _proptypes2.default.arrayOf(_proptypes2.default.shape({
    name: _proptypes2.default.string.isRequired,
    width: function width(props, propName, componentName) {
      var size = props[propName];
      if (!(0, _lodash8.default)(size)) {
        return new Error(componentName + ' received a width of `' + size + '` for `' + props.name + '`. A number was expected.');
      }

      if (size === 0) {
        return new Error(componentName + ' received a width of `' + size + '` for `' + props.name + '`. Widths are min-widths, and should be treated as "mobile-first". The default state can be set with the `default` prop, or even better with the "default" styles in CSS.');
      }
      return null;
    }
  })).isRequired,
  makeClassName: _proptypes2.default.func
}, _class2.defaultProps = {
  // if no default is defined, assume no className. This is the default browser
  // behavior
  default: '',
  sizes: [],
  makeClassName: _lodash2.default,
  children: _react2.default.createElement('span', null)
}, _class2._isListening = false, _class2._componentMap = new Map(), _temp), (_applyDecoratedDescriptor(_class.prototype, 'setSize', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'setSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setNode', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'setNode'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'makeChild', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'makeChild'), _class.prototype)), _class);
exports.default = ElementQuery;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOlsiaXNCcm93c2VyIiwid2luZG93IiwiRWxlbWVudFF1ZXJ5IiwicHJvcHMiLCJzdGF0ZSIsInNpemUiLCJkZWZhdWx0Iiwic2l6ZXMiLCJzb3J0U2l6ZXMiLCJfaXNNb3VudGVkIiwicmVnaXN0ZXIiLCJjb21wb25lbnQiLCJub2RlIiwic2l6ZUNvbXBvbmVudCIsIm5ld1Byb3BzIiwic2V0U3RhdGUiLCJ1bnJlZ2lzdGVyIiwiY2hpbGQiLCJjbGFzc05hbWUiLCJjbGFzc05hbWVzIiwiZXhpc3RpbmdDbGFzc05hbWUiLCJwdXNoIiwiam9pbiIsInJlZiIsInNldE5vZGUiLCJtYWtlQ2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJBcnJheSIsImlzQXJyYXkiLCJjb3VudCIsIm1ha2VDaGlsZCIsIm9ubHkiLCJhZGRFdmVudExpc3RlbmVyIiwib25SZXNpemUiLCJfaXNMaXN0ZW5pbmciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX2NvbXBvbmVudE1hcCIsInNldCIsImxpc3RlbiIsImRlbGV0ZSIsInVuTGlzdGVuIiwiZm9yRWFjaCIsImNvbXBvbmVudE9wdGlvbnMiLCJ3aWR0aCIsImNsaWVudFdpZHRoIiwic21hbGxlc3RTaXplIiwibWF0Y2hlZFNpemUiLCJtYXRjaGVkV2lkdGgiLCJzb21lIiwidGVzdCIsIm5hbWUiLCJzZXRTaXplIiwiX2ZyYW1lIiwiY2FuY2VsIiwic2l6ZUNvbXBvbmVudHMiLCJwcm9wVHlwZXMiLCJpc1JlcXVpcmVkIiwic3RyaW5nIiwiYXJyYXlPZiIsInNoYXBlIiwicHJvcE5hbWUiLCJjb21wb25lbnROYW1lIiwiRXJyb3IiLCJmdW5jIiwiZGVmYXVsdFByb3BzIiwiTWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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T0FBT0YsTUFBTXlELFFBQU4sQ0FBYjtBQUNBLFVBQUksQ0FBQyxzQkFBU3ZELElBQVQsQ0FBTCxFQUFxQjtBQUNuQixlQUFPLElBQUl5RCxLQUFKLENBQWFELGFBQWIsOEJBQW9EeEQsSUFBcEQsZUFBb0VGLE1BQU0rQyxJQUExRSwrQkFBUDtBQUNEOztBQUVELFVBQUk3QyxTQUFTLENBQWIsRUFBZ0I7QUFDZCxlQUFPLElBQUl5RCxLQUFKLENBQWFELGFBQWIsOEJBQW9EeEQsSUFBcEQsZUFBb0VGLE1BQU0rQyxJQUExRSwrS0FBUDtBQUNEO0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7QUFad0MsR0FBaEIsQ0FBbEIsRUFhTE0sVUFoQmE7QUFpQmYvQixpQkFBZSxvQkFBVXNDO0FBakJWLEMsVUFvQlpDLFksR0FBZTtBQUNwQjtBQUNBO0FBQ0ExRCxXQUFTLEVBSFc7QUFJbEJDLFNBQU8sRUFKVztBQUtsQmtCLGlDQUxrQjtBQU1sQkMsWUFBVTtBQU5RLEMsVUFrRGZRLFksR0FBZSxLLFVBRWZFLGEsR0FBZ0IsSUFBSTZCLEdBQUosRTtrQkF6RUovRCxZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHVyZUNvbXBvbmVudCwgQ2hpbGRyZW4sIGNsb25lRWxlbWVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3B0eXBlcydcbmltcG9ydCBpZGVudGl0eSBmcm9tICdsb2Rhc2guaWRlbnRpdHknXG5pbXBvcnQgc29ydEJ5IGZyb20gJ2xvZGFzaC5zb3J0YnknXG5pbXBvcnQgZmlyc3QgZnJvbSAnbG9kYXNoLmZpcnN0J1xuaW1wb3J0IGlzTnVtYmVyIGZyb20gJ2xvZGFzaC5pc251bWJlcidcbmltcG9ydCByYWYgZnJvbSAncmFmJ1xuaW1wb3J0IGF1dG9iaW5kIGZyb20gJ2F1dG9iaW5kLWRlY29yYXRvcidcblxuY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudFF1ZXJ5IGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWRcbiAgICAsIGRlZmF1bHQ6IFByb3BUeXBlcy5zdHJpbmdcbiAgICAsIHNpemVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG4gICAgICAsIHdpZHRoOiAocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHNpemUgPSBwcm9wc1twcm9wTmFtZV1cbiAgICAgICAgaWYgKCFpc051bWJlcihzaXplKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYCR7Y29tcG9uZW50TmFtZX0gcmVjZWl2ZWQgYSB3aWR0aCBvZiBcXGAke3NpemV9XFxgIGZvciBcXGAke3Byb3BzLm5hbWV9XFxgLiBBIG51bWJlciB3YXMgZXhwZWN0ZWQuYClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaXplID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgJHtjb21wb25lbnROYW1lfSByZWNlaXZlZCBhIHdpZHRoIG9mIFxcYCR7c2l6ZX1cXGAgZm9yIFxcYCR7cHJvcHMubmFtZX1cXGAuIFdpZHRocyBhcmUgbWluLXdpZHRocywgYW5kIHNob3VsZCBiZSB0cmVhdGVkIGFzIFwibW9iaWxlLWZpcnN0XCIuIFRoZSBkZWZhdWx0IHN0YXRlIGNhbiBiZSBzZXQgd2l0aCB0aGUgXFxgZGVmYXVsdFxcYCBwcm9wLCBvciBldmVuIGJldHRlciB3aXRoIHRoZSBcImRlZmF1bHRcIiBzdHlsZXMgaW4gQ1NTLmApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICB9KSkuaXNSZXF1aXJlZFxuICAgICwgbWFrZUNsYXNzTmFtZTogUHJvcFR5cGVzLmZ1bmNcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgLy8gaWYgbm8gZGVmYXVsdCBpcyBkZWZpbmVkLCBhc3N1bWUgbm8gY2xhc3NOYW1lLiBUaGlzIGlzIHRoZSBkZWZhdWx0IGJyb3dzZXJcbiAgICAvLyBiZWhhdmlvclxuICAgIGRlZmF1bHQ6ICcnXG4gICAgLCBzaXplczogW11cbiAgICAsIG1ha2VDbGFzc05hbWU6IGlkZW50aXR5XG4gICAgLCBjaGlsZHJlbjogPHNwYW4gLz5cbiAgfVxuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7c2l6ZTogcHJvcHMuZGVmYXVsdCwgc2l6ZXM6IEVsZW1lbnRRdWVyeS5zb3J0U2l6ZXModGhpcy5wcm9wcy5zaXplcyl9XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5faXNNb3VudGVkID0gdHJ1ZVxuXG4gICAgRWxlbWVudFF1ZXJ5LnJlZ2lzdGVyKHtcbiAgICAgIGNvbXBvbmVudDogdGhpc1xuICAgICAgLCBzaXplczogdGhpcy5zdGF0ZS5zaXplc1xuICAgICAgLCBub2RlOiB0aGlzLm5vZGVcbiAgICB9KVxuXG4gICAgRWxlbWVudFF1ZXJ5LnNpemVDb21wb25lbnQoe1xuICAgICAgY29tcG9uZW50OiB0aGlzXG4gICAgICAsIHNpemVzOiB0aGlzLnN0YXRlLnNpemVzXG4gICAgICAsIG5vZGU6IHRoaXMubm9kZVxuICAgIH0pXG5cbiAgICAvLyB3YWl0IGEgZmV3IGZyYW1lcyB0aGVuIGNoZWNrIHNpemVzIGFnYWluXG4gICAgcmFmKCgpID0+IHJhZigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5faXNNb3VudGVkKSB7XG4gICAgICAgIEVsZW1lbnRRdWVyeS5zaXplQ29tcG9uZW50KHtcbiAgICAgICAgICBjb21wb25lbnQ6IHRoaXNcbiAgICAgICAgICAsIHNpemVzOiB0aGlzLnN0YXRlLnNpemVzXG4gICAgICAgICAgLCBub2RlOiB0aGlzLm5vZGVcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5ld1Byb3BzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2l6ZXM6IEVsZW1lbnRRdWVyeS5zb3J0U2l6ZXMobmV3UHJvcHMuc2l6ZXMpfSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLl9pc01vdW50ZWQgPSBmYWxzZVxuICAgIEVsZW1lbnRRdWVyeS51bnJlZ2lzdGVyKHRoaXMpXG4gIH1cblxuICBzdGF0aWMgX2lzTGlzdGVuaW5nID0gZmFsc2VcblxuICBzdGF0aWMgX2NvbXBvbmVudE1hcCA9IG5ldyBNYXAoKVxuXG4gIC8vIHVzZSBvbmx5IG9uZSBnbG9iYWwgbGlzdGVuZXIg4oCmIGZvciBwZXJmIVxuICBzdGF0aWMgbGlzdGVuICgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgRWxlbWVudFF1ZXJ5Lm9uUmVzaXplKVxuICAgIEVsZW1lbnRRdWVyeS5faXNMaXN0ZW5pbmcgPSB0cnVlXG4gIH1cblxuICBzdGF0aWMgdW5MaXN0ZW4gKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBFbGVtZW50UXVlcnkub25SZXNpemUpXG4gICAgRWxlbWVudFF1ZXJ5Ll9pc0xpc3RlbmluZyA9IGZhbHNlXG4gIH1cblxuICBzdGF0aWMgcmVnaXN0ZXIgKHtjb21wb25lbnQsIHNpemVzLCBvblJlc2l6ZSwgbm9kZX0pIHtcbiAgICBpZiAoIWlzQnJvd3NlcikgcmV0dXJuXG5cbiAgICBFbGVtZW50UXVlcnkuX2NvbXBvbmVudE1hcC5zZXQoY29tcG9uZW50LCB7XG4gICAgICBzaXplc1xuICAgICAgLCBub2RlXG4gICAgICAvLyBpZiBhIGN1c3RvbSBvblJlc2l6ZSBjYWxsYmFjayBpcyBwYXNzZWQsIGUuZy4gdXNpbmcgdGhpcyBsaWIganVzdCBmb3JcbiAgICAgIC8vIHRoZSByZXNpemUgZXZlbnQgbGlzdGVuZXIsIHVzZSB0aGF0LiBFbHNlLCBhc3N1bWUgd2UncmUgc2l6aW5nIHRoZVxuICAgICAgLy8gY29tcG9uZW50XG4gICAgICAsIG9uUmVzaXplOiBvblJlc2l6ZSB8fCBFbGVtZW50UXVlcnkuc2l6ZUNvbXBvbmVudFxuICAgIH0pXG5cbiAgICBpZiAoIUVsZW1lbnRRdWVyeS5faXNMaXN0ZW5pbmcgJiYgaXNCcm93c2VyKSBFbGVtZW50UXVlcnkubGlzdGVuKClcbiAgfVxuXG4gIHN0YXRpYyB1bnJlZ2lzdGVyIChjb21wb25lbnQpIHtcbiAgICBpZiAoIWlzQnJvd3NlcikgcmV0dXJuXG5cbiAgICBFbGVtZW50UXVlcnkuX2NvbXBvbmVudE1hcC5kZWxldGUoY29tcG9uZW50KVxuICAgIGlmICghRWxlbWVudFF1ZXJ5Ll9jb21wb25lbnRNYXAuc2l6ZSAmJiBpc0Jyb3dzZXIpIEVsZW1lbnRRdWVyeS51bkxpc3RlbigpXG4gIH1cblxuICBzdGF0aWMgc2l6ZUNvbXBvbmVudHMgKCkge1xuICAgIEVsZW1lbnRRdWVyeS5fY29tcG9uZW50TWFwLmZvckVhY2goKGNvbXBvbmVudE9wdGlvbnMsIGNvbXBvbmVudCkgPT4ge1xuICAgICAgY29tcG9uZW50T3B0aW9ucy5vblJlc2l6ZSh7Y29tcG9uZW50XG4gICAgICAgICwgc2l6ZXM6IGNvbXBvbmVudE9wdGlvbnMuc2l6ZXNcbiAgICAgICAgLCBub2RlOiBjb21wb25lbnRPcHRpb25zLm5vZGVcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBzaXplQ29tcG9uZW50ICh7Y29tcG9uZW50LCBzaXplcyA9IFtdLCBub2RlfSkge1xuICAgIGlmICghbm9kZSkgcmV0dXJuXG5cbiAgICBjb25zdCB3aWR0aCA9IG5vZGUuY2xpZW50V2lkdGhcbiAgICBjb25zdCBzbWFsbGVzdFNpemUgPSBmaXJzdChzaXplcylcblxuICAgIGxldCBtYXRjaGVkU2l6ZSA9ICcnXG4gICAgbGV0IG1hdGNoZWRXaWR0aCA9IHNtYWxsZXN0U2l6ZS53aWR0aFxuXG4gICAgLy8gdXNlIEFycmF5I3NvbWUoKSBoZXJlIGJlY2F1c2UgI2ZvckVhY2goKSBoYXMgbm8gZWFybHkgZXhpdFxuICAgIHNpemVzLnNvbWUoKHRlc3QpID0+IHtcbiAgICAgIC8vIGNoZWNrIGZvcjpcbiAgICAgIC8vIDEuIHRoZSBlbCB3aWR0aCBpcyBncmVhdGVyIG9yIGVxdWFsIHRvIHRoZSB0ZXN0IHdpZHRoXG4gICAgICAvLyAyLiB0aGUgZWwgd2lkdGggaXMgZ3JlYXRlciBvciBlcXVhbCB0byB0aGUgbWluIHRlc3Qgd2lkdGhcbiAgICAgIGlmICh3aWR0aCA+PSB0ZXN0LndpZHRoICYmIHdpZHRoID49IG1hdGNoZWRXaWR0aCkge1xuICAgICAgICBtYXRjaGVkU2l6ZSA9IHRlc3QubmFtZVxuICAgICAgICBtYXRjaGVkV2lkdGggPSB0ZXN0LndpZHRoXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgLy8gb25jZSB0aGF0IGNvbmRpdGlvbiBpc24ndCB0cnVlLCB3ZSd2ZSBmb3VuZCB0aGUgY29ycmVjdCBtYXRjaDsgYmFpbFxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9KVxuICAgIGNvbXBvbmVudC5zZXRTaXplKG1hdGNoZWRTaXplKVxuICB9XG5cbiAgLy8gYmVjdWFzZSB3ZSdyZSBnb2luZyB0byBpdHRlcmF0ZSB0aHJvdWdoIGJ5IHNpemUsIHdlIG5lZWQgdG8gZW5zdXJlIHRoYXQgdGhlXG4gIC8vIHNpemVzIGFyZSBzb3J0ZWRcbiAgc3RhdGljIHNvcnRTaXplcyAoc2l6ZXMpIHtcbiAgICByZXR1cm4gc29ydEJ5KHNpemVzLCAnd2lkdGgnKVxuICB9XG5cbiAgQGF1dG9iaW5kXG4gIHNldFNpemUgKHNpemUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzaXplfSlcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBzZXROb2RlIChub2RlKSB7XG4gICAgdGhpcy5ub2RlID0gbm9kZVxuICB9XG5cbiAgQGF1dG9iaW5kXG4gIG1ha2VDaGlsZCAoY2hpbGQsIGNsYXNzTmFtZSkge1xuICAgIC8vIGp1c3QgYWRkIG91ciBuZXcgY2xhc3MgbmFtZSBvbnRvIHRoZSBjaGlscmVuLCB0aGlzIGFsbGV2aWF0ZXMgdGhlIG5lZWQgdG9cbiAgICAvLyBjcmVhdGUgYSB3cmFwcGVyIGRpdlxuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBbXVxuICAgIGNvbnN0IGV4aXN0aW5nQ2xhc3NOYW1lID0gY2hpbGQucHJvcHMuY2xhc3NOYW1lXG4gICAgaWYgKGV4aXN0aW5nQ2xhc3NOYW1lKSBjbGFzc05hbWVzLnB1c2goZXhpc3RpbmdDbGFzc05hbWUpXG4gICAgaWYgKGNsYXNzTmFtZSkgY2xhc3NOYW1lcy5wdXNoKGNsYXNzTmFtZSlcblxuICAgIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lcy5qb2luKCcgJylcbiAgICAgICwgcmVmOiB0aGlzLnNldE5vZGVcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIG9uUmVzaXplICgpIHtcbiAgICBpZiAoRWxlbWVudFF1ZXJ5Ll9mcmFtZSkgcmFmLmNhbmNlbChFbGVtZW50UXVlcnkuX2ZyYW1lKVxuICAgIEVsZW1lbnRRdWVyeS5fZnJhbWUgPSByYWYoRWxlbWVudFF1ZXJ5LnNpemVDb21wb25lbnRzKVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBzaXplID0gaXNCcm93c2VyXG4gICAgICA/IHRoaXMuc3RhdGUuc2l6ZVxuICAgICAgOiB0aGlzLnByb3BzLmRlZmF1bHRcbiAgICBjb25zdCBjbGFzc05hbWUgPSBzaXplID8gdGhpcy5wcm9wcy5tYWtlQ2xhc3NOYW1lKHNpemUpIDogJydcbiAgICBjb25zdCB7Y2hpbGRyZW59ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IGNoaWxkID0gQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID09PSAxXG4gICAgICA/IGNoaWxkcmVuWzBdXG4gICAgICA6IGNoaWxkcmVuXG5cbiAgICAvLyBiZWNhdXNlIHdlJ3JlIGdvaW5nIHRvIGp1c3QgYXBwbHkgdGhlIGNsYXNzTmFtZSBvbnRvIHRoZSBjaGlsZCwgd2UgY2FuXG4gICAgLy8gb25seSBhY2NlcHQgb25lLiBSZWFjdCBkb2Vzbid0IGxldCB1cyByZXR1cm4gYW4gYXJyYXkgb2YgY2hpbGRyZW4uXG4gICAgLy8gcmV0dXJuaW5nIGEgd3JhcHBlciBkaXYgaXMgdW5kZXNpcmFibGUgYmVjYXVzZSBpdCBjcmVhdGVzIHVuLWV4cGVjdGVkIERPTVxuICAgIC8vIGxpa2UgcmVhbCBlbGVtZW50IHF1ZXJpZXMsIHRoaXMgZW5hYmxlcyB0aGUgdXNlciB0byBkbyB0aGluZ3MgbGlrZSB3cmFwXG4gICAgLy8gYW4gYDxsaT5gIGluIGFuIGVsZW1lbnQgcXVlcnkgYW5kIG5vdCBicmVhayBIVE1MIHNlbWFudGljcywgb3IgdXNlXG4gICAgLy8gZWxlbWVudCBxdWVyeSBhbmQgbm90IGJyZWFrIGV4cGVjdGF0aW9ucyBhcm91bmQgdGhpbmdzIGxpa2UgZmxleGJveC5cbiAgICByZXR1cm4gdGhpcy5tYWtlQ2hpbGQoQ2hpbGRyZW4ub25seShjaGlsZCksIGNsYXNzTmFtZSlcbiAgfVxufVxuIl19