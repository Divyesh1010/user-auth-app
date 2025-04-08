"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customErrorMsg = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["CUSTOMER"] = "customer";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var customErrorMsg;
(function (customErrorMsg) {
    let UserErrors;
    (function (UserErrors) {
        UserErrors["INVALID_USER_ROLE"] = "Invalid or missing role. Must be \"admin\" or \"customer\".";
        UserErrors["USER_NOT_FOUND"] = "User not found.";
        UserErrors["USER_ALREADY_VERIFIED"] = "User is already verified.";
        UserErrors["INVALID_VERIFICATION_CODE"] = "Invalid verification code.";
        UserErrors["INVALID_EMAIL_PASSWORD"] = "Invalid email or password.";
        UserErrors["YOU_ARE_NOT_ALLOWED_TO_LOGIN_HERE"] = "You are not allowed to login from here.";
        UserErrors["VERIFY_YOUR_EMAIL_FIRST"] = "Please verify your email first.";
    })(UserErrors = customErrorMsg.UserErrors || (customErrorMsg.UserErrors = {}));
})(customErrorMsg = exports.customErrorMsg || (exports.customErrorMsg = {}));
//# sourceMappingURL=keys.js.map