
// Helper function to check if the postal code introduced for creating or updating establishments is correct
export const ValidatePostalCode = (postalCode : string) => {
    return (isNaN(parseInt(postalCode)))
        ? false
        : true
}