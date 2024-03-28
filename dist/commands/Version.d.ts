import { CommandRunner } from 'nest-commander';
export declare class Version extends CommandRunner {
    run(): Promise<void>;
    private executeCommand;
}
