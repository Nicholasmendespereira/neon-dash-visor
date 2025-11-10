import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface DashboardFiltersProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const DashboardFilters = ({
  dateRange,
  onDateRangeChange,
  category,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}: DashboardFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Select value={dateRange} onValueChange={onDateRangeChange}>
        <SelectTrigger className="glass-card w-full md:w-48">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">Últimos 7 dias</SelectItem>
          <SelectItem value="30">Últimos 30 dias</SelectItem>
          <SelectItem value="90">Últimos 90 dias</SelectItem>
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="glass-card w-full md:w-48">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="software">Software</SelectItem>
          <SelectItem value="hardware">Hardware</SelectItem>
          <SelectItem value="services">Serviços</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
          <SelectItem value="infrastructure">Infraestrutura</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar fornecedores..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="glass-card pl-10"
        />
      </div>
    </div>
  );
};
