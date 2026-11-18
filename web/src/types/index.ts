export type UserRole = 'founder' | 'editor' | 'designer' | 'smm';

export type UserStatus = 'pending' | 'active' | 'suspended' | 'rejected' | 'archived';

export type Priority = 'urgent' | 'high' | 'normal' | 'low';

export type TaskStatus = 
  | 'assigned' 
  | 'in_progress' 
  | 'submitted' 
  | 'revision_required' 
  | 'resubmitted' 
  | 'approved' 
  | 'completed';

export type SubmissionStatus = 'submitted' | 'revision_requested' | 'approved';

export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'paid' 
  | 'failed' 
  | 'cancelled' 
  | 'refunded';

export type PaymentMethod = 'razorpay_payout' | 'upi' | 'bank_transfer' | 'manual';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  whatsapp?: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
  specialized_categories: string[];
  created_at: string;
  updated_at: string;
}

export interface FreelancerApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  role: 'editor' | 'designer' | 'smm';
  skills: string[];
  experience_years: string;
  software_tools: string[];
  portfolio_url: string;
  instagram_handle?: string;
  bio: string;
  avatar_url?: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'archived';
  review_notes?: string;
  created_at: string;
}

export interface FreelancerOnboarding {
  id: string;
  user_id: string;
  dob?: string;
  address?: string;
  emergency_contact?: string;
  aadhaar_number_masked?: string;
  aadhaar_doc_url?: string;
  pan_number?: string;
  pan_doc_url?: string;
  bank_account_holder?: string;
  bank_name?: string;
  bank_account_no?: string;
  bank_ifsc?: string;
  upi_id?: string;
  kyc_status: 'pending' | 'submitted' | 'verified' | 'rejected';
  verified_at?: string;
  rejection_reason?: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  client_name: string;
  description?: string;
  project_type: string;
  priority: Priority;
  status: 'new' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  budget: number;
  start_date: string;
  deadline: string;
  instructions?: string;
  reference_files?: string[];
  notes?: string;
  created_by: string;
  created_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  project_name?: string;
  client_name?: string;
  name: string;
  role_required: 'editor' | 'designer' | 'smm';
  assigned_to?: string;
  assigned_user?: UserProfile;
  description?: string;
  instructions?: string;
  reference_files?: string[];
  source_files?: string[];
  deadline: string;
  base_fee: number;
  performance_points: number;
  performance_reward: number;
  status: TaskStatus;
  assigned_at: string;
  started_at?: string;
  first_submitted_at?: string;
  approved_at?: string;
  created_at: string;
}

export interface TaskSubmission {
  id: string;
  task_id: string;
  version_number: number;
  uploaded_by: string;
  uploader_name?: string;
  file_url: string;
  file_name: string;
  file_size_bytes: number;
  mime_type?: string;
  notes?: string;
  status: SubmissionStatus;
  review_notes?: string;
  reviewed_at?: string;
  created_at: string;
}

export interface PerformanceSettings {
  id: string;
  tier_1_max_hours: number;
  tier_1_points: number;
  tier_2_max_hours: number;
  tier_2_points: number;
  tier_3_max_hours: number;
  tier_3_points: number;
  tier_4_max_hours: number;
  tier_4_points: number;
  tier_5_points: number;
  rate_per_100_pts: number;
  updated_at: string;
}

export interface Payment {
  id: string;
  task_id?: string;
  task_name?: string;
  team_member_id: string;
  team_member_name?: string;
  project_id?: string;
  base_fee: number;
  performance_reward: number;
  total_amount: number;
  payment_method: PaymentMethod;
  transaction_id?: string;
  status: PaymentStatus;
  paid_at?: string;
  notes?: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  sender_id: string;
  sender_name?: string;
  recipient_id: string;
  recipient_name?: string;
  task_id?: string;
  message_text: string;
  attachments?: { name: string; url: string; size?: string; type?: string }[];
  is_read: boolean;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'task' | 'submission' | 'revision' | 'approval' | 'payment' | 'kyc';
  action_url?: string;
  is_read: boolean;
  created_at: string;
}

export interface ActivityLogItem {
  id: string;
  user_id?: string;
  user_name?: string;
  action: string;
  module: string;
  record_id?: string;
  details?: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}
