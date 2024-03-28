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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationCreate = void 0;
const path = require("path");
const common_1 = require("@nestjs/common");
const nest_commander_1 = require("nest-commander");
const Configuration_1 = require("../Configuration");
const makeTimestamp_1 = require("../utils/makeTimestamp");
const writeFile_1 = require("../utils/writeFile");
let MigrationCreate = class MigrationCreate extends nest_commander_1.CommandRunner {
    constructor(options) {
        var _a;
        super();
        this.migrationsDir = (_a = options.migrationsDir) !== null && _a !== void 0 ? _a : Configuration_1.DEFAULT_MIGRATIONS_DIR;
    }
    async run([name], { timestamp: timestampParam }) {
        const timestamp = timestampParam !== null && timestampParam !== void 0 ? timestampParam : (0, makeTimestamp_1.makeTimestamp)();
        const className = `${name}${timestamp}`;
        const fileName = `${timestamp}-${name}.ts`;
        const filePath = path.resolve(process.cwd(), this.migrationsDir, fileName);
        const fileContent = this.getTemplate(className);
        await (0, writeFile_1.writeFile)(filePath, fileContent);
        console.log(`Migration ${filePath} has been created successfully.`);
    }
    parseTimestampOption(option) {
        return option;
    }
    getTemplate(name) {
        return `import { MigrationInterface, QueryRunner } from 'typeorm';

export class ${name} implements MigrationInterface {
  name = '${name}'

  public async up(queryRunner: QueryRunner): Promise<void> {
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
`;
    }
};
exports.MigrationCreate = MigrationCreate;
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-t, --timestamp <timestamp>',
        description: 'Custom timestamp for the migration name',
        name: 'timestamp',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MigrationCreate.prototype, "parseTimestampOption", null);
exports.MigrationCreate = MigrationCreate = __decorate([
    (0, nest_commander_1.SubCommand)({
        name: 'migration:create',
        arguments: '<name>',
        description: 'Creates a new migration file.',
    }),
    __param(0, (0, common_1.Inject)(Configuration_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object])
], MigrationCreate);
//# sourceMappingURL=MigrationCreate.js.map