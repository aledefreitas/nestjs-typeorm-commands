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
exports.Query = void 0;
const nest_commander_1 = require("nest-commander");
const typeorm_1 = require("typeorm");
const applyDataSourceOptions_1 = require("../utils/applyDataSourceOptions");
let Query = class Query extends nest_commander_1.CommandRunner {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }
    async run([query]) {
        await (0, applyDataSourceOptions_1.applyDataSourceOptions)(this.dataSource, {
            synchronize: false,
            migrationsRun: false,
            dropSchema: false,
            logging: ['query'],
        });
        const queryRunner = this.dataSource.createQueryRunner();
        const result = await queryRunner.query(query);
        if (result === undefined) {
            console.log('Query has been executed. No result was returned.');
        }
        else {
            console.log('Query has been executed. Result:');
            console.log(JSON.stringify(result, undefined, 2));
        }
        await queryRunner.release();
        await this.dataSource.destroy();
    }
};
exports.Query = Query;
exports.Query = Query = __decorate([
    (0, nest_commander_1.SubCommand)({
        name: 'query',
        arguments: '<query>',
        description: 'Executes given SQL query',
    }),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], Query);
//# sourceMappingURL=Query.js.map