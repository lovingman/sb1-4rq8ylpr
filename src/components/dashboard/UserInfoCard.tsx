import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { resetPassword } from '../../services/api';

interface UserInfoCardProps {
  user: {
    phone: string;
    status: string;
    membershipLevel: string;
    createdAt: string;
  };
  onPasswordReset: () => void;
}

export default function UserInfoCard({ user, onPasswordReset }: UserInfoCardProps) {
  const [isResetting, setIsResetting] = useState(false);
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (passwords.new !== passwords.confirm) {
      setError('新密码与确认密码不匹配');
      return;
    }

    try {
      await resetPassword(passwords.old, passwords.new, passwords.confirm);
      setIsResetting(false);
      onPasswordReset();
    } catch (err) {
      setError('密码重置失败');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <User className="mr-2" size={20} />
          个人信息
        </h3>
        <button
          onClick={() => setIsResetting(!isResetting)}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <Lock className="mr-1" size={16} />
          {isResetting ? '取消' : '重置密码'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">手机号</label>
          <p className="mt-1">{user.phone}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">账号状态</label>
          <p className="mt-1">{user.status === 'active' ? '正常' : '禁用'}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">会员等级</label>
          <p className="mt-1">{user.membershipLevel === 'vip' ? 'VIP会员' : '普通会员'}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">注册时间</label>
          <p className="mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {isResetting && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">旧密码</label>
            <input
              type="password"
              value={passwords.old}
              onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">新密码</label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">确认新密码</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            确认重置
          </button>
        </form>
      )}
    </div>
  );
}