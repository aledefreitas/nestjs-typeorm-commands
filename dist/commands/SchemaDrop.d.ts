import { CommandRunner } from 'nest-commander';
import { DataSource } from 'typeorm';
export declare class SchemaDrop extends CommandRunner {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    run(): Promise<void>;
}
