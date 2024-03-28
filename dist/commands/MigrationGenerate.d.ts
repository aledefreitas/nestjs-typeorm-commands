import { CommandRunner } from 'nest-commander';
import { DataSource } from 'typeorm';
import { NestTypeOrmCommandsModuleOptions } from '../Configuration';
type Options = {
    pretty: boolean;
    dryrun: boolean;
    check: boolean;
    timestamp?: string;
};
export declare class MigrationGenerate extends CommandRunner {
    private readonly dataSource;
    private readonly migrationsDir;
    constructor(dataSource: DataSource, options: NestTypeOrmCommandsModuleOptions);
    run([name]: string[], { pretty, dryrun, check, timestamp: timestampParam }: Options): Promise<void>;
    parsePrettyOption(option: string): boolean;
    parseDryOption(option: string): boolean;
    parseCheckOption(option: string): boolean;
    parseTimestampOption(option: string): string;
    private prettify;
    private queryParams;
    private getTemplate;
}
export {};
