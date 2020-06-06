module.exports.adaptDate = (fecha) => {
    const date = new Date(fecha);
    const formatDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' +
        date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
    return formatDate;
};