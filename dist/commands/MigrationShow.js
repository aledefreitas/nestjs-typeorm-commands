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
exports.MigrationShow = void 0;
const common_1 = require("@nestjs/common");
const nest_commander_1 = require("nest-commander");
const typeorm_1 = require("typeorm");
const Configuration_1 = require("../Configuration");
const applyDataSourceOptions_1 = require("../utils/applyDataSourceOptions");
let MigrationShow = class MigrationShow extends nest_commander_1.CommandRunner {
    constructor(dataSource, options) {
        var _a;
        super();
        this.dataSource = dataSource;
        this.migrationsDir = (_a = options.migrationsDir) !== null && _a !== void 0 ? _a : Configuration_1.DEFAULT_MIGRATIONS_DIR;
    }
    async run() {
        await (0, applyDataSourceOptions_1.applyDataSourceOptions)(this.dataSource, {
            subscribers: [],
            synchronize: false,
            migrationsRun: false,
            dropSchema: false,
            logging: ['schema'],
            migrations: [`${this.migrationsDir}/*`],
        });
        await this.dataSource.showMigrations();
        await this.dataSource.destroy();
    }
};
exports.MigrationShow = MigrationShow;
exports.MigrationShow = MigrationShow = __decorate([
    (0, nest_commander_1.SubCommand)({
        name: 'migration:show',
        description: 'Show all migrations and whether they have been run or not',
    }),
    __param(1, (0, common_1.Inject)(Configuration_1.MODULE_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [typeorm_1.DataSource, Object])
], MigrationShow);
//# sourceMappingURL=MigrationShow.js.map