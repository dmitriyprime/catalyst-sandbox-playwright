import { test, expect, APIResponse } from '@playwright/test';
import { customerRegistrationData } from '../data/customerRegistrationData';
import { buildRegistrationFormData } from '../../helpers/registrationFormDataBuilder';

test.describe('User Registration API', { tag: ['@api', '@registration'] }, () => {
  test.skip(
    'TEST-API-005: Should register a new customer via API',
    {
      annotation: {
        type: 'description',
        description:
          'Verifies that a new customer can be registered via API and receive a valid session token. SKIPPED: Requires manual next-action header update.',
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
