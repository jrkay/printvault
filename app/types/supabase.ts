export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      print_files: {
        Row: {
          created_at: string
          id: string
          name: string | null
          project_id: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          project_id?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          project_id?: string | null
          url?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          files: string[] | null
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          files?: string[] | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          files?: string[] | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
