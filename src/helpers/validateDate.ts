export const validateDate = (date : Date) => {
    return (date.toString() === "Invalid Date")
        ? false
        : true
}