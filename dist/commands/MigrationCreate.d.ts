import { CommandRunner } from 'nest-commander';
import { NestTypeOrmCommandsModuleOptions } from '../Configuration';
type Options = {
    timestamp?: string;
};
export declare class MigrationCreate extends CommandRunner {
    private readonly migrationsDir;
    constructor(options: NestTypeOrmCommandsModuleOptions);
    run([name]: string[], { timestamp: timestampParam }: Options): Promise<void>;
    parseTimestampOption(option: string): string;
    private getTemplate;
}
export {};
