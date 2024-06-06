import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** Obtener un código de verificación de inicio de sesión */
export function getLoginCodeApi() {
  return request<Login.LoginCodeResponseData>({
    url: "login/code",
    method: "get"
  })
}

/** Inicie sesión y regrese Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "users/login",
    method: "post",
    data
  })
}

/** Obtener detalles del usuario */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: "v1/user-profile",
    method: "get"
  })
}
