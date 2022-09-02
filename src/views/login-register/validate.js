export const validateName = (val) => {
  if (!val) return '用户名是必填项'
  if (val.length > 15) return '用户名不能大于15个字符'
  return true
}
export const validatePass = (val) => {
  if (!val) return '请填写密码'
  return true
}
export const validateConfirmPassword = (val, val2) => {
  if (val !== val2[0]) return '两次输入的密码必须一致'
  return true
}