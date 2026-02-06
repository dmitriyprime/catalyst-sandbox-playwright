import { test, expect, APIResponse } from '@playwright/test';
import { customerRegistrationData } from '../data/customerRegistrationData';
import { buildRegistrationFormData } from '../../helpers/registrationFormDataBuilder';

test.describe('User Registration API', { tag: ['@api', '@registration'] }, () => {
  test(
    'TEST-API-005: Should register a new customer via API',
    {
      annotation: {
        type: 'description',
        description:
          'Verifies that a new customer can be registered via API and receive a valid session token.',
      },
    },
    async ({ request }) => {
      const testData = customerRegistrationData[0];
      const regData = testData.regData;

      let response: APIResponse;

      await test.step('Send registration request with user data', async () => {
        const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
        const formData = buildRegistrationFormData(regData, boundary, 'US');

        response = await request.post('/register', {
          headers: {
            'content-type': `multipart/form-data; boundary=----${boundary}`,
            accept: 'text/x-component',
            'next-action': '704a2a96ce70cc7f1348f3e365dbdc7631460c1f57',
            'next-router-state-tree':
              '%5B%22%22%2C%7B%22children%22%3A%5B%5B%22locale%22%2C%22en%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22(default)%22%2C%7B%22children%22%3A%5B%22(auth)%22%2C%7B%22children%22%3A%5B%22register%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D%7D%2Cnull%2Cnull%5D',
          },
          data: formData,
        });
      });

      await test.step('Verify redirect response', async () => {
        expect(response.status()).toBe(303);
      });

      await test.step('Extract and verify session token', async () => {
        const allHeaders = response.headersArray();
        const cookieHeaders = allHeaders.filter(h => h.name.toLowerCase() === 'set-cookie');

        const sessionTokenCookie = cookieHeaders.find(h =>
          h.value.startsWith('__Secure-authjs.session-token=')
        );

        expect(sessionTokenCookie).toBeDefined();

        const sessionToken = sessionTokenCookie?.value.split(';')[0].split('=')[1];
        expect(sessionToken).toBeTruthy();
      });
    }
  );
});
