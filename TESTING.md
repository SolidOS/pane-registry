# Testing Guide

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting only
npm run test:lint

# Auto-fix linting issues
npm run lint-fix
```

## Test Coverage

The tests provide 100% code coverage for all functionality:

- **Initial State Tests**: Verify registry starts empty
- **Registration Tests**: Test pane registration with various scenarios
- **Lookup Tests**: Test finding panes by name
- **Integration Tests**: Complex workflows and edge cases

## Test Structure

- `__tests__/paneRegistry.test.js` - Main test suite
- Tests use Jest framework with comprehensive mocking
- Console output is mocked to avoid noise during testing
- State is reset between tests for isolation

## Coverage Report

After running tests, view the coverage report:
- Text summary in console
- HTML report in `coverage/` directory