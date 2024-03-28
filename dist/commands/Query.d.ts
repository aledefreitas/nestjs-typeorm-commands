import { CommandRunner } from 'nest-commander';
import { DataSource } from 'typeorm';
export declare class Query extends CommandRunner {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    run([query]: string[]): Promise<void>;
}
