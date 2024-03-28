"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDataSourceOptions = void 0;
const applyDataSourceOptions = async (dataSource, options) => {
    if (dataSource.isInitialized) {
        await dataSource.destroy();
    }
    dataSource.setOptions(options);
    await dataSource.initialize();
};
exports.applyDataSourceOptions = applyDataSourceOptions;
//# sourceMappingURL=applyDataSourceOptions.js.map