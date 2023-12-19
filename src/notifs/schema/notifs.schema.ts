import * as mongoose from 'mongoose';
import {
  Candidate,
  CandidateSchema,
} from 'src/candidate/schema/candidate.schema';

export const NotifsSchema = new mongoose.Schema({
  fcmToken: String,
  message: String,
  title: String,
  isRead: Boolean,
  alertType: String,
  candidate: CandidateSchema,
});

export interface Notifs extends mongoose.Document {
  fcmToken?: string;
  message?: string;
  title?: string;
  isRead: boolean;
  alertType: string;
  applicants?: Candidate;
}

export const JobsModel = mongoose.model<Notification>('Notifs', NotifsSchema);
