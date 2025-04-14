
import React from 'react';
import { AlertTriangle, ShieldCheck, AlertCircle } from 'lucide-react';
import { RiskLevel } from '@/utils/types';
import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  risk: RiskLevel;
  className?: string;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ risk, className }) => {
  const getRiskIcon = () => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="h-3.5 w-3.5" />;
      case 'medium':
        return <AlertCircle className="h-3.5 w-3.5" />;
      case 'low':
        return <ShieldCheck className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium',
        risk === 'high' ? 'risk-high' : risk === 'medium' ? 'risk-medium' : 'risk-low',
        className
      )}
    >
      {getRiskIcon()}
      <span className="capitalize">{risk} Risk</span>
    </div>
  );
};

export default RiskBadge;
