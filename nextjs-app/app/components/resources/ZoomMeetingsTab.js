'use client';

import Link from 'next/link';
import { Video, Clock, Calendar, Users, ExternalLink, Download } from 'lucide-react';

export default function ZoomMeetingsTab() {
  // Sample zoom meetings data - this would typically come from your data source
  const zoomMeetings = [
    {
      id: 1,
      title: "Quarterly Business Review - Q1 2025",
      description: "Review of Q1 performance metrics, achievements, and upcoming goals.",
      thumbnail: "/images/zoom/q1-review.jpg",
      date: "2025-04-05",
      duration: "54 min",
      attendees: 28,
      recordingUrl: "/resources/zoom/q1-review.mp4",
      presentationUrl: "/resources/presentations/q1-review.pptx",
    },
    {
      id: 2,
      title: "New Feature Workshop",
      description: "Collaborative session introducing upcoming features and gathering feedback.",
      thumbnail: "/images/zoom/feature-workshop.jpg",
      date: "2025-03-18",
      duration: "67 min",
      attendees: 42,
      recordingUrl: "/resources/zoom/feature-workshop.mp4",
      presentationUrl: "/resources/presentations/feature-slides.pptx",
    },
    {
      id: 3,
      title: "Client Onboarding Masterclass",
      description: "Best practices for onboarding new clients and setting them up for success.",
      thumbnail: "/images/zoom/onboarding-masterclass.jpg",
      date: "2025-02-22",
      duration: "48 min",
      attendees: 35,
      recordingUrl: "/resources/zoom/onboarding-masterclass.mp4",
      presentationUrl: "/resources/presentations/onboarding-slides.pptx",
    },
  ];

  // Function to format date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-heading-2 font-heading text-primary-800">Zoom Meetings</h2>
        <div className="text-sm text-neutral-500">
          {zoomMeetings.length} {zoomMeetings.length === 1 ? 'recording' : 'recordings'}
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
                <h3 className="font-medium text-lg text-primary-900 mb-2">{meeting.title}</h3>
                <p className="text-sm text-neutral-600 mb-4">{meeting.description}</p>
                
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
                    <span className="text-xs font-medium text-neutral-600">{meeting.attendees} Attendees</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link 
                    href={meeting.recordingUrl} 
                    className="flex-1 py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>Watch Recording</span>
                  </Link>
                  
                  {meeting.presentationUrl && (
                    <Link 
                      href={meeting.presentationUrl} 
                      className="py-2 px-4 border border-primary-200 hover:bg-primary-50 text-primary-700 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download size={14} />
                      <span>Slides</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {zoomMeetings.length === 0 && (
        <div className="text-center py-12 px-4">
          <Video size={48} className="mx-auto text-neutral-300 mb-4" />
          <h3 className="text-lg font-medium text-neutral-700 mb-2">No recordings available</h3>
          <p className="text-neutral-500">Check back later for upcoming meeting recordings.</p>
        </div>
      )}
    </div>
  );
}