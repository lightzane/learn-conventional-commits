console.log('🧪 Example only - running tests...')

// Windows:         set FAIL_TESTS=1 && node pnpm test
// macOS/Linux:     FAIL_TESTS=1 node pnpm test
if (process.env.FAIL_TESTS) {
  console.warn('❌ Tests failed')
  process.exit(1)
}

console.log('✅ All tests passed')
