/** Datos de respuesta de la interfaz analógica */
const SELECT_RESPONSE_DATA = {
  code: 0,
  data: [
    {
      label: "manzana",
      value: 1
    },
    {
      label: "plátano",
      value: 2
    },
    {
      label: "Tachibana",
      value: 3,
      disabled: true
    }
  ],
  message: "Select"
}

/** Interfaz analógica */
export function getSelectDataApi() {
  return new Promise<typeof SELECT_RESPONSE_DATA>((resolve, reject) => {
    // Simula el tiempo de respuesta de la interfaz 2s
    setTimeout(() => {
      // La API simulada se invoca correctamente
      if (Math.random() < 0.8) {
        resolve(SELECT_RESPONSE_DATA)
      } else {
        // Se ha producido un error en la llamada a la interfaz simulada
        reject(new Error("Se ha producido un error de interfaz"))
      }
    }, 2000)
  })
}
