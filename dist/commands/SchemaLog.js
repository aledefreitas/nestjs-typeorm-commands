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
exports.SchemaLog = void 0;
const nest_commander_1 = require("nest-commander");
const typeorm_1 = require("typeorm");
const applyDataSourceOptions_1 = require("../utils/applyDataSourceOptions");
let SchemaLog = class SchemaLog extends nest_commander_1.CommandRunner {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }
    async run() {
        await (0, applyDataSourceOptions_1.applyDataSourceOptions)(this.dataSource, {
            synchronize: false,
            migrationsRun: false,
            dropSchema: false,
            logging: false,
        });
        const sqlInMemory = await this.dataSource.driver
            .createSchemaBuilder()
            .log();
        if (sqlInMemory.upQueries.length === 0) {
            console.log('Your schema is up to date - there are no queries to be executed by schema synchronization.');
            await this.dataSource.destroy();
            return;
        }
        const lengthSeparators = String(sqlInMemory.upQueries.length)
            .split('')
            .map(() => '-')
            .join('');
        console.log('---------------------------------------------------------------' +
            lengthSeparators);
        console.log(`-- Schema synchronization will execute following sql queries (${sqlInMemory.upQueries.length.toString()}):`);
        console.log('---------------------------------------------------------------' +
            lengthSeparators);
        sqlInMemory.upQueries.forEach((upQuery) => {
            let sqlString = upQuery.query;
            sqlString = sqlString.trim();
            sqlString = sqlString.endsWith(';') ? sqlString : sqlString + ';';
            console.log(sqlString);
        });
        await this.dataSource.destroy();
    }
};
exports.SchemaLog = SchemaLog;
exports.SchemaLog = SchemaLog = __decorate([
    (0, nest_commander_1.SubCommand)({
        name: 'schema:log',
        description: 'Shows sql to be executed by schema:sync command.',
    }),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SchemaLog);
//# sourceMappingURL=SchemaLog.js.map