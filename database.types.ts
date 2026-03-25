export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          category_id: number
          created_at: string
          description: string
          name: string
          updated_at: string
        }
        Insert: {
          category_id?: never
          created_at?: string
          description: string
          name: string
          updated_at?: string
        }
        Update: {
          category_id?: never
          created_at?: string
          description?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_id: string
          event_type: Database["public"]["Enums"]["event_types"] | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_id?: string
          event_type?: Database["public"]["Enums"]["event_types"] | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_id?: string
          event_type?: Database["public"]["Enums"]["event_types"] | null
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          followed_id: string | null
          follower_id: string | null
        }
        Insert: {
          created_at?: string
          followed_id?: string | null
          follower_id?: string | null
        }
        Update: {
          created_at?: string
          followed_id?: string | null
          follower_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follows_followed_id_profiles_profile_id_fk"
            columns: ["followed_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "follows_follower_id_profiles_profile_id_fk"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      ideas: {
        Row: {
          claimed_at: string | null
          claimed_by: string | null
          created_at: string
          description: string
          idea_id: number
          title: string
          views: number
        }
        Insert: {
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string
          description: string
          idea_id?: never
          title: string
          views?: number
        }
        Update: {
          claimed_at?: string | null
          claimed_by?: string | null
          created_at?: string
          description?: string
          idea_id?: never
          title?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "ideas_claimed_by_profiles_profile_id_fk"
            columns: ["claimed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      ideas_likes: {
        Row: {
          idea_id: number
          profile_id: string
        }
        Insert: {
          idea_id: number
          profile_id: string
        }
        Update: {
          idea_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ideas_likes_idea_id_ideas_idea_id_fk"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "idea_list_view"
            referencedColumns: ["idea_id"]
          },
          {
            foreignKeyName: "ideas_likes_idea_id_ideas_idea_id_fk"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["idea_id"]
          },
          {
            foreignKeyName: "ideas_likes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_location: string
          company_logo: string
          company_name: string
          company_website: string
          created_at: string
          job_id: number
          job_type: Database["public"]["Enums"]["job_types"]
          overview: string
          position: string
          preferred_qualifications: string
          qualifications: string
          responsibilities: string
          salary: Database["public"]["Enums"]["job_salary_types"]
          skills: string
          updated_at: string
          work_type: Database["public"]["Enums"]["work_types"]
        }
        Insert: {
          company_location: string
          company_logo: string
          company_name: string
          company_website: string
          created_at?: string
          job_id?: never
          job_type: Database["public"]["Enums"]["job_types"]
          overview: string
          position: string
          preferred_qualifications: string
          qualifications: string
          responsibilities: string
          salary: Database["public"]["Enums"]["job_salary_types"]
          skills: string
          updated_at?: string
          work_type: Database["public"]["Enums"]["work_types"]
        }
        Update: {
          company_location?: string
          company_logo?: string
          company_name?: string
          company_website?: string
          created_at?: string
          job_id?: never
          job_type?: Database["public"]["Enums"]["job_types"]
          overview?: string
          position?: string
          preferred_qualifications?: string
          qualifications?: string
          responsibilities?: string
          salary?: Database["public"]["Enums"]["job_salary_types"]
          skills?: string
          updated_at?: string
          work_type?: Database["public"]["Enums"]["work_types"]
        }
        Relationships: []
      }
      message_room_members: {
        Row: {
          created_at: string
          message_room_id: number
          profile_id: string
        }
        Insert: {
          created_at?: string
          message_room_id: number
          profile_id: string
        }
        Update: {
          created_at?: string
          message_room_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_room_members_message_room_id_message_rooms_message_room"
            columns: ["message_room_id"]
            isOneToOne: false
            referencedRelation: "message_rooms"
            referencedColumns: ["message_room_id"]
          },
          {
            foreignKeyName: "message_room_members_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      message_rooms: {
        Row: {
          created_at: string
          message_room_id: number
        }
        Insert: {
          created_at?: string
          message_room_id?: never
        }
        Update: {
          created_at?: string
          message_room_id?: never
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          message_id: number
          message_room_id: number | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          message_id?: never
          message_room_id?: number | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          message_id?: never
          message_room_id?: number | null
          sender_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          notification_id: number
          post_id: number | null
          product_id: number
          seen: boolean
          source_id: string
          target_id: string
          type: Database["public"]["Enums"]["notification_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          notification_id?: never
          post_id?: number | null
          product_id: number
          seen?: boolean
          source_id: string
          target_id: string
          type: Database["public"]["Enums"]["notification_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          notification_id?: never
          post_id?: number | null
          product_id?: number
          seen?: boolean
          source_id?: string
          target_id?: string
          type?: Database["public"]["Enums"]["notification_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_list_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "notifications_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_overview_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "notifications_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "notifications_source_id_profiles_profile_id_fk"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "notifications_target_id_profiles_profile_id_fk"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      post_likes: {
        Row: {
          post_id: number
          profile_id: string
        }
        Insert: {
          post_id: number
          profile_id: string
        }
        Update: {
          post_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_likes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_list_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_likes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_likes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      post_replies: {
        Row: {
          content: string
          created_at: string
          parent_reply_id: number | null
          post_id: number | null
          profile_id: string
          reply_id: number
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          parent_reply_id?: number | null
          post_id?: number | null
          profile_id: string
          reply_id?: never
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          parent_reply_id?: number | null
          post_id?: number | null
          profile_id?: string
          reply_id?: never
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_replies_parent_reply_id_post_replies_reply_id_fk"
            columns: ["parent_reply_id"]
            isOneToOne: false
            referencedRelation: "post_replies"
            referencedColumns: ["reply_id"]
          },
          {
            foreignKeyName: "post_replies_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_replies_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post_list_view"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_replies_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_replies_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          post_id: number
          profile_id: string
          title: string
          topic_id: number
          updated_at: string
          upvotes: number
        }
        Insert: {
          content: string
          created_at?: string
          post_id?: never
          profile_id: string
          title: string
          topic_id: number
          updated_at?: string
          upvotes?: number
        }
        Update: {
          content?: string
          created_at?: string
          post_id?: never
          profile_id?: string
          title?: string
          topic_id?: number
          updated_at?: string
          upvotes?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "posts_topic_id_topics_topic_id_fk"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "community_post_detail_view"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "posts_topic_id_topics_topic_id_fk"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["topic_id"]
          },
        ]
      }
      product_likes: {
        Row: {
          product_id: number
          profile_id: string
        }
        Insert: {
          product_id: number
          profile_id: string
        }
        Update: {
          product_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_likes_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_overview_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_likes_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_likes_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number | null
          created_at: string
          description: string
          icon: string
          name: string
          product_id: number
          profile_id: string
          stats: Json
          tags: string[]
          updated_at: string
          url: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description: string
          icon: string
          name: string
          product_id?: never
          profile_id: string
          stats?: Json
          tags: string[]
          updated_at?: string
          url: string
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string
          icon?: string
          name?: string
          product_id?: never
          profile_id?: string
          stats?: Json
          tags?: string[]
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_categories_category_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "products_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          name: string
          nickname: string
          position: Database["public"]["Enums"]["position_types"]
          profile_id: string
          stats: Json | null
          updated_at: string
          views: Json | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email: string
          name: string
          nickname: string
          position: Database["public"]["Enums"]["position_types"]
          profile_id: string
          stats?: Json | null
          updated_at?: string
          views?: Json | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          name?: string
          nickname?: string
          position?: Database["public"]["Enums"]["position_types"]
          profile_id?: string
          stats?: Json | null
          updated_at?: string
          views?: Json | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          product_id: number
          profile_id: string
          rating: number
          review: string
          review_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          product_id: number
          profile_id: string
          rating: number
          review: string
          review_id?: never
          updated_at?: string
        }
        Update: {
          created_at?: string
          product_id?: number
          profile_id?: string
          rating?: number
          review?: string
          review_id?: never
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product_overview_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "reviews_product_id_products_product_id_fk"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "reviews_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          description: string
          name: string
          position: string
          size: number
          team_id: number
          team_leader_id: string
          team_stage: Database["public"]["Enums"]["team_stage"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          name: string
          position: string
          size: number
          team_id?: never
          team_leader_id: string
          team_stage: Database["public"]["Enums"]["team_stage"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          name?: string
          position?: string
          size?: number
          team_id?: never
          team_leader_id?: string
          team_stage?: Database["public"]["Enums"]["team_stage"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_team_leader_id_profiles_profile_id_fk"
            columns: ["team_leader_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      topics: {
        Row: {
          created_at: string
          name: string
          slug: string
          topic_id: number
        }
        Insert: {
          created_at?: string
          name: string
          slug: string
          topic_id?: never
        }
        Update: {
          created_at?: string
          name?: string
          slug?: string
          topic_id?: never
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      community_post_detail_view: {
        Row: {
          author_avatar: string | null
          author_created_at: string | null
          author_name: string | null
          author_nickname: string | null
          author_position: Database["public"]["Enums"]["position_types"] | null
          content: string | null
          created_at: string | null
          post_id: number | null
          products: number | null
          replies: number | null
          title: string | null
          topic_id: number | null
          topic_name: string | null
          topic_slug: string | null
          upvotes: number | null
        }
        Relationships: []
      }
      community_post_list_view: {
        Row: {
          author: string | null
          avatar: string | null
          created_at: string | null
          nickname: string | null
          post_id: number | null
          title: string | null
          topic: string | null
          upvotes: number | null
        }
        Relationships: []
      }
      idea_list_view: {
        Row: {
          created_at: string | null
          description: string | null
          idea_id: number | null
          is_claimed: boolean | null
          title: string | null
          upvotes: number | null
          views: number | null
        }
        Relationships: []
      }
      product_overview_view: {
        Row: {
          average_rating: number | null
          created_at: string | null
          description: string | null
          icon: string | null
          name: string | null
          product_id: number | null
          reviews: string | null
          tags: string[] | null
          upvotes: string | null
          url: string | null
          views: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      track_event: {
        Args: {
          event_data: Json
          event_type: Database["public"]["Enums"]["event_types"]
        }
        Returns: undefined
      }
    }
    Enums: {
      event_types: "product_view" | "profile_view" | "product_visit"
      job_salary_types:
        | "all"
        | "1000"
        | "1000-2000"
        | "2000-3000"
        | "3000-4000"
        | "4000-5000"
        | "5000-6000"
        | "6000-7000"
        | "7000-8000"
        | "8000-9000"
        | "9000"
      job_types: "all" | "full-time" | "contract" | "freelance" | "internship"
      notification_type: "follow" | "review" | "reply" | "mention"
      position_types:
        | "frontend"
        | "backend"
        | "designer"
        | "marketer"
        | "planner"
        | "etc"
      team_stage: "initial" | "prototype" | "operation"
      work_types: "remote" | "offline" | "unknown"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_types: ["product_view", "profile_view", "product_visit"],
      job_salary_types: [
        "all",
        "1000",
        "1000-2000",
        "2000-3000",
        "3000-4000",
        "4000-5000",
        "5000-6000",
        "6000-7000",
        "7000-8000",
        "8000-9000",
        "9000",
      ],
      job_types: ["all", "full-time", "contract", "freelance", "internship"],
      notification_type: ["follow", "review", "reply", "mention"],
      position_types: [
        "frontend",
        "backend",
        "designer",
        "marketer",
        "planner",
        "etc",
      ],
      team_stage: ["initial", "prototype", "operation"],
      work_types: ["remote", "offline", "unknown"],
    },
  },
} as const
