import { vi, describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ServiceCatalog from '@/components/ServiceCatalog.vue'
import { getServiceMock } from '@/mocks/serviceMock'

// Mock the axios module for fetching API services
const mockedResponses = new Map()
  .set('/api/services', vi.fn(() => ({
    data: [getServiceMock()],
  })))

vi.mock('vue-router', () => ({
  useRoute: vi.fn().mockReturnValue({
    query: {},
  }),
  useRouter: vi.fn().mockReturnValue({
    replace: vi.fn(),
  }),
}))

vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios')
  return {
    default: {
      ...actual.default,
      // Mock get request responses
      get: (url: string) => vi.fn().mockResolvedValue(mockedResponses.get(url) !== undefined
        ? mockedResponses.get(url)()
        : undefined)(),
    },
  }
})

// Example component test for ServiceCatalog.vue
describe('ServiceCatalog', () => {
  it('shows the search input', async () => {
    // No `mockedResponses` modification needed; just use the default mocked response
    const wrapper = mount(ServiceCatalog)

    expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
  })

  it('properly handles no services returned from the API', async () => {
    mockedResponses.set('/api/services', vi.fn(() => ({
      data: [],
    })))

    const wrapper = mount(ServiceCatalog)

    await flushPromises()

    expect(wrapper.findTestId('no-results').exists()).toBe(true)
  })

  it('properly handles services returned from the API', async () => {
    mockedResponses.set('/api/services', vi.fn(() => ({
      data: [getServiceMock()],
    })))

    const wrapper = mount(ServiceCatalog)

    await flushPromises()

    const serviceCards = wrapper.findAllByTestId('service-card')
    expect(serviceCards.length).toBe(1)
  })

  it('properly handles service redirection', async () => {
    mockedResponses.set('/api/services', vi.fn(() => ({
      data: [getServiceMock()],
    })))

    const wrapper = mount(ServiceCatalog)

    await flushPromises()

    const serviceCards = wrapper.findAllByTestId('service-card')
    expect(serviceCards.length).toBe(1)

    const routerLinks = await wrapper.findAllByTestId('service-card-link')
    expect(routerLinks.length).toBe(1)

    expect(routerLinks[0].attributes('href')).toBe(`/service/${getServiceMock().id}`)
  })

  it('properly handles search input', async () => {
    mockedResponses.set('/api/services', vi.fn(() => ({
      data: [getServiceMock()],
    })))

    const wrapper = mount(ServiceCatalog)

    await flushPromises()

    const searchInput = wrapper.findTestId('search-input')
    expect(searchInput.exists()).toBe(true)

    searchInput.setValue('test')
    expect(searchInput.element.value).toBe('test')

    expect(mockedResponses.get('/api/services')).toHaveBeenCalled()
  })
})
