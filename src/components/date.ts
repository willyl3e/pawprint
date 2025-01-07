
export default function returnDateDetails(dateString:string) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const weekdays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ]

    const jsDate = new Date(dateString)
    const weekday = jsDate.getDay()
    const month = jsDate.getMonth()
    const numberday = jsDate.getDate().toString()
    const year = jsDate.getFullYear().toString()
    let hour  = jsDate.getHours()
    const minute  = jsDate.getMinutes()

    if (hour > 13) {
        hour = hour-12
    }

    const monthString = months[month]
    const dayString = weekdays[weekday]

    return {
        monthString,dayString,numberday,year
    }

}