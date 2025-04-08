"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'mySql',
    connector: 'mysql',
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let MySqlDataSource = class MySqlDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
MySqlDataSource.dataSourceName = 'mySql';
MySqlDataSource.defaultConfig = config;
MySqlDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.mySql', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MySqlDataSource);
exports.MySqlDataSource = MySqlDataSource;
//# sourceMappingURL=my-sql.datasource.js.map