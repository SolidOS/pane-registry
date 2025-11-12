# pane-registry

An index to hold all loaded solid panes, whether statically or dynamically loaded

# Adendum

The pane registry is a crucial part of the Solid Panes system. It is where any pane inserts itself or is inserted. In the standard working of SolidOS, there is one place in solid-panes where all the normal panes are loaded into the pane registry (see: [registerPanes.js](https://github.com/solidos/solid-panes/blob/main/src/registerPanes.js) in solid-panes). But other apps, and especially developers developing new panes can insert their own panes. And so we hope we will end up with panes dynamically laoded according to user configuration preferences. 

# Testing Guide

## Running Tests

```bash
# Run all tests
npm test

# Run all tests with coverages
npm test-coverage

# Run tests in watch mode
npm run test-watch

# Run linting only
npm run lint

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

- `test/paneRegistry.test.js` - Main test suite
- Tests use Jest framework with comprehensive mocking
- Console output is mocked to avoid noise during testing
- State is reset between tests for isolation

## Coverage Report

After running tests, view the coverage report:
- Text summary in console
- HTML report in `coverage/` directory