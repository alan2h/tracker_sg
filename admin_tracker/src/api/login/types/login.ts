export interface LoginRequestData {
  /** admin o editor */
  email: string
  /** contraseña */
  password: string
  /** Captcha */
  //code: string
}

export interface LoginResponse {
  data: Data
  token: string
  message: string
}

export interface Data {
  id: number
  name: string
  email: string
  email_verified_at: null
  current_team_id: null
  profile_photo_path: null
  created_at: Date
  updated_at: Date
  profile_photo_url: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = LoginResponse

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>
