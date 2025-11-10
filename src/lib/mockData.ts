// Mock data generator for dashboard

export interface Supplier {
  id: number;
  name: string;
  category: string;
  totalPaid: number;
  lastInvoices: { date: string; amount: number }[];
}

export const generateMockSuppliers = (): Supplier[] => {
  return [
    {
      id: 1,
      name: "TechSolutions Brasil",
      category: "software",
      totalPaid: 125000,
      lastInvoices: [
        { date: "15/01/2025", amount: 15000 },
        { date: "15/12/2024", amount: 15000 },
        { date: "15/11/2024", amount: 12000 },
        { date: "15/10/2024", amount: 13000 },
      ],
    },
    {
      id: 2,
      name: "Cloud Hosting Pro",
      category: "infrastructure",
      totalPaid: 89000,
      lastInvoices: [
        { date: "10/01/2025", amount: 9500 },
        { date: "10/12/2024", amount: 9000 },
        { date: "10/11/2024", amount: 8500 },
        { date: "10/10/2024", amount: 8500 },
      ],
    },
    {
      id: 3,
      name: "Marketing Digital Corp",
      category: "marketing",
      totalPaid: 156000,
      lastInvoices: [
        { date: "20/01/2025", amount: 18000 },
        { date: "20/12/2024", amount: 16000 },
        { date: "20/11/2024", amount: 17000 },
        { date: "20/10/2024", amount: 15000 },
      ],
    },
    {
      id: 4,
      name: "Hardware Supplies Inc",
      category: "hardware",
      totalPaid: 67000,
      lastInvoices: [
        { date: "05/01/2025", amount: 8000 },
        { date: "05/12/2024", amount: 7500 },
        { date: "05/11/2024", amount: 6500 },
        { date: "05/10/2024", amount: 7000 },
      ],
    },
    {
      id: 5,
      name: "Consultoria Empresarial",
      category: "services",
      totalPaid: 98000,
      lastInvoices: [
        { date: "25/01/2025", amount: 12000 },
        { date: "25/12/2024", amount: 10000 },
        { date: "25/11/2024", amount: 11000 },
        { date: "25/10/2024", amount: 10000 },
      ],
    },
    {
      id: 6,
      name: "DevOps Services",
      category: "infrastructure",
      totalPaid: 112000,
      lastInvoices: [
        { date: "12/01/2025", amount: 14000 },
        { date: "12/12/2024", amount: 13000 },
        { date: "12/11/2024", amount: 12000 },
        { date: "12/10/2024", amount: 12500 },
      ],
    },
    {
      id: 7,
      name: "Design Studio Pro",
      category: "services",
      totalPaid: 78000,
      lastInvoices: [
        { date: "18/01/2025", amount: 9000 },
        { date: "18/12/2024", amount: 8500 },
        { date: "18/11/2024", amount: 8000 },
        { date: "18/10/2024", amount: 8200 },
      ],
    },
    {
      id: 8,
      name: "Analytics & BI Solutions",
      category: "software",
      totalPaid: 143000,
      lastInvoices: [
        { date: "22/01/2025", amount: 17000 },
        { date: "22/12/2024", amount: 16000 },
        { date: "22/11/2024", amount: 15500 },
        { date: "22/10/2024", amount: 15000 },
      ],
    },
    {
      id: 9,
      name: "SEO Experts Agency",
      category: "marketing",
      totalPaid: 91000,
      lastInvoices: [
        { date: "08/01/2025", amount: 11000 },
        { date: "08/12/2024", amount: 10500 },
        { date: "08/11/2024", amount: 10000 },
        { date: "08/10/2024", amount: 9500 },
      ],
    },
    {
      id: 10,
      name: "Security Systems Ltd",
      category: "infrastructure",
      totalPaid: 134000,
      lastInvoices: [
        { date: "28/01/2025", amount: 16000 },
        { date: "28/12/2024", amount: 15000 },
        { date: "28/11/2024", amount: 14500 },
        { date: "28/10/2024", amount: 14000 },
      ],
    },
  ];
};

export const generateRevenueData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const baseRevenue = 150000;
    const variation = Math.random() * 50000 - 25000;
    const seasonality = Math.sin((i / days) * Math.PI * 2) * 20000;
    const revenue = Math.floor(baseRevenue + variation + seasonality);
    
    data.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      revenue: Math.max(revenue, 50000),
    });
  }
  
  return data;
};

export const generateSparklineData = (days: number) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    data.push(Math.floor(Math.random() * 100) + 50);
  }
  return data;
};

export const calculateMetrics = (suppliers: Supplier[], days: number) => {
  const revenueData = generateRevenueData(days);
  const totalRevenue = revenueData.reduce((sum, day) => sum + day.revenue, 0);
  const avgDailyRevenue = totalRevenue / days;
  
  const clientsIn = Math.floor(Math.random() * 50) + 150;
  const clientsOut = Math.floor(Math.random() * 20) + 10;
  
  const supplierExpenses = suppliers.reduce((sum, supplier) => sum + supplier.totalPaid, 0);
  
  return {
    totalRevenue,
    revenueChange: (Math.random() * 20) - 5,
    clientsIn,
    clientsInChange: (Math.random() * 15) - 2,
    clientsOut,
    clientsOutChange: -(Math.random() * 10) - 5,
    supplierExpenses,
    supplierExpensesChange: (Math.random() * 10) - 5,
  };
};
