"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmCommand = void 0;
const nest_commander_1 = require("nest-commander");
const CacheClear_1 = require("./CacheClear");
const MigrationCreate_1 = require("./MigrationCreate");
const MigrationGenerate_1 = require("./MigrationGenerate");
const MigrationRevert_1 = require("./MigrationRevert");
const MigrationRun_1 = require("./MigrationRun");
const MigrationShow_1 = require("./MigrationShow");
const Query_1 = require("./Query");
const SchemaDrop_1 = require("./SchemaDrop");
const SchemaLog_1 = require("./SchemaLog");
const SchemaSync_1 = require("./SchemaSync");
const Version_1 = require("./Version");
let TypeOrmCommand = class TypeOrmCommand extends nest_commander_1.CommandRunner {
    async run([cmd, ...rest]) {
        throw new Error(`Unrecognized command ${cmd} ${rest.join(' ')}`);
    }
};
exports.TypeOrmCommand = TypeOrmCommand;
exports.TypeOrmCommand = TypeOrmCommand = __decorate([
    (0, nest_commander_1.Command)({
        name: 'typeorm',
        arguments: '<cmd> [name]',
        description: 'Use TypeORM commands.',
        subCommands: [
            CacheClear_1.CacheClear,
            MigrationCreate_1.MigrationCreate,
            MigrationGenerate_1.MigrationGenerate,
            MigrationRevert_1.MigrationRevert,
            MigrationRun_1.MigrationRun,
            MigrationShow_1.MigrationShow,
            Query_1.Query,
            SchemaDrop_1.SchemaDrop,
            SchemaLog_1.SchemaLog,
            SchemaSync_1.SchemaSync,
            Version_1.Version,
        ],
    })
], TypeOrmCommand);
//# sourceMappingURL=index.js.map