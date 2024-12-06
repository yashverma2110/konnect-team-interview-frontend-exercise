import { describe, it, expect } from 'vitest'
import { getServiceMock } from '@/mocks/serviceMock'
import useServicesStore from '@/stores/services'

describe('Services Store', () => {
  it('should return all services', async () => {
    const servicesStore = useServicesStore()
    servicesStore.setAllServices([getServiceMock()])
    expect(servicesStore.servicesToDisplay).toEqual([getServiceMock()])
  })

  it('should return services sorted by uptime', async () => {
    const servicesStore = useServicesStore()
    servicesStore.setSortKey('metrics:uptime')
    const serviceA = getServiceMock()
    const serviceB = getServiceMock()
    serviceB.metrics.uptime = 0.9
    serviceA.metrics.uptime = 0.8
    servicesStore.setAllServices([serviceA, serviceB])
    expect(servicesStore.servicesToDisplay).toEqual([serviceB, serviceA])
  })

  it('should return services sorted by errors', async () => {
    const servicesStore = useServicesStore()
    servicesStore.setSortKey('metrics:errors')
    const serviceA = getServiceMock()
    const serviceB = getServiceMock()
    serviceB.metrics.errors = 100
    serviceA.metrics.errors = 0
    servicesStore.setAllServices([serviceA, serviceB])
    expect(servicesStore.servicesToDisplay).toEqual([serviceB, serviceA])
  })

  it('pagination should work', async () => {
    const servicesStore = useServicesStore()
    servicesStore.setSortKey('metrics:errors')
    const serviceList = Array.from({ length: 100 }, () => getServiceMock())
    servicesStore.setAllServices(serviceList)
    expect(servicesStore.servicesToDisplay).toEqual(serviceList.slice(0, 10))

    servicesStore.nextPage()
    expect(servicesStore.servicesToDisplay).toEqual(serviceList.slice(10, 20))
  })
})
