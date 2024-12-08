import { mockUser, mockAIConfigs, mockPublicAccounts } from './mockData';
import { User, AIConfig, PublicAccount } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to simulate API response
const mockResponse = async <T>(data: T, error?: string): Promise<T> => {
  await delay(500); // Simulate network latency
  if (error) throw new Error(error);
  return data;
};

// User related APIs
export async function getUserInfo(): Promise<User> {
  return mockResponse(mockUser);
}

export async function resetPassword(oldPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
  if (oldPassword !== mockUser.password) {
    return mockResponse(undefined, '旧密码不正确');
  }
  if (newPassword !== confirmPassword) {
    return mockResponse(undefined, '新密码与确认密码不匹配');
  }
  return mockResponse(undefined);
}

export async function getUserBalance(): Promise<number> {
  return mockResponse(mockUser.balance);
}

// AI Config related APIs
export async function getAIConfigs(): Promise<AIConfig[]> {
  return mockResponse(mockAIConfigs);
}

export async function createAIConfig(config: Partial<AIConfig>): Promise<void> {
  mockAIConfigs.push({
    ...config,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userPhone: mockUser.phone
  } as AIConfig);
  return mockResponse(undefined);
}

export async function updateAIConfig(id: string, config: Partial<AIConfig>): Promise<void> {
  const index = mockAIConfigs.findIndex(c => c.apiKey === id);
  if (index === -1) return mockResponse(undefined, '配置不存在');
  mockAIConfigs[index] = { ...mockAIConfigs[index], ...config, updatedAt: new Date().toISOString() };
  return mockResponse(undefined);
}

export async function deleteAIConfig(id: string): Promise<void> {
  const index = mockAIConfigs.findIndex(c => c.apiKey === id);
  if (index === -1) return mockResponse(undefined, '配置不存在');
  mockAIConfigs.splice(index, 1);
  return mockResponse(undefined);
}

// Public Account related APIs
export async function getPublicAccounts(params: { keyword?: string; page?: number; pageSize?: number } = {}): Promise<{
  list: PublicAccount[];
  total: number;
}> {
  let filteredAccounts = [...mockPublicAccounts];
  
  if (params.keyword) {
    filteredAccounts = filteredAccounts.filter(account => 
      account.name.includes(params.keyword!) || 
      account.appId.includes(params.keyword!)
    );
  }

  const total = filteredAccounts.length;
  const page = params.page || 1;
  const pageSize = params.pageSize || 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return mockResponse({
    list: filteredAccounts.slice(start, end),
    total
  });
}

export async function createPublicAccount(account: {
  name: string;
  accountId: string;
  appId: string;
  appSecret: string;
}): Promise<void> {
  mockPublicAccounts.push({
    id: String(mockPublicAccounts.length + 1),
    name: account.name,
    appId: account.appId,
    appSecret: account.appSecret,
    createdAt: new Date().toISOString(),
    status: 'active'
  });
  return mockResponse(undefined);
}

export async function updatePublicAccount(
  id: string,
  account: Partial<{
    name: string;
    accountId: string;
    appId: string;
    appSecret: string;
  }>
): Promise<void> {
  const index = mockPublicAccounts.findIndex(a => a.id === id);
  if (index === -1) return mockResponse(undefined, '公众号不存在');
  mockPublicAccounts[index] = { ...mockPublicAccounts[index], ...account };
  return mockResponse(undefined);
}

export async function deletePublicAccount(id: string): Promise<void> {
  const index = mockPublicAccounts.findIndex(a => a.id === id);
  if (index === -1) return mockResponse(undefined, '公众号不存在');
  mockPublicAccounts.splice(index, 1);
  return mockResponse(undefined);
}