'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';

export const Lang = () => {
  const [isEN, setIsEN] = useState('en');

  function changeLang(laguage: string) {
    if (laguage === 'en') {
      setIsEN('en');
    } else if (laguage === 'pt') {
      setIsEN('pt');
    }
  }

  return (
    <div className="absolute right-1 top-1 border-r-2 border-t-2 border-[#ff013c] rounded-r-sm">
      <Button
        variant="ghost"
        size={'sm'}
        className={`font-mono font-medium text-sm rounded-none rounded-bl-sm hover:bg-[#F26E50] ${
          isEN === 'pt' ? 'bg-[#F26E50]' : ''
        }`}
        onClick={() => setIsEN('pt')}
      >
        PT
      </Button>
      <Button
        variant="ghost"
        size={'sm'}
        className={`font-mono font-medium text-sm rounded-none hover:bg-[#F26E50] ${
          isEN === 'en' ? 'bg-[#F26E50]' : ''
        }`}
        onClick={() => setIsEN('en')}
      >
        EN
      </Button>
    </div>
  );
};
