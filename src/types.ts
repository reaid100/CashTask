/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number; // in Taka (৳)
  category: "Video" | "Survey" | "App" | "Social";
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: string;
  completed: boolean;
  videoUrl?: string; // or mock player content
  questions?: SurveyQuestion[];
}

export interface SurveyQuestion {
  id: number;
  questionText: string;
  options: string[];
  selectedOption?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  paymentMethod: "bKash" | "Nagad";
  phoneNumber: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  referenceId: string;
}

export interface Wallet {
  balance: number;
  todayEarnings: number;
  completedTasksCount: number;
  totalReferrals: number;
  transactions: Transaction[];
}

export interface ReferredUser {
  id: string;
  name: string;
  joinedAt: string;
  status: "Active" | "Pending Reward";
  rewardClaimed: boolean;
}

export interface GeneratedCopy {
  headline: string;
  email: string;
  blast: string;
  cta: string;
}
