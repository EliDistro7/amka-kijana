'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Presentation, Video, Sparkles, BookOpen, Play } from 'lucide-react';
import PresentationsTab from '@/app/components/resources/PresentationsTab';
import ZoomMeetingsTab from '@/app/components/resources/ZoomMeetingsTab';
import { useLanguage } from '@/context/LanguageContext';

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('presentations');
  const { language } = useLanguage();

  // Bilingual content
  const pageContent = {
    title: {
      en: "Resources",
      sw: "Rasilimali"
    },
    subtitle: {
      en: "Empower Your Journey",
      sw: "Kuongeza Nguvu Safari Yako"
    },
    description: {
      en: "Access our collection of presentations and recorded zoom meetings to help you get the most out of our services and learn more about reproductive health, mental wellness, and gender-based violence prevention.",
      sw: "Fikia mkusanyiko wetu wa presentations na mikutano ya zoom iliyorekodiwa ili kukusaidia kupata manufaa zaidi kutoka kwenye huduma zetu na kujifunza zaidi kuhusu afya ya uzazi, ustawi wa akili, na kuzuia ukatili wa kijinsia."
    },
    presentations: {
      en: "Presentations",
      sw: "Presentations"
    },
    zoomMeetings: {
      en: "Zoom Meetings",
      sw: "Mikutano ya Zoom"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section with Bold Design */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-accent-200/20 to-primary-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-secondary-300/20 to-primary-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container py-20 max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            {/* Floating Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            {/* Main Title with Gradient */}
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-4 leading-tight">
              {pageContent.title[language]}
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl font-bold text-primary-700 mb-6 opacity-90">
              {pageContent.subtitle[language]}
            </p>
            
            {/* Description with Enhanced Styling */}
            <p className="text-lg md:text-xl text-neutral-700 max-w-4xl mx-auto leading-relaxed font-medium">
              {pageContent.description[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs Section */}
      <div className="container max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <Tabs 
            defaultValue="presentations" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Bold Tab Navigation */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-8">
              <TabsList className="bg-white/20 backdrop-blur-md p-2 rounded-2xl border border-white/30 shadow-lg">
                <TabsTrigger 
                  value="presentations" 
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 font-bold text-base ${
                    activeTab === 'presentations' 
                      ? 'bg-white shadow-xl text-primary-700 scale-105' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activeTab === 'presentations' 
                      ? 'bg-primary-100' 
                      : 'bg-white/20'
                  }`}>
                    <BookOpen size={20} />
                  </div>
                  <span>{pageContent.presentations[language]}</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="zoom-meetings" 
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 font-bold text-base ${
                    activeTab === 'zoom-meetings' 
                      ? 'bg-white shadow-xl text-primary-700 scale-105' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activeTab === 'zoom-meetings' 
                      ? 'bg-primary-100' 
                      : 'bg-white/20'
                  }`}>
                    <Play size={20} />
                  </div>
                  <span>{pageContent.zoomMeetings[language]}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content Area with Enhanced Styling */}
            <div className="p-8 md:p-12">
              <TabsContent value="presentations" className="mt-0">
                <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                  <PresentationsTab />
                </div>
              </TabsContent>

              <TabsContent value="zoom-meetings" className="mt-0">
                <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                  <ZoomMeetingsTab />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Decorative Bottom Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/10 to-transparent"></div>
        <div className="relative py-12">
          <div className="container max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-lg rounded-full shadow-lg border border-white/20">
              <Sparkles className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-semibold text-primary-700">
                {language === 'en' ? 'Knowledge is Power' : 'Maarifa ni Nguvu'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}