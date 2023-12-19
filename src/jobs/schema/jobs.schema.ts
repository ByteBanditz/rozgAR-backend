import * as mongoose from 'mongoose';
import {
  Candidate,
  CandidateSchema,
} from 'src/candidate/schema/candidate.schema';

export const JobsSchema = new mongoose.Schema({
  postName: String,
  employerName: String,
  location: String,
  reqQualification: String,
  salary: String,
  vacancies: String,
  minAge: String,
  experience: String,
  gender: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  applicants: [CandidateSchema],
});

export interface Jobs extends mongoose.Document {
  postName?: string;
  employerName?: string;
  location?: string;
  reqQualification?: string;
  salary?: string;
  vacancies?: string;
  minAge?: string;
  experience?: string;
  gender?: string;
  description?: string;
  createdAt?: Date;
  applicants?: Candidate[];
}

export const JobsModel = mongoose.model<Jobs>('Jobs', JobsSchema);
