"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const keys_1 = require("../keys");
let User = class User extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        jsonSchema: {
            maxLength: 500,
            minLength: 2,
            pattern: '(?!^ +$)^.+$',
            errorMessage: {
                pattern: `can't be blank`,
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        jsonSchema: {
            maxLength: 500,
            minLength: 2,
            pattern: '(?!^ +$)^.+$',
            errorMessage: {
                pattern: `can't be blank`,
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        jsonSchema: {
            format: 'email',
            transform: ['trim'],
            maxLength: 254,
            minLength: 5,
            pattern: '(?!^ +$)^.+$',
            errorMessage: {
                pattern: `can't be blank`,
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: null,
        jsonSchema: {
            minLength: 8,
            nullable: true,
        },
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(keys_1.UserRole),
            pattern: '(?!^ +$)^.+$',
            errorMessage: {
                pattern: `can't be blank`,
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "userRole", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        default: null,
        jsonSchema: {
            nullable: true,
        },
    }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "verificationCode", void 0);
User = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            strictObjectIDCoercion: true,
            scope: {
                where: { isDeleted: { neq: true } },
            },
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map