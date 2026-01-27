interface BaseLoginTestData {
  testId: string;
  description: string;
  annotation: string;
  email: string;
  password: string;
  expectedUrl: RegExp;
  tags: string[];
}

export interface SuccessLoginTestData extends BaseLoginTestData {
  expectSuccess: true;
}

export interface FailureLoginTestData extends BaseLoginTestData {
  expectSuccess: false;
  expectedError: string;
  errorType: 'required' | 'credentials';
}

export type LoginTestData = SuccessLoginTestData | FailureLoginTestData;
