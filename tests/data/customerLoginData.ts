import { FailureLoginTestData, SuccessLoginTestData } from '../../types';
import { existsSync, readFileSync } from 'fs';

const TEST_USER_PATH = './.testuser.json';

function getTestUserCredentials() {
  if (!existsSync(TEST_USER_PATH)) {
    throw new Error(
      `Test user file not found: ${TEST_USER_PATH}. Run globalSetup first or ensure storageState.json exists.`
    );
  }
  return JSON.parse(readFileSync(TEST_USER_PATH, 'utf-8'));
}

const globalSetupUser = getTestUserCredentials();

export const successLoginData: SuccessLoginTestData[] = [
  {
    testId: 'TEST-001',
    description: 'Successful customer login redirects to account orders page',
    annotation:
      'Verifies that a registered user can log in with valid credentials and is redirected to the account orders page',
    email: globalSetupUser.email,
    password: globalSetupUser.password,
    expectedUrl: /account\/orders/,
    expectSuccess: true,
    tags: ['@smoke'],
  },
];

export const failureLoginData: FailureLoginTestData[] = [
  {
    testId: 'TEST-002',
    description: 'Invalid email shows error message',
    annotation:
      'Verifies that attempting to log in with a non-registered email displays an error message',
    email: 'invalid@test.com',
    password: globalSetupUser.password,
    expectedUrl: /login/,
    expectSuccess: false,
    expectedError:
      'Your email address or password is incorrect. Try signing in again or reset your password',
    errorType: 'credentials',
    tags: ['@negative'],
  },
  {
    testId: 'TEST-003',
    description: 'Invalid password shows error message',
    annotation:
      'Verifies that attempting to log in with a wrong password displays an error message',
    email: globalSetupUser.email,
    password: 'wrongpassword',
    expectedUrl: /login/,
    expectSuccess: false,
    expectedError:
      'Your email address or password is incorrect. Try signing in again or reset your password',
    errorType: 'credentials',
    tags: ['@negative'],
  },
  {
    testId: 'TEST-004',
    description: 'Empty credentials shows validation error',
    annotation:
      'Verifies that submitting the login form with empty fields displays required field validation errors',
    email: '',
    password: '',
    expectedUrl: /login/,
    expectSuccess: false,
    expectedError: 'Required',
    errorType: 'required',
    tags: ['@negative'],
  },
];
