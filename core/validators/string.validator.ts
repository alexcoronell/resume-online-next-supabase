export const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String
}
export const isStringEmpty = (value: unknown): value is string => {
  return isString(value) && value.trim() === ''
}
