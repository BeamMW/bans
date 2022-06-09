"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.hasMeta = hasMeta;

var _BaseProcessor = _interopRequireDefault(require("@linaria/core/processors/BaseProcessor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasMeta(value) {
  return typeof value === 'object' && value !== null && '__linaria' in value;
}

const isNotNull = x => x !== null;

const singleQuotedStringLiteral = value => ({
  type: 'StringLiteral',
  value,
  extra: {
    rawValue: value,
    raw: `'${value}'`
  }
});

class StyledProcessor extends _BaseProcessor.default {
  constructor(...args) {
    var _this$params$;

    super(...args);
    let component;
    const [type, value, ...rest] = (_this$params$ = this.params[0]) !== null && _this$params$ !== void 0 ? _this$params$ : [];

    if (type === 'call' && rest.length === 0) {
      const [source, path] = value;

      if (path.node.type === 'StringLiteral') {
        component = path.node.value;
      } else if (path.node.type === 'ArrowFunctionExpression' || path.node.type === 'FunctionExpression') {
        // Special case when styled wraps a function
        // It's actually the same as wrapping a built-in tag
        component = 'FunctionalComponent';
      } else {
        component = {
          node: path.node,
          source
        };
        this.dependencies.push({
          ex: path,
          source
        });
      }
    }

    if (type === 'member') {
      if (value.node.type === 'Identifier') {
        component = value.node.name;
      } else if (value.node.type === 'StringLiteral') {
        component = value.node.value;
      }
    }

    if (!component || this.params.length > 1) {
      throw new Error('Invalid usage of `styled` tag');
    }

    this.component = component;
  }

  addInterpolation(node, source) {
    const id = this.getVariableId(source);
    this.interpolations.push({
      id,
      node,
      source,
      unit: ''
    });
    return `var(--${id})`;
  }

  extractRules(valueCache, cssText, loc) {
    var _loc$start;

    const rules = {};
    let selector = `.${this.className}`; // If `styled` wraps another component and not a primitive,
    // get its class name to create a more specific selector
    // it'll ensure that styles are overridden properly

    let value = typeof this.component === 'string' ? null : valueCache.get(this.component.node);

    while (hasMeta(value)) {
      selector += `.${value.__linaria.className}`;
      value = value.__linaria.extends;
    }

    rules[selector] = {
      cssText,
      className: this.className,
      displayName: this.displayName,
      start: (_loc$start = loc === null || loc === void 0 ? void 0 : loc.start) !== null && _loc$start !== void 0 ? _loc$start : null
    };
    return [rules, this.className];
  }

  getRuntimeReplacement(classes, uniqInterpolations) {
    const t = this.astService;
    const props = this.getProps(classes, uniqInterpolations);
    return [t.callExpression(this.tagExpression, [this.getTagComponentProps(props)]), true];
  }

  get asSelector() {
    return `.${this.className}`;
  }

  get tagExpressionArgument() {
    const t = this.astService;

    if (typeof this.component === 'string') {
      if (this.component === 'FunctionalComponent') {
        return t.arrowFunctionExpression([], t.blockStatement([]));
      }

      return singleQuotedStringLiteral(this.component);
    }

    return t.identifier(this.component.source);
  }

  get tagExpression() {
    const t = this.astService;
    return t.callExpression(this.tagExp, [this.tagExpressionArgument]);
  }

  get valueSource() {
    const extendsNode = typeof this.component === 'string' ? null : this.component.source;
    return `{
    displayName: "${this.displayName}",
    __linaria: {
      className: "${this.className}",
      extends: ${extendsNode}
    }
  }`;
  }

  getProps(classes, uniqInterpolations) {
    const propsObj = {
      name: this.displayName,
      class: this.className
    }; // If we found any interpolations, also pass them, so they can be applied

    if (this.interpolations.length) {
      propsObj.vars = {};
      uniqInterpolations.forEach(({
        id,
        unit,
        node
      }) => {
        const items = [node];

        if (unit) {
          items.push(this.astService.stringLiteral(unit));
        }

        propsObj.vars[id] = items;
      });
    }

    return propsObj;
  }

  getTagComponentProps(props) {
    const t = this.astService;
    const propExpressions = Object.entries(props).map(([key, value]) => {
      if (!value) {
        return null;
      }

      const keyNode = t.identifier(key);

      if (typeof value === 'string') {
        return t.objectProperty(keyNode, t.stringLiteral(value));
      }

      if (typeof value === 'boolean') {
        return t.objectProperty(keyNode, t.booleanLiteral(value));
      }

      const vars = Object.entries(value).map(([propName, propValue]) => {
        return t.objectProperty(t.stringLiteral(propName), t.arrayExpression(propValue));
      });
      return t.objectProperty(keyNode, t.objectExpression(vars));
    }).filter(isNotNull);
    return t.objectExpression(propExpressions);
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  getVariableId(value) {
    // make the variable unique to this styled component
    return `${this.slug}-${this.interpolations.length}`;
  }

}

exports.default = StyledProcessor;
//# sourceMappingURL=styled.js.map