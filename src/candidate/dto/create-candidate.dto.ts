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
  readonly fcmToken: string[];
  readonly email: string;
  readonly lookingForJob: boolean;
  readonly aboutMe: string;
  readonly experience: ExperienceDto[];
  readonly education: EducationDto[];
}

export class ExperienceDto {
  readonly title: string;
  readonly company: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly description: string;
}

export class EducationDto {
  readonly institution: string;
  readonly course: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly description: string;
}
