# Testing Guide for Main Site

This document describes the comprehensive testing strategy implemented for the Brain Game main site.

## Testing Stack

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright
- **Accessibility**: @axe-core/playwright
- **Coverage**: Built-in Jest coverage reports

## Running Tests

### Unit Tests
```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests in CI mode
pnpm test:ci
```

### E2E Tests
```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui

# Run E2E tests in headed mode
pnpm test:e2e:headed
```

## Test Structure

```
src/
├── lib/
│   └── __tests__/
│       ├── email-validation.test.ts
│       ├── email-service.test.ts
│       └── analytics.test.ts
├── app/
│   └── __tests__/
│       └── page.test.tsx
├── components/
│   └── __tests__/
│       └── ErrorBoundary.test.tsx
└── test-utils.tsx

e2e/
├── homepage.spec.ts
├── accessibility.spec.ts
└── performance.spec.ts
```

## Coverage Goals

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## Testing Best Practices

### 1. Unit Tests
- Test components in isolation
- Mock external dependencies
- Focus on user behavior over implementation
- Use data-testid sparingly

### 2. Integration Tests
- Test API routes with various inputs
- Verify error handling
- Test rate limiting
- Validate response formats

### 3. E2E Tests
- Test critical user journeys
- Verify cross-browser compatibility
- Test responsive design
- Measure performance metrics

### 4. Accessibility Tests
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatibility
- Color contrast validation

## Writing Tests

### Component Tests
```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyComponent } from "../MyComponent";

describe("MyComponent", () => {
  it("should handle user interaction", async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    
    await user.click(screen.getByRole("button"));
    
    expect(screen.getByText("Result")).toBeInTheDocument();
  });
});
```

### API Tests
```typescript
import { POST } from "../api/endpoint/route";
import { NextRequest } from "next/server";

describe("API Endpoint", () => {
  it("should handle valid request", async () => {
    const request = new NextRequest("http://localhost:3000/api/endpoint", {
      method: "POST",
      body: JSON.stringify({ data: "test" }),
    });
    
    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
```

### E2E Tests
```typescript
import { test, expect } from "@playwright/test";

test("user journey", async ({ page }) => {
  await page.goto("/");
  await page.fill('[placeholder="Enter your email"]', "test@example.com");
  await page.click('button:has-text("Join")');
  
  await expect(page.getByText(/success/i)).toBeVisible();
});
```

## Continuous Integration

Tests run automatically on:
- Every push to main branch
- Every pull request
- Scheduled daily runs

See `.github/workflows/test-main-site.yml` for CI configuration.

## Performance Testing

Performance tests verify:
- Load time < 3 seconds
- LCP < 2.5 seconds
- FID < 100ms
- CLS < 0.1
- Bundle size < 500KB

## Debugging Tests

### Jest
```bash
# Run specific test file
pnpm test src/lib/__tests__/email-validation.test.ts

# Run tests matching pattern
pnpm test --testNamePattern="should validate email"

# Debug with Node
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Playwright
```bash
# Debug mode
pnpm test:e2e --debug

# Generate trace
pnpm test:e2e --trace on

# View trace
npx playwright show-trace trace.zip
```

## Mocking

### Firebase
All Firebase services are mocked in tests to avoid:
- Network calls
- Authentication requirements
- Database operations

### External Services
- Analytics (Google Analytics)
- Rate limiting
- Email services

## Test Data

Use factories for consistent test data:
```typescript
const createMockEmail = (overrides = {}) => ({
  email: "test@example.com",
  status: "pending",
  createdAt: new Date(),
  ...overrides,
});
```

## Snapshot Testing

Snapshots are used sparingly for:
- Error states
- Complex UI components
- Generated markup

Update snapshots with: `pnpm test -- -u`

## Future Improvements

1. Visual regression testing
2. Load testing
3. Security testing
4. Mutation testing
5. Contract testing for APIs