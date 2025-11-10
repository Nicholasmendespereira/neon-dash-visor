import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon, DownloadIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Supplier {
  id: number;
  name: string;
  category: string;
  totalPaid: number;
  lastInvoices: { date: string; amount: number }[];
}

interface SuppliersTableProps {
  suppliers: Supplier[];
  onExportCSV: () => void;
}

export const SuppliersTable = ({ suppliers, onExportCSV }: SuppliersTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      software: "bg-primary/20 text-primary border-primary/30",
      hardware: "bg-secondary/20 text-secondary border-secondary/30",
      services: "bg-accent/20 text-accent border-accent/30",
      marketing: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30",
      infrastructure: "bg-muted text-muted-foreground border-border",
    };
    return colors[category] || colors.infrastructure;
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Fornecedores</h2>
        <Button onClick={onExportCSV} className="gap-2">
          <DownloadIcon className="w-4 h-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-sm"></th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Fornecedor</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Categoria</th>
              <th className="text-right py-3 px-4 font-semibold text-sm">Total Pago</th>
              <th className="text-right py-3 px-4 font-semibold text-sm">Última Fatura</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => {
              const isExpanded = expandedRows.has(supplier.id);
              const lastInvoice = supplier.lastInvoices[0];

              return (
                <>
                  <tr
                    key={supplier.id}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => toggleRow(supplier.id)}
                  >
                    <td className="py-3 px-4">
                      {isExpanded ? (
                        <ChevronUpIcon className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium">{supplier.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getCategoryColor(supplier.category)}>
                        {supplier.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-primary">
                      R$ {supplier.totalPaid.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      {lastInvoice.date} - R$ {lastInvoice.amount.toLocaleString('pt-BR')}
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-muted/20">
                      <td colSpan={5} className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm mb-3">Histórico de Faturas</h4>
                          {supplier.lastInvoices.map((invoice, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center p-2 rounded bg-card/50 text-sm"
                            >
                              <span className="text-muted-foreground">{invoice.date}</span>
                              <span className="font-medium">R$ {invoice.amount.toLocaleString('pt-BR')}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
