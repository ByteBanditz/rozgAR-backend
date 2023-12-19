import * as mongoose from 'mongoose';

export const CandidateSchema = new mongoose.Schema({
  name: String,
  age: Number,
  designation: String,
  prefferedLocation: String,
  resume: String,
  gender: String,
  phone: String,
  skills: [String],
  image: String,
  educationLevel: String,
  email: String,
  lookingForJob: Boolean,
});

export interface Candidate extends mongoose.Document {
  name?: string;
  age?: number;
  designation?: string;
  prefferedLocation?: string;
  resume?: string;
  gender?: string;
  phone?: string;
  skills?: string[];
  image?: string;
  educationLevel?: string;
  email?: string;
  lookingForJob: boolean;
}

export const CandidateModel = mongoose.model<Candidate>(
  'Candidate',
  CandidateSchema,
);
