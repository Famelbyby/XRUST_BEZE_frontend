import { MINUTE_IN_MILLISECONDS, HOUR_IN_MILLISECONDS, DAY_IN_MILLISECONDS, RUSSIAN_MONTHS } from "../Consts/ValidatorsConts";

/**
 * Returns ending of Russian words related to minutes
 * @param minutes - Minutes
 * @returns Ending of Russian words
 */
function MinutesEndingInRussian(minutes: number): string {
    switch (true) {
        case (minutes % 10 === 1):
            return "у";
        case (minutes % 10 < 5) && ((minutes < 11) || (minutes > 14)):
            return 'ы';
        default:
            return '';
    }
}

/**
 * Returns ending of Russian words related to hours
 * @param hours Hours
 * @returns Ending of Russian words
 */
function HoursEndingInRussian(hours: number): string {
    switch (true) {
        case (hours % 10 === 1):
            return "";
        case (hours % 10 < 5) && ((hours < 11) || (hours > 14)):
            return 'а';
        default:
            return 'ов';
    }
}

/**
 * Returns ending of Russian words related to days
 * @param days - Days
 * @returns Ending of Russian words
 */
function DaysEndingInRussian(days: number): string {
    switch (true) {
        case (days % 10 === 1) && (days % 100 !== 11):
            return "день";
        case (days % 10 < 5) && ((days % 100 < 11) || (days % 100 > 14)):
            return 'дня';
        default:
            return 'дней';
    }
}

/**
 * Formats date in `hours:minutes`
 * @param date - Given date
 * @returns Date in format `hours:minutes`
 */
export function FormatHoursMinutes(date: Date): string {
    const hours: string = String(date.getHours());
    const minutes: string = String(date.getMinutes());

    return hours.padStart(2, "0") + ":" + minutes.padStart(2, "0");
}

/**
 * Formats date in past related to current date
 * @param date - Given date
 * @returns Date in format `minutes|hours|days ago`
 */
export function FormatRelativeTimeInPastInDays(date: Date): string {
    const currentDate: Date = new Date();
    const currTimestamp: number = currentDate.getTime();
    const timestampDiff: number = currTimestamp - date.getTime();

    const minutesPassed = Math.floor(timestampDiff / MINUTE_IN_MILLISECONDS);
    const hoursPassed = Math.floor(timestampDiff / HOUR_IN_MILLISECONDS);
    const daysPassed = Math.floor(timestampDiff / DAY_IN_MILLISECONDS);
    
    switch (true) {
        case timestampDiff < MINUTE_IN_MILLISECONDS:
            return "меньше минуты назад";
        case timestampDiff < HOUR_IN_MILLISECONDS:
            return `${minutesPassed} минут${MinutesEndingInRussian(minutesPassed)} назад`;
        case timestampDiff < DAY_IN_MILLISECONDS:
            return `${hoursPassed} час${HoursEndingInRussian(hoursPassed)} назад`;
        case timestampDiff < 2 * DAY_IN_MILLISECONDS:
            return "вчера";
        default:
            return `${daysPassed} ${DaysEndingInRussian(daysPassed)} назад`;
    }
}

/**
 * Formats date in 'day month year'
 * @param date - Given date
 * @returns Date in format `day month (if not this year => year)`
 */
export function FormatDayMonthYear(date: Date): string {
    const day: string = String(date.getDate());
    const month: number = date.getMonth();
    const year: number = date.getFullYear();
    const currentYear: number = (new Date()).getFullYear();

    return day.padStart(2, "0") + " " + RUSSIAN_MONTHS[month] + (currentYear === year ? "" : ` ${year}`);
}