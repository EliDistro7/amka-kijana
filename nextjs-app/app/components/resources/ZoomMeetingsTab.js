'use client';

import Link from 'next/link';
import { Video, Clock, Calendar, Users, ExternalLink, Download, Lock } from 'lucide-react';
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
      recordingUrl: "/resources/zoom/reproductive-health-1.mp4",
      presentationUrl: "/resources/presentations/reproductive-health-slides-1.pptx",
      hasPassword: true,
      password: "+GgKXh5c"
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
      recordingUrl: "/reproductive-health-2.mp4",
      presentationUrl: "/resources/presentations/reproductive-health-slides-2.pptx",
      hasPassword: true,
      password: "+GgKXh5c"
    }
  ];

  // Function to format date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'sw' ? 'sw-TZ' : 'en-US', options);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-heading-2 font-heading text-primary-800">{translations.pageTitle[language]}</h2>
        <div className="text-sm text-neutral-500">
          {zoomMeetings.length} {zoomMeetings.length === 1 ? translations.recording[language] : translations.recordings[language]}
        </div>
      </div>

      <div className="space-y-6">
        {zoomMeetings.map((meeting) => (
          <div key={meeting.id} className="bg-white rounded-lg border border-neutral-200 overflow-hidden transition-all hover:shadow-soft">
            <div className="md:flex">
              {/* Video thumbnail section */}
              <div className="relative md:w-2/5 aspect-video bg-neutral-800">
                {/* This would be your video thumbnail */}
                <div className="w-full h-full flex items-center justify-center">
                  <Video size={48} className="text-neutral-400" />
                </div>
                
                {/* Play button overlay */}
                <Link href={meeting.recordingUrl} className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary-500/90 flex items-center justify-center text-white shadow-soft hover:bg-primary-600 transition-colors">
                    <div className="ml-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="7 4 7 20 19 12 7 4" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Content section */}
              <div className="p-6 md:w-3/5">
                <h3 className="font-medium text-lg text-primary-900 mb-2">{meeting.title[language]}</h3>
                <p className="text-sm text-neutral-600 mb-4">{meeting.description[language]}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-2 rounded-md bg-primary-50">
                    <Calendar size={16} className="text-primary-500 mb-1" />
                    <span className="text-xs font-medium text-neutral-600">{formatDate(meeting.date)}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-primary-50">
                    <Clock size={16} className="text-primary-500 mb-1" />
                    <span className="text-xs font-medium text-neutral-600">{meeting.duration}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-primary-50">
                    <Users size={16} className="text-primary-500 mb-1" />
                    <span className="text-xs font-medium text-neutral-600">{meeting.attendees} {translations.attendees[language]}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link 
                    href={meeting.recordingUrl} 
                    className="flex-1 py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>{translations.watchRecording[language]}</span>
                  </Link>
                  
                  {meeting.presentationUrl && (
                    <Link 
                      href={meeting.presentationUrl} 
                      className="py-2 px-4 border border-primary-200 hover:bg-primary-50 text-primary-700 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download size={14} />
                      <span>{translations.slides[language]}</span>
                    </Link>
                  )}
                </div>
                
                {meeting.hasPassword && (
                  <div className="mt-4 flex items-center text-sm text-neutral-600">
                    <Lock size={14} className="mr-2 text-primary-500" />
                    <span>{translations.passwordProtected[language]}: {meeting.password}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {zoomMeetings.length === 0 && (
        <div className="text-center py-12 px-4">
          <Video size={48} className="mx-auto text-neutral-300 mb-4" />
          <h3 className="text-lg font-medium text-neutral-700 mb-2">{translations.noRecordings[language]}</h3>
          <p className="text-neutral-500">{translations.checkBack[language]}</p>
        </div>
      )}
    </div>
  );
}