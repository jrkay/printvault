export interface ProjectData {
  comments: string | null
  created_at: string | null
  description: string | null
  end_date: string | null
  id: string
  name: string | null
  start_date: string | null
  status: string | null
  user_id: string | null
}

export interface UserData {
  created_at: string | null
  email: string | null
  id: string
  name: string | null
  photo: string | null
  username: string | null
}

export interface ModelData {
  created_at: string
  description: string | ""
  id: string
  license: string
  name: string
  type: string
  url: string
  user_id: string
}

export interface JobData {
  comments: string | null
  created_at: string | null
  date: string | null
  duration: number | null
  filament: string | null
  model_id: string | null
  id: string
  material_type: string | null
  printer: string | null
  resin: string | null
  status: string | null
}

export interface ImageData {
  created_at: string | null
  model_id: string | null
  href: string | null
  id: string
}

export interface ProjectModelData {
  created_at: string | null
  model_id: string | null
  id: string
  project_id: string | null
}

export type AppRoutesProps = {
  projectData: ProjectData | null
  userData: UserData | null
  modelData: ModelData | null
  jobData: JobData | null
  imageData: ImageData | null
  projectModelData: ProjectModelData | null
}

export type PrinterData = {
  id: string
  printer?: string | null
  type?: string | null
}

export type ModelTags = {
  id: string
  model_id: string
  tag_id: string
}
