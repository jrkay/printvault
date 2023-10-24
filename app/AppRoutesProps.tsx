export interface ProjectData {
  comments: string
  created_at: string
  description: string
  end_date: string
  id: string
  name: string
  start_date: string
  status: string
  user_id: string
}

export interface UserData {
  created_at: string
  email: string
  id: string
  name: string
  photo: string
  username: string
}

export interface FileData {
  created_at: string
  description: string
  id: string
  license: string
  name: string
  tags: string
  type: string
  url: string
  user_id: string
}

export interface JobData {
  comments: string
  created_at: string
  date: string
  duration: number
  filament: string
  model_id: string
  id: string
  material_type: string
  printer: string
  resin: string
  status: string
}

export interface ImageData {
  created_at: string
  model_id: string
  href: string
  id: string
  name: string
  user_id: string
}

export interface ProjectFileData {
  created_at: string
  model_id: string
  id: string
  project_id: string
}

export type AppRoutesProps = {
  projectData: ProjectData
  userData: UserData
  fileData: FileData
  jobData: JobData
  imageData: ImageData
  projectFileData: ProjectFileData
}
