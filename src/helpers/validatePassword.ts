export const ValidatePassword = (password : string) => {
    const regexpPass : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    return (password.length < 10 || !regexpPass.test(password) || password.includes(' ')) 
        ? false 
        : true
}