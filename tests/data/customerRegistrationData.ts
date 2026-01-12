import { RegistrationTestData } from "../../types";

export const customerRegistrationData: RegistrationTestData[] = [
  {
    testId: "TEST-005",
    description: "Should register a new customer successfully",
    regData: {
      firstName: "John",
      lastName: "Smith",
      email: `test.user+${Date.now()}@example.com`,
      password: "SecurePass123!",
      confirmPassword: "SecurePass123!",
      companyName: "Acme Corporation",
      phoneNumber: "+1 555-123-4567",
      addressLineOne: "123 Main Street",
      addressLineTwo: "Suite 100",
      suburbCity: "New York",
      stateProvince: "New York",
      zipPostcode: "10001",
      country: "United States",
    },
    expectedUrl: /\/(account\/orders)/i,
  },
];
