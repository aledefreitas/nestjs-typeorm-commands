"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestTypeOrmCommandsModule = void 0;
const common_1 = require("@nestjs/common");
const commands_1 = require("./commands");
const CacheClear_1 = require("./commands/CacheClear");
const MigrationCreate_1 = require("./commands/MigrationCreate");
const MigrationGenerate_1 = require("./commands/MigrationGenerate");
const MigrationRevert_1 = require("./commands/MigrationRevert");
const MigrationRun_1 = require("./commands/MigrationRun");
const MigrationShow_1 = require("./commands/MigrationShow");
const Query_1 = require("./commands/Query");
const SchemaDrop_1 = require("./commands/SchemaDrop");
const SchemaLog_1 = require("./commands/SchemaLog");
const SchemaSync_1 = require("./commands/SchemaSync");
const Version_1 = require("./commands/Version");
const Configuration_1 = require("./Configuration");
let NestTypeOrmCommandsModule = class NestTypeOrmCommandsModule extends Configuration_1.ConfigurableModuleClass {
};
exports.NestTypeOrmCommandsModule = NestTypeOrmCommandsModule;
exports.NestTypeOrmCommandsModule = NestTypeOrmCommandsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            commands_1.TypeOrmCommand,
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
], NestTypeOrmCommandsModule);
//# sourceMappingURL=NestTypeOrmCommandsModule.js.map