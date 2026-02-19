import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Debouncer } from './src/debouncer.js'

describe('Debug maxWait', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should handle maxWait less than wait', () => {
    const mockFn = vi.fn()
    const debouncer = new Debouncer(mockFn, {
      wait: 1000,
      maxWait: 500,
    })

    console.log('Starting test')
    // Call continuously
    for (let i = 0; i < 10; i++) {
      debouncer.maybeExecute(`call${i}`)
      console.log(`t=${i * 100}ms: called with call${i}, count=${mockFn.mock.calls.length}`)
      vi.advanceTimersByTime(100)
    }

    console.log(`Final count at t=1000ms: ${mockFn.mock.calls.length}`)
    console.log('Calls:', mockFn.mock.calls)
    expect(mockFn).toBeCalledTimes(1)
  })
})
