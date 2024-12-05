import { beforeEach } from 'vitest'
import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

// Add mock router-link component
config.global.stubs = {
  RouterLink: {
    template: '<a :href="to"><slot></slot></a>',
    props: ['to'],
  },
}

const DataTestIdPlugin = (wrapper: any) => {
  /**
   * Find element by `data-testid` selector
   * @param {string} dataTestid The `data=testid` attribute of the element
   * @example expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
   */
  const findTestId = (dataTestid: string): any => {
    const dataSelector = `[data-testid="${dataTestid}"]`
    return wrapper.find(dataSelector)
  }

  const findAllByTestId = (dataTestid: string): any => {
    const dataSelector = `[data-testid="${dataTestid}"]`
    return wrapper.findAll(dataSelector)
  }

  return {
    findTestId,
    findAllByTestId,
  }
}

config.plugins.VueWrapper.install(DataTestIdPlugin)

beforeEach(() => {
  setActivePinia(createPinia())
})
