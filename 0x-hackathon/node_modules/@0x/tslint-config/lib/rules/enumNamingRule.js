"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var ts = require("typescript");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.FAILURE_STRING = "Enum member names should be PascalCase";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    // Recursively walk the AST starting with root node, `ctx.sourceFile`.
    // Call the function `cb` (defined below) for each child.
    return ts.forEachChild(ctx.sourceFile, cb);
    function cb(node) {
        if (node.kind === ts.SyntaxKind.EnumMember) {
            var keyNode = node.getFirstToken(ctx.sourceFile);
            if (keyNode !== undefined) {
                var keyText = keyNode.getText(ctx.sourceFile);
                if (!isPascalCase(keyText)) {
                    return ctx.addFailureAtNode(node, Rule.FAILURE_STRING, getFix(keyText, node));
                }
            }
        }
        // Continue recursion into the AST by calling function `cb` for every child of the current node.
        return ts.forEachChild(node, cb);
    }
    function getFix(text, node) {
        var fix = toPascalCase(text);
        // check for `member = value`
        if (node.getChildCount(ctx.sourceFile) === 3) {
            var value = node.getLastToken(ctx.sourceFile);
            if (value !== undefined) {
                fix += " = " + value.getText(ctx.sourceFile);
            }
        }
        return new Lint.Replacement(node.getStart(ctx.sourceFile), node.getWidth(ctx.sourceFile), fix);
    }
}
// Modified from: https://github.com/jonschlinkert/pascalcase/
function toPascalCase(str) {
    var result = str.replace(/([a-z0-9\W])([A-Z])/g, '$1 $2');
    if (result.length === 1) {
        return result.toUpperCase();
    }
    result = result.replace(/^[\W_\.]+|[\W_\.]+$/g, '').toLowerCase();
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result.replace(/[\W_\.]+(\w|$)/g, function (_, ch) {
        return ch.toUpperCase();
    });
}
function isPascalCase(s) {
    var regex = /^([A-Z0-9]+[a-z0-9]+)+$/g;
    var key = s.split('=')[0].trim();
    return regex.test(key);
}
//# sourceMappingURL=enumNamingRule.js.map