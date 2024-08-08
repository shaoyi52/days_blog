function formatSizeUnits(kb) {
    var result = '';

    if (kb < 1024) {
        result = kb + ' KB';
    } else if (kb < 1024 * 1024) {
        result = (kb / 1024).toFixed(2) + ' MB';
    } else if (kb < 1024 * 1024 * 1024) {
        result = (kb / 1024 / 1024).toFixed(2) + ' GB';
    } else {
        result = (kb / 1024 / 1024 / 1024).toFixed(2) + ' TB';
    }

    return result;
}