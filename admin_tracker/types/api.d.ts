/** Los datos de respuesta de todas las interfaces API deben cumplir con este formato. */
interface ApiResponseData<T> {
  code: number
  data: T
  message: string
}
