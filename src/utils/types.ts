
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Clause {
  id: string;
  title: string;
  content: string;
  type: string;
  risk: RiskLevel;
}

export interface Contract {
  id: string;
  title: string;
  parties: string[];
  clauses: Clause[];
}

export interface EditSuggestion {
  id: string;
  clauseId: string;
  original: string;
  suggested: string;
  reasoning: string;
  impact: string;
}

export interface CounterPartyArgument {
  id: string;
  clauseId: string;
  argument: string;
  strength: 'weak' | 'moderate' | 'strong';
}

export interface LegalReference {
  id: string;
  clauseId: string;
  source: string;
  citation: string;
  relevance: string;
  url?: string;
}
