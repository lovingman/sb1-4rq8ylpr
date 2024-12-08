import React, { useState } from 'react';
import { Brain, Plus, Pencil, Trash2 } from 'lucide-react';
import { AIConfig } from '../../types';
import { createAIConfig, updateAIConfig, deleteAIConfig } from '../../services/api';

interface AIConfigCardProps {
  configs: AIConfig[];
  onConfigChange: () => void;
}

export default function AIConfigCard({ configs, onConfigChange }: AIConfigCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingConfig, setEditingConfig] = useState<Partial<AIConfig>>({});
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if ('id' in editingConfig) {
        await updateAIConfig(editingConfig.id!, editingConfig);
      } else {
        await createAIConfig(editingConfig);
      }
      setIsEditing(false);
      setEditingConfig({});
      onConfigChange();
    } catch (err) {
      setError('保存配置失败');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAIConfig(id);
      onConfigChange();
    } catch (err) {
      setError('删除配置失败');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Brain className="mr-2" size={20} />
          AI配置
        </h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingConfig({});
          }}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <Plus className="mr-1" size={16} />
          新增配置
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">配置类型</label>
            <select
              value={editingConfig.type}
              onChange={(e) => setEditingConfig({ ...editingConfig, type: e.target.value as AIConfig['type'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">请选择配置类型</option>
              <option value="zhipu">智普</option>
              <option value="doubao">豆包</option>
              <option value="seek">Seek</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">API Key</label>
            <input
              type="text"
              value={editingConfig.apiKey}
              onChange={(e) => setEditingConfig({ ...editingConfig, apiKey: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">模型名称</label>
            <input
              type="text"
              value={editingConfig.modelName}
              onChange={(e) => setEditingConfig({ ...editingConfig, modelName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              保存
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingConfig({});
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              取消
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {configs.map((config) => (
            <div key={config.apiKey} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{config.type}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditingConfig(config);
                    }}
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(config.apiKey)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <p>API Key: {config.apiKey}</p>
                <p>模型名称: {config.modelName}</p>
                <p>创建时间: {new Date(config.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}