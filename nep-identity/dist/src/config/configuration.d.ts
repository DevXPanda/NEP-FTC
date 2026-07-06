export interface AppConfig {
    port: number;
    jwt: {
        secret: string;
        refreshSecret: string;
        accessTtlSec: number;
        refreshTtlSec: number;
    };
    database: {
        url: string;
    };
    redis: {
        url: string;
    };
    rabbitmq: {
        url: string;
        exchange: string;
    };
}
declare const _default: () => AppConfig;
export default _default;
