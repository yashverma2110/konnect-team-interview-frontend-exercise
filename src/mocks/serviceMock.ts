import type { IService } from '@/types/IService'

export function getServiceMock(overrides: Partial<IService> = {}): IService {
  return Object.assign({
    id: 'b45100a5-49ec-45b1-83af-11d868900a93',
    name: 'Fantastic Granite Chips',
    description: 'The Quality-focused directional alliance Bike offers reliable performance and substantial design',
    type: 'REST',
    published: true,
    configured: true,
    versions: [
      {
        id: 'f2a884c9-85f7-4dbb-9ad7-f24855a7283d',
        name: '8.8.6',
        description: 'The lime Pants combines Mayotte aesthetics with Bismuth-based durability',
        developer: {
          id: 'e04051e4-f880-4b54-873a-435622c97f82',
          name: 'Jeremiah Koelpin',
          email: 'Jeremiah.Koelpin34@hotmail.com',
          avatar: 'https://avatars.githubusercontent.com/u/27758940',
        },
        updated_at: '2024-08-02T06:12:46.659Z',
      },
    ],
    metrics: {
      latency: 0.81,
      uptime: 0.975,
      requests: 678349,
      errors: 0.0185,
    },
  }, overrides)
}
