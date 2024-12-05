import { VueWrapper } from '@vue/test-utils'

declare module '@vue/test-utils' {
  export interface VueWrapper {
    findTestId(selector: string): VueWrapper
    findAllByTestId(selector: string): VueWrapper[]
  }
}
