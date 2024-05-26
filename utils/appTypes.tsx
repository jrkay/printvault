export interface ProjectProps {
  comments?: string | null
  created_at: string
  description: string
  end_date?: string | null
  id: string
  name: string
  start_date?: string | null
  status?: string | null
  user_id: string
  shared_with?: [] | null
  last_updated?: string | null
}

export interface UserProps {
  created_at: string
  email: string
  id: string
  name: string
  photo?: string | null
  username: string
}

export interface ModelProps {
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
  comments?: string | null
  print_settings?: string | null
}

export interface JobProps {
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

export interface ImageProps {
  created_at: string
  model_id: string
  href: string
  id: string
}

export interface ProjectModelProps {
  created_at: string
  model_id: string
  id: string
  project_id: string
}

export type PrinterProps = {
  id: string
  printer: string
  type: string
}

export type ModelTagProps = {
  id?: string
  model_id: string
  tag_id: string
  name?: string
}

export type FileProps = {
  id: string
  created_at: string
  href: string
  model_id: string
  size: string
  file_name: string
}

export type ListingProps = {
  id: string
  name: string
  active: boolean
  website: string
  model_id: string
  date_active: string
}

export interface StatCardProps {
  title: string
  count: number
  href: string
}
