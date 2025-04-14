
import React from 'react';
import { CounterPartyArgument } from '@/utils/types';
import { User2, MessageCircle, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface NegotiationSimulatorProps {
  arguments: CounterPartyArgument[];
  clauseId: string;
}

const NegotiationSimulator: React.FC<NegotiationSimulatorProps> = ({ arguments: args, clauseId }) => {
  const clauseArguments = args.filter((arg) => arg.clauseId === clauseId);

  if (clauseArguments.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Negotiation Simulator</h3>
        </div>
        <div className="mt-4 flex items-center justify-center rounded-md bg-muted p-6">
          <p className="text-sm text-muted-foreground">
            No counterparty arguments predicted for this clause
          </p>
        </div>
      </div>
    );
  }

  const getStrengthIcon = (strength: string) => {
    switch (strength) {
      case 'strong':
        return <AlertTriangle className="h-4 w-4 text-[hsl(var(--risk-high))]" />;
      case 'moderate':
        return <AlertCircle className="h-4 w-4 text-[hsl(var(--risk-medium))]" />;
      case 'weak':
        return <CheckCircle2 className="h-4 w-4 text-[hsl(var(--risk-low))]" />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center space-x-2 border-b p-4">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Negotiation Simulator</h3>
      </div>
      <div className="p-4">
        <div className="mb-4 rounded-md bg-muted/50 p-3">
          <p className="text-sm text-muted-foreground">
            This simulator predicts potential counterarguments from the other party during negotiations.
            Strength indicators show how compelling these arguments might be.
          </p>
        </div>

        {clauseArguments.map((arg) => (
          <div key={arg.id} className="mb-4 rounded-md border p-3">
            <div className="mb-2 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <User2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">Counterparty</h4>
                <div className="flex items-center space-x-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                  {getStrengthIcon(arg.strength)}
                  <span className="capitalize">{arg.strength} Argument</span>
                </div>
              </div>
            </div>
            <p className="text-sm">{arg.argument}</p>
          </div>
        ))}

        <Separator className="my-4" />

        <div className="rounded-md bg-secondary p-3">
          <h4 className="mb-2 text-sm font-medium">Negotiation Strategy</h4>
          <p className="text-sm text-muted-foreground">
            Based on the predicted counterarguments, consider preparing responses that address their concerns while 
            protecting your key interests. Review the suggested edits for this clause as potential compromise positions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NegotiationSimulator;
