export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-EG', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' EGP';
};

export const formatPercent = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

export const formatCompactCurrency = (amount: number): string => {
  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(1) + 'B EGP';
  }
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + 'M EGP';
  }
  if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + 'K EGP';
  }
  return amount + ' EGP';
};

export const getRiskLevelColor = (level: 'low' | 'medium' | 'high'): string => {
  switch (level) {
    case 'low':
      return 'text-success';
    case 'medium':
      return 'text-warning';
    case 'high':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
};

export const getRiskLevelBg = (level: 'low' | 'medium' | 'high'): string => {
  switch (level) {
    case 'low':
      return 'bg-success/10';
    case 'medium':
      return 'bg-warning/10';
    case 'high':
      return 'bg-destructive/10';
    default:
      return 'bg-muted';
  }
};
