import React, { useState, useEffect } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { getPublicAccounts, createPublicAccount, updatePublicAccount, deletePublicAccount } from '../services/api';
import { PublicAccount } from '../types';
import AccountForm from '../components/accounts/AccountForm';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<PublicAccount[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<PublicAccount | null>(null);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await getPublicAccounts({ keyword, page, pageSize });
      setAccounts(data.list);
      setTotal(data.total);
      setError('');
    } catch (err) {
      setError('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [keyword, page, pageSize]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchAccounts();
  };

  const handleCreate = async (data: {
    name: string;
    accountId: string;
    appId: string;
    appSecret: string;
  }) => {
    await createPublicAccount(data);
    fetchAccounts();
  };

  const handleUpdate = async (data: {
    name: string;
    accountId: string;
    appId: string;
    appSecret: string;
  }) => {
    if (!editingAccount) return;
    await updatePublicAccount(editingAccount.id, data);
    fetchAccounts();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除这个公众号吗？')) return;
    try {
      await deletePublicAccount(id);
      fetchAccounts();
    } catch (err) {
      setError('删除失败');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">公众号管理</h1>
        <button
          onClick={() => {
            setEditingAccount(null);
            setIsFormOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          新增公众号
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索公众号..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              搜索
            </button>
          </form>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 border-b">
            <p>{error}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  公众号名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  公众号ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AppID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  创建时间
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    加载中...
                  </td>
                </tr>
              ) : accounts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    暂无数据
                  </td>
                </tr>
              ) : (
                accounts.map((account) => (
                  <tr key={account.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{account.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{account.appId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          account.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {account.status === 'active' ? '正常' : '禁用'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(account.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setEditingAccount(account);
                          setIsFormOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(account.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-700">
            共 <span className="font-medium">{total}</span> 条记录
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              上一页
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * pageSize >= total}
              className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              下一页
            </button>
          </div>
        </div>
      </div>

      <AccountForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingAccount(null);
        }}
        onSubmit={editingAccount ? handleUpdate : handleCreate}
        initialData={editingAccount || undefined}
        title={editingAccount ? '编辑公众号' : '新增公众号'}
      />
    </div>
  );
}