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
exports.MigrationGenerate = void 0;
const path = require("path");
const common_1 = require("@nestjs/common");
const sqlFormatter_1 = require("@sqltools/formatter/lib/sqlFormatter");
const nest_commander_1 = require("nest-commander");
const typeorm_1 = require("typeorm");
const Configuration_1 = require("../Configuration");
const applyDataSourceOptions_1 = require("../utils/applyDataSourceOptions");
const makeTimestamp_1 = require("../utils/makeTimestamp");
const writeFile_1 = require("../utils/writeFile");
let MigrationGenerate = class MigrationGenerate extends nest_commander_1.CommandRunner {
    constructor(dataSource, options) {
        var _a;
        super();
        this.dataSource = dataSource;
        this.migrationsDir = (_a = options.migrationsDir) !== null && _a !== void 0 ? _a : Configuration_1.DEFAULT_MIGRATIONS_DIR;
    }
    async run([name], { pretty, dryrun, check, timestamp: timestampParam }) {
        const timestamp = timestampParam !== null && timestampParam !== void 0 ? timestampParam : (0, makeTimestamp_1.makeTimestamp)();
        const className = `${name}${timestamp}`;
        const fileName = `${timestamp}-${name}.ts`;
        const filePath = path.resolve(process.cwd(), this.migrationsDir, fileName);
        await (0, applyDataSourceOptions_1.applyDataSourceOptions)(this.dataSource, {
            subscribers: [],
            synchronize: false,
            migrationsRun: false,
            dropSchema: false,
            logging: ['error', 'schema'],
            migrations: [`${this.migrationsDir}/*`],
        });
        await this.dataSource.runMigrations({
            transaction: 'all',
        });
        const upQueries = [];
        const downQueries = [];
        try {
            const sqlInMemory = await this.dataSource.driver
                .createSchemaBuilder()
                .log();
            if (pretty) {
                sqlInMemory.upQueries.forEach((query) => {
                    query.query = this.prettify(query.query);
                });
                sqlInMemory.downQueries.forEach((query) => {
                    query.query = this.prettify(query.query);
                });
            }
            sqlInMemory.upQueries.forEach((query) => {
                upQueries.push('        await queryRunner.query(`' +
                    query.query.replace(new RegExp('`', 'g'), '\\`') +
                    '`' +
                    this.queryParams(query.parameters) +
                    ');');
            });
            sqlInMemory.downQueries.forEach((query) => {
                downQueries.push('        await queryRunner.query(`' +
                    query.query.replace(new RegExp('`', 'g'), '\\`') +
                    '`' +
                    this.queryParams(query.parameters) +
                    ');');
            });
        }
        finally {
            await this.dataSource.destroy();
        }
        if (!upQueries.length) {
            if (check) {
                console.log('No changes in database schema were found');
                process.exit(0);
            }
            else {
                console.log('No changes in database schema were found - cannot generate a migration. To create a new empty migration use "typeorm migration:create" command');
                process.exit(1);
            }
        }
        const fileContent = this.getTemplate(className, upQueries, downQueries);
        if (check) {
            console.log(`Unexpected changes in database schema were found in check mode:\n\n${fileContent}`);
            process.exit(1);
        }
        if (dryrun) {
            console.log(`Migration ${filePath} has content:\n\n${fileContent}`);
            return;
        }
        await (0, writeFile_1.writeFile)(filePath, fileContent);
        console.log(`Migration ${filePath} has been generated successfully.`);
    }
    parsePrettyOption(option) {
        return !!option;
    }
    parseDryOption(option) {
        return !!option;
    }
    parseCheckOption(option) {
        return !!option;
    }
    parseTimestampOption(option) {
        return option;
    }
    prettify(query) {
        const formattedQuery = (0, sqlFormatter_1.format)(query, { indent: '    ' });
        return '\n' + formattedQuery.replace(/^/gm, '            ') + '\n        ';
    }
    queryParams(parameters) {
        if (!parameters || !parameters.length) {
            return '';
        }
        return `, ${JSON.stringify(parameters)}`;
    }
    getTemplate(name, upSqls, downSqls) {
        return `import { MigrationInterface, QueryRunner } from 'typeorm';

export class ${name} implements MigrationInterface {
  name = '${name}'

  public async up(queryRunner: QueryRunner): Promise<void> {
    ${upSqls.join('\n')}
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    ${downSqls.join('\n')}
  }
}
`;
    }
};
exports.MigrationGenerate = MigrationGenerate;
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-p, --pretty',
        description: 'Pretty-print generated SQL',
        defaultValue: true,
        name: 'pretty',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MigrationGenerate.prototype, "parsePrettyOption", null);
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-dr, --dryrun',
        description: 'Print out the contents of the migration instead of writing it to a file',
        defaultValue: false,
        name: 'dryrun',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MigrationGenerate.prototype, "parseDryOption", null);
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-ch, --check',
        description: 'Verifies that the current database is up to date and that no migrations are needed. Otherwise exits with code 1.',
        defaultValue: false,
        name: 'check',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MigrationGenerate.prototype, "parseCheckOption", null);
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-t, --timestamp <timestamp>',
        description: 'Custom timestamp for the migration name',
        name: 'timestamp',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MigrationGenerate.prototype, "parseTimestampOption", null);
exports.MigrationGenerate = MigrationGenerate = __decorate([
    (0, nest_commander_1.SubCommand)({
        name: 'migration:generate',
        arguments: '<name>',
        description: 'Generates a new migration file with SQL queries that need to be executed to update the schema.',
    }),
    __param(1, (0, common_1.Inject)(Configuration_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [typeorm_1.DataSource, Object])
], MigrationGenerate);
//# sourceMappingURL=MigrationGenerate.js.map