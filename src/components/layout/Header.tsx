import React from 'react';
import { Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">公众号矩阵管理系统</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
          </button>
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full">
            <User size={20} />
            <span className="text-sm font-medium">管理员</span>
          </div>
        </div>
      </div>
    </header>
  );
}