"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = void 0;
const child_process_1 = require("child_process");
const nest_commander_1 = require("nest-commander");
let Version = class Version extends nest_commander_1.CommandRunner {
    async run() {
        const localNpmList = await this.executeCommand('npm list --depth=0');
        const localMatches = localNpmList.match(/ typeorm@(.*)\n/);
        const localNpmVersion = (localMatches && localMatches[1] ? localMatches[1] : '')
            .replace(/"invalid"/gi, '')
            .trim();
        const globalNpmList = await this.executeCommand('npm list -g --depth=0');
        const globalMatches = globalNpmList.match(/ typeorm@(.*)\n/);
        const globalNpmVersion = (globalMatches && globalMatches[1] ? globalMatches[1] : '')
            .replace(/"invalid"/gi, '')
            .trim();
        if (localNpmVersion) {
            console.log('Local installed version:', localNpmVersion);
        }
        else {
            console.log('No local installed TypeORM was found.');
        }
        if (globalNpmVersion) {
            console.log('Global installed TypeORM version:', globalNpmVersion);
        }
        else {
            console.log('No global installed was found.');
        }
        if (localNpmVersion &&
            globalNpmVersion &&
            localNpmVersion !== globalNpmVersion) {
            console.log('To avoid issues with CLI please make sure your global and local TypeORM versions match, ' +
                'or you are using locally installed TypeORM instead of global one.');
        }
    }
    executeCommand(command) {
        return new Promise((ok, fail) => {
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (stdout)
                    return ok(stdout);
                if (stderr)
                    return ok(stderr);
                if (error)
                    return fail(error);
                ok('');
            });
        });
    }
};
exports.Version = Version;
exports.Version = Version = __decorate([
    (0, nest_commander_1.SubCommand)({
        name: 'version',
        description: 'Prints TypeORM version this project uses.',
    })
], Version);
//# sourceMappingURL=Version.js.map