
import React from 'react';
import { Scale, FileText, Scale as Scales } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-border bg-card py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Scale className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">ClauseWise Alchemy</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>Contract Analysis</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Scales className="h-4 w-4" />
            <span>Negotiation Guide</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
