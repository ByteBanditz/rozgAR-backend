export class CreateCandidateDto {
  readonly name: string;
  readonly age: number;
  readonly designation: string;
  readonly prefferedLocation: string;
  readonly resume: string;
  readonly gender: string;
  readonly phone: string;
  readonly skills: string[];
  readonly image: string;
  readonly educationLevel: string;
  readonly email: string;
  readonly lookingForJob: boolean;
}
