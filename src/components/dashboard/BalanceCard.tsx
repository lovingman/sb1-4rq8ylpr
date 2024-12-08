import React from 'react';
import { Wallet } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Wallet className="mr-2" size={20} />
          账户余额
        </h3>
      </div>
      <div className="text-3xl font-bold text-indigo-600">{balance} 积分</div>
    </div>
  );
}