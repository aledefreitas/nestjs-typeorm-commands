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
exports.SchemaDrop = void 0;
const nest_commander_1 = require("nest-commander");
const typeorm_1 = require("typeorm");
const applyDataSourceOptions_1 = require("../utils/applyDataSourceOptions");
let SchemaDrop = class SchemaDrop extends nest_commander_1.CommandRunner {
    constructor(dataSource) {
        super();
        this.dataSource = dataSource;
    }
    async run() {
        await (0, applyDataSourceOptions_1.applyDataSourceOptions)(this.dataSource, {
            synchronize: false,
            migrationsRun: false,
            dropSchema: false,
            logging: ['query', 'schema'],
        });
        await this.dataSource.dropDatabase();
        await this.dataSource.destroy();
        console.log('Database schema has been successfully dropped.');
    }
};
exports.SchemaDrop = SchemaDrop;
exports.SchemaDrop = SchemaDrop = __decorate([
    (0, nest_commander_1.SubCommand)({
        name: 'schema:drop',
        description: 'Drops all tables in the database.',
    }),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], SchemaDrop);
//# sourceMappingURL=SchemaDrop.js.map