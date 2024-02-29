export const ValidateDate = (date : Date) => {
    return (date.toString() === "Invalid Date")
        ? false
        : true
}