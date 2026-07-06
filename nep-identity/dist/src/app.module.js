"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sdk_1 = require("@nep/sdk");
const configuration_1 = require("./config/configuration");
const env_validation_1 = require("./config/env.validation");
const auth_controller_1 = require("./api/rest/auth.controller");
const jwt_auth_guard_1 = require("./api/guards/jwt-auth.guard");
const register_user_handler_1 = require("./application/handlers/register-user.handler");
const login_user_handler_1 = require("./application/handlers/login-user.handler");
const refresh_token_handler_1 = require("./application/handlers/refresh-token.handler");
const password_hasher_port_1 = require("./application/ports/password-hasher.port");
const token_service_port_1 = require("./application/ports/token.service.port");
const event_publisher_port_1 = require("./application/ports/event-publisher.port");
const user_repository_interface_1 = require("./domain/repositories/user.repository.interface");
const refresh_token_repository_interface_1 = require("./domain/repositories/refresh-token.repository.interface");
const prisma_service_1 = require("./infrastructure/persistence/prisma.service");
const user_repository_1 = require("./infrastructure/persistence/repositories/user.repository");
const refresh_token_repository_1 = require("./infrastructure/persistence/repositories/refresh-token.repository");
const bcrypt_password_hasher_1 = require("./infrastructure/security/bcrypt-password-hasher");
const jwt_token_service_1 = require("./infrastructure/security/jwt-token.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                validate: env_validation_1.validateEnv,
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            register_user_handler_1.RegisterUserHandler,
            login_user_handler_1.LoginUserHandler,
            refresh_token_handler_1.RefreshTokenHandler,
            prisma_service_1.PrismaService,
            { provide: user_repository_interface_1.USER_REPOSITORY, useClass: user_repository_1.PrismaUserRepository },
            { provide: refresh_token_repository_interface_1.REFRESH_TOKEN_REPOSITORY, useClass: refresh_token_repository_1.PrismaRefreshTokenRepository },
            { provide: password_hasher_port_1.PASSWORD_HASHER, useClass: bcrypt_password_hasher_1.BcryptPasswordHasher },
            { provide: token_service_port_1.TOKEN_SERVICE, useClass: jwt_token_service_1.JwtTokenService },
            {
                provide: event_publisher_port_1.EVENT_PUBLISHER,
                inject: [config_1.ConfigService],
                useFactory: (config) => (0, sdk_1.createEventPublisher)({
                    url: config.getOrThrow('rabbitmq.url'),
                    exchange: config.getOrThrow('rabbitmq.exchange'),
                    retry: { maxAttempts: 5, backoffMs: 200, maxBackoffMs: 5000 },
                }),
            },
            jwt_auth_guard_1.JwtAuthGuard,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map