import { differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths, differenceInYears } from "date-fns";

export default function TimeAgo({timestamp}) {
    const now = new Date()
    const date = new Date(timestamp)
    const minutes = differenceInMinutes(now, date)
    let content = ''
    if (minutes < 1) {
        content = 'just now'
    } else if (minutes < 59) {
        content = minutes + ' minutes ago'
    } else if (minutes < 60*24) {
        const hours = differenceInHours(now, date)
        content = hours + ' hours ago'
    } else {
        const days = differenceInDays(now, date)
        const months = differenceInMonths(now, date)
        if (months < 1) {
            content = days + ' days ago'
        } else if (months < 12) {
            content = months + ' months ago'
        } else {
            const years = differenceInYears(now, date)
            content = years + ' years ago'
        }
    }
    return <span>{content}</span>
}