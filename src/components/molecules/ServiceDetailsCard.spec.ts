import { describe, it, expect } from 'vitest'
import ServiceDetailsCard from '@/components/molecules/ServiceDetailsCard.vue'
import { mount } from '@vue/test-utils'
import { getServiceMock } from '@/mocks/serviceMock'
import { humanizeNumberUsingAbbreviation } from '@/utils/humanization'

// Example component test for ServiceDetailsCard.vue
describe('ServiceDetailsCard', () => {
  it('shows the service status identifier', async () => {
    const wrapper = mount(ServiceDetailsCard, {
      props: {
        service: getServiceMock(),
      },
    })

    const serviceStatusIdentifier = await wrapper.findTestId('service-status-identifier')

    expect(serviceStatusIdentifier.exists()).toBe(true)
    expect(serviceStatusIdentifier.text()).toBe('Published to portal')
  })

  it('shows the service version count', async () => {
    const wrapper = mount(ServiceDetailsCard, {
      props: {
        service: getServiceMock(),
      },
    })

    const serviceVersionCount = await wrapper.findTestId('service-version-count')

    expect(serviceVersionCount.exists()).toBe(true)
    expect(serviceVersionCount.text()).toBe('1 Version')
  })

  it('shows the service name and description', async () => {
    const wrapper = mount(ServiceDetailsCard, {
      props: {
        service: getServiceMock(),
      },
    })

    const serviceName = await wrapper.findTestId('service-name')
    const serviceDescription = await wrapper.findTestId('service-description')

    expect(serviceName.exists()).toBe(true)
    expect(serviceName.text()).toBe(getServiceMock().name)

    expect(serviceDescription.exists()).toBe(true)
    expect(serviceDescription.text()).toBe(getServiceMock().description)
  })

  it('shows correct metrics', async () => {
    const wrapper = mount(ServiceDetailsCard, {
      props: {
        service: getServiceMock(),
      },
    })

    const serviceLatency = await wrapper.findTestId('service-latency')

    expect(serviceLatency.exists()).toBe(true)
    expect(serviceLatency.text()).toBe(`${getServiceMock().metrics.latency}ms`)

    const serviceUptime = await wrapper.findTestId('service-uptime')

    expect(serviceUptime.exists()).toBe(true)
    expect(serviceUptime.text()).toBe(`${getServiceMock().metrics.uptime}%`)

    const serviceRequests = await wrapper.findTestId('service-requests')

    expect(serviceRequests.exists()).toBe(true)
    expect(serviceRequests.text()).toBe(humanizeNumberUsingAbbreviation(getServiceMock().metrics.requests))
  })

  it('shows the correct status for unpublished services', async () => {
    const wrapper = mount(ServiceDetailsCard, {
      props: {
        service: getServiceMock({ published: false }),
      },
    })

    const serviceStatusIdentifier = await wrapper.findTestId('service-status-identifier')

    expect(serviceStatusIdentifier.exists()).toBe(true)
    expect(serviceStatusIdentifier.text()).toBe('Unpublished')

    expect(wrapper.findTestId('service-not-configured-message').exists()).toBe(true)
  })
})
