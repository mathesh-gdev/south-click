-- ==============================================================================
-- SOUTH CLICK SEED DATA - AUTHENTIC INDIAN AGENCY MOCK ECOSYSTEM
-- ==============================================================================

-- 1. Performance Settings
INSERT INTO public.performance_settings (
    id, tier_1_max_hours, tier_1_points, tier_2_max_hours, tier_2_points,
    tier_3_max_hours, tier_3_points, tier_4_max_hours, tier_4_points,
    tier_5_points, rate_per_100_pts
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    2.00, 500,
    3.00, 400,
    4.00, 300,
    5.00, 200,
    0, 50.00
) ON CONFLICT (id) DO NOTHING;

-- 2. Profiles
INSERT INTO public.profiles (
    id, email, full_name, role, status, phone, whatsapp, location, bio, specialized_categories
) VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'founder@southclick.com',
    'Dhushyandh Founder',
    'founder',
    'active',
    '+91 98401 23456',
    '+91 98401 23456',
    'Bengaluru, Karnataka',
    'Founder & Creative Operations Lead at South Click Agency.',
    '["Agency Operations", "Client Growth", "Creative Direction"]'::jsonb
),
(
    '00000000-0000-0000-0000-000000000002',
    'arun.editor@gmail.com',
    'Arun Vignesh',
    'editor',
    'active',
    '+91 98450 11223',
    '+91 98450 11223',
    'Chennai, Tamil Nadu',
    'Senior Video Editor specializing in fast-paced 9:16 vertical reels, audio mastering, and motion cuts.',
    '["Reel Editing", "YouTube Cuts", "Color Grading", "Motion Graphics"]'::jsonb
),
(
    '00000000-0000-0000-0000-000000000003',
    'priya.designer@gmail.com',
    'Priya Sharma',
    'designer',
    'active',
    '+91 99201 33445',
    '+91 99201 33445',
    'Mumbai, Maharashtra',
    'Brand & Social Media Graphic Designer with expertise in Photoshop, Illustrator, and typography.',
    '["Poster Design", "Social Media Creatives", "Thumbnails", "Branding"]'::jsonb
),
(
    '00000000-0000-0000-0000-000000000004',
    'karthik.smm@gmail.com',
    'Karthik Narayanan',
    'smm',
    'active',
    '+91 97410 55667',
    '+91 97410 55667',
    'Kochi, Kerala',
    'Social Media Strategist managing content calendars, caption copy, and engagement analytics.',
    '["Content Planning", "Content Calendar", "Social Media Posting", "Analytics"]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- 3. Onboarding & KYC
INSERT INTO public.freelancer_onboarding (
    id, user_id, dob, address, emergency_contact,
    aadhaar_number_masked, pan_number, bank_account_holder, bank_name,
    bank_account_no, bank_ifsc, upi_id, kyc_status, verified_at
) VALUES 
(
    'b0000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    '1997-04-12',
    'Flat 402, Green Avenue, Indiranagar, Bengaluru, 560038',
    '+91 98450 99887 (Father)',
    'XXXX-XXXX-4921',
    'ABCDE1234F',
    'Arun Vignesh',
    'HDFC Bank Ltd.',
    '50100492817291',
    'HDFC0001234',
    'arun.editor@okhdfcbank',
    'verified',
    NOW() - INTERVAL '10 days'
),
(
    'b0000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000003',
    '1999-08-23',
    'B-12 Sea View Apartments, Bandra West, Mumbai, 400050',
    '+91 99201 88776 (Mother)',
    'XXXX-XXXX-7182',
    'BPYPS5678K',
    'Priya Sharma',
    'ICICI Bank Ltd.',
    '002301582910',
    'ICIC0000023',
    'priya.creative@icici',
    'verified',
    NOW() - INTERVAL '8 days'
) ON CONFLICT (id) DO NOTHING;

-- 4. Projects
INSERT INTO public.projects (
    id, name, client_name, description, project_type, priority, status, budget, deadline, created_by
) VALUES 
(
    'c0000000-0000-0000-0000-000000000001',
    'GreenCart - Product Launch Campaign',
    'GreenCart Organics',
    'Launch campaign for organic cold-pressed beverage line across Instagram Reels and YouTube shorts.',
    'reels',
    'high',
    'active',
    85000.00,
    NOW() + INTERVAL '5 days',
    '00000000-0000-0000-0000-000000000001'
),
(
    'c0000000-0000-0000-0000-000000000002',
    'Nexa Foods - Chef Masterclass',
    'Nexa Global Foods',
    'YouTube 16:9 4K 12-minute episode and accompanying recipe thumbnail creatives.',
    'youtube',
    'normal',
    'active',
    45000.00,
    NOW() + INTERVAL '7 days',
    '00000000-0000-0000-0000-000000000001'
),
(
    'c0000000-0000-0000-0000-000000000003',
    'StyleHub - Winter Festive Creatives',
    'StyleHub Fashion',
    'Instagram carousel posters and promotional flash sale story graphics.',
    'social_design',
    'urgent',
    'completed',
    35000.00,
    NOW() - INTERVAL '1 day',
    '00000000-0000-0000-0000-000000000001'
) ON CONFLICT (id) DO NOTHING;

-- 5. Tasks
INSERT INTO public.tasks (
    id, project_id, name, role_required, assigned_to, description,
    deadline, base_fee, performance_points, performance_reward, status,
    assigned_at, started_at, first_submitted_at, approved_at
) VALUES 
(
    'd0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'Reel 01 - Hero Product Teaser',
    'editor',
    '00000000-0000-0000-0000-000000000002',
    '9:16 vertical fast cut reel with energetic music hook, fruit splash transitions, and bold typography.',
    NOW() + INTERVAL '4 hours',
    500.00,
    500,
    250.00,
    'approved',
    NOW() - INTERVAL '4 hours',
    NOW() - INTERVAL '3 hours 50 mins',
    NOW() - INTERVAL '2 hours 10 mins', -- 1h 40m turnaround -> 500 pts / Rs 250
    NOW() - INTERVAL '30 mins'
),
(
    'd0000000-0000-0000-0000-000000000002',
    'c0000000-0000-0000-0000-000000000001',
    'Poster 01 - Launch Offer Creative',
    'designer',
    '00000000-0000-0000-0000-000000000003',
    '1080x1080 Instagram feed poster showcasing the launch bundle with 20% discount offer badge.',
    NOW() + INTERVAL '1 day',
    350.00,
    400,
    200.00,
    'submitted',
    NOW() - INTERVAL '3 hours',
    NOW() - INTERVAL '2 hours 50 mins',
    NOW() - INTERVAL '30 mins',
    NULL
) ON CONFLICT (id) DO NOTHING;

-- 6. Task Submissions (V1 & V2)
INSERT INTO public.task_submissions (
    id, task_id, version_number, uploaded_by, file_url, file_name, file_size_bytes,
    mime_type, notes, status, review_notes
) VALUES 
(
    'e0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    1,
    '00000000-0000-0000-0000-000000000002',
    'https://storage.googleapis.com/southclick-assets/greencart_reel_v1.mp4',
    'greencart_reel_v1.mp4',
    184549382,
    'video/mp4',
    'First draft master cut. Synchronized beats to first 3 fruit cuts.',
    'revision_requested',
    'Great pacing! Please lower BGM volume by 3dB during voiceover at 0:08s and update end logo.'
),
(
    'e0000000-0000-0000-0000-000000000002',
    'd0000000-0000-0000-0000-000000000001',
    2,
    '00000000-0000-0000-0000-000000000002',
    'https://storage.googleapis.com/southclick-assets/greencart_reel_v2_final_cut.mp4',
    'greencart_reel_v2_final_cut.mp4',
    248629104,
    'video/mp4',
    'V2 Revision: Lowered BGM by 3dB, added motion blur splash, replaced end logo with 4K asset.',
    'approved',
    'Approved! Master delivered to client.'
) ON CONFLICT (id) DO NOTHING;

-- 7. Payments
INSERT INTO public.payments (
    id, task_id, team_member_id, project_id, base_fee, performance_reward,
    total_amount, payment_method, transaction_id, status, paid_at
) VALUES 
(
    'f0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    'c0000000-0000-0000-0000-000000000001',
    500.00,
    250.00,
    750.00,
    'upi',
    '431902847192',
    'paid',
    NOW() - INTERVAL '15 mins'
) ON CONFLICT (id) DO NOTHING;

-- 8. Activity Logs
INSERT INTO public.activity_logs (
    id, user_id, action, module, record_id, details
) VALUES 
(
    '90000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'APPROVED_FREELANCER',
    'team',
    '00000000-0000-0000-0000-000000000002',
    '{"name": "Arun Vignesh", "role": "editor"}'::jsonb
),
(
    '90000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'ASSIGNED_TASK',
    'tasks',
    'd0000000-0000-0000-0000-000000000001',
    '{"task": "Reel 01 - Hero Product Teaser", "assigned_to": "Arun Vignesh", "fee": 500}'::jsonb
),
(
    '90000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    'SUBMITTED_DELIVERABLE_V1',
    'submissions',
    'e0000000-0000-0000-0000-000000000001',
    '{"turnaround_hours": 1.67, "points_earned": 500}'::jsonb
),
(
    '90000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000001',
    'APPROVED_DELIVERABLE_V2',
    'submissions',
    'e0000000-0000-0000-0000-000000000002',
    '{"bonus": 250, "total_payable": 750}'::jsonb
),
(
    '90000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000001',
    'DISBURSED_PAYMENT',
    'payments',
    'f0000000-0000-0000-0000-000000000001',
    '{"method": "upi", "utr": "431902847192", "amount": 750}'::jsonb
);
