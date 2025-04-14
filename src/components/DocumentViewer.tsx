
import React, { useState } from 'react';
import { Contract, Clause } from '@/utils/types';
import RiskBadge from './RiskBadge';
import { Separator } from '@/components/ui/separator';

interface DocumentViewerProps {
  contract: Contract;
  selectedClauseId: string | null;
  onSelectClause: (clause: Clause) => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  contract,
  selectedClauseId,
  onSelectClause,
}) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-card">
      <div className="border-b bg-muted/40 p-4">
        <h2 className="text-xl font-bold">{contract.title}</h2>
        <p className="text-sm text-muted-foreground">
          Between {contract.parties.join(' and ')}
        </p>
      </div>
      <div className="contract-text flex-1 overflow-y-auto p-4">
        {contract.clauses.map((clause) => (
          <div
            key={clause.id}
            className={`clause-container mb-6 cursor-pointer rounded-md p-4 transition-all ${
              selectedClauseId === clause.id ? 'clause-active' : ''
            }`}
            onClick={() => onSelectClause(clause)}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{clause.title}</h3>
              <RiskBadge risk={clause.risk} />
            </div>
            <Separator className="mb-3" />
            <p className="whitespace-pre-wrap text-sm">{clause.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentViewer;
