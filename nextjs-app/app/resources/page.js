'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Presentation, Video } from 'lucide-react';
import PresentationsTab from '@/app/components/resources/PresentationsTab';
import ZoomMeetingsTab from '@/app/components/resources/ZoomMeetingsTab';

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('presentations');

  return (
    <div className="container py-12 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-heading-1 font-heading text-primary-700 mb-4">Resources</h1>
        <p className="text-lg text-neutral-700 max-w-3xl">
          Access our collection of presentations and recorded zoom meetings to help you get the most out of our services.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-soft p-6">
        <Tabs 
          defaultValue="presentations" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 bg-primary-50 p-1 rounded-lg border border-primary-100">
            <TabsTrigger 
              value="presentations" 
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'presentations' 
                  ? 'bg-white shadow-soft text-primary-700' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              <Presentation size={18} />
              <span>Presentations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="zoom-meetings" 
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                activeTab === 'zoom-meetings' 
                  ? 'bg-white shadow-soft text-primary-700' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              <Video size={18} />
              <span>Zoom Meetings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presentations" className="mt-4">
            <PresentationsTab />
          </TabsContent>

          <TabsContent value="zoom-meetings" className="mt-4">
            <ZoomMeetingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}