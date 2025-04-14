
import React, { useState } from 'react';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import DocumentViewer from '@/components/DocumentViewer';
import ClauseAnalysis from '@/components/ClauseAnalysis';
import EditSuggestions from '@/components/EditSuggestions';
import NegotiationSimulator from '@/components/NegotiationSimulator';
import { Clause, Contract } from '@/utils/types';
import { mockEditSuggestions, mockCounterpartyArguments } from '@/utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [selectedClause, setSelectedClause] = useState<Clause | null>(null);

  const handleSelectClause = (clause: Clause) => {
    setSelectedClause(clause);
  };

  if (!contract) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-3xl font-bold">Contract Analysis and Negotiation</h1>
              <p className="text-muted-foreground">
                Upload a contract to analyze risks, get edit suggestions, and simulate negotiations
              </p>
            </div>
            <FileUpload onFileSelected={setContract} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-hidden p-4 lg:p-6">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Left panel - Document Viewer */}
          <div className="h-[calc(100vh-10rem)]">
            <DocumentViewer
              contract={contract}
              selectedClauseId={selectedClause?.id || null}
              onSelectClause={handleSelectClause}
            />
          </div>

          {/* Right panel - Analysis */}
          <div className="h-[calc(100vh-10rem)] overflow-hidden">
            {selectedClause ? (
              <div className="flex h-full flex-col space-y-4 overflow-y-auto pb-6">
                <ClauseAnalysis clause={selectedClause} />
                
                <Tabs defaultValue="edits" className="flex-1">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="edits">Edit Suggestions</TabsTrigger>
                    <TabsTrigger value="negotiation">Negotiation Simulator</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="edits" className="h-full overflow-auto">
                    <EditSuggestions
                      suggestions={mockEditSuggestions}
                      clauseId={selectedClause.id}
                    />
                  </TabsContent>
                  
                  <TabsContent value="negotiation" className="h-full overflow-auto">
                    <NegotiationSimulator
                      arguments={mockCounterpartyArguments}
                      clauseId={selectedClause.id}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border bg-card p-6">
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-medium">Select a Clause</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any clause in the document to view its analysis
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
