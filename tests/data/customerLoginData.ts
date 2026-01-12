import { LoginTestData } from "../../types";

export const validLoginData: LoginTestData[] = [
  {
    testId: "TEST-001",
    description: "Successful customer login redirects to account orders page",
    email: "kogut.dmitriy@gmail.com",
    password: "Mc2025Mc@",
    expectedUrl: /account\/orders/,
    tags: ["@smoke"],
  },
];

export const invalidLoginData: LoginTestData[] = [
  {
    testId: "TEST-002",
    description: "Invalid email shows error message",
    email: "invalid@test.com",
    password: "Mc2025Mc@",
    expectedUrl: /login/,
  },
  {
    testId: "TEST-003",
    description: "Invalid password shows error message",
    email: "kogut.dmitriy@gmail.com",
    password: "wrongpassword",
    expectedUrl: /login/,
  },
  {
    testId: "TEST-004",
    description: "Empty credentials shows validation error",
    email: "",
    password: "",
    expectedUrl: /login/,
  },
];
