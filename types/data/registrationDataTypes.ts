export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  phoneNumber: string;
  addressLineOne: string;
  addressLineTwo: string;
  suburbCity: string;
  stateProvince: string;
  zipPostcode: string;
  country: string;
}

export interface RegistrationTestData {
  testId: string;
  description: string;
  annotation: string | undefined;
  expectedUrl: RegExp;
  tags: string[];
  regData: RegistrationFormData;
}
