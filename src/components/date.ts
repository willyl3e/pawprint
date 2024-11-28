export default function formatMongoDate(mongoDate: Date | undefined): string {
    if (!mongoDate) {
        return "Date not available"; // Handle undefined case
    }

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    return mongoDate.toLocaleString('en-US', options);
}