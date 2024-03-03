
// Helper function to check if the postal code introduced for creating or updating establishments is correct
export const ValidatePostalCode = (postalCode : number) => {
    return (isNaN(postalCode))
        ? false
        : true
}