'use client';

import Link from 'next/link';
import { Video, Clock, Calendar, Users, ExternalLink, Download, Lock, Play, Eye, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ZoomMeetingsTab() {
  const { language } = useLanguage();

  // Bilingual content for static text
  const translations = {
    pageTitle: {
      en: "Zoom Meetings",
      sw: "Mikutano ya Zoom"
    },
    recordings: {
      en: "recordings",
      sw: "rekodi"
    },
    recording: {
      en: "recording",
      sw: "rekodi"
    },
    noRecordings: {
      en: "No recordings available",
      sw: "Hakuna rekodi zinazopatikana"
    },
    checkBack: {
      en: "Check back later for upcoming meeting recordings.",
      sw: "Angalia baadaye kwa ajili ya rekodi za mikutano ijayo."
    },
    watchRecording: {
      en: "Watch Recording",
      sw: "Tazama Rekodi"
    },
    slides: {
      en: "Slides",
      sw: "Slaidi"
    },
    passwordProtected: {
      en: "Password Protected",
      sw: "Inalindwa kwa Nenosiri"
    },
    attendees: {
      en: "Attendees",
      sw: "Washiriki"
    },
    featured: {
      en: "Featured",
      sw: "Maalum"
    }
  };

  // Sample zoom meetings data with updated content
  const zoomMeetings = [
    {
      id: 1,
      title: {
        en: "Role of Men in Reproductive and Mental Health - Part 1",
        sw: "Jukumu la Wanaume katika Afya ya Uzazi na Afya ya Akili - Sehemu ya 1"
      },
      description: {
        en: "Discussion on how men can be active participants and supporters in reproductive health and mental wellbeing.",
        sw: "Majadiliano kuhusu jinsi wanaume wanavyoweza kuwa washiriki na wasaidizi katika afya ya uzazi na ustawi wa akili."
      },
      thumbnail: "/reproductive-health-1.jpg",
      date: "2025-03-05",
      duration: "01:55:27",
      attendees: 42,
      recordingUrl: "https://us02web.zoom.us/rec/share/Y-mt11k0NpkciQvwK8QN-3NjEcef9Ui9NK1RM-oX1wGVpv-B89gQpdtgrAIPAkXg.HavMtUsmdSPzkiPp?startTime=1741195244000",
      presentationUrl: "/resources/presentations/reproductive-health-slides-1.pptx",
      hasPassword: true,
      password: "+GgKXh5c",
      featured: true
    },
    {
      id: 2,
      title: {
        en: "Role of Men in Reproductive and Mental Health - Part 2",
        sw: "Jukumu la Wanaume katika Afya ya Uzazi na Afya ya Akili - Sehemu ya 2"
      },
      description: {
        en: "Continuation of discussions on men's involvement in reproductive health decisions and mental health support.",
        sw: "Kuendelea kwa majadiliano kuhusu ushiriki wa wanaume katika maamuzi ya afya ya uzazi na msaada wa afya ya akili."
      },
      thumbnail: "/images/zoom/reproductive-health-2.jpg",
      date: "2024-10-22",
      duration: "01:34:59",
      attendees: 38,
      recordingUrl: "https://us02web.zoom.us/rec/share/exRJUquiibNLbnKu3FK-Pa5tRUOz9AXUUxZ1etVbXTGQ0eNzjryRe12wXBZUcdSR.lxYOmNniUxTrrQA3?startTime=1741280594000",
      presentationUrl: "/resources/presentations/reproductive-health-slides-2.pptx",
      hasPassword: true,
      password: "+GgKXh5c",
      featured: false
    }
  ];

  // Function to format date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'sw' ? 'sw-TZ' : 'en-US', options);
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-lg">
            <Video className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-primary-800">{translations.pageTitle[language]}</h2>
            <p className="text-sm text-neutral-600 font-medium mt-1">
              {language === 'en' ? 'Interactive Learning Sessions' : 'Vipindi vya Kujifunza'}
            </p>
          </div>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full border border-primary-200">
          <span className="text-sm font-bold text-primary-700">
            {zoomMeetings.length} {zoomMeetings.length === 1 ? translations.recording[language] : translations.recordings[language]}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        {zoomMeetings.map((meeting, index) => (
          <div key={meeting.id} className="group relative">
            {/* Featured Badge */}
            {meeting.featured && (
              <div className="absolute -top-4 left-6 z-10">
                <div className="px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                  <Zap size={12} />
                  {translations.featured[language]}
                </div>
              </div>
            )}

            <div className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
              meeting.featured 
                ? 'border-accent-200 shadow-accent-100 group-hover:shadow-2xl group-hover:shadow-accent-200/50' 
                : 'border-neutral-200 group-hover:shadow-2xl group-hover:border-primary-200'
            }`}>
              
              {/* Gradient Overlay for Featured */}
              {meeting.featured && (
                <div className="absolute inset-0 bg-gradient-to-r from-accent-500/5 to-transparent pointer-events-none"></div>
              )}

              <div className="lg:flex">
                {/* Enhanced Video Thumbnail Section */}
                <div className="relative lg:w-2/5 aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden">
                  {/* Video placeholder with gradient */}
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-secondary-900/20"></div>
                    <Video size={64} className="text-white/60 relative z-10" />
                    
                    {/* Animated pulse effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 animate-pulse"></div>
                  </div>
                  
                  {/* Enhanced Play Button */}
                  <Link href={meeting.recordingUrl} className="absolute inset-0 flex items-center justify-center group/play">
                    <div className="relative">
                      {/* Outer glow ring */}
                      <div className="absolute inset-0 w-20 h-20 rounded-full bg-white/20 scale-150 animate-ping"></div>
                      
                      {/* Main play button */}
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-2xl transform group-hover/play:scale-110 transition-all duration-300">
                        <Play size={28} className="ml-1" fill="currentColor" />
                      </div>
                      
                      {/* Hover ring */}
                      <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-white/50 scale-125 opacity-0 group-hover/play:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm font-bold rounded-full">
                    {meeting.duration}
                  </div>
                </div>
                
                {/* Enhanced Content Section */}
                <div className="p-8 lg:w-3/5 relative">
                  <h3 className="font-black text-2xl text-primary-900 mb-3 leading-tight">
                    {meeting.title[language]}
                  </h3>
                  <p className="text-neutral-700 mb-6 leading-relaxed font-medium">
                    {meeting.description[language]}
                  </p>
                  
                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 transition-all hover:scale-105">
                      <div className="p-2 bg-primary-500 rounded-lg mb-2">
                        <Calendar size={18} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-primary-700 text-center">
                        {formatDate(meeting.date)}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-secondary-50 to-secondary-100 border border-secondary-200 transition-all hover:scale-105">
                      <div className="p-2 bg-secondary-500 rounded-lg mb-2">
                        <Clock size={18} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-secondary-700 text-center">
                        {meeting.duration}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200 transition-all hover:scale-105">
                      <div className="p-2 bg-accent-500 rounded-lg mb-2">
                        <Users size={18} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-accent-700 text-center">
                        {meeting.attendees} {translations.attendees[language]}
                      </span>
                    </div>
                  </div>
                  
                  {/* Enhanced Action Button */}
                  <div className="flex gap-3 mb-6">
                    <Link 
                      href={meeting.recordingUrl} 
                      className="flex-1 relative group/btn"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur opacity-75 group-hover/btn:opacity-100 transition-opacity"></div>
                      <div className="relative py-4 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform group-hover/btn:scale-105">
                        <Play size={20} fill="currentColor" />
                        <span>{translations.watchRecording[language]}</span>
                        <ExternalLink size={16} />
                      </div>
                    </Link>
                  </div>
                  
                  {/* Enhanced Password Section */}
                  {meeting.hasPassword && (
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500 rounded-lg">
                          <Lock size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-amber-800">
                            {translations.passwordProtected[language]}
                          </p>
                          <p className="text-lg font-mono font-bold text-amber-900 tracking-wider">
                            {meeting.password}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {zoomMeetings.length === 0 && (
        <div className="text-center py-20 px-4">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full blur-xl opacity-50"></div>
            <div className="relative p-8 bg-white rounded-full shadow-2xl border-4 border-primary-100">
              <Video size={64} className="text-primary-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-neutral-700 mb-4">
            {translations.noRecordings[language]}
          </h3>
          <p className="text-lg text-neutral-500 max-w-md mx-auto">
            {translations.checkBack[language]}
          </p>
        </div>
      )}
    </div>
  );
}