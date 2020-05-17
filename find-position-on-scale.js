export default function findPosOnScale (start, end, value) {
    if (value === Infinity)
        return 1

    const length = end - start

    if (length === 0)
        return 0

    if (value === 0)
        value = start

    if (value === Infinity)
        value = end

    const x = Math.max(0, value - start)

    return x / length
}
