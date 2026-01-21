export interface LoginTestData {
  testId: string;
  description: string;
  email: string;
  password: string;
  expectedUrl: RegExp;
  tags: string[];
}
