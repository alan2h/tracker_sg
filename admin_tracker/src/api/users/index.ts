import { request } from "@/utils/service"
import type * as User from "./types/user"

/** Obtener */
export function getUserDataApi(params: User.UserRequestData) {
  return request<User.UserRequestData>({
    url: "v1/users",
    method: "get",
    params
  })
}
