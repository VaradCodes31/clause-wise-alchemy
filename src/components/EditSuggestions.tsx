
import React from 'react';
import { EditSuggestion } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Check, X, PencilRuler, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface EditSuggestionsProps {
  suggestions: EditSuggestion[];
  clauseId: string;
}

const EditSuggestions: React.FC<EditSuggestionsProps> = ({ suggestions, clauseId }) => {
  const clauseSuggestions = suggestions.filter(
    (suggestion) => suggestion.clauseId === clauseId
  );

  if (clauseSuggestions.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center space-x-2">
          <PencilRuler className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Edit Suggestions</h3>
        </div>
        <div className="mt-4 flex items-center justify-center rounded-md bg-muted p-6">
          <p className="text-sm text-muted-foreground">
            No edit suggestions for this clause
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center space-x-2 border-b p-4">
        <PencilRuler className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Edit Suggestions</h3>
      </div>
      <div className="p-4">
        {clauseSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="mb-4 edit-suggestion rounded-md border p-4">
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-[hsl(var(--risk-medium))]" />
                <h4 className="font-medium">Suggested Edit</h4>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <X className="mr-1 h-3 w-3" /> Reject
                </Button>
                <Button size="sm" variant="default">
                  <Check className="mr-1 h-3 w-3" /> Accept
                </Button>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <div className="space-y-3">
              <div>
                <h5 className="text-xs font-medium uppercase text-muted-foreground">
                  Original Text
                </h5>
                <p className="whitespace-pre-wrap text-sm">{suggestion.original}</p>
              </div>
              
              <div>
                <h5 className="text-xs font-medium uppercase text-muted-foreground">
                  Suggested Text
                </h5>
                <p className="whitespace-pre-wrap text-sm font-medium text-primary">
                  {suggestion.suggested}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h5 className="text-xs font-medium uppercase text-muted-foreground">
                  Reasoning
                </h5>
                <p className="text-sm text-muted-foreground">{suggestion.reasoning}</p>
              </div>
              
              <div>
                <h5 className="text-xs font-medium uppercase text-muted-foreground">
                  Impact
                </h5>
                <p className="text-sm text-muted-foreground">{suggestion.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditSuggestions;
