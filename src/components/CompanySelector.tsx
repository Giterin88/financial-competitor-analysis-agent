import { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { supportedCompanies, companyInfo } from '../services/financialScraper';

interface CompanySelectorProps {
  selectedCompanies: string[];
  onAddCompany: (ticker: string) => void;
  onRemoveCompany: (ticker: string) => void;
}

export function CompanySelector({ selectedCompanies, onAddCompany, onRemoveCompany }: CompanySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCompanies = supportedCompanies.filter(
    (ticker) => {
      const info = companyInfo[ticker];
      const matchesSearch = ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (info?.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return !selectedCompanies.includes(ticker) && matchesSearch;
    }
  );
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">选择竞对公司</h2>
      <p className="text-sm text-gray-500 mb-4">快消行业：Unilever、欧莱雅、宝洁、韩束、上海家化</p>
      
      {selectedCompanies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCompanies.map((ticker) => {
            const info = companyInfo[ticker];
            return (
              <span
                key={ticker}
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                <span>{ticker}</span>
                {info && <span className="text-xs opacity-80">({info.name})</span>}
                <button
                  onClick={() => onRemoveCompany(ticker)}
                  className="hover:bg-white/20 rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            );
          })}
        </div>
      )}
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜索公司..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="mt-4 max-h-60 overflow-y-auto">
        {filteredCompanies.length > 0 ? (
          <div className="space-y-2">
            {filteredCompanies.map((ticker) => {
              const info = companyInfo[ticker];
              return (
                <button
                  key={ticker}
                  onClick={() => {
                    onAddCompany(ticker);
                    setSearchTerm('');
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div>
                    <span className="font-medium text-gray-800">{ticker}</span>
                    {info && <span className="text-sm text-gray-500 ml-2">({info.name})</span>}
                    {info && <span className="text-xs text-gray-400 ml-1">[{info.currency}]</span>}
                  </div>
                  <Plus className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">
            {searchTerm ? '未找到匹配的公司' : '所有支持的公司已添加'}
          </p>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          <strong>支持的公司：</strong><br />
          {supportedCompanies.map((ticker) => {
            const info = companyInfo[ticker];
            return `${ticker}(${info?.name || ticker})`;
          }).join('、')}
        </p>
      </div>
    </div>
  );
}
