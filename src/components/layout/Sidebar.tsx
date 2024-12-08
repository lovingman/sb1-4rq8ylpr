import React, { useState } from 'react';
import { Menu, ChevronDown, ChevronRight, Home, Newspaper, Image, Send, Database, Chrome, Brain, Wallet, Settings } from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { title: '首页', icon: <Home size={20} />, path: '/' },
  { title: '公众号管理', icon: <Newspaper size={20} />, path: '/accounts' },
  {
    title: '素材库',
    icon: <Image size={20} />,
    path: '/materials',
    submenu: [
      { title: '文章库', icon: <Newspaper size={20} />, path: '/materials/articles' },
      { title: '图片库', icon: <Image size={20} />, path: '/materials/images' }
    ]
  },
  {
    title: '发布管理',
    icon: <Send size={20} />,
    path: '/publishing',
    submenu: [
      { title: '发布策略', icon: <Send size={20} />, path: '/publishing/strategies' },
      { title: '排版模板', icon: <Send size={20} />, path: '/publishing/templates' },
      { title: '发布列表', icon: <Send size={20} />, path: '/publishing/list' }
    ]
  },
  {
    title: '数据源采集',
    icon: <Database size={20} />,
    path: '/data-collection',
    submenu: [
      { title: '公众号采集', icon: <Database size={20} />, path: '/data-collection/wechat' },
      { title: '小红书笔记采集', icon: <Database size={20} />, path: '/data-collection/xiaohongshu' },
      { title: '头条文章采集', icon: <Database size={20} />, path: '/data-collection/toutiao' }
    ]
  },
  { title: '浏览器账号管理', icon: <Chrome size={20} />, path: '/browser-accounts' },
  {
    title: '内容生产管理',
    icon: <Brain size={20} />,
    path: '/content',
    submenu: [
      { title: '内容交易中心', icon: <Brain size={20} />, path: '/content/marketplace' },
      { title: '文章内容生产', icon: <Brain size={20} />, path: '/content/articles' },
      { title: '图片内容生产', icon: <Brain size={20} />, path: '/content/images' }
    ]
  },
  { title: '财务中心', icon: <Wallet size={20} />, path: '/finance' },
  { title: '设置', icon: <Settings size={20} />, path: '/settings' }
];

const MenuItem: React.FC<{ item: MenuItem; collapsed: boolean }> = ({ item, collapsed }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2">{item.icon}</span>
        {!collapsed && (
          <>
            <span className="flex-1">{item.title}</span>
            {item.submenu && (
              <span className="ml-auto">
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            )}
          </>
        )}
      </div>
      {!collapsed && isOpen && item.submenu && (
        <div className="ml-6 mt-1">
          {item.submenu.map((subItem) => (
            <div
              key={subItem.path}
              className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg"
            >
              <span className="mr-2">{subItem.icon}</span>
              <span>{subItem.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-white border-r h-screen transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && <span className="font-bold text-xl">管理系统</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>
      <div className="py-4">
        {menuItems.map((item) => (
          <MenuItem key={item.path} item={item} collapsed={collapsed} />
        ))}
      </div>
    </div>
  );
}