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
          color: string
          comments: string | null
          created_at: string
          diameter: number | null
          id: string
          manufacturer: string
          name: string
          price_per_unit: number | null
          print_count: number | null
          print_temp: number | null
          weight: number | null
        }
        Insert: {
          bed_temp?: number | null
          color: string
          comments?: string | null
          created_at?: string
          diameter?: number | null
          id: string
          manufacturer: string
          name: string
          price_per_unit?: number | null
          print_count?: number | null
          print_temp?: number | null
          weight?: number | null
        }
        Update: {
          bed_temp?: number | null
          color?: string
          comments?: string | null
          created_at?: string
          diameter?: number | null
          id?: string
          manufacturer?: string
          name?: string
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
          href: string
          id: string
          model_id: string
        }
        Insert: {
          created_at?: string
          href: string
          id?: string
          model_id: string
        }
        Update: {
          created_at?: string
          href?: string
          id?: string
          model_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          }
        ]
      }
      model_files: {
        Row: {
          created_at: string
          href: string
          id: string
          model_id: string
        }
        Insert: {
          created_at?: string
          href: string
          id?: string
          model_id: string
        }
        Update: {
          created_at?: string
          href?: string
          id?: string
          model_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_files_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          }
        ]
      }
      model_tags: {
        Row: {
          id: string
          model_id: string
          tag_id: string
        }
        Insert: {
          id?: string
          model_id: string
          tag_id: string
        }
        Update: {
          id?: string
          model_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_tags_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "model_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      models: {
        Row: {
          created_at: string
          description: string
          id: string
          last_updated: string | null
          license: string | null
          name: string
          type: string
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          last_updated?: string | null
          license?: string | null
          name: string
          type: string
          url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          last_updated?: string | null
          license?: string | null
          name?: string
          type?: string
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "models_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      print_jobs: {
        Row: {
          comments: string | null
          created_at: string
          date: string
          duration: string | null
          fail_comment: string | null
          filament: string | null
          id: string
          model_id: string
          printer_id: string | null
          resin: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string
          date: string
          duration?: string | null
          fail_comment?: string | null
          filament?: string | null
          id?: string
          model_id: string
          printer_id?: string | null
          resin?: string | null
          status: string
          user_id?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string
          date?: string
          duration?: string | null
          fail_comment?: string | null
          filament?: string | null
          id?: string
          model_id?: string
          printer_id?: string | null
          resin?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "print_jobs_filament_fkey"
            columns: ["filament"]
            isOneToOne: false
            referencedRelation: "filament"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_jobs_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_jobs_printer_id_fkey"
            columns: ["printer_id"]
            isOneToOne: false
            referencedRelation: "printers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_jobs_resin_fkey"
            columns: ["resin"]
            isOneToOne: false
            referencedRelation: "resin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_jobs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      printers: {
        Row: {
          id: string
          plate_x: string | null
          plate_y: string | null
          plate_z: string | null
          printer: string
          res_x: string | null
          res_y: string | null
          type: string
        }
        Insert: {
          id?: string
          plate_x?: string | null
          plate_y?: string | null
          plate_z?: string | null
          printer: string
          res_x?: string | null
          res_y?: string | null
          type: string
        }
        Update: {
          id?: string
          plate_x?: string | null
          plate_y?: string | null
          plate_z?: string | null
          printer?: string
          res_x?: string | null
          res_y?: string | null
          type?: string
        }
        Relationships: []
      }
      project_models: {
        Row: {
          created_at: string
          id: string
          model_id: string
          project_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          model_id: string
          project_id: string
        }
        Update: {
          created_at?: string
          id?: string
          model_id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_models_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          comments: string | null
          created_at: string
          description: string
          end_date: string | null
          id: string
          last_updated: string | null
          name: string
          start_date: string | null
          status: string
          user_id: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          description: string
          end_date?: string | null
          id?: string
          last_updated?: string | null
          name: string
          start_date?: string | null
          status: string
          user_id: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          description?: string
          end_date?: string | null
          id?: string
          last_updated?: string | null
          name?: string
          start_date?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      resin: {
        Row: {
          color: string
          comments: string | null
          created_at: string
          curing_time: number | null
          id: string
          manufacturer: string
          price_per_unit: number | null
          purchase_url: string | null
          type: string
          viscosity: number | null
        }
        Insert: {
          color: string
          comments?: string | null
          created_at?: string
          curing_time?: number | null
          id?: string
          manufacturer: string
          price_per_unit?: number | null
          purchase_url?: string | null
          type: string
          viscosity?: number | null
        }
        Update: {
          color?: string
          comments?: string | null
          created_at?: string
          curing_time?: number | null
          id?: string
          manufacturer?: string
          price_per_unit?: number | null
          purchase_url?: string | null
          type?: string
          viscosity?: number | null
        }
        Relationships: []
      }
      software: {
        Row: {
          comments: string | null
          cost: string | null
          created_at: string
          description: string | null
          file_support: string | null
          id: number
          name: string | null
          subscription: boolean | null
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
          subscription?: boolean | null
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
          subscription?: boolean | null
          url?: string | null
          vendor?: string | null
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
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          photo: string | null
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          photo?: string | null
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          photo?: string | null
          username?: string
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
