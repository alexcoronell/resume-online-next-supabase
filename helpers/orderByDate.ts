export const orderByDateUntil = (data: any) => {
  return data.sort((a: any, b: any) => {
    if (a.until > b.until) return 1
    if (a.until < b.until) return -1
    return 0
  })
}

export const orderByDateSince = (data: any) => {
  return data.sort((a: any, b: any) => {
    if (a.since > b.since) return 1
    if (a.since < b.since) return -1
    return 0
  })
}

export const orderByYearAndMonth = (data: any) => {
  return data.sort((a: any, b: any) => {
    if (a.year < b.year) return 1
    if (a.year > b.year) return -1
    if (a.year === b.year && a.month < b.month) return 1
    if (a.year === b.year && a.month > b.month) return -1
    return 0
  })
}
