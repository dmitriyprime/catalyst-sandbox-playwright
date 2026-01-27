import { RegistrationTestData } from '../../types';

export const customerRegistrationData: RegistrationTestData[] = [
  {
    testId: 'TEST-006',
    description: 'Should register a new customer successfully',
    annotation:
      'Verifies that a new customer can successfully complete registration with valid data and is redirected to the account orders page',
    regData: {
      firstName: 'John',
      lastName: 'Smith',
      email: `test.user+${Date.now()}@example.com`,
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!',
      companyName: 'Acme Corporation',
      phoneNumber: '+1 555-123-4567',
      addressLineOne: '123 Main Street',
      addressLineTwo: 'Suite 100',
      suburbCity: 'New York',
      stateProvince: 'New York',
      zipPostcode: '10001',
      country: 'United States',
    },
    expectedUrl: /\/(account\/orders)/i,
    tags: ['@smoke', '@registration'],
  },
];
