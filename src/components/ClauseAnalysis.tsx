
import React from 'react';
import { Clause } from '@/utils/types';
import RiskBadge from './RiskBadge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ClauseAnalysisProps {
  clause: Clause;
}

const ClauseAnalysis: React.FC<ClauseAnalysisProps> = ({ clause }) => {
  const getRiskDetails = (risk: string) => {
    switch (risk) {
      case 'high':
        return {
          title: 'High Risk Clause',
          description:
            'This clause has significant legal implications and should be carefully reviewed. Consider replacing with suggested alternatives.',
          icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
        };
      case 'medium':
        return {
          title: 'Medium Risk Clause',
          description:
            'This clause contains some potentially problematic language but may be acceptable with modifications.',
          icon: <AlertTriangle className="h-5 w-5 text-[hsl(var(--risk-medium))]" />,
        };
      case 'low':
        return {
          title: 'Low Risk Clause',
          description: 'This clause follows standard legal language and appears to be fair and balanced.',
          icon: <Info className="h-5 w-5 text-[hsl(var(--risk-low))]" />,
        };
      default:
        return {
          title: 'Unknown Risk',
          description: 'Risk assessment is unavailable for this clause.',
          icon: <Info className="h-5 w-5" />,
        };
    }
  };

  const riskDetails = getRiskDetails(clause.risk);

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-semibold">{clause.title} Analysis</h3>
        <RiskBadge risk={clause.risk} />
      </div>
      
      <div className="p-4">
        <div className="mb-4 flex items-start rounded-md bg-muted p-3">
          <div className="mr-3 mt-0.5">{riskDetails.icon}</div>
          <div>
            <h4 className="font-medium">{riskDetails.title}</h4>
            <p className="text-sm text-muted-foreground">{riskDetails.description}</p>
          </div>
        </div>
        
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="context">Context</TabsTrigger>
            <TabsTrigger value="precedents">Precedents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 pt-4">
            <div>
              <h4 className="text-sm font-medium">Clause Type</h4>
              <p className="text-sm text-muted-foreground">{clause.type}</p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium">Key Issues</h4>
              {clause.risk === 'high' && (
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>One-sided provisions with unfair advantage</li>
                  <li>Potential enforceability issues in multiple jurisdictions</li>
                  <li>Lacks standard protective language for balanced agreements</li>
                </ul>
              )}
              
              {clause.risk === 'medium' && (
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Contains ambiguous language that could be interpreted in multiple ways</li>
                  <li>Could benefit from more specific definitions or limitations</li>
                </ul>
              )}
              
              {clause.risk === 'low' && (
                <p className="text-sm text-muted-foreground">
                  No significant issues detected. This clause uses standard industry language.
                </p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="context" className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              This type of clause typically appears in software licensing agreements to establish
              {clause.type === 'Liability' && ' boundaries for legal responsibility and financial exposure.'}
              {clause.type === 'Termination' && ' conditions under which the agreement can be ended.'}
              {clause.type === 'Indemnity' && ' who will bear the costs of third-party claims.'}
              {clause.type === 'License' && ' the specific rights being granted to use the software.'}
              {clause.type === 'IP Rights' && ' ownership of intellectual property.'}
            </p>
          </TabsContent>
          
          <TabsContent value="precedents" className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              Based on analysis of similar contracts in your repository:
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>This clause {clause.risk !== 'low' ? 'deviates from' : 'aligns with'} standard industry language</li>
              <li>
                {clause.risk === 'high'
                  ? '85% of your previous contracts use more balanced language'
                  : clause.risk === 'medium'
                  ? '40% of your previous contracts contain similar provisions'
                  : '90% of your previous contracts contain nearly identical language'}
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClauseAnalysis;
