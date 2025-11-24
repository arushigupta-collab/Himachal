import { Grievance, GrievanceStatus } from './types';

export const MOCK_GRIEVANCES: Grievance[] = [
  {
    id: "HP-2024-089",
    subject: "Water Supply Disruption in Ward 4",
    description: "The water supply in Ward No. 4, Mandi has been irregular for the past week. We are only receiving water for 20 minutes in the morning.",
    location: "Mandi Town",
    district: "Mandi",
    category: "Water Supply",
    dateFiled: "2024-06-15",
    status: GrievanceStatus.UNDER_REVIEW,
    files: ["complaint_letter.jpg"],
    lastUpdated: "2024-06-16",
    isAnonymized: false,
    assignedOfficer: "Sh. Rajesh Kumar (Executive Engineer, Jal Shakti Vibhag)",
    timeline: [
      { label: "Grievance Filed", date: "2024-06-15", status: "completed" },
      { label: "Assigned to Department", date: "2024-06-16", status: "completed" },
      { label: "Under Review", date: "2024-06-16", status: "current" }
    ],
    replies: []
  },
  {
    id: "HP-2024-042",
    subject: "Request for Street Light Repair",
    description: "The street light outside House No. 45, Sector 2, Shimla has been non-functional for 2 weeks. It is causing safety issues at night.",
    location: "Sector 2, Shimla",
    district: "Shimla",
    category: "Electricity",
    dateFiled: "2024-06-01",
    status: GrievanceStatus.CLOSED,
    files: ["streetlight_photo.jpg"],
    atr: "Repaired.",
    lastUpdated: "2024-06-05",
    isAnonymized: false,
    resolution: "The street light has been repaired and the bulb has been replaced with a new LED fixture. Verified by on-site inspection.",
    closingOfficer: "Smt. Priya Sharma (Assistant Engineer, HPSEB)",
    timeline: [
      { label: "Grievance Filed", date: "2024-06-01", status: "completed" },
      { label: "Under Review", date: "2024-06-02", status: "completed" },
      { label: "Closed", date: "2024-06-05", status: "completed" }
    ],
    replies: [
      { author: "Nodal Officer", message: "The maintenance team has been dispatched.", date: "2024-06-02" }
    ]
  },
  {
    id: "HP-2024-095",
    subject: "Application for Pension Scheme",
    description: "I have submitted my application for the old age pension scheme but have not received an acknowledgment number.",
    location: "Rural Hamirpur",
    district: "Hamirpur",
    category: "Social Welfare",
    dateFiled: "2024-06-18",
    status: GrievanceStatus.SUBMITTED,
    files: [],
    lastUpdated: "2024-06-18",
    isAnonymized: true,
    timeline: [
      { label: "Grievance Filed", date: "2024-06-18", status: "current" }
    ],
    replies: []
  }
];

export const DISTRICTS = [
  "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", 
  "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
];

export const CATEGORIES = [
  "Roads & Transport",
  "Water Supply",
  "Electricity",
  "Health & Sanitation",
  "Education",
  "Social Welfare",
  "Police & Law",
  "Others"
];