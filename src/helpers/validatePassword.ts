
// Helper function to check if the password for creating new users is difficult to crack
export const ValidatePassword = (password : string) => {
    const regexpPass : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    return (password.length < 10 || !regexpPass.test(password) || password.includes(' ')) 
        ? false 
        : true
}