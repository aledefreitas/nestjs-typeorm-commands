export type NestTypeOrmCommandsModuleOptions = {
    migrationsDir?: string;
};
export declare const DEFAULT_MIGRATIONS_DIR = "src/migrations";
export declare const ConfigurableModuleClass: import("@nestjs/common").ConfigurableModuleCls<NestTypeOrmCommandsModuleOptions, "forRoot", "create", {}>, MODULE_OPTIONS_TOKEN: string | symbol;
