'use client';

import * as React from 'react';

// Types for Tabs props
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

// Types for TabsList props
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Types for TabsTrigger props
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

// Types for TabsContent props
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

// Create context for tabs
type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

export function Tabs({ 
  defaultValue, 
  value, 
  onValueChange, 
  children, 
  className, 
  ...props 
}: TabsProps) {
  // Controlled or uncontrolled state
  const [tabValue, setTabValue] = React.useState(defaultValue || '');
  
  const currentValue = value !== undefined ? value : tabValue;
  const handleValueChange = onValueChange || setTabValue;
  
  const contextValue = React.useMemo(() => ({
    value: currentValue,
    onValueChange: handleValueChange,
  }), [currentValue, handleValueChange]);
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ 
  className, 
  children, 
  ...props 
}: TabsListProps) {
  return (
    <div 
      role="tablist" 
      className={className} 
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ 
  className, 
  value, 
  disabled, 
  children, 
  ...props 
}: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabs();
  const isSelected = selectedValue === value;
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls={`tabpanel-${value}`}
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ 
  className, 
  value, 
  children, 
  ...props 
}: TabsContentProps) {
  const { value: selectedValue } = useTabs();
  const isSelected = selectedValue === value;
  
  if (!isSelected) return null;
  
  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}