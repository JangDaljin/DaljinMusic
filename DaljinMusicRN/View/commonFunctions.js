export const mmss = (t) => {
    const m = Math.floor(parseInt(t) / 60)
    const s = t % 60
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s )
}

const API_SERVER = require('../Config').API_SERVER
export const url = (uri) => `${API_SERVER}${uri}`