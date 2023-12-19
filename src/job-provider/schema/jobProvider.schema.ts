import * as mongoose from 'mongoose';

export const JobProviderSchema = new mongoose.Schema({
  organisationName: String,
  organisationCategory: String,
  location: String,
  website: String,
  organisationPAN: String,
  email: String,
  phone: String,
});

export interface JobProvider extends mongoose.Document {
  organisationName?: string;
  organisationCategory?: string;
  location?: string;
  website?: string;
  organisationPAN?: string;
  email?: string;
  phone?: string;
}

export const CandidateModel = mongoose.model<JobProvider>(
  'JobProvider',
  JobProviderSchema,
);
