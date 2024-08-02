'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import clsx from 'clsx';
import styles from '@/styles/header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [mode, setMode] = useState<string>('light');

  useEffect(() => {
    const getMode: string | null = localStorage.getItem('theme');
    if (getMode) setMode(getMode);
  }, [mode]);

  const toggleTheme = () => {
    if (mode == 'light') {
      setTheme('dark');
      setMode('dark');
    } else if (mode == 'dark') {
      setTheme('light');
      setMode('light');
    }
  };

  return (
    <div
      className="flex items-center px-4 py-3 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
      onClick={toggleTheme}
    >
      <div className={clsx(styles.dropdownItem__icon, 'relative')}>
        {/* <FontAwesomeIcon icon={faSun as IconProp} /> */}
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-0" />
      </div>
      <div className={clsx(styles.dropdownItem__text)}>Darkmode</div>
    </div>
  );
}
