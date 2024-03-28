"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULE_OPTIONS_TOKEN = exports.ConfigurableModuleClass = exports.DEFAULT_MIGRATIONS_DIR = void 0;
const common_1 = require("@nestjs/common");
exports.DEFAULT_MIGRATIONS_DIR = 'src/migrations';
_a = new common_1.ConfigurableModuleBuilder()
    .setClassMethodName('forRoot')
    .build(), exports.ConfigurableModuleClass = _a.ConfigurableModuleClass, exports.MODULE_OPTIONS_TOKEN = _a.MODULE_OPTIONS_TOKEN;
//# sourceMappingURL=Configuration.js.map