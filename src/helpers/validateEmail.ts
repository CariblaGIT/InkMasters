
// Helper function to check if an email introduced to login or register by user has a email structure
export const ValidateEmail = (email : string) => {
    const validEmail : RegExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return (validEmail.test(email))
}