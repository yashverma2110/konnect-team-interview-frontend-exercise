interface IMetrics {
  latency: number;
  uptime: number;
  requests: number;
  errors: number;
}

interface IDeveloper {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface IVersion {
  id: string;
  name: string;
  description: string;
  developer?: IDeveloper;
  updated_at: string;
}

interface IService {
  id: string;
  name: string;
  description: string;
  type: 'REST' | 'HTTP';
  published: boolean;
  configured: boolean;
  versions: IVersion[];
  metrics: IMetrics;
}

type ServiceStatus = 'published' | 'unpublished' | 'in-progress'

export type { IService, IVersion, IDeveloper, IMetrics, ServiceStatus }