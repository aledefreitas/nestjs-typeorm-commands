"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheClear = void 0;
const nest_commander_1 = require("nest-commander");
const typeorm_1 = require("typeorm");
const applyDataSourceOptions_1 = require("../utils/applyDataSourceOptions");
let CacheClear = class CacheClear extends nest_commander_1.CommandRunner {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }
    async run() {
        await (0, applyDataSourceOptions_1.applyDataSourceOptions)(this.dataSource, {
            subscribers: [],
            synchronize: false,
            migrationsRun: false,
            dropSchema: false,
            logging: ['schema'],
        });
        if (!this.dataSource.queryResultCache) {
            throw new Error('Cache is not enabled. To use cache enable it in data source configuration.');
        }
        await this.dataSource.queryResultCache.clear();
        console.log('Cache was successfully cleared');
        await this.dataSource.destroy();
    }
};
exports.CacheClear = CacheClear;
exports.CacheClear = CacheClear = __decorate([
    (0, nest_commander_1.SubCommand)({
        name: 'cache:clear',
        description: 'Clears all data stored in query runner cache.',
    }),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CacheClear);
//# sourceMappingURL=CacheClear.js.map