"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomOtp = void 0;
const generateRandomOtp = (length) => {
    return Math.floor(Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
};
exports.generateRandomOtp = generateRandomOtp;
//# sourceMappingURL=helper.js.map