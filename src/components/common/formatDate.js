export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    let o = {
        'M+': parseFloat(date.getMonth()) + 1,
        'd+': parseFloat(date.getDate()),
        'h+': parseFloat(date.getHours()),
        'm+': parseFloat(date.getMinutes()),
        's+': parseFloat(date.getSeconds())
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}