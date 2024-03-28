import { CommandRunner } from 'nest-commander';
export declare class TypeOrmCommand extends CommandRunner {
    run([cmd, ...rest]: string[]): Promise<void>;
}
