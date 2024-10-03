export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function getNextMonday(date: Date): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + ((1 + 7 - result.getDay()) % 7 || 7));
    return result;
}

export function getNextTuesday(date: Date): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + ((2 + 7 - result.getDay()) % 7 || 7));
    return result;
}