export function FormatHoursMinutes(date: Date) {
    const hours: string = String(date.getHours());
    const minutes: string = String(date.getMinutes());

    return hours.padStart(2, "0") + ":" + minutes.padStart(2, "0");
}