import axios from "../../api/request";
const _ = require("lodash")
const validator = require('validator');
let errors = {}
// login
export const validatorInput = (data) => {
    if (validator.isEmpty(data.username)) {
        errors.username = "请输入手机号"
    }else if(!/^1[3-9]\d{9}$/.test(data.username)){
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
export const validatorSignUpInput =async function(data){
    validatorInput(data)
    let username = data.username
    let isExistUsername = await axios.userControllerList.isExist({
        username
    })
    if(isExistUsername.code === 20001) {
        errors.username = "此账号已注册"
    }
    if (validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = "请再次输入密码"
    }else if(!validator.equals(data.passwordConfirm,data.password)){
        errors.passwordConfirm = "两次输入密码不一致"
    }
    return {
        errors,
        isValid:_.isEmpty(errors)
    }
}

