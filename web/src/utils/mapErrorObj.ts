import { FieldError } from '../generated/graphql'

export const mapErrorObj: (errors: FieldError[]) => Record<string, string> = (
  errors: FieldError[]
) => {
  const errorMap: Record<string, string> = {}
  errors.forEach(({ field, message }) => {
    errorMap[field] = message
  })
  return errorMap
}
