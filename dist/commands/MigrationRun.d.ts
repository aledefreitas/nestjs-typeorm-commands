import { CommandRunner } from 'nest-commander';
import { DataSource } from 'typeorm';
import { NestTypeOrmCommandsModuleOptions } from '../Configuration';
type Options = {
    fake: boolean;
};
export declare class MigrationRun extends CommandRunner {
    private readonly dataSource;
    private readonly migrationsDir;
    constructor(dataSource: DataSource, options: NestTypeOrmCommandsModuleOptions);
    run(args: string[], { fake }: Options): Promise<void>;
    parseFakeOption(option: string): boolean;
}
export {};
