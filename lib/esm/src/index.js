"use strict";
/**
 * Step 1) Entry point of plugin. Exports itself for eslint to use
 * @author Amila Welihinda
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const recommended_1 = __importDefault(require("./config/recommended"));
const package_json_1 = __importDefault(require("../package.json"));
//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
// import all rules in lib/rules
const compat_1 = __importDefault(require("./rules/compat"));
const rules = {
    compat: compat_1.default,
};
const plugin = {
    meta: {
        name: package_json_1.default.name,
        version: package_json_1.default.version,
    },
    configs: {},
    rules,
};
const configs = {
    "flat/recommended": {
        plugins: { 'compat-patch': plugin },
        ...recommended_1.default.flat,
    },
    recommended: {
        plugins: ["compat-patch"],
        ...recommended_1.default.legacy,
    },
};
plugin.configs = configs;
module.exports = {
    ...plugin,
    // TODO: Remove this in next major release
    /**
     * @deprecated Use `.configs` instead. This will be removed in the next major release.
     */
    config: configs,
};
