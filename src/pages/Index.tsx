import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { SuppliersTable } from "@/components/dashboard/SuppliersTable";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { SupplierExpensesChart } from "@/components/dashboard/SupplierExpensesChart";
import { Card } from "@/components/ui/card";
import { 
  TrendingUpIcon, 
  UsersIcon, 
  UserMinusIcon, 
  PackageIcon 
} from "lucide-react";
import {
  generateMockSuppliers,
  generateRevenueData,
  generateSparklineData,
  calculateMetrics,
} from "@/lib/mockData";
import { toast } from "sonner";

const Index = () => {
  const [dateRange, setDateRange] = useState("30");
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const mockSuppliers = useMemo(() => generateMockSuppliers(), []);
  
  const filteredSuppliers = useMemo(() => {
    return mockSuppliers.filter((supplier) => {
      const matchesCategory = category === "all" || supplier.category === category;
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [mockSuppliers, category, searchTerm]);

  const days = parseInt(dateRange);
  const metrics = useMemo(() => calculateMetrics(filteredSuppliers, days), [filteredSuppliers, days]);
  const revenueData = useMemo(() => generateRevenueData(days), [days]);
  
  const supplierChartData = useMemo(() => 
    filteredSuppliers
      .slice(0, 8)
      .map((s) => ({ name: s.name.split(' ')[0], amount: s.totalPaid })),
    [filteredSuppliers]
  );

  const handleExportCSV = () => {
    const headers = ["Fornecedor", "Categoria", "Total Pago", "Última Fatura"];
    const rows = filteredSuppliers.map((s) => [
      s.name,
      s.category,
      s.totalPaid.toString(),
      `${s.lastInvoices[0].date} - R$ ${s.lastInvoices[0].amount}`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `fornecedores_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV exportado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">Dashboard Empresarial</h1>
          <p className="text-muted-foreground text-lg">
            Acompanhamento completo de entradas, saídas e fornecedores
          </p>
        </div>

        {/* Filters */}
        <DashboardFilters
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          category={category}
          onCategoryChange={setCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Tabs */}
        <Tabs defaultValue="resumo" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
            <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          {/* Resumo Tab */}
          <TabsContent value="resumo" className="space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Faturamento Total"
                value={`R$ ${(metrics.totalRevenue / 1000).toFixed(0)}k`}
                change={metrics.revenueChange}
                sparklineData={generateSparklineData(30)}
                icon={<TrendingUpIcon className="w-5 h-5" />}
              />
              <MetricCard
                title="Entradas de Clientes"
                value={metrics.clientsIn.toString()}
                change={metrics.clientsInChange}
                sparklineData={generateSparklineData(30)}
                icon={<UsersIcon className="w-5 h-5" />}
              />
              <MetricCard
                title="Saídas (Cancelamentos)"
                value={metrics.clientsOut.toString()}
                change={metrics.clientsOutChange}
                sparklineData={generateSparklineData(30)}
                icon={<UserMinusIcon className="w-5 h-5" />}
              />
              <MetricCard
                title="Gastos com Fornecedores"
                value={`R$ ${(metrics.supplierExpenses / 1000).toFixed(0)}k`}
                change={metrics.supplierExpensesChange}
                sparklineData={generateSparklineData(30)}
                icon={<PackageIcon className="w-5 h-5" />}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart data={revenueData} />
              <SupplierExpensesChart data={supplierChartData} />
            </div>
          </TabsContent>

          {/* Fornecedores Tab */}
          <TabsContent value="fornecedores">
            <SuppliersTable suppliers={filteredSuppliers} onExportCSV={handleExportCSV} />
          </TabsContent>

          {/* Fluxo de Caixa Tab */}
          <TabsContent value="fluxo" className="space-y-6">
            <RevenueChart data={revenueData} />
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Análise de Fluxo de Caixa</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Receita Total</p>
                  <p className="text-3xl font-bold text-neon-cyan">
                    R$ {metrics.totalRevenue.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Despesas Totais</p>
                  <p className="text-3xl font-bold text-neon-magenta">
                    R$ {metrics.supplierExpenses.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Lucro Líquido</p>
                  <p className="text-3xl font-bold text-primary">
                    R$ {(metrics.totalRevenue - metrics.supplierExpenses).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Relatórios Tab */}
          <TabsContent value="relatorios">
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-6">Relatórios e Insights</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <h3 className="font-semibold mb-2 text-primary">Taxa de Retenção</h3>
                    <p className="text-3xl font-bold mb-2">
                      {((metrics.clientsIn / (metrics.clientsIn + metrics.clientsOut)) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {metrics.clientsIn} entradas vs {metrics.clientsOut} saídas
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                    <h3 className="font-semibold mb-2 text-secondary">Margem de Lucro</h3>
                    <p className="text-3xl font-bold mb-2">
                      {(((metrics.totalRevenue - metrics.supplierExpenses) / metrics.totalRevenue) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Após custos com fornecedores
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Principais Fornecedores</h3>
                  {filteredSuppliers.slice(0, 5).map((supplier, idx) => (
                    <div
                      key={supplier.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-muted-foreground/50">
                          #{idx + 1}
                        </span>
                        <span className="font-medium">{supplier.name}</span>
                      </div>
                      <span className="font-semibold text-primary">
                        R$ {supplier.totalPaid.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
