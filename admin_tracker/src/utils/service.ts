import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { useUserStoreHook } from "@/store/modules/user"
import { ElMessage } from "element-plus"
import { get, merge } from "lodash-es"
import { getToken } from "./cache/cookies"

/** Cerrar sesión y forzar la actualización de la página (redireccionará a la página de inicio de sesión) */
function logout() {
  useUserStoreHook().logout()
  location.reload()
}

/** Crear instancia de solicitud */
function createService() {
  // Cree una instancia de axios llamada servicio
  const service = axios.create()
  // solicitar interceptación
  service.interceptors.request.use(
    (config) => config,
    // fallo al enviar
    (error) => Promise.reject(error)
  )
  // Intercepción de respuesta (se puede ajustar según el negocio específico)
  service.interceptors.response.use(
    (response) => {
      // apiData son los datos devueltos por api
      const apiData = response.data
      // Los datos binarios se devuelven directamente
      //const responseType = response.request?.responseType
      //if (responseType === "blob" || responseType === "arraybuffer") return apiData
      // Este código es el código comercial acordado con el backend.
      //const code = apiData.code
      // Si no hay código, significa que no es una API desarrollada por el backend del proyecto.
      //if (code === undefined) {
      //ElMessage.error("Interfaces distintas a este sistema")
      //eturn Promise.reject(new Error("Interfaces distintas a este sistema"))
      //}
      //switch (code) {
      //  case 0:
      // Este sistema utiliza el código === 0 para indicar que no hay errores comerciales.
      //    return apiData
      //  case 401:
      // Cuando el token expira
      //    return logout()
      //  default:
      // No es el código correcto
      //    ElMessage.error(apiData.message || "Error")
      //    return Promise.reject(new Error("Error"))
      //}
      return apiData
    },
    (error: any) => {
      // El estado es el código de estado HTTP.
      const status = get(error, "response.status")
      switch (status) {
        case 400:
          error.message = "Solicitud de error"
          break
        case 401:
          // Token al vencimiento
          logout()
          break
        case 403:
          error.message = "acceso denegado"
          break
        case 404:
          error.message = "Error al solicitar la dirección"
          break
        case 408:
          error.message = "Tiempo de espera agotado"
          break
        case 500:
          error.message = "Error interno del servidor"
          break
        case 501:
          error.message = "Servicio no implementado"
          break
        case 502:
          error.message = "Error de puerta de enlace"
          break
        case 503:
          error.message = "El servicio no está disponible"
          break
        case 504:
          error.message = "Tiempo de espera de la puerta de enlace"
          break
        case 505:
          error.message = "HTTP La versión no es compatible"
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** Crear método de solicitud */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = getToken()
    const defaultConfig = {
      headers: {
        // llevar Token
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json"
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

/** 用于网络请求的实例 */
const service = createService()
/** 用于网络请求的方法 */
export const request = createRequest(service)
