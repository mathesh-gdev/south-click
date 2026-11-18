-- ==============================================================================
-- SOUTH CLICK - DIGITAL MARKETING AGENCY TEAM MANAGEMENT PLATFORM
-- DATABASE SCHEMA DEFINITION & ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES (Users & Roles)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('founder', 'editor', 'designer', 'smm')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'rejected', 'archived')),
    phone TEXT,
    whatsapp TEXT,
    location TEXT,
    bio TEXT,
    avatar_url TEXT,
    specialized_categories JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);

-- ------------------------------------------------------------------------------
-- 2. FREELANCER APPLICATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.freelancer_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    location TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('editor', 'designer', 'smm')),
    skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    experience_years TEXT NOT NULL,
    software_tools JSONB NOT NULL DEFAULT '[]'::jsonb,
    portfolio_url TEXT NOT NULL,
    instagram_handle TEXT,
    bio TEXT NOT NULL,
    avatar_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'archived')),
    reviewed_by UUID REFERENCES public.profiles(id),
    review_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_status ON public.freelancer_applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_role ON public.freelancer_applications(role);

-- ------------------------------------------------------------------------------
-- 3. FREELANCER ONBOARDING & SENSITIVE KYC / BANK DATA
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.freelancer_onboarding (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    dob DATE,
    address TEXT,
    emergency_contact TEXT,
    aadhaar_number_masked TEXT,
    aadhaar_doc_url TEXT,
    pan_number TEXT,
    pan_doc_url TEXT,
    bank_account_holder TEXT,
    bank_name TEXT,
    bank_account_no TEXT,
    bank_ifsc TEXT,
    upi_id TEXT,
    kyc_status TEXT NOT NULL DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'submitted', 'verified', 'rejected')),
    verified_by UUID REFERENCES public.profiles(id),
    verified_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_user_id ON public.freelancer_onboarding(user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_kyc_status ON public.freelancer_onboarding(kyc_status);

-- ------------------------------------------------------------------------------
-- 4. PROJECTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    client_name TEXT NOT NULL,
    description TEXT,
    project_type TEXT NOT NULL DEFAULT 'reels',
    priority TEXT NOT NULL DEFAULT 'high' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('new', 'active', 'on_hold', 'completed', 'cancelled')),
    budget NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    start_date DATE DEFAULT CURRENT_DATE,
    deadline TIMESTAMPTZ NOT NULL,
    instructions TEXT,
    reference_files JSONB DEFAULT '[]'::jsonb,
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_client_name ON public.projects(client_name);

-- ------------------------------------------------------------------------------
-- 5. TASKS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role_required TEXT NOT NULL CHECK (role_required IN ('editor', 'designer', 'smm')),
    assigned_to UUID REFERENCES public.profiles(id),
    description TEXT,
    instructions TEXT,
    reference_files JSONB DEFAULT '[]'::jsonb,
    source_files JSONB DEFAULT '[]'::jsonb,
    deadline TIMESTAMPTZ NOT NULL,
    base_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    performance_points INTEGER NOT NULL DEFAULT 0,
    performance_reward NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'submitted', 'revision_required', 'resubmitted', 'approved', 'completed')),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    first_submitted_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);

-- ------------------------------------------------------------------------------
-- 6. TASK SUBMISSIONS (UNLIMITED VERSION CONTROL V1..Vn)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.task_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL DEFAULT 1,
    uploaded_by UUID NOT NULL REFERENCES public.profiles(id),
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL DEFAULT 0,
    mime_type TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'revision_requested', 'approved')),
    review_notes TEXT,
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_task_id ON public.task_submissions(task_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_task_version ON public.task_submissions(task_id, version_number);

-- ------------------------------------------------------------------------------
-- 7. PERFORMANCE SETTINGS (CONFIGURABLE BY FOUNDER)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.performance_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tier_1_max_hours NUMERIC(4, 2) NOT NULL DEFAULT 2.00,
    tier_1_points INTEGER NOT NULL DEFAULT 500,
    tier_2_max_hours NUMERIC(4, 2) NOT NULL DEFAULT 3.00,
    tier_2_points INTEGER NOT NULL DEFAULT 400,
    tier_3_max_hours NUMERIC(4, 2) NOT NULL DEFAULT 4.00,
    tier_3_points INTEGER NOT NULL DEFAULT 300,
    tier_4_max_hours NUMERIC(4, 2) NOT NULL DEFAULT 5.00,
    tier_4_points INTEGER NOT NULL DEFAULT 200,
    tier_5_points INTEGER NOT NULL DEFAULT 0,
    rate_per_100_pts NUMERIC(10, 2) NOT NULL DEFAULT 50.00,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. PAYMENTS & RAZORPAY / UPI LEDGER
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
    team_member_id UUID NOT NULL REFERENCES public.profiles(id),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    base_fee NUMERIC(10, 2) NOT NULL,
    performance_reward NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'upi' CHECK (payment_method IN ('razorpay_payout', 'upi', 'bank_transfer', 'manual')),
    transaction_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed', 'cancelled', 'refunded')),
    paid_at TIMESTAMPTZ,
    processed_by UUID REFERENCES public.profiles(id),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_team_member ON public.payments(team_member_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- ------------------------------------------------------------------------------
-- 9. CHAT MESSAGES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
    message_text TEXT NOT NULL,
    attachments JSONB DEFAULT '[]'::jsonb,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_conversation ON public.chat_messages(sender_id, recipient_id);
CREATE INDEX IF NOT EXISTS idx_chat_unread ON public.chat_messages(recipient_id, is_read);

-- ------------------------------------------------------------------------------
-- 10. NOTIFICATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'general',
    action_url TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, is_read);

-- ------------------------------------------------------------------------------
-- 11. IMMUTABLE ACTIVITY AUDIT LOGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    module TEXT NOT NULL,
    record_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_module ON public.activity_logs(module);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelancer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelancer_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is founder
CREATE OR REPLACE FUNCTION public.is_founder(user_uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = user_uid AND role = 'founder'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Public can view basic profile; Founder can view/edit all; Users can view/edit their own
CREATE POLICY "Public profile read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "User update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Founder manage profiles" ON public.profiles FOR ALL USING (public.is_founder(auth.uid()));

-- Freelancer Applications: Anyone can submit; only Founder can view and manage
CREATE POLICY "Public can submit application" ON public.freelancer_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Founder can view and manage applications" ON public.freelancer_applications FOR ALL USING (public.is_founder(auth.uid()));

-- Freelancer Onboarding & KYC: Owner can view/update own; Founder can view/verify all; others locked out
CREATE POLICY "User view own KYC" ON public.freelancer_onboarding FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User update own KYC" ON public.freelancer_onboarding FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Founder manage KYC" ON public.freelancer_onboarding FOR ALL USING (public.is_founder(auth.uid()));

-- Projects: Founder full access; Assigned freelancers can view projects they have tasks in
CREATE POLICY "Founder manage projects" ON public.projects FOR ALL USING (public.is_founder(auth.uid()));
CREATE POLICY "Assigned talent view project" ON public.projects FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.tasks 
        WHERE tasks.project_id = projects.id AND tasks.assigned_to = auth.uid()
    )
);

-- Tasks: Founder full access; Freelancers can only view their own assigned tasks
CREATE POLICY "Founder manage tasks" ON public.tasks FOR ALL USING (public.is_founder(auth.uid()));
CREATE POLICY "Freelancer view assigned tasks" ON public.tasks FOR SELECT USING (assigned_to = auth.uid());
CREATE POLICY "Freelancer update task progress" ON public.tasks FOR UPDATE USING (assigned_to = auth.uid());

-- Task Submissions: Founder full access; Freelancer can view and insert submissions for assigned tasks
CREATE POLICY "Founder manage submissions" ON public.task_submissions FOR ALL USING (public.is_founder(auth.uid()));
CREATE POLICY "Freelancer view own submissions" ON public.task_submissions FOR SELECT USING (uploaded_by = auth.uid());
CREATE POLICY "Freelancer insert own submissions" ON public.task_submissions FOR INSERT WITH CHECK (uploaded_by = auth.uid());

-- Performance Settings: Public read; Founder update
CREATE POLICY "Read performance settings" ON public.performance_settings FOR SELECT USING (true);
CREATE POLICY "Founder update performance settings" ON public.performance_settings FOR ALL USING (public.is_founder(auth.uid()));

-- Payments: Founder full access; Freelancers can only view their own payment records
CREATE POLICY "Founder manage payments" ON public.payments FOR ALL USING (public.is_founder(auth.uid()));
CREATE POLICY "Freelancer view own payments" ON public.payments FOR SELECT USING (team_member_id = auth.uid());

-- Chat Messages: Users can only see messages where they are sender or recipient
CREATE POLICY "Chat message participants only" ON public.chat_messages FOR ALL USING (
    auth.uid() = sender_id OR auth.uid() = recipient_id
);

-- Notifications: Users can only view their own notifications
CREATE POLICY "User view own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- Activity Logs: Founder only
CREATE POLICY "Founder view activity logs" ON public.activity_logs FOR SELECT USING (public.is_founder(auth.uid()));
