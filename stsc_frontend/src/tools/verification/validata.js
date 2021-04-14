
const _ = require("lodash")
const validator = require('validator');
let errors = {}
// login
export const validatorInput = (data) => {
    if (validator.isEmpty(data.username)) {
        errors.username = "请输入手机号"
    }else if(validator.isMobilePhone(data.username)){
        errors.username = "手机号格式错误"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "请输入密码"
    }
    if (validator.isEmpty(data.verificationCode)){
        errors.verificationCode = "请输入验证码"
    }
    return {
        errors,
        isValid:_.isEmpty(errors)
    }
}
// signup
export const validatorSignUpInput = (data) => {
    validatorInput(data)
    if (validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = "请再次输入密码"
    }else if(validator.equals(data.passwordConfirm,data.password)){
        errors.passwordConfirm = "两次输入密码不一致"
    }
    return {
        errors,
        isValid:_.isEmpty(errors)
    }
}

