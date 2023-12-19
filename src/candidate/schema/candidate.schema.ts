import * as mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  startDate: Date,
  endDate: Date,
  description: String,
});
const EducationSchema = new mongoose.Schema({
  institution: String,
  course: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

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
  fcmToken: [String],
  aboutMe: String,
  experience: [ExperienceSchema],
  education: [EducationSchema],
  acceptedJobs: [{}],
  rejectedJobs: [{}],
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
  fcmToken?: string[];
  aboutMe?: String;
  experience?: Experience[];
  education?: Education[];
  acceptedJobs: {}[];
  rejectedJobs: {}[];
}

interface Experience {
  title: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

interface Education {
  institution: string;
  course: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export const CandidateModel = mongoose.model<Candidate>(
  'Candidate',
  CandidateSchema,
);
