import { User, AIConfig, PublicAccount } from '../types';

export const mockUser: User = {
  phone: "13800138000",
  password: "password123",
  status: "active",
  membershipLevel: "normal",
  createdAt: "2023-10-01T10:00:00Z",
  updatedAt: "2023-10-01T10:00:00Z",
  balance: 1000
};

export const mockAIConfigs: AIConfig[] = [
  {
    type: "zhipu",
    apiKey: "AI_KEY_12345",
    modelName: "GPT-3.5",
    createdAt: "2023-10-01T10:00:00Z",
    updatedAt: "2023-10-01T10:00:00Z",
    userPhone: "13800138000"
  },
  {
    type: "doubao",
    apiKey: "AI_KEY_67890",
    modelName: "GPT-4",
    createdAt: "2023-10-02T10:00:00Z",
    updatedAt: "2023-10-02T10:00:00Z",
    userPhone: "13800138000"
  }
];

export const mockPublicAccounts: PublicAccount[] = [
  {
    id: "1",
    name: "公众号1",
    appId: "wx1234567890",
    appSecret: "abcdef123456",
    createdAt: "2023-10-01T10:00:00Z",
    status: "active"
  },
  {
    id: "2",
    name: "公众号2",
    appId: "wx0987654321",
    appSecret: "fedcba654321",
    createdAt: "2023-10-02T10:00:00Z",
    status: "inactive"
  }
];