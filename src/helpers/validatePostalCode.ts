export const ValidatePostalCode = (postalCode : string) => {
    return (isNaN(parseInt(postalCode)))
        ? false
        : true
}