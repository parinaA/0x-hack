"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var tslint_1 = require("tslint");
exports.helper = function (src, rule) {
    var _a;
    var linter = new tslint_1.Linter({ fix: false });
    linter.lint('', src, tslint_1.Configuration.parseConfigFile({
        rules: (_a = {},
            _a[rule] = true,
            _a),
        rulesDirectory: path.join(__dirname, '../rules'),
    }));
    return linter.getResult();
};
exports.getFixedResult = function (src, rule) {
    var result = exports.helper(src, rule);
    var fixes = [].concat.apply(result.failures.map(function (x) { return x.getFix(); }));
    return tslint_1.Replacement.applyFixes(src, fixes);
};
//# sourceMappingURL=lintrunner.js.map