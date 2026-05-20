import type { FinancialData, StrategyInsight } from '../types';

const mockFinancialData: Record<string, FinancialData> = {
  'UL': {
    companyName: 'Unilever PLC',
    ticker: 'UL',
    currency: 'EUR',
    yearlyData: [
      {
        fiscalYear: '2023',
        revenue: 59.6,
        netIncome: 7.9,
        grossProfit: 30.8,
        operatingIncome: 10.4,
        eps: 3.23,
        grossMargin: 51.7,
        operatingMargin: 17.4,
        netMargin: 13.3,
        totalAssets: 72.3,
        totalLiabilities: 38.9,
        cashFlow: 8.2,
        workingCapital: 2.1,
        inventory: 5.8,
        accountsReceivable: 7.2,
        peRatio: 19.8,
        psRatio: 2.4,
        pbRatio: 6.8,
        revenueGrowth: 3.2,
        netIncomeGrowth: 1.8,
        marketShare: 12.5,
        rdExpenses: 1.2,
        marketingExpenses: 12.8
      },
      {
        fiscalYear: '2024',
        revenue: 62.8,
        netIncome: 8.6,
        grossProfit: 32.8,
        operatingIncome: 11.3,
        eps: 3.51,
        grossMargin: 52.2,
        operatingMargin: 18.0,
        netMargin: 13.7,
        totalAssets: 75.1,
        totalLiabilities: 40.2,
        cashFlow: 8.9,
        workingCapital: 2.3,
        inventory: 6.1,
        accountsReceivable: 7.5,
        peRatio: 21.0,
        psRatio: 2.5,
        pbRatio: 7.2,
        revenueGrowth: 5.4,
        netIncomeGrowth: 8.9,
        marketShare: 12.8,
        rdExpenses: 1.3,
        marketingExpenses: 13.5
      },
      {
        fiscalYear: '2025',
        revenue: 66.5,
        netIncome: 9.4,
        grossProfit: 34.9,
        operatingIncome: 12.1,
        eps: 3.82,
        grossMargin: 52.5,
        operatingMargin: 18.2,
        netMargin: 14.1,
        totalAssets: 78.5,
        totalLiabilities: 41.8,
        cashFlow: 9.5,
        workingCapital: 2.5,
        inventory: 6.4,
        accountsReceivable: 7.9,
        peRatio: 22.5,
        psRatio: 2.6,
        pbRatio: 7.6,
        revenueGrowth: 5.9,
        netIncomeGrowth: 9.3,
        marketShare: 13.2,
        rdExpenses: 1.4,
        marketingExpenses: 14.2
      }
    ]
  },
  'OR': {
    companyName: 'L\'Oréal S.A.',
    ticker: 'OR',
    currency: 'EUR',
    yearlyData: [
      {
        fiscalYear: '2023',
        revenue: 41.18,
        netIncome: 6.0,
        grossProfit: 29.5,
        operatingIncome: 7.6,
        eps: 10.76,
        grossMargin: 71.6,
        operatingMargin: 18.5,
        netMargin: 14.6,
        totalAssets: 56.8,
        totalLiabilities: 22.4,
        cashFlow: 6.8,
        workingCapital: 4.2,
        inventory: 4.8,
        accountsReceivable: 6.9,
        peRatio: 35.2,
        psRatio: 4.8,
        pbRatio: 11.2,
        revenueGrowth: 11.2,
        netIncomeGrowth: 15.3,
        marketShare: 8.8,
        rdExpenses: 3.4,
        marketingExpenses: 31.2
      },
      {
        fiscalYear: '2024',
        revenue: 45.9,
        netIncome: 6.9,
        grossProfit: 32.9,
        operatingIncome: 8.6,
        eps: 12.38,
        grossMargin: 71.7,
        operatingMargin: 18.7,
        netMargin: 15.0,
        totalAssets: 61.5,
        totalLiabilities: 24.1,
        cashFlow: 7.6,
        workingCapital: 4.5,
        inventory: 5.1,
        accountsReceivable: 7.2,
        peRatio: 37.5,
        psRatio: 5.1,
        pbRatio: 12.0,
        revenueGrowth: 11.5,
        netIncomeGrowth: 15.0,
        marketShare: 9.2,
        rdExpenses: 3.7,
        marketingExpenses: 33.5
      },
      {
        fiscalYear: '2025',
        revenue: 51.2,
        netIncome: 7.9,
        grossProfit: 36.8,
        operatingIncome: 9.7,
        eps: 14.22,
        grossMargin: 71.9,
        operatingMargin: 18.9,
        netMargin: 15.4,
        totalAssets: 66.8,
        totalLiabilities: 25.9,
        cashFlow: 8.5,
        workingCapital: 4.8,
        inventory: 5.4,
        accountsReceivable: 7.6,
        peRatio: 39.8,
        psRatio: 5.4,
        pbRatio: 12.8,
        revenueGrowth: 11.6,
        netIncomeGrowth: 14.5,
        marketShare: 9.7,
        rdExpenses: 4.0,
        marketingExpenses: 36.0
      }
    ]
  },
  'PG': {
    companyName: 'Procter & Gamble Co.',
    ticker: 'PG',
    currency: 'USD',
    yearlyData: [
      {
        fiscalYear: '2023',
        revenue: 84.0,
        netIncome: 14.7,
        grossProfit: 39.6,
        operatingIncome: 19.5,
        eps: 5.96,
        grossMargin: 47.1,
        operatingMargin: 23.2,
        netMargin: 17.5,
        totalAssets: 116.4,
        totalLiabilities: 61.3,
        cashFlow: 16.8,
        workingCapital: 2.8,
        inventory: 8.4,
        accountsReceivable: 4.5,
        peRatio: 26.8,
        psRatio: 4.1,
        pbRatio: 7.9,
        revenueGrowth: 2.8,
        netIncomeGrowth: 3.2,
        marketShare: 15.2,
        rdExpenses: 2.1,
        marketingExpenses: 18.5
      },
      {
        fiscalYear: '2024',
        revenue: 87.5,
        netIncome: 15.8,
        grossProfit: 41.4,
        operatingIncome: 20.6,
        eps: 6.41,
        grossMargin: 47.3,
        operatingMargin: 23.5,
        netMargin: 18.1,
        totalAssets: 121.0,
        totalLiabilities: 63.2,
        cashFlow: 17.9,
        workingCapital: 3.0,
        inventory: 8.8,
        accountsReceivable: 4.7,
        peRatio: 28.5,
        psRatio: 4.3,
        pbRatio: 8.2,
        revenueGrowth: 4.2,
        netIncomeGrowth: 7.5,
        marketShare: 15.5,
        rdExpenses: 2.2,
        marketingExpenses: 19.2
      },
      {
        fiscalYear: '2025',
        revenue: 91.5,
        netIncome: 17.0,
        grossProfit: 43.3,
        operatingIncome: 21.8,
        eps: 6.89,
        grossMargin: 47.3,
        operatingMargin: 23.8,
        netMargin: 18.6,
        totalAssets: 126.5,
        totalLiabilities: 65.5,
        cashFlow: 19.2,
        workingCapital: 3.2,
        inventory: 9.2,
        accountsReceivable: 4.9,
        peRatio: 30.2,
        psRatio: 4.5,
        pbRatio: 8.6,
        revenueGrowth: 4.6,
        netIncomeGrowth: 7.6,
        marketShare: 15.9,
        rdExpenses: 2.4,
        marketingExpenses: 20.0
      }
    ]
  },
  'HANSHO': {
    companyName: '韩束（HanShuo）',
    ticker: 'HANSHO',
    currency: 'CNY',
    yearlyData: [
      {
        fiscalYear: '2023',
        revenue: 24.5,
        netIncome: 2.1,
        grossProfit: 13.2,
        operatingIncome: 2.8,
        eps: 0.52,
        grossMargin: 53.9,
        operatingMargin: 11.4,
        netMargin: 8.6,
        totalAssets: 18.2,
        totalLiabilities: 8.9,
        cashFlow: 3.2,
        workingCapital: 5.3,
        inventory: 3.8,
        accountsReceivable: 2.1,
        peRatio: 32.5,
        psRatio: 3.2,
        pbRatio: 4.8,
        revenueGrowth: 18.6,
        netIncomeGrowth: 25.8,
        marketShare: 3.2,
        rdExpenses: 2.5,
        marketingExpenses: 28.5
      },
      {
        fiscalYear: '2024',
        revenue: 29.2,
        netIncome: 2.6,
        grossProfit: 15.9,
        operatingIncome: 3.4,
        eps: 0.65,
        grossMargin: 54.5,
        operatingMargin: 11.6,
        netMargin: 8.9,
        totalAssets: 21.0,
        totalLiabilities: 9.8,
        cashFlow: 3.8,
        workingCapital: 5.8,
        inventory: 4.2,
        accountsReceivable: 2.3,
        peRatio: 34.8,
        psRatio: 3.5,
        pbRatio: 5.2,
        revenueGrowth: 19.2,
        netIncomeGrowth: 23.8,
        marketShare: 3.6,
        rdExpenses: 2.8,
        marketingExpenses: 32.0
      },
      {
        fiscalYear: '2025',
        revenue: 35.5,
        netIncome: 3.3,
        grossProfit: 19.3,
        operatingIncome: 4.1,
        eps: 0.82,
        grossMargin: 54.4,
        operatingMargin: 11.5,
        netMargin: 9.3,
        totalAssets: 24.5,
        totalLiabilities: 10.9,
        cashFlow: 4.5,
        workingCapital: 6.3,
        inventory: 4.6,
        accountsReceivable: 2.6,
        peRatio: 37.2,
        psRatio: 3.8,
        pbRatio: 5.7,
        revenueGrowth: 21.6,
        netIncomeGrowth: 26.9,
        marketShare: 4.1,
        rdExpenses: 3.2,
        marketingExpenses: 36.0
      }
    ]
  },
  '600315': {
    companyName: '上海家化联合股份有限公司',
    ticker: '600315',
    currency: 'CNY',
    yearlyData: [
      {
        fiscalYear: '2023',
        revenue: 18.6,
        netIncome: 1.2,
        grossProfit: 9.8,
        operatingIncome: 1.5,
        eps: 0.18,
        grossMargin: 52.7,
        operatingMargin: 8.1,
        netMargin: 6.5,
        totalAssets: 12.8,
        totalLiabilities: 5.4,
        cashFlow: 1.8,
        workingCapital: 4.2,
        inventory: 2.6,
        accountsReceivable: 1.8,
        peRatio: 45.2,
        psRatio: 2.8,
        pbRatio: 3.2,
        revenueGrowth: 5.2,
        netIncomeGrowth: -8.5,
        marketShare: 2.1,
        rdExpenses: 1.8,
        marketingExpenses: 22.8
      },
      {
        fiscalYear: '2024',
        revenue: 19.5,
        netIncome: 1.3,
        grossProfit: 10.3,
        operatingIncome: 1.6,
        eps: 0.19,
        grossMargin: 52.8,
        operatingMargin: 8.2,
        netMargin: 6.7,
        totalAssets: 13.5,
        totalLiabilities: 5.6,
        cashFlow: 2.0,
        workingCapital: 4.5,
        inventory: 2.7,
        accountsReceivable: 1.9,
        peRatio: 47.5,
        psRatio: 3.0,
        pbRatio: 3.4,
        revenueGrowth: 4.8,
        netIncomeGrowth: 8.3,
        marketShare: 2.2,
        rdExpenses: 2.0,
        marketingExpenses: 23.5
      },
      {
        fiscalYear: '2025',
        revenue: 20.8,
        netIncome: 1.4,
        grossProfit: 11.0,
        operatingIncome: 1.7,
        eps: 0.21,
        grossMargin: 52.9,
        operatingMargin: 8.2,
        netMargin: 6.7,
        totalAssets: 14.2,
        totalLiabilities: 5.8,
        cashFlow: 2.2,
        workingCapital: 4.8,
        inventory: 2.9,
        accountsReceivable: 2.0,
        peRatio: 49.8,
        psRatio: 3.2,
        pbRatio: 3.6,
        revenueGrowth: 6.7,
        netIncomeGrowth: 7.7,
        marketShare: 2.3,
        rdExpenses: 2.2,
        marketingExpenses: 24.2
      }
    ]
  }
};

const mockStrategyData: Record<string, StrategyInsight> = {
  'UL': {
    companyName: 'Unilever PLC',
    keyInitiatives: [
      '推进"增长行动计划"，聚焦核心品牌和高增长市场',
      '加速数字化转型，构建电商和社交电商渠道',
      '实施成本优化计划，提升运营效率',
      '布局可持续发展战略，承诺2030年实现碳排放减半'
    ],
    marketPosition: '全球最大日化用品公司之一，在美容个护、家庭护理、食品饮料等领域均处于领先地位',
    competitiveAdvantages: [
      '强大的品牌组合（16个收入超过10亿欧元的品牌）',
      '广泛的全球分销网络覆盖190多个国家',
      '强大的研发能力在可持续创新方面领先',
      '多品类布局降低单一业务风险'
    ],
    futureOutlook: '继续深化高端化战略，加大对中国等高增长市场的投入，强化电商渠道布局，提升数字化营销能力',
    risks: [
      '新兴市场货币波动影响营收',
      '原材料成本上涨压力持续',
      '品牌老化风险和年轻消费者吸引力不足',
      '监管政策趋严特别是环保法规'
    ],
    productCategories: ['美容个护', '家庭护理', '食品饮料', '营养健康'],
    keyMarkets: ['北美', '欧洲', '亚太', '拉丁美洲', '非洲'],
    brandPortfolio: ['多芬', '旁氏', '清扬', '中华', '奥妙', '立顿', '家乐']
  },
  'OR': {
    companyName: 'L\'Oréal S.A.',
    keyInitiatives: [
      '强化高端美妆领先地位，加大奢华产品线投入',
      '加速科技创新，AI驱动的个性化美妆解决方案',
      '拓展男士护肤和活性美妆细分市场',
      '推进可持续发展"共享美妆"计划'
    ],
    marketPosition: '全球最大化妆品公司，高端美妆市场占有率全球第一',
    competitiveAdvantages: [
      '无可比拟的高端品牌矩阵（兰蔻、圣罗兰、乔治阿玛尼等）',
      '强大的研发创新体系，持有超过5000项专利',
      '卓越的数字营销和社交媒体运营能力',
      '高效的供应链管理和直营渠道'
    ],
    futureOutlook: '持续领跑高端美妆市场，加大对亚太特别是中国市场的投入，抓住功效护肤和个性化美妆趋势',
    risks: [
      '高端美妆市场竞争加剧',
      '旅游零售渠道复苏不确定性',
      '中国市场需求波动',
      '法规对成分宣传要求趋严'
    ],
    productCategories: ['护肤品', '彩妆', '护发', '香水', '男士护肤', '活性美妆'],
    keyMarkets: ['西欧', '北美', '亚太', '东欧', '拉丁美洲'],
    brandPortfolio: ['兰蔻', '圣罗兰', '乔治阿玛尼', '科颜氏', '巴黎欧莱雅', '美宝莲', '卡尼尔']
  },
  'PG': {
    companyName: 'Procter & Gamble Co.',
    keyInitiatives: [
      '实施"整合主导"战略，优化产品组合和定价',
      '加大创新投入，推出高端升级产品',
      '推进供应链数字化和智能化',
      '强化可持续发展，承诺100%可回收包装'
    ],
    marketPosition: '全球最大的日用消费品公司，在多个品类占据市场领导地位',
    competitiveAdvantages: [
      '强大的品牌资产和消费者信任度',
      '卓越的供应链管理和成本控制能力',
      '深厚的品类管理专业知识和创新能力',
      '稳定的高股息和股票回购政策'
    ],
    futureOutlook: '通过产品创新和定价策略提升盈利能力，加大新兴市场和电商渠道投入，应对消费分级趋势',
    risks: [
      '人口出生率下降影响婴儿护理业务',
      '原材料和物流成本持续高企',
      '来自自有品牌和新兴品牌的竞争',
      '汇率波动影响跨国业务'
    ],
    productCategories: ['美容个护', '婴儿护理', '家庭护理', '织物护理', '剃须护理', '健康护理'],
    keyMarkets: ['北美', '欧洲', '亚太', '拉丁美洲', '印度'],
    brandPortfolio: ['海飞丝', '潘婷', '帮宝适', '好奇', '汰渍', '碧浪', '吉列', 'OLAY']
  },
  'HANSHO': {
    companyName: '韩束（HanShuo）',
    keyInitiatives: [
      '聚焦功效护肤赛道，强化科研实力',
      '布局全域电商，抖音、快手等新渠道快速增长',
      '推进品牌升级，提升中高端市场渗透率',
      '加大代言人营销和KOL合作力度'
    ],
    marketPosition: '中国本土头部美妆品牌，在抖音等新电商平台表现突出',
    competitiveAdvantages: [
      '深耕中国本土市场，对消费者需求洞察深刻',
      '灵活的价格策略和高性价比产品定位',
      '强大的内容营销和社交电商运营能力',
      '快速的产品迭代和供应链响应'
    ],
    futureOutlook: '继续深化功效护肤定位，加大科研投入，提升品牌溢价能力，拓展一二线城市市场',
    risks: [
      '与国际品牌的激烈竞争',
      '流量成本持续攀升',
      '研发实力与国际品牌存在差距',
      '品牌忠诚度有待提升'
    ],
    productCategories: ['护肤', '彩妆', '面膜', '男士护肤'],
    keyMarkets: ['中国一二线城市', '下沉市场', '东南亚华人市场'],
    brandPortfolio: ['韩束', '一叶子', '红色小象', '花瑶']
  },
  '600315': {
    companyName: '上海家化联合股份有限公司',
    keyInitiatives: [
      '聚焦高毛利品牌佰草集和玉泽，提升盈利能力',
      '优化渠道结构，收缩低效网点',
      '推进数字化转型，构建私域流量运营',
      '强化科研创新，打造功效护肤产品线'
    ],
    marketPosition: '中国历史最悠久的日化企业之一，拥有多个经典民族品牌',
    competitiveAdvantages: [
      '深厚的历史积淀和民族文化认同',
      '拥有独家中药草本护肤研发能力',
      '完善的线下渠道网络覆盖',
      '品牌资产丰富，涵盖多个价格带'
    ],
    futureOutlook: '聚焦高端化战略，提升品牌定位，加大研发投入，优化渠道结构，实现可持续增长',
    risks: [
      '品牌形象老化，年轻消费者认知度不足',
      '渠道转型阵痛，线下渠道持续承压',
      '研发投入与国际品牌存在差距',
      '管理层变动带来战略不连续性'
    ],
    productCategories: ['护肤', '个人护理', '家居护理', '婴幼儿护理'],
    keyMarkets: ['中国全线城市', '东南亚市场'],
    brandPortfolio: ['佰草集', '玉泽', '六神', '高夫', '美加净', '启初']
  }
};

export async function fetchFinancialData(ticker: string): Promise<FinancialData | null> {
  ticker = ticker.toUpperCase().trim();
  return mockFinancialData[ticker] || null;
}

export async function fetchStrategyInsight(ticker: string): Promise<StrategyInsight | null> {
  ticker = ticker.toUpperCase().trim();
  return mockStrategyData[ticker] || null;
}

export const supportedCompanies = Object.keys(mockFinancialData);

export const companyInfo: Record<string, { name: string; sector: string; currency: string }> = {
  'UL': { name: 'Unilever PLC', sector: '快消品', currency: 'EUR' },
  'OR': { name: 'L\'Oréal S.A.', sector: '化妆品', currency: 'EUR' },
  'PG': { name: 'Procter & Gamble', sector: '快消品', currency: 'USD' },
  'HANSHO': { name: '韩束', sector: '化妆品', currency: 'CNY' },
  '600315': { name: '上海家化', sector: '快消品', currency: 'CNY' }
};
