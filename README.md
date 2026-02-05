# Catalyst Sandbox Playwright

End-to-end and API test automation framework for [BigCommerce Catalyst](https://www.bigcommerce.com/solutions/headless-commerce/) storefront using Playwright.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [CI/CD](#cicd)
- [Contributing](#contributing)

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dmitriyprime/catalyst-sandbox-playwright.git
cd catalyst-sandbox-playwright
```

2. Install dependencies:
```bash
npm ci
```

3. Install Playwright browsers:
```bash
npx playwright install --with-deps chromium
```

## Configuration

1. Create a `.env` file in the project root:
```env
BASE_URL=https://store-ho0ptusdjg-1826081.catalyst-sandbox-vercel.store/
```

2. The `storageState.json` and `.testuser.json` files are auto-generated during the first test run via `globalSetup.ts`.

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run E2E tests only
```bash
npx playwright test --project=chromium-e2e
```

### Run API tests only
```bash
npx playwright test --project=api
```

### Run tests by tag
```bash
npx playwright test --grep @smoke
npx playwright test --grep @e2e
npx playwright test --grep @api
```

### Run tests in UI mode
```bash
npx playwright test --ui
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Debug tests
```bash
npx playwright test --debug
```

## Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

Live test reports are published to GitHub Pages after each run on the main branch:
**[View Latest Test Report](https://dmitriyprime.github.io/catalyst-sandbox-playwright/)**

## CI/CD

The project uses GitHub Actions for continuous integration:

- **Triggers**: Push/PR to main, scheduled daily at 22:00 UTC, manual dispatch
- **Test Execution**: Runs all tests with 2 retries on failure
- **Reporting**: HTML reports uploaded as artifacts and deployed to GitHub Pages
- **Parallel Execution**: Single worker in CI (shared auth state), parallel locally

## Development

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
npm run format:check
```

### Full check
```bash
npm run check
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License - see [LICENSE](LICENSE) for details.
