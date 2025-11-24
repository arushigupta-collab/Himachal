export enum UserRole {
  CITIZEN = 'CITIZEN',
  GRO = 'GRO', // Grievance Redressal Officer
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  mobile: string;
}

export enum GrievanceStatus {
  SUBMITTED = 'Submitted',
  UNDER_REVIEW = 'Under Review',
  IN_PROGRESS = 'In Progress',
  PENDING = 'Pending',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
  REOPENED = 'Reopened',
}

export interface TimelineEvent {
  label: string;
  date: string;
  status: 'completed' | 'pending' | 'current';
}

export interface GrievanceReply {
  author: string;
  message: string;
  date: string;
}

export interface Grievance {
  id: string;
  subject: string;
  description: string;
  location: string;
  district: string;
  category: string;
  dateFiled: string;
  status: string;
  files: string[]; // Storing file names for demo
  atr?: string; // Action Taken Report
  lastUpdated: string;
  isAnonymized: boolean;
  timeline: TimelineEvent[];
  replies: GrievanceReply[];
  
  // New fields for detailed status view
  assignedOfficer?: string;
  resolution?: string;
  closingOfficer?: string;
}

export interface ChatbotData {
  subject?: string;
  description?: string;
  category?: string;
  district?: string;
}

export interface StatCardProps {
  title: string;
  count: number;
  color: string;
  onClick?: () => void;
}