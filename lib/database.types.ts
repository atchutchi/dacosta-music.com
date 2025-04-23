export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      albums: {
        Row: {
          id: string
          artist_id: string
          title: string
          release_year: number | null
          cover_url: string | null
          album_type: "album" | "ep" | "single"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          artist_id: string
          title: string
          release_year?: number | null
          cover_url?: string | null
          album_type?: "album" | "ep" | "single"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          artist_id?: string
          title?: string
          release_year?: number | null
          cover_url?: string | null
          album_type?: "album" | "ep" | "single"
          created_at?: string
          updated_at?: string
        }
      }
      artist_stats: {
        Row: {
          id: string
          artist_id: string
          streams: number
          followers: number
          monthly_listeners: number
          youtube_views: number
          youtube_subscribers: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          artist_id: string
          streams?: number
          followers?: number
          monthly_listeners?: number
          youtube_views?: number
          youtube_subscribers?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          artist_id?: string
          streams?: number
          followers?: number
          monthly_listeners?: number
          youtube_views?: number
          youtube_subscribers?: number
          created_at?: string
          updated_at?: string
        }
      }
      artists: {
        Row: {
          id: string
          name: string
          slug: string
          bio: string | null
          logo_url: string | null
          photo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          bio?: string | null
          logo_url?: string | null
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          bio?: string | null
          logo_url?: string | null
          photo_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      event_artists: {
        Row: {
          event_id: string
          artist_id: string
        }
        Insert: {
          event_id: string
          artist_id: string
        }
        Update: {
          event_id?: string
          artist_id?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          location: string
          start_date: string
          end_date: string | null
          image_url: string | null
          ticket_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          location: string
          start_date: string
          end_date?: string | null
          image_url?: string | null
          ticket_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          location?: string
          start_date?: string
          end_date?: string | null
          image_url?: string | null
          ticket_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      live_sets: {
        Row: {
          id: string
          artist_id: string
          title: string
          video_url: string
          event_name: string | null
          performance_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          artist_id: string
          title: string
          video_url: string
          event_name?: string | null
          performance_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          artist_id?: string
          title?: string
          video_url?: string
          event_name?: string | null
          performance_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          role: "admin" | "artist" | "user"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: "admin" | "artist" | "user"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: "admin" | "artist" | "user"
          created_at?: string
          updated_at?: string
        }
      }
      tracks: {
        Row: {
          id: string
          album_id: string
          title: string
          duration: number | null
          featuring: string | null
          track_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          album_id: string
          title: string
          duration?: number | null
          featuring?: string | null
          track_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          album_id?: string
          title?: string
          duration?: number | null
          featuring?: string | null
          track_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
