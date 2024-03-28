import { DataSource, DataSourceOptions } from 'typeorm';
export declare const applyDataSourceOptions: (dataSource: DataSource, options: Partial<DataSourceOptions>) => Promise<void>;
