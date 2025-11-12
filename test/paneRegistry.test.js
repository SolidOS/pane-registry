const paneRegistry = require('../src/paneRegistry')

describe('PaneRegistry', () => {
  let originalConsoleLog
  let originalConsoleWarn
  let mockConsoleLog
  let mockConsoleWarn

  beforeEach(() => {
    // Reset the registry state before each test
    paneRegistry.list = []
    paneRegistry.paneForIcon = []
    paneRegistry.paneForPredicate = []

    // Clear any dynamically added panes
    Object.keys(paneRegistry).forEach(key => {
      if (!['list', 'paneForIcon', 'paneForPredicate', 'register', 'byName'].includes(key)) {
        delete paneRegistry[key]
      }
    })

    // Mock console methods to avoid noise during tests
    originalConsoleLog = console.log
    originalConsoleWarn = console.warn
    mockConsoleLog = jest.fn()
    mockConsoleWarn = jest.fn()
    console.log = mockConsoleLog
    console.warn = mockConsoleWarn
  })

  afterEach(() => {
    // Restore console methods
    console.log = originalConsoleLog
    console.warn = originalConsoleWarn
  })

  describe('Initial State', () => {
    it('should have empty arrays for list, paneForIcon, and paneForPredicate', () => {
      expect(paneRegistry.list).toEqual([])
      expect(paneRegistry.paneForIcon).toEqual([])
      expect(paneRegistry.paneForPredicate).toEqual([])
    })

    it('should have register and byName functions', () => {
      expect(typeof paneRegistry.register).toBe('function')
      expect(typeof paneRegistry.byName).toBe('function')
    })
  })

  describe('register function', () => {
    const createValidPane = (overrides = {}) => ({
      name: 'testPane',
      label: 'Test Pane',
      icon: 'test-icon',
      predicates: { 'http://example.com/test': 1 },
      ...overrides
    })

    it('should register a valid pane successfully', () => {
      const pane = createValidPane()

      paneRegistry.register(pane)

      expect(paneRegistry.list).toHaveLength(1)
      expect(paneRegistry.list[0]).toEqual(expect.objectContaining({
        name: 'testPane',
        label: 'Test Pane',
        requireQueryButton: undefined
      }))
      expect(mockConsoleLog).toHaveBeenCalledWith('  registering pane: testPane')
    })

    it('should set requireQueryButton property', () => {
      const pane = createValidPane()

      paneRegistry.register(pane, true)

      expect(paneRegistry.list[0].requireQueryButton).toBe(true)
    })

    it('should add pane to paneRegistry object by name', () => {
      const pane = createValidPane()

      paneRegistry.register(pane)

      expect(paneRegistry.testPane).toBe(pane)
    })

    it('should not overwrite existing pane methods', () => {
      const existingRegister = paneRegistry.register
      const pane = createValidPane({ name: 'register' })

      paneRegistry.register(pane)

      expect(paneRegistry.register).toBe(existingRegister)
      expect(paneRegistry.list).toHaveLength(1)
    })

    it('should index pane by icon', () => {
      const pane = createValidPane({ icon: 'special-icon' })

      paneRegistry.register(pane)

      expect(paneRegistry.paneForIcon['special-icon']).toBe(pane)
    })

    it('should index pane by predicates', () => {
      const pane = createValidPane({
        predicates: {
          'http://example.com/test1': 1,
          'http://example.com/test2': 2
        }
      })

      paneRegistry.register(pane)

      expect(paneRegistry.paneForPredicate['http://example.com/test1']).toEqual({
        pred: 'http://example.com/test1',
        code: 1
      })
      expect(paneRegistry.paneForPredicate['http://example.com/test2']).toEqual({
        pred: 'http://example.com/test2',
        code: 2
      })
    })

    it('should handle pane without icon', () => {
      const pane = createValidPane({ icon: undefined })
      delete pane.icon

      paneRegistry.register(pane)

      expect(paneRegistry.list).toHaveLength(1)
      expect(Object.keys(paneRegistry.paneForIcon)).toHaveLength(0)
    })

    it('should handle pane without predicates', () => {
      const pane = createValidPane({ predicates: undefined })
      delete pane.predicates

      paneRegistry.register(pane)

      expect(paneRegistry.list).toHaveLength(1)
      expect(Object.keys(paneRegistry.paneForPredicate)).toHaveLength(0)
    })

    it('should not register pane without name', () => {
      const pane = createValidPane({ name: undefined })
      delete pane.name

      paneRegistry.register(pane)

      expect(paneRegistry.list).toHaveLength(0)
      expect(mockConsoleLog).toHaveBeenCalledWith('***     No name for pane!')
    })

    it('should not register pane with empty name', () => {
      const pane = createValidPane({ name: '' })

      paneRegistry.register(pane)

      expect(paneRegistry.list).toHaveLength(0)
      expect(mockConsoleLog).toHaveBeenCalledWith('***     No name for pane!')
    })

    it('should not register pane without label', () => {
      const pane = createValidPane({ label: undefined })
      delete pane.label

      paneRegistry.register(pane)

      expect(paneRegistry.list).toHaveLength(0)
      expect(mockConsoleLog).toHaveBeenCalledWith('***     No label for pane!')
    })

    it('should not register pane with empty label', () => {
      const pane = createValidPane({ label: '' })

      paneRegistry.register(pane)

      expect(paneRegistry.list).toHaveLength(0)
      expect(mockConsoleLog).toHaveBeenCalledWith('***     No label for pane!')
    })

    it('should register multiple panes', () => {
      const pane1 = createValidPane({ name: 'pane1', icon: 'icon1' })
      const pane2 = createValidPane({ name: 'pane2', icon: 'icon2' })

      paneRegistry.register(pane1)
      paneRegistry.register(pane2)

      expect(paneRegistry.list).toHaveLength(2)
      expect(paneRegistry.pane1).toBe(pane1)
      expect(paneRegistry.pane2).toBe(pane2)
      expect(paneRegistry.paneForIcon.icon1).toBe(pane1)
      expect(paneRegistry.paneForIcon.icon2).toBe(pane2)
    })
  })

  describe('byName function', () => {
    it('should return pane when found by name', () => {
      const pane = {
        name: 'testPane',
        label: 'Test Pane'
      }

      paneRegistry.register(pane)
      const result = paneRegistry.byName('testPane')

      expect(result).toBe(pane)
      expect(mockConsoleWarn).not.toHaveBeenCalled()
    })

    it('should return null when pane not found', () => {
      const result = paneRegistry.byName('nonexistentPane')

      expect(result).toBeNull()
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        'No view with name nonexistentPane found in the registry of views (aka paneRegistry)'
      )
    })

    it('should return first matching pane when multiple panes exist', () => {
      const pane1 = { name: 'testPane', label: 'Test Pane 1' }
      const pane2 = { name: 'otherPane', label: 'Other Pane' }
      const pane3 = { name: 'thirdPane', label: 'Third Pane' }

      paneRegistry.register(pane1)
      paneRegistry.register(pane2)
      paneRegistry.register(pane3)

      const result = paneRegistry.byName('otherPane')

      expect(result).toBe(pane2)
    })

    it('should handle empty string name', () => {
      const result = paneRegistry.byName('')

      expect(result).toBeNull()
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        'No view with name  found in the registry of views (aka paneRegistry)'
      )
    })

    it('should handle null/undefined name', () => {
      const resultNull = paneRegistry.byName(null)
      const resultUndefined = paneRegistry.byName(undefined)

      expect(resultNull).toBeNull()
      expect(resultUndefined).toBeNull()
    })
  })

  describe('Integration Tests', () => {
    it('should handle complex pane registration workflow', () => {
      const chatPane = {
        name: 'chat',
        label: 'Chat Pane',
        icon: 'chat-icon',
        predicates: {
          'http://www.w3.org/ns/pim/meeting#Chat': 1
        }
      }

      const profilePane = {
        name: 'profile',
        label: 'Profile Pane',
        icon: 'profile-icon',
        predicates: {
          'http://xmlns.com/foaf/0.1/Person': 2
        }
      }

      // Register panes
      paneRegistry.register(chatPane, true)
      paneRegistry.register(profilePane, false)

      // Verify registration
      expect(paneRegistry.list).toHaveLength(2)
      expect(paneRegistry.chat).toBe(chatPane)
      expect(paneRegistry.profile).toBe(profilePane)
      expect(chatPane.requireQueryButton).toBe(true)
      expect(profilePane.requireQueryButton).toBe(false)

      // Verify icon indexing
      expect(paneRegistry.paneForIcon['chat-icon']).toBe(chatPane)
      expect(paneRegistry.paneForIcon['profile-icon']).toBe(profilePane)

      // Verify predicate indexing
      expect(paneRegistry.paneForPredicate['http://www.w3.org/ns/pim/meeting#Chat']).toEqual({
        pred: 'http://www.w3.org/ns/pim/meeting#Chat',
        code: 1
      })

      // Verify lookup
      expect(paneRegistry.byName('chat')).toBe(chatPane)
      expect(paneRegistry.byName('profile')).toBe(profilePane)
      expect(paneRegistry.byName('unknown')).toBeNull()
    })

    it('should maintain registry integrity across multiple operations', () => {
      const panes = Array.from({ length: 5 }, (_, i) => ({
        name: `pane${i}`,
        label: `Pane ${i}`,
        icon: `icon${i}`,
        predicates: { [`http://example.com/pred${i}`]: i }
      }))

      // Register all panes
      panes.forEach(pane => paneRegistry.register(pane))

      // Verify all are registered
      expect(paneRegistry.list).toHaveLength(5)

      // Verify all can be found by name
      panes.forEach(pane => {
        expect(paneRegistry.byName(pane.name)).toBe(pane)
      })

      // Verify icon indexing
      panes.forEach(pane => {
        expect(paneRegistry.paneForIcon[pane.icon]).toBe(pane)
      })

      // Verify predicate indexing
      panes.forEach((pane, i) => {
        const predKey = `http://example.com/pred${i}`
        expect(paneRegistry.paneForPredicate[predKey]).toEqual({
          pred: predKey,
          code: i
        })
      })
    })
  })
})
