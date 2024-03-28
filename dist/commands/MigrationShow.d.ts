import { CommandRunner } from 'nest-commander';
import { DataSource } from 'typeorm';
import { NestTypeOrmCommandsModuleOptions } from '../Configuration';
export declare class MigrationShow extends CommandRunner {
    private readonly dataSource;
    private readonly migrationsDir;
    constructor(dataSource: DataSource, options: NestTypeOrmCommandsModuleOptions);
    run(): Promise<void>;
}
