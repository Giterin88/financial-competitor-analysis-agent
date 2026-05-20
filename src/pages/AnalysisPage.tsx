import { useState } from 'react';
import { Play, Download, FileText, TrendingUp, Building2, AlertCircle } from 'lucide-react';
import { CompanySelector } from '../components/CompanySelector';
import { GrowthTrendChart } from '../components/GrowthTrendChart';
import { fetchFinancialData, fetchStrategyInsight } from '../services/financialScraper';
import { generateAnalysisHTML } from '../services/htmlGenerator';
import type { CompetitorAnalysis, AnalysisReport } from '../types';

export function AnalysisPage() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'comparison' | 'charts' | 'details'>('charts');

  const handleAddCompany = (ticker: string) => {
    if (!selectedCompanies.includes(ticker)) {
      setSelectedCompanies([...selectedCompanies, ticker]);
    }
  };

  const handleRemoveCompany = (ticker: string) => {
    setSelectedCompanies(selectedCompanies.filter((t) => t !== ticker));
  };

  const generateSummary = (competitors: CompetitorAnalysis[]): string => {
    if (competitors.length === 0) return '';
    
    const sortedByRevenue = [...competitors].sort((a, b) => 
      (b.financialData.yearlyData[b.financialData.yearlyData.length - 1]?.revenue || 0) - 
      (a.financialData.yearlyData[a.financialData.yearlyData.length - 1]?.revenue || 0)
    );
    const topRevenue = sortedByRevenue[0];
    
    const sortedByGrowth = [...competitors].sort((a, b) => 
      (b.financialData.yearlyData[b.financialData.yearlyData.length - 1]?.revenueGrowth || 0) - 
      (a.financialData.yearlyData[a.financialData.yearlyData.length - 1]?.revenueGrowth || 0)
    );
    const fastestGrowth = sortedByGrowth[0];
    
    const sortedByMargin = [...competitors].sort((a, b) => 
      (b.financialData.yearlyData[b.financialData.yearlyData.length - 1]?.grossMargin || 0) - 
      (a.financialData.yearlyData[a.financialData.yearlyData.length - 1]?.grossMargin || 0)
    );
    const highestMargin = sortedByMargin[0];

    return `本次分析涵盖 ${competitors.length} 家快消行业领先企业。从营收规模来看，${topRevenue.financialData.companyName} 以 ${topRevenue.financialData.yearlyData[topRevenue.financialData.yearlyData.length - 1]?.revenue} ${topRevenue.financialData.currency} 领先，展现了其在行业中的龙头地位。盈利能力方面，${highestMargin.financialData.companyName} 拥有最高的毛利率 (${highestMargin.financialData.yearlyData[highestMargin.financialData.yearlyData.length - 1]?.grossMargin}%)，体现了强大的品牌溢价能力。增长动力上，${fastestGrowth.financialData.companyName} 的营收增长最快，显示出强劲的业务扩张势头。整体来看，快消行业呈现出高端化、数字化和本土化三大趋势，各企业均在积极布局功效护肤和电商渠道。`;
  };

  const handleAnalyze = async () => {
    if (selectedCompanies.length === 0) {
      setError('请至少选择一家公司进行分析');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setReport(null);

    try {
      const competitors: CompetitorAnalysis[] = [];

      for (const ticker of selectedCompanies) {
        const financialData = await fetchFinancialData(ticker);
        const strategy = await fetchStrategyInsight(ticker);

        if (financialData && strategy) {
          competitors.push({
            companyName: financialData.companyName,
            ticker: financialData.ticker,
            financialData,
            strategy
          });
        }
      }

      const summary = generateSummary(competitors);
      const reportData: AnalysisReport = {
        competitors,
        generatedAt: new Date().toLocaleString('zh-CN'),
        summary
      };

      setReport(reportData);
      setActiveTab('charts');
    } catch (err) {
      setError('分析过程中发生错误，请重试');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportHTML = () => {
    if (!report) return;
    
    const htmlContent = generateAnalysisHTML(report);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `快消行业竞对分析报告_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderMetric = (label: string, value: number | null, unit: string = '') => (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-xl font-bold text-gray-800">
        {value !== null ? `${value}${unit}` : '-'}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">快消行业竞对分析Agent</h1>
                <p className="text-sm text-gray-500">抓取Unilever、欧莱雅、宝洁、韩束、上海家化等快消公司财报，生成结构化竞对分析报告</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CompanySelector
              selectedCompanies={selectedCompanies}
              onAddCompany={handleAddCompany}
              onRemoveCompany={handleRemoveCompany}
            />

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || selectedCompanies.length === 0}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>分析中...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>开始分析</span>
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            {report ? (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-white">分析结果</h2>
                        <p className="text-green-100 text-sm">生成时间: {report.generatedAt}</p>
                      </div>
                      <button
                        onClick={handleExportHTML}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>导出HTML</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-800">分析摘要</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{report.summary}</p>
                    </div>

                    {/* 标签页 */}
                    <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2">
                      <button
                        onClick={() => setActiveTab('charts')}
                        className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                          activeTab === 'charts'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        增长趋势图
                      </button>
                      <button
                        onClick={() => setActiveTab('comparison')}
                        className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                          activeTab === 'comparison'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        2025年对比
                      </button>
                      <button
                        onClick={() => setActiveTab('details')}
                        className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                          activeTab === 'details'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        详细分析
                      </button>
                    </div>

                    {/* 增长趋势图 */}
                    {activeTab === 'charts' && (
                      <GrowthTrendChart
                        competitors={report.competitors.map(comp => ({
                          ...comp.financialData
                        }))}
                        dataType="revenue"
                        title="营收增长趋势 (2023-2025)"
                        yAxisLabel="营收 (十亿)"
                        formatValue={(value) => value !== null ? `${value}B` : '-'}
                      />
                    )}

                    {/* 对比表格 */}
                    {activeTab === 'comparison' && (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                              <th className="px-4 py-3 text-left font-semibold">公司</th>
                              <th className="px-4 py-3 text-left font-semibold">代码</th>
                              <th className="px-4 py-3 text-right font-semibold">营收</th>
                              <th className="px-4 py-3 text-right font-semibold">营收增长</th>
                              <th className="px-4 py-3 text-right font-semibold">毛利率</th>
                              <th className="px-4 py-3 text-right font-semibold">营业利润率</th>
                              <th className="px-4 py-3 text-right font-semibold">净利润率</th>
                            </tr>
                          </thead>
                          <tbody>
                            {report.competitors.map((comp, index) => {
                              const latest = comp.financialData.yearlyData[comp.financialData.yearlyData.length - 1];
                              return (
                                <tr key={comp.ticker} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="px-4 py-3 font-medium text-gray-800">{comp.financialData.companyName}</td>
                                  <td className="px-4 py-3 text-gray-600">{comp.ticker}</td>
                                  <td className="px-4 py-3 text-right font-semibold text-gray-800">
                                    {latest?.revenue} {comp.financialData.currency}
                                  </td>
                                  <td className={`px-4 py-3 text-right font-semibold ${(latest?.revenueGrowth || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {(latest?.revenueGrowth || 0) >= 0 ? '+' : ''}{latest?.revenueGrowth}%
                                  </td>
                                  <td className="px-4 py-3 text-right text-gray-800">{latest?.grossMargin}%</td>
                                  <td className="px-4 py-3 text-right text-gray-800">{latest?.operatingMargin}%</td>
                                  <td className="px-4 py-3 text-right text-gray-800">{latest?.netMargin}%</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* 详细分析 */}
                    {activeTab === 'details' && (
                      <div className="space-y-6">
                        {report.competitors.map((competitor) => {
                          const latest = competitor.financialData.yearlyData[competitor.financialData.yearlyData.length - 1];
                          return (
                            <div key={competitor.ticker} className="border border-gray-200 rounded-xl overflow-hidden">
                              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <Building2 className="w-8 h-8 text-white" />
                                  <div>
                                    <h3 className="text-xl font-bold text-white">{competitor.financialData.companyName}</h3>
                                    <p className="text-teal-100 text-sm">股票代码: {competitor.ticker} | 币种: {competitor.financialData.currency}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="p-6">
                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-blue-500 rounded" />
                                    2025年财务表现
                                  </h4>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {renderMetric('营收', latest?.revenue, competitor.financialData.currency)}
                                    {renderMetric('净利润', latest?.netIncome, competitor.financialData.currency)}
                                    {renderMetric('毛利率', latest?.grossMargin, '%')}
                                    {renderMetric('净利润率', latest?.netMargin, '%')}
                                  </div>
                                </div>

                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-purple-500 rounded" />
                                    市场定位
                                  </h4>
                                  <p className="text-gray-600">{competitor.strategy.marketPosition}</p>
                                </div>

                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-3">产品品类</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {competitor.strategy.productCategories.map((item, idx) => (
                                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{item}</span>
                                    ))}
                                  </div>
                                </div>

                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-green-500 rounded" />
                                    战略举措
                                  </h4>
                                  <ul className="space-y-2">
                                    {competitor.strategy.keyInitiatives.map((item, idx) => (
                                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-orange-500 rounded" />
                                    竞争优势
                                  </h4>
                                  <ul className="space-y-2">
                                    {competitor.strategy.competitiveAdvantages.map((item, idx) => (
                                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-3">品牌组合</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {competitor.strategy.brandPortfolio.map((item, idx) => (
                                      <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{item}</span>
                                    ))}
                                  </div>
                                </div>

                                <div className="mb-6">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-indigo-500 rounded" />
                                    未来展望
                                  </h4>
                                  <p className="text-gray-600">{competitor.strategy.futureOutlook}</p>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                                  <h4 className="text-lg font-semibold text-yellow-800 mb-2">风险因素</h4>
                                  <p className="text-yellow-700">{competitor.strategy.risks.join('; ')}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">准备开始分析</h3>
                <p className="text-gray-500">从左侧选择需要分析的快消公司，然后点击"开始分析"按钮</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          快消行业竞对分析Agent | 数据仅供参考，不构成投资建议
        </div>
      </footer>
    </div>
  );
}
