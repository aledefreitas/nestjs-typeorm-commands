import { CommandRunner } from 'nest-commander';
import { DataSource } from 'typeorm';
export declare class SchemaLog extends CommandRunner {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    run(): Promise<void>;
}
