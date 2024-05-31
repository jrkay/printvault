export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      demo_images: {
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
            foreignKeyName: "public_demo_images_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          }
        ]
      }
      demo_model_files: {
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
            foreignKeyName: "public_demo_images_2_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "demo_models"
            referencedColumns: ["id"]
          }
        ]
      }
      demo_models: {
        Row: {
          comments: string | null
          created_at: string
          description: string
          id: string
          last_updated: string | null
          license: string | null
          name: string
          print_settings: string | null
          shared_with: string[] | null
          type: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          description: string
          id?: string
          last_updated?: string | null
          license?: string | null
          name: string
          print_settings?: string | null
          shared_with?: string[] | null
          type?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          description?: string
          id?: string
          last_updated?: string | null
          license?: string | null
          name?: string
          print_settings?: string | null
          shared_with?: string[] | null
          type?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_demo_models_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      demo_project_models: {
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
            foreignKeyName: "demo_project_models_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "demo_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demo_project_models_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "demo_projects"
            referencedColumns: ["id"]
          }
        ]
      }
      demo_projects: {
        Row: {
          comments: string | null
          created_at: string
          description: string
          end_date: string | null
          id: string
          last_updated: string | null
          name: string
          shared_with: string[] | null
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
          shared_with?: string[] | null
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
          shared_with?: string[] | null
          start_date?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_demo_projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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
      listings: {
        Row: {
          active: boolean | null
          created_at: string
          date_active: string | null
          id: string
          model_id: string
          owner_id: string | null
          website: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          date_active?: string | null
          id?: string
          model_id: string
          owner_id?: string | null
          website?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          date_active?: string | null
          id?: string
          model_id?: string
          owner_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_listings_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_listings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      model_files: {
        Row: {
          created_at: string
          file_name: string | null
          href: string
          id: string
          model_id: string
          size: string | null
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          href: string
          id?: string
          model_id: string
          size?: string | null
        }
        Update: {
          created_at?: string
          file_name?: string | null
          href?: string
          id?: string
          model_id?: string
          size?: string | null
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
          comments: string | null
          created_at: string
          description: string
          id: string
          last_updated: string | null
          license: string | null
          name: string
          print_settings: string | null
          shared_with: string[] | null
          type: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          description: string
          id?: string
          last_updated?: string | null
          license?: string | null
          name: string
          print_settings?: string | null
          shared_with?: string[] | null
          type?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          description?: string
          id?: string
          last_updated?: string | null
          license?: string | null
          name?: string
          print_settings?: string | null
          shared_with?: string[] | null
          type?: string | null
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
          user_id: string
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
          user_id: string
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
          user_id?: string
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
          },
          {
            foreignKeyName: "project_models_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
          shared_with: string[] | null
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
          shared_with?: string[] | null
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
          shared_with?: string[] | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never
