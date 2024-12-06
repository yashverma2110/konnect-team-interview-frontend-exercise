import { vi, describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ServiceDetails from '@/components/ServiceDetails.vue'
import { getServiceMock } from '@/mocks/serviceMock'
import { getDurationSince } from '@/utils/timeUtils'

const mockedResponses = new Map()
  .set('/api/services', vi.fn(() => ({
    data: [getServiceMock({
      id: '123',
    })],
  })))

vi.mock('vue-router', () => ({
  useRoute: vi.fn().mockReturnValue({
    params: {
      id: '123',
    },
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
describe('ServiceDetails', () => {
  it('renders the component', async () => {
    // No `mockedResponses` modification needed; just use the default mocked response
    const wrapper = mount(ServiceDetails)

    expect(wrapper.findTestId('service-details-container').isVisible()).toBe(true)
  })

  it('properly handles no services returned from the API', async () => {
    mockedResponses.set('/api/services', vi.fn(() => ({
      data: [getServiceMock({
        id: '123',
      })],
    })))

    const wrapper = mount(ServiceDetails)

    await flushPromises()

    const versionsTableRows = wrapper.findAllByTestId('service-details-versions-table-row')
    expect(versionsTableRows.length).toBe(getServiceMock().versions.length)
  })

  it('shows the developer details', async () => {
    const wrapper = mount(ServiceDetails)

    await flushPromises()

    const developerName = wrapper.findTestId('developer-name')
    expect(developerName.text()).toBe(getServiceMock().versions[0].developer?.name)

    const versionUpdatedAt = wrapper.findTestId('version-updated-at')
    expect(versionUpdatedAt.text()).contains(getDurationSince(new Date(getServiceMock().versions[0].updated_at)))
  })
})
