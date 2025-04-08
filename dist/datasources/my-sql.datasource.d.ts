import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class MySqlDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        url: string | undefined;
        host: string | undefined;
        port: string | undefined;
        user: string | undefined;
        password: string | undefined;
        database: string | undefined;
    };
    constructor(dsConfig?: object);
}
