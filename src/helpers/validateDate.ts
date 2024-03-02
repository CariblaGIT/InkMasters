
// Helper function to check if the date introduced to update or create params related with dates are valid or not
export const ValidateDate = (date : Date) => {
    return (date.toString() === "Invalid Date")
        ? false
        : true
}