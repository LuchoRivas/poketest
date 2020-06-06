module.exports.adaptToTimeZone = (date) => {
    const year = (new Date(date)).getFullYear();
    const month = (new Date(date)).getMonth();
    const day = (new Date(date)).getDate();
    // const dateString = year + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0') + 'T' + '09' + ':' + '00' + ':' + '00';
    // const sendDate = new Date(Date.UTC(year, month, day, 9, 0, 0));
    const sendDate = new Date(year, month, day, '06', '00', '00', '00');
    return sendDate;
};