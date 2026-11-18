'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Project,
  Task,
  TaskSubmission,
  Payment,
  ChatMessage,
  NotificationItem,
  ActivityLogItem,
  FreelancerApplication,
  UserRole,
  PaymentMethod,
} from '@/types';
import {
  initialProfiles,
  initialProjects,
  initialTasks,
  initialSubmissions,
  initialPayments,
  initialMessages,
  initialNotifications,
  initialActivityLogs,
  initialApplications,
} from '@/lib/data-store';
import { sound } from '@/lib/sound';

interface AppContextType {
  currentRole: UserRole;
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  profiles: UserProfile[];
  projects: Project[];
  tasks: Task[];
  submissions: TaskSubmission[];
  payments: Payment[];
  messages: ChatMessage[];
  notifications: NotificationItem[];
  activityLogs: ActivityLogItem[];
  applications: FreelancerApplication[];
  createProject: (data: Partial<Project>) => Project;
  createTask: (data: Partial<Task>) => Task;
  submitDeliverable: (taskId: string, fileData: { name: string; url: string; size: number; notes: string }) => void;
  requestRevision: (taskId: string, notes: string) => void;
  approveDeliverable: (taskId: string) => void;
  disbursePayment: (paymentId: string, method?: PaymentMethod, utr?: string) => void;
  sendMessage: (recipientId: string, text: string, attachments?: { name: string; url: string; size?: string; type?: string }[]) => void;
  approveApplication: (appId: string) => void;
  rejectApplication: (appId: string) => void;
  toggleSuspendFreelancer: (userId: string) => void;
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;
  resetDemoData: () => void;
}

const STORAGE_KEY = 'southclick_os_state_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('founder');
  const [profiles, setProfiles] = useState<UserProfile[]>(initialProfiles);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [submissions, setSubmissions] = useState<TaskSubmission[]>(initialSubmissions);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(initialActivityLogs);
  const [applications, setApplications] = useState<FreelancerApplication[]>(initialApplications);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentRole) setCurrentRole(parsed.currentRole);
        if (parsed.profiles) setProfiles(parsed.profiles);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.submissions) setSubmissions(parsed.submissions);
        if (parsed.payments) setPayments(parsed.payments);
        if (parsed.messages) setMessages(parsed.messages);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.activityLogs) setActivityLogs(parsed.activityLogs);
        if (parsed.applications) setApplications(parsed.applications);
      }
    } catch {
      // Fallback to initial state
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage whenever state changes after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToPersist = {
        currentRole,
        profiles,
        projects,
        tasks,
        submissions,
        payments,
        messages,
        notifications,
        activityLogs,
        applications,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch {
      // Quota or storage access fallback
    }
  }, [
    isHydrated,
    currentRole,
    profiles,
    projects,
    tasks,
    submissions,
    payments,
    messages,
    notifications,
    activityLogs,
    applications,
  ]);

  const currentUser = profiles.find((p) => p.role === currentRole) || profiles[0];

  const switchRole = (role: UserRole) => {
    sound.playSwitch();
    setCurrentRole(role);
  };

  const resetDemoData = () => {
    sound.playSuccess();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage fallback
    }
    setCurrentRole('founder');
    setProfiles(initialProfiles);
    setProjects(initialProjects);
    setTasks(initialTasks);
    setSubmissions(initialSubmissions);
    setPayments(initialPayments);
    setMessages(initialMessages);
    setNotifications(initialNotifications);
    setActivityLogs(initialActivityLogs);
    setApplications(initialApplications);
  };

  const addAuditLog = (action: string, module: string, record_id: string, details: Record<string, unknown> = {}) => {
    const newLog: ActivityLogItem = {
      id: `log_${Date.now()}`,
      user_id: currentUser.id,
      user_name: currentUser.full_name,
      action,
      module,
      record_id,
      details,
      ip_address: '49.207.210.12',
      created_at: new Date().toISOString(),
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const createProject = (data: Partial<Project>): Project => {
    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name: data.name || 'Untitled Campaign',
      client_name: data.client_name || 'Independent Client',
      description: data.description,
      project_type: data.project_type || 'reels',
      priority: data.priority || 'high',
      status: 'active',
      budget: Number(data.budget) || 25000,
      start_date: data.start_date || new Date().toISOString().split('T')[0],
      deadline: data.deadline || new Date(Date.now() + 7 * 86400000).toISOString(),
      instructions: data.instructions,
      created_by: currentUser.id,
      created_at: new Date().toISOString(),
    };

    sound.playSuccess();
    setProjects((prev) => [newProject, ...prev]);
    addAuditLog('CREATED_PROJECT', 'Projects', newProject.id, { name: newProject.name, budget: newProject.budget });
    return newProject;
  };

  const createTask = (data: Partial<Task>): Task => {
    const newTask: Task = {
      id: `tsk_${Date.now()}`,
      project_id: data.project_id || (projects[0]?.id || 'proj_01'),
      project_name: data.project_name || (projects.find(p => p.id === data.project_id)?.name || 'Project'),
      client_name: data.client_name || (projects.find(p => p.id === data.project_id)?.client_name || 'Client'),
      name: data.name || 'New Task',
      role_required: data.role_required || 'editor',
      assigned_to: data.assigned_to,
      description: data.description,
      deadline: data.deadline || new Date(Date.now() + 86400000).toISOString(),
      base_fee: Number(data.base_fee) || 500,
      performance_points: 0,
      performance_reward: 0,
      status: 'assigned',
      assigned_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    sound.playSwitch();
    setTasks((prev) => [newTask, ...prev]);
    addAuditLog('ASSIGNED_TASK', 'Tasks', newTask.id, { task: newTask.name, fee: newTask.base_fee, assigned_to: newTask.assigned_to });

    if (newTask.assigned_to) {
      const assignedUser = profiles.find((p) => p.id === newTask.assigned_to);
      if (assignedUser) {
        setNotifications((prev) => [
          {
            id: `notif_${Date.now()}`,
            user_id: assignedUser.id,
            title: `New Task Assigned: ${newTask.name}`,
            message: `Base fee ₹${newTask.base_fee}. Complete within 2 hours to earn up to ₹250 speed bonus!`,
            type: 'task',
            is_read: false,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    }

    return newTask;
  };

  const submitDeliverable = (taskId: string, fileData: { name: string; url: string; size: number; notes: string }) => {
    const currentTask = tasks.find((t) => t.id === taskId);
    if (!currentTask) return;

    const existingSubmissions = submissions.filter((s) => s.task_id === taskId);
    const versionNumber = existingSubmissions.length + 1;

    let points = 0;
    let bonus = 0;
    if (currentTask.assigned_at) {
      const durationHours = (Date.now() - new Date(currentTask.assigned_at).getTime()) / (1000 * 60 * 60);
      if (durationHours <= 2) {
        points = 500;
        bonus = 250;
      } else if (durationHours <= 4) {
        points = 200;
        bonus = 100;
      } else if (durationHours <= 8) {
        points = 50;
        bonus = 0;
      }
    }

    const newSub: TaskSubmission = {
      id: `sub_${Date.now()}`,
      task_id: taskId,
      version_number: versionNumber,
      uploaded_by: currentUser.id,
      uploader_name: currentUser.full_name,
      file_url: fileData.url,
      file_name: fileData.name,
      file_size_bytes: fileData.size,
      mime_type: 'video/mp4',
      notes: fileData.notes,
      status: 'submitted',
      created_at: new Date().toISOString(),
    };

    sound.playSuccess();
    setSubmissions((prev) => [newSub, ...prev]);

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'submitted',
              first_submitted_at: t.first_submitted_at || new Date().toISOString(),
              performance_points: points || t.performance_points,
              performance_reward: bonus || t.performance_reward,
            }
          : t
      )
    );

    addAuditLog('SUBMITTED_CUT', 'QualityControl', newSub.id, {
      task: currentTask.name,
      version: versionNumber,
      file: fileData.name,
    });

    const founder = profiles.find((p) => p.role === 'founder');
    if (founder) {
      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          user_id: founder.id,
          title: `Cut V${versionNumber} Submitted`,
          message: `${currentUser.full_name} submitted Cut V${versionNumber} for ${currentTask.name}. Stage 7 QC required.`,
          type: 'task',
          is_read: false,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  const requestRevision = (taskId: string, notes: string) => {
    sound.playSwitch();
    setSubmissions((prev) =>
      prev.map((s) =>
        s.task_id === taskId && s.status === 'submitted'
          ? { ...s, status: 'revision_requested', review_notes: notes, reviewed_at: new Date().toISOString() }
          : s
      )
    );

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: 'revision_required' } : t
      )
    );

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.assigned_to) {
      addAuditLog('REQUESTED_REVISION', 'QualityControl', taskId, { notes });
      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          user_id: task.assigned_to!,
          title: `Revision Requested: ${task.name}`,
          message: notes,
          type: 'revision',
          is_read: false,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  const approveDeliverable = (taskId: string) => {
    sound.playSuccess();
    setSubmissions((prev) =>
      prev.map((s) =>
        s.task_id === taskId && s.status === 'submitted'
          ? { ...s, status: 'approved', review_notes: 'Approved! Clean sound and master grade. Client signed off.', reviewed_at: new Date().toISOString() }
          : s
      )
    );

    let approvedTask: Task | undefined;
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          approvedTask = { ...t, status: 'approved', approved_at: new Date().toISOString() };
          return approvedTask;
        }
        return t;
      })
    );

    if (approvedTask && approvedTask.assigned_to) {
      const assignedUser = profiles.find((p) => p.id === approvedTask!.assigned_to);
      const totalPayout = (approvedTask.base_fee || 500) + (approvedTask.performance_reward || 0);

      const newPayment: Payment = {
        id: `pay_${Date.now()}`,
        task_id: approvedTask.id,
        task_name: approvedTask.name,
        team_member_id: approvedTask.assigned_to,
        team_member_name: assignedUser?.full_name || 'Freelancer',
        project_id: approvedTask.project_id,
        base_fee: approvedTask.base_fee,
        performance_reward: approvedTask.performance_reward,
        total_amount: totalPayout,
        payment_method: 'upi',
        status: 'pending',
        notes: `QC Approved. Base ₹${approvedTask.base_fee} + Speed Bonus ₹${approvedTask.performance_reward || 0}`,
        created_at: new Date().toISOString(),
      };

      setPayments((prev) => [newPayment, ...prev]);

      addAuditLog('APPROVED_DELIVERABLE', 'QualityControl', taskId, {
        task: approvedTask.name,
        payoutQueued: totalPayout,
      });

      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          user_id: approvedTask!.assigned_to!,
          title: `Cut Approved! Payout Queued: ₹${totalPayout}`,
          message: `Your deliverable for ${approvedTask!.name} was approved! Instant UPI release queued.`,
          type: 'approval',
          is_read: false,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  const disbursePayment = (paymentId: string, method: PaymentMethod = 'upi', utr?: string) => {
    sound.playPayoutCoin();
    const mockUtr = utr || `43${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    let paidItem: Payment | undefined;
    setPayments((prev) =>
      prev.map((p) => {
        if (p.id === paymentId) {
          const updated: Payment = {
            ...p,
            status: 'paid',
            paid_at: new Date().toISOString(),
            payment_method: method,
            transaction_id: mockUtr,
          };
          paidItem = updated;
          return updated;
        }
        return p;
      })
    );

    if (paidItem) {
      addAuditLog('DISBURSED_PAYOUT', 'Payouts', paymentId, {
        amount: paidItem.total_amount,
        recipient: paidItem.team_member_name,
        method,
        utr: mockUtr,
      });

      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          user_id: paidItem!.team_member_id,
          title: `Payout Disbursed: ₹${paidItem!.total_amount}`,
          message: `Instant UPI transfer completed. UTR: ${mockUtr}`,
          type: 'payment',
          is_read: false,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  const sendMessage = (
    recipientId: string,
    text: string,
    attachments?: { name: string; url: string; size?: string; type?: string }[]
  ) => {
    const recipient = profiles.find((p) => p.id === recipientId);
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender_id: currentUser.id,
      sender_name: currentUser.full_name,
      recipient_id: recipientId,
      recipient_name: recipient?.full_name || 'Team Member',
      message_text: text,
      attachments: attachments?.map((a) => ({
        name: a.name,
        url: a.url,
        size: a.size || '1.0 MB',
        type: a.type || 'file',
      })),
      is_read: false,
      created_at: new Date().toISOString(),
    };

    sound.playSwitch();
    setMessages((prev) => [...prev, newMsg]);
  };

  const approveApplication = (appId: string) => {
    sound.playSuccess();
    const app = applications.find((a) => a.id === appId);
    if (!app) return;

    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'approved' } : a))
    );

    const newProfile: UserProfile = {
      id: `user_${Date.now()}`,
      email: app.email,
      full_name: app.full_name,
      role: app.role,
      status: 'active',
      phone: app.phone,
      whatsapp: app.whatsapp,
      location: app.location,
      bio: `Verified Freelancer (${app.experience_years} exp).`,
      avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      specialized_categories: [app.role === 'editor' ? 'Video Editing' : 'Graphic Design'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setProfiles((prev) => [...prev, newProfile]);
    addAuditLog('APPROVED_FREELANCER', 'Team', newProfile.id, { name: newProfile.full_name, role: newProfile.role });
  };

  const rejectApplication = (appId: string) => {
    sound.playSwitch();
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'rejected' } : a))
    );
    addAuditLog('REJECTED_APPLICATION', 'Applications', appId);
  };

  const toggleSuspendFreelancer = (userId: string) => {
    sound.playSwitch();
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === userId) {
          const nextStatus = p.status === 'active' ? 'suspended' : 'active';
          addAuditLog(nextStatus === 'suspended' ? 'SUSPENDED_MEMBER' : 'REACTIVATED_MEMBER', 'Team', userId, {
            name: p.full_name,
          });
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, is_read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    sound.playSwitch();
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        profiles,
        projects,
        tasks,
        submissions,
        payments,
        messages,
        notifications,
        activityLogs,
        applications,
        createProject,
        createTask,
        submitDeliverable,
        requestRevision,
        approveDeliverable,
        disbursePayment,
        sendMessage,
        approveApplication,
        rejectApplication,
        toggleSuspendFreelancer,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
