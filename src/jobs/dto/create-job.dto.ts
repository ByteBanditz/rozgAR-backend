export class CreateJobDto {
  readonly postName: string;
  readonly employerName: string;
  readonly location: string;
  readonly reqQualification: string;
  readonly salary: string;
  readonly requiredSkills: string[];
  readonly vacancies: string;
  readonly image: string;
  readonly minAge: string;
  readonly experience: string;
  readonly gender: string;
  readonly description: string;
  readonly applicants?: string[];
}
