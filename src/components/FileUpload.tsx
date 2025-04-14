
import React, { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface FileUploadProps {
  onFileSelected: (contract: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  
  const handleDragLeave = () => {
    setDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };
  
  const processFile = (file: File) => {
    // Only allow PDF and DOCX files
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF or DOCX file.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // In a real app, we would process the file here
    // For now, we'll simulate processing with a timeout
    setTimeout(() => {
      // For demo purposes - load mock data
      import('@/utils/mockData').then(({ mockContract }) => {
        setLoading(false);
        toast({
          title: "Contract uploaded",
          description: `Successfully parsed "${file.name}"`,
        });
        onFileSelected(mockContract);
      });
    }, 1500);
  };
  
  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-all ${
        dragging ? 'border-primary bg-primary/5' : 'border-border'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium">Analyzing contract...</p>
        </div>
      ) : (
        <>
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Upload Contract</h3>
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Drag and drop your contract file (PDF or DOCX)
            <br />or click to browse
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Browse Files
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleFileInputChange}
                accept=".pdf,.docx"
              />
            </Button>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-xs text-muted-foreground">
            <AlertCircle className="h-3 w-3" />
            <span>Maximum file size: 10MB</span>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
