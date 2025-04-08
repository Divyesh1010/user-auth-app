"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const bcryptjs_1 = require("bcryptjs");
const helper_1 = require("../helper");
const repositories_1 = require("../repositories");
const email_service_1 = require("./email.service");
let UserService = class UserService {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    async register({ payload, role }) {
        const existingUser = await this.userRepository.findOne({
            where: {
                email: payload === null || payload === void 0 ? void 0 : payload.email,
            },
        });
        if (existingUser) {
            throw new rest_1.HttpErrors.BadRequest('Email already registered');
        }
        // Generate verification code
        const verificationCode = (0, helper_1.generateRandomOtp)(6);
        // Hash password
        const hasedPassword = await (0, bcryptjs_1.hash)(payload === null || payload === void 0 ? void 0 : payload.password, await (0, bcryptjs_1.genSalt)());
        const user = await this.userRepository.create({
            ...payload,
            password: hasedPassword,
            userRole: role,
            isVerified: false,
            verificationCode,
        });
        await this.emailService.sendVerificationCode({
            email: user === null || user === void 0 ? void 0 : user.email,
            code: verificationCode,
        });
        return user;
    }
};
UserService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(1, (0, core_1.service)(email_service_1.EmailService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository,
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map