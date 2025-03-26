export interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  category: string;
  createdAt: string;
  isEmergency: boolean;
  tracking: TrackingEvent[];
}

export interface DocumentVerification {
  id: string;
  documentType: string;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: string;
}

export interface DisasterAlert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  location: string;
  description: string;
  timestamp: string;
}

type TrackingEvent = {
  date: string;
  status: string;
  description: string;
};