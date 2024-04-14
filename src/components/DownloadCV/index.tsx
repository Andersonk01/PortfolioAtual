'use client';
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';

type DownloadCVProps = {
  /**
   * - If true, the button will display "Download" as text.
   * - If false, the button will display only the download icon.
   */
  isName?: boolean;
};

export const DownloadCV: React.FC<DownloadCVProps> = ({ isName = false }) => {
  const handleDownload = () => {};

  return (
    <Button onClick={handleDownload} variant="outline" className="gap-2">
      {!isName && 'Download'} <Download size={14} />
    </Button>
  );
};
