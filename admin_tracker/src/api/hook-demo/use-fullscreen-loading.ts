/** Datos de respuesta de la interfaz analógica */
const SUCCESS_RESPONSE_DATA = {
  code: 0,
  data: {
    list: [] as number[]
  },
  message: "获取成功"
}

/** La interfaz de solicitud simulada se ha realizado correctamente */
export function getSuccessApi(list: number[]) {
  return new Promise<typeof SUCCESS_RESPONSE_DATA>((resolve) => {
    setTimeout(() => {
      resolve({ ...SUCCESS_RESPONSE_DATA, data: { list } })
    }, 1000)
  })
}

/** Error en la interfaz de solicitud simulada */
export function getErrorApi() {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Se ha producido un error"))
    }, 1000)
  })
}
