export interface CreateOrUpdateTableRequestData {
  id?: string
  username: string
  password?: string
}

export interface GetTableRequestData {
  /** El número de página actual */
  currentPage: number
  /** El número de consultas */
  size: number
  /** Parámetro de consulta: nombre de usuario */
  username?: string
  /** Parámetro de consulta: número de teléfono móvil */
  phone?: string
}

export interface GetTableData {
  id: string
  name: string
  email: string
  email_verified_at: string
  current_team_id: string | null
  profile_photo_path: string | null
  created_at: string
  updated_at: string
  profile_photo_url: string
}

export type GetTableResponseData = ApiResponseData<{
  list: GetTableData[]
  total: number
}>
