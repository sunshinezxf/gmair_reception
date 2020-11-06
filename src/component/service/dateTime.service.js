function formatTimeStampToDate(timestamp) {
    if (timestamp === null || timestamp === undefined) {
        return '-';
    }
    let date = new Date(timestamp);
    let year = date.getFullYear().toString();
    let month = ("0" + (date.getMonth() + 1)).slice(-2).toString();
    let day = ("0" + date.getDate()).slice(-2).toString();

    return year + '-' + month + '-' + day;
}

export const datetimeService = {
    formatTimeStampToDate
}
