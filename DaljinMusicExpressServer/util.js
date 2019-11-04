module.exports.getTime = (date = new Date()) => {

    const yyyy = date.getFullYear()
    const MM = date.getMonth() + 1
    const dd = date.getDay()
    const hh = date.getHours()
    const mm = date.getMinutes()
    const ss = date.getSeconds()

    return `${yyyy}-${(MM > 9)? MM : '0'+MM}-${(dd > 9)? dd : '0'+dd} ${(hh > 9)? hh : '0'+hh}:${(mm > 9)? mm : '0'+mm}:${(ss > 9)? ss : '0'+ss}`
}

module.exports.isNUW = (param) => {
    return param === null ? true : param === undefined ? true : typeof(param) !== 'String' ? false : str.trim() == '' ? true : false
}