import React, { useEffect, useState } from 'react';
import { getUserInfo, getAIConfigs, getUserBalance } from '../services/api';
import UserInfoCard from '../components/dashboard/UserInfoCard';
import AIConfigCard from '../components/dashboard/AIConfigCard';
import BalanceCard from '../components/dashboard/BalanceCard';
import { User, AIConfig } from '../types';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [configs, setConfigs] = useState<AIConfig[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    try {
      const [userInfo, aiConfigs, userBalance] = await Promise.all([
        getUserInfo(),
        getAIConfigs(),
        getUserBalance(),
      ]);
      setUser(userInfo);
      setConfigs(aiConfigs);
      setBalance(userBalance);
    } catch (err) {
      setError('加载数据失败');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">错误：</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserInfoCard user={user} onPasswordReset={fetchData} />
        </div>
        <div>
          <BalanceCard balance={balance} />
        </div>
        <div className="lg:col-span-3">
          <AIConfigCard configs={configs} onConfigChange={fetchData} />
        </div>
      </div>
    </div>
  );
}