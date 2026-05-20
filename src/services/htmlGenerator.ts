import type { AnalysisReport } from '../types';

export function generateAnalysisHTML(report: AnalysisReport): string {
  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>快消行业竞对分析报告 - ${new Date().toLocaleDateString('zh-CN')}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f7fa;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 30px 20px;
    }

    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 25px;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25);
    }

    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .header p {
      font-size: 15px;
      opacity: 0.9;
    }

    .summary {
      background: white;
      padding: 25px;
      border-radius: 10px;
      margin-bottom: 25px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      border-left: 4px solid #3b82f6;
    }

    .summary h2 {
      font-size: 18px;
      margin-bottom: 12px;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .summary p {
      color: #475569;
      line-height: 1.7;
    }

    .comparison-section {
      margin-bottom: 30px;
    }

    .comparison-section h2 {
      font-size: 22px;
      margin-bottom: 18px;
      color: #1e293b;
      font-weight: 600;
    }

    .table-container {
      overflow-x: auto;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
    }

    th, td {
      padding: 14px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }

    th {
      font-weight: 600;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    tbody tr:hover {
      background: #f8fafc;
    }

    .company-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      margin-bottom: 25px;
      overflow: hidden;
    }

    .company-header {
      background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
      color: white;
      padding: 20px 25px;
    }

    .company-header h2 {
      font-size: 20px;
      margin-bottom: 4px;
    }

    .company-header .ticker {
      font-size: 13px;
      opacity: 0.9;
    }

    .company-content {
      padding: 25px;
    }

    .section {
      margin-bottom: 20px;
    }

    .section h3 {
      font-size: 16px;
      color: #1e293b;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section h3::before {
      content: '';
      width: 4px;
      height: 18px;
      background: #3b82f6;
      border-radius: 2px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 14px;
      margin-bottom: 18px;
    }

    .metric-card {
      background: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .metric-label {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 5px;
    }

    .metric-value {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag {
      background: #dbeafe;
      color: #1e40af;
      padding: 5px 12px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 500;
    }

    .tag.purple {
      background: #f3e8ff;
      color: #6b21a8;
    }

    ul {
      list-style: none;
      padding-left: 0;
    }

    ul li {
      padding: 7px 0 7px 20px;
      position: relative;
      color: #475569;
      font-size: 14px;
    }

    ul li::before {
      content: '•';
      position: absolute;
      left: 6px;
      color: #3b82f6;
      font-weight: bold;
    }

    .risk-box {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      border-radius: 0 6px 6px 0;
    }

    .risk-box h3 {
      color: #92400e;
      margin-bottom: 8px;
      font-size: 15px;
    }

    .risk-box p {
      color: #78350f;
      font-size: 14px;
    }

    .footer {
      text-align: center;
      padding: 25px;
      color: #64748b;
      font-size: 13px;
      margin-top: 30px;
      border-top: 1px solid #e5e7eb;
    }

    .growth-section {
      background: white;
      padding: 25px;
      border-radius: 10px;
      margin-bottom: 25px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .growth-section h2 {
      font-size: 20px;
      margin-bottom: 20px;
      color: #1e293b;
      font-weight: 600;
    }

    .growth-table {
      width: 100%;
    }

    .growth-table th {
      background: #f8fafc;
      color: #64748b;
      font-weight: 600;
      font-size: 13px;
    }

    .growth-table td {
      text-align: right;
    }

    .growth-table .company-name {
      text-align: left;
      font-weight: 600;
      color: #1e293b;
    }

    .growth-table .growth-value {
      font-weight: 600;
      color: #10b981;
    }

    .growth-table .growth-value.negative {
      color: #ef4444;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 快消行业竞对分析报告</h1>
      <p>生成时间: ${report.generatedAt}</p>
    </div>

    <div class="summary">
      <h2>📋 分析摘要</h2>
      <p>${report.summary}</p>
    </div>

    <div class="growth-section">
      <h2>📈 2023-2025年营收增长趋势</h2>
      <table class="growth-table">
        <thead>
          <tr>
            <th>公司</th>
            <th>2023年营收</th>
            <th>2024年营收</th>
            <th>2025年营收</th>
            <th>三年CAGR</th>
          </tr>
        </thead>
        <tbody>
          ${report.competitors.map(comp => {
            const year2023 = comp.financialData.yearlyData.find(d => d.fiscalYear === '2023');
            const year2025 = comp.financialData.yearlyData.find(d => d.fiscalYear === '2025');
            const cagr = year2023 && year2025 && year2023.revenue && year2025.revenue
              ? Math.round(Math.pow(year2025.revenue / year2023.revenue, 1/2) * 100 - 100) / 100
              : null;
            return `
              <tr>
                <td class="company-name">${comp.financialData.companyName}</td>
                <td>${year2023?.revenue || '-'} ${comp.financialData.currency}</td>
                <td>${comp.financialData.yearlyData.find(d => d.fiscalYear === '2024')?.revenue || '-'} ${comp.financialData.currency}</td>
                <td>${year2025?.revenue || '-'} ${comp.financialData.currency}</td>
                <td class="growth-value${cagr !== null && cagr < 0 ? ' negative' : ''}">
                  ${cagr !== null ? (cagr >= 0 ? '+' : '') + cagr + '%' : '-'}
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div class="comparison-section">
      <h2>🔍 2025年财务对比</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>公司</th>
              <th>代码</th>
              <th>营收</th>
              <th>营收增长</th>
              <th>毛利率</th>
              <th>营业利润率</th>
              <th>净利润率</th>
            </tr>
          </thead>
          <tbody>
            ${report.competitors.map(comp => {
              const latest = comp.financialData.yearlyData[comp.financialData.yearlyData.length - 1];
              return `
                <tr>
                  <td style="font-weight: 600;">${comp.financialData.companyName}</td>
                  <td>${comp.ticker}</td>
                  <td>${latest?.revenue} ${comp.financialData.currency}</td>
                  <td style="color: ${(latest?.revenueGrowth || 0) >= 0 ? '#10b981' : '#ef4444'}; font-weight: 600;">
                    ${(latest?.revenueGrowth || 0) >= 0 ? '+' : ''}${latest?.revenueGrowth}%
                  </td>
                  <td>${latest?.grossMargin}%</td>
                  <td>${latest?.operatingMargin}%</td>
                  <td>${latest?.netMargin}%</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <h2 style="font-size: 22px; margin-bottom: 18px; color: #1e293b; font-weight: 600;">📑 详细分析</h2>

    ${report.competitors.map(competitor => {
      const latest = competitor.financialData.yearlyData[competitor.financialData.yearlyData.length - 1];
      return `
        <div class="company-card">
          <div class="company-header">
            <h2>${competitor.financialData.companyName}</h2>
            <div class="ticker">股票代码: ${competitor.ticker} | 币种: ${competitor.financialData.currency}</div>
          </div>
          <div class="company-content">
            <div class="section">
              <h3>2025年财务表现</h3>
              <div class="metrics-grid">
                <div class="metric-card">
                  <div class="metric-label">营收</div>
                  <div class="metric-value">${latest?.revenue} ${competitor.financialData.currency}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">净利润</div>
                  <div class="metric-value">${latest?.netIncome} ${competitor.financialData.currency}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">毛利率</div>
                  <div class="metric-value">${latest?.grossMargin}%</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">净利润率</div>
                  <div class="metric-value">${latest?.netMargin}%</div>
                </div>
              </div>
            </div>

            <div class="section">
              <h3>市场定位</h3>
              <p style="color: #475569; line-height: 1.7;">${competitor.strategy.marketPosition}</p>
            </div>

            <div class="section">
              <h3>产品品类</h3>
              <div class="tag-list">
                ${competitor.strategy.productCategories.map(item => `<span class="tag">${item}</span>`).join('')}
              </div>
            </div>

            <div class="section">
              <h3>战略举措</h3>
              <ul>
                ${competitor.strategy.keyInitiatives.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>

            <div class="section">
              <h3>竞争优势</h3>
              <ul>
                ${competitor.strategy.competitiveAdvantages.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>

            <div class="section">
              <h3>品牌组合</h3>
              <div class="tag-list">
                ${competitor.strategy.brandPortfolio.map(item => `<span class="tag purple">${item}</span>`).join('')}
              </div>
            </div>

            <div class="section">
              <h3>未来展望</h3>
              <p style="color: #475569; line-height: 1.7;">${competitor.strategy.futureOutlook}</p>
            </div>

            <div class="risk-box">
              <h3>风险因素</h3>
              <p>${competitor.strategy.risks.join('; ')}</p>
            </div>
          </div>
        </div>
      `;
    }).join('')}

    <div class="footer">
      <p>快消行业竞对分析Agent | 数据仅供参考，不构成投资建议</p>
    </div>
  </div>
</body>
</html>
  `;
  return html;
}
