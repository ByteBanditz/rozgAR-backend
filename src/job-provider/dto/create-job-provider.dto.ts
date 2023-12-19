export class CreateJobProviderDto {
  readonly organisationName: string;
  readonly organisationCategory: string;
  readonly location: string;
  readonly website: string;
  readonly organisationPAN: string;
  readonly email: string;
  readonly phone: string;
  readonly password: string;
}

export class LoginJobProviderDto {
  readonly email: string;
  readonly password: string;
}
