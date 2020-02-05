export const mmss = (t) => {
    const m = Math.floor(parseInt(t) / 60)
    const s = t % 60
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s )
}