import { LoginTestData } from '../../types';

export const loginData: LoginTestData[] = [
  {
    testId: 'TEST-001',
    description: 'Successful customer login redirects to account orders page',
    email: 'kogut.dmitriy@gmail.com',
    password: 'Mc2025Mc@',
    expectedUrl: /account\/orders/,
    tags: ['@smoke'],
  },
  {
    testId: 'TEST-002',
    description: 'Invalid email shows error message',
    email: 'invalid@test.com',
    password: 'Mc2025Mc@',
    expectedUrl: /login/,
    tags: ['@negative'],
  },
  {
    testId: 'TEST-003',
    description: 'Invalid password shows error message',
    email: 'kogut.dmitriy@gmail.com',
    password: 'wrongpassword',
    expectedUrl: /login/,
    tags: ['@negative'],
  },
  {
    testId: 'TEST-004',
    description: 'Empty credentials shows validation error',
    email: '',
    password: '',
    expectedUrl: /login/,
    tags: ['@negative'],
  },
];
