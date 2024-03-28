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
exports.MigrationRun = void 0;
const common_1 = require("@nestjs/common");
const nest_commander_1 = require("nest-commander");
const typeorm_1 = require("typeorm");
const Configuration_1 = require("../Configuration");
const applyDataSourceOptions_1 = require("../utils/applyDataSourceOptions");
let MigrationRun = class MigrationRun extends nest_commander_1.CommandRunner {
    constructor(dataSource, options) {
        var _a;
        super();
        this.dataSource = dataSource;
        this.migrationsDir = (_a = options.migrationsDir) !== null && _a !== void 0 ? _a : Configuration_1.DEFAULT_MIGRATIONS_DIR;
    }
    async run(args, { fake }) {
        await (0, applyDataSourceOptions_1.applyDataSourceOptions)(this.dataSource, {
            subscribers: [],
            synchronize: false,
            migrationsRun: false,
            dropSchema: false,
            logging: ['query', 'error', 'schema'],
            migrations: [`${this.migrationsDir}/*`],
        });
        await this.dataSource.runMigrations({
            transaction: 'all',
            fake,
        });
        await this.dataSource.destroy();
    }
    parseFakeOption(option) {
        return !!option;
    }
};
exports.MigrationRun = MigrationRun;
__decorate([
    (0, nest_commander_1.Option)({
        flags: '-f, --fake',
        description: 'Fakes running the migrations if table schema has already been changed manually or externally (e.g. through another project)',
        defaultValue: false,
        name: 'fake',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MigrationRun.prototype, "parseFakeOption", null);
exports.MigrationRun = MigrationRun = __decorate([
    (0, nest_commander_1.SubCommand)({
        name: 'migration:run',
        description: 'Runs all pending migrations.',
    }),
    __param(1, (0, common_1.Inject)(Configuration_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [typeorm_1.DataSource, Object])
], MigrationRun);
//# sourceMappingURL=MigrationRun.js.map