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
      filament: {
        Row: {
          bed_temp: number | null
          color: string | null
          comments: string | null
          created_at: string
          diameter: number | null
          id: string
          manufacturer: string | null
          name: string | null
          price_per_unit: number | null
          print_count: number | null
          print_temp: number | null
          weight: number | null
        }
        Insert: {
          bed_temp?: number | null
          color?: string | null
          comments?: string | null
          created_at?: string
          diameter?: number | null
          id: string
          manufacturer?: string | null
          name?: string | null
          price_per_unit?: number | null
          print_count?: number | null
          print_temp?: number | null
          weight?: number | null
        }
        Update: {
          bed_temp?: number | null
          color?: string | null
          comments?: string | null
          created_at?: string
          diameter?: number | null
          id?: string
          manufacturer?: string | null
          name?: string | null
          price_per_unit?: number | null
          print_count?: number | null
          print_temp?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      images: {
        Row: {
          created_at: string
          href: string | null
          id: string
          model_id: string | null
        }
        Insert: {
          created_at?: string
          href?: string | null
          id?: string
          model_id?: string | null
        }
        Update: {
          created_at?: string
          href?: string | null
          id?: string
          model_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_model_id_fkey"
            columns: ["model_id"]
            referencedRelation: "models"
            referencedColumns: ["id"]
          }
        ]
      }
      model_files: {
        Row: {
          created_at: string
          href: string | null
          id: number
          model_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          href?: string | null
          id?: number
          model_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          href?: string | null
          id?: number
          model_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_files_model_id_fkey"
            columns: ["model_id"]
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_files_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      model_tags: {
        Row: {
          id: string
          model_id: string | null
          tag_id: string | null
        }
        Insert: {
          id?: string
          model_id?: string | null
          tag_id?: string | null
        }
        Update: {
          id?: string
          model_id?: string | null
          tag_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_tags_model_id_fkey"
            columns: ["model_id"]
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      models: {
        Row: {
          created_at: string
          description: string | null
          id: string
          license: string | null
          name: string | null
          type: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          license?: string | null
          name?: string | null
          type?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          license?: string | null
          name?: string | null
          type?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "models_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      print_jobs: {
        Row: {
          comments: string | null
          created_at: string
          date: string | null
          duration: number | null
          filament: string | null
          id: string
          material_type: string | null
          model_id: string
          printer: string | null
          resin: string | null
          status: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string
          date?: string | null
          duration?: number | null
          filament?: string | null
          id?: string
          material_type?: string | null
          model_id: string
          printer?: string | null
          resin?: string | null
          status?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string
          date?: string | null
          duration?: number | null
          filament?: string | null
          id?: string
          material_type?: string | null
          model_id?: string
          printer?: string | null
          resin?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "print_jobs_filament_fkey"
            columns: ["filament"]
            referencedRelation: "filament"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_jobs_model_id_fkey"
            columns: ["model_id"]
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_jobs_resin_fkey"
            columns: ["resin"]
            referencedRelation: "resin"
            referencedColumns: ["id"]
          }
        ]
      }
      printers: {
        Row: {
          id: string
          printer: string | null
          type: string | null
        }
        Insert: {
          id?: string
          printer?: string | null
          type?: string | null
        }
        Update: {
          id?: string
          printer?: string | null
          type?: string | null
        }
        Relationships: []
      }
      project_models: {
        Row: {
          created_at: string
          id: string
          model_id: string | null
          project_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          model_id?: string | null
          project_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          model_id?: string | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_models_model_id_fkey"
            columns: ["model_id"]
            referencedRelation: "models"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          comments: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string | null
          start_date: string
          status: string | null
          user_id: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string | null
          start_date: string
          status?: string | null
          user_id: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string | null
          start_date?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      resin: {
        Row: {
          color: string | null
          comments: string | null
          created_at: string
          curing_time: number | null
          id: string
          manufacturer: string | null
          price_per_unit: number | null
          purchase_url: string | null
          type: string | null
          viscosity: number | null
        }
        Insert: {
          color?: string | null
          comments?: string | null
          created_at?: string
          curing_time?: number | null
          id?: string
          manufacturer?: string | null
          price_per_unit?: number | null
          purchase_url?: string | null
          type?: string | null
          viscosity?: number | null
        }
        Update: {
          color?: string | null
          comments?: string | null
          created_at?: string
          curing_time?: number | null
          id?: string
          manufacturer?: string | null
          price_per_unit?: number | null
          purchase_url?: string | null
          type?: string | null
          viscosity?: number | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          comments: string | null
          cost: string | null
          created_at: string
          description: string | null
          file_support: string | null
          id: number
          name: string | null
          type: string | null
          url: string | null
          vendor: string | null
        }
        Insert: {
          comments?: string | null
          cost?: string | null
          created_at?: string
          description?: string | null
          file_support?: string | null
          id?: number
          name?: string | null
          type?: string | null
          url?: string | null
          vendor?: string | null
        }
        Update: {
          comments?: string | null
          cost?: string | null
          created_at?: string
          description?: string | null
          file_support?: string | null
          id?: number
          name?: string | null
          type?: string | null
          url?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          photo: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          photo?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          photo?: string | null
          username?: string | null
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
