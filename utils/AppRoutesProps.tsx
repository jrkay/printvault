export interface ProjectData {
  comments?: string | null
  created_at: string
  description: string
  end_date?: string | null
  id: string
  name: string
  start_date?: string | null
  status?: string | null
  user_id: string
}

export interface UserData {
  created_at: string
  email: string
  id: string
  name: string
  photo?: string | null
  username: string
}

export interface ModelData {
  created_at: string
  description: string
  id: string
  license?: string | null
  name: string
  type: string
  url?: string | null
  user_id: string
  last_updated?: string | null
  shared_with?: [] | null
}

export interface JobData {
  comments?: string | null
  created_at: string
  date: string
  duration?: string | null
  filament?: string | null
  model_id: string
  id: string
  printer_id: string
  resin?: string | null
  status: string
  fail_comment?: string | null
  user_id: string
}

export interface ImageData {
  created_at: string
  model_id: string
  href: string
  id: string
}

export interface ProjectModelData {
  created_at: string
  model_id: string
  id: string
  project_id: string
}

export type PrinterData = {
  id: string
  printer: string
  type: string
}

export type ModelTags = {
  id: string
  model_id: string
  tag_id: string
}

export type FileData = {
  id: string
  created_at: string
  href: string
  model_id: string
}
