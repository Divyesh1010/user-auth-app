"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const bcryptjs_1 = require("bcryptjs");
const keys_1 = require("../keys");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const user_service_1 = require("../services/user.service");
// import {inject} from '@loopback/core';
let UserController = class UserController {
    constructor(userRepository, userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }
    async registerUser(payload) {
        var _a;
        const allowedRoles = [keys_1.UserRole.CUSTOMER, keys_1.UserRole.CUSTOMER];
        if (!(payload === null || payload === void 0 ? void 0 : payload.userRole) || !allowedRoles.includes(payload === null || payload === void 0 ? void 0 : payload.userRole)) {
            throw new rest_1.HttpErrors.BadRequest((_a = keys_1.customErrorMsg === null || keys_1.customErrorMsg === void 0 ? void 0 : keys_1.customErrorMsg.UserErrors) === null || _a === void 0 ? void 0 : _a.INVALID_USER_ROLE);
        }
        return this.userService.register({ payload, role: payload.userRole });
    }
    async verifyUser(payload) {
        var _a, _b, _c;
        const user = await this.userRepository.findOne({
            where: {
                email: payload === null || payload === void 0 ? void 0 : payload.email,
            },
        });
        if (!user) {
            throw new rest_1.HttpErrors.BadRequest((_a = keys_1.customErrorMsg === null || keys_1.customErrorMsg === void 0 ? void 0 : keys_1.customErrorMsg.UserErrors) === null || _a === void 0 ? void 0 : _a.USER_NOT_FOUND);
        }
        if (user.isVerified) {
            throw new rest_1.HttpErrors.BadRequest((_b = keys_1.customErrorMsg === null || keys_1.customErrorMsg === void 0 ? void 0 : keys_1.customErrorMsg.UserErrors) === null || _b === void 0 ? void 0 : _b.USER_ALREADY_VERIFIED);
        }
        if ((user === null || user === void 0 ? void 0 : user.verificationCode) !== (payload === null || payload === void 0 ? void 0 : payload.verificationCode)) {
            throw new rest_1.HttpErrors.BadRequest((_c = keys_1.customErrorMsg === null || keys_1.customErrorMsg === void 0 ? void 0 : keys_1.customErrorMsg.UserErrors) === null || _c === void 0 ? void 0 : _c.INVALID_VERIFICATION_CODE);
        }
        await this.userRepository.updateById(user === null || user === void 0 ? void 0 : user.id, {
            isVerified: true,
        });
        return this.userRepository.findById(user === null || user === void 0 ? void 0 : user.id);
    }
    async adminLogin(payload) {
        var _a, _b, _c, _d;
        const user = await this.userRepository.findOne({
            where: {
                email: payload === null || payload === void 0 ? void 0 : payload.email,
            },
        });
        if (!user) {
            throw new rest_1.HttpErrors.BadRequest((_a = keys_1.customErrorMsg === null || keys_1.customErrorMsg === void 0 ? void 0 : keys_1.customErrorMsg.UserErrors) === null || _a === void 0 ? void 0 : _a.USER_NOT_FOUND);
        }
        if (user === null || user === void 0 ? void 0 : user.password) {
            const passwordMatch = await (0, bcryptjs_1.compare)(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
            if (!passwordMatch) {
                throw new rest_1.HttpErrors.BadRequest((_b = keys_1.customErrorMsg === null || keys_1.customErrorMsg === void 0 ? void 0 : keys_1.customErrorMsg.UserErrors) === null || _b === void 0 ? void 0 : _b.INVALID_EMAIL_PASSWORD);
            }
        }
        if ((user === null || user === void 0 ? void 0 : user.userRole) !== keys_1.UserRole.ADMIN) {
            throw new rest_1.HttpErrors.BadRequest((_c = keys_1.customErrorMsg === null || keys_1.customErrorMsg === void 0 ? void 0 : keys_1.customErrorMsg.UserErrors) === null || _c === void 0 ? void 0 : _c.YOU_ARE_NOT_ALLOWED_TO_LOGIN_HERE);
        }
        if (!(user === null || user === void 0 ? void 0 : user.isVerified)) {
            throw new rest_1.HttpErrors.BadRequest((_d = keys_1.customErrorMsg === null || keys_1.customErrorMsg === void 0 ? void 0 : keys_1.customErrorMsg.UserErrors) === null || _d === void 0 ? void 0 : _d.VERIFY_YOUR_EMAIL_FIRST);
        }
        return user;
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/register/user'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: 'Register User Based on User Role',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.User, {
                    exclude: ['id', 'isVerified', 'verificationCode'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
tslib_1.__decorate([
    (0, rest_1.post)('/verify-user'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: 'Verify User based on email and otp',
        content: {
            'application/json': {
                schema: {
                    required: ['email', 'verificationCode'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 254,
                            minLength: 5,
                            pattern: '(?!^ +$)^.+$',
                            errorMessage: {
                                pattern: `can't be blank`,
                            },
                        },
                        verificationCode: {
                            type: 'number',
                            minLength: 6,
                            pattern: '(?!^ +$)^.+$',
                            errorMessage: {
                                pattern: `can't be blank`,
                            },
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "verifyUser", null);
tslib_1.__decorate([
    (0, rest_1.post)('/login/admin'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        description: 'Admin Login API',
        content: {
            'application/json': {
                schema: {
                    required: ['email', 'verificationCode'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 254,
                            minLength: 5,
                            pattern: '(?!^ +$)^.+$',
                            errorMessage: {
                                pattern: `can't be blank`,
                            },
                        },
                        password: {
                            type: 'string',
                            minLength: 8,
                            pattern: '(?!^ +$)^.+$',
                            errorMessage: {
                                pattern: `can't be blank`,
                            },
                        },
                    },
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "adminLogin", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, core_1.service)(user_service_1.UserService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map