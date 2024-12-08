export interface User {
  phone: string;
  password: string;
  status: 'active' | 'disabled';
  membershipLevel: 'normal' | 'vip';
  createdAt: string;
  updatedAt: string;
  balance: number;
}

export interface AIConfig {
  type: 'zhipu' | 'doubao' | 'seek' | 'other';
  apiKey: string;
  modelName: string;
  createdAt: string;
  updatedAt: string;
  userPhone: string;
}

export interface PublicAccount {
  name: string;
  id: string;
  appId: string;
  appSecret: string;
  createdAt: string;
  status: 'active' | 'inactive';
}