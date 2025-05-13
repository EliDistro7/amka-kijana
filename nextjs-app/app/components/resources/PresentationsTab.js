'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Download, FileArchive as FilePresentation, ExternalLink, Calendar, Clock } from 'lucide-react';

export default function PresentationsTab() {
  // Sample presentations data - this would typically come from your data source
  const presentations = [
    {
      id: 1,
      title: "16 days of activism",
      description: "Annual strategic roadmap and growth initiatives for stakeholders.",
      thumbnail: "/violence.jpeg",
      dateCreated: "2025-04-15",
      fileSize: "4.2 MB",
      downloadUrl: "/ukatili.pptx",
      previewUrl: "/resources/previews/strategy-overview",
    },
 
    {
      id: 3,
      title: "Role of a Man in Reproductive Health",
      description: "Collection of case studies and testimonials from satisfied clients.",
      thumbnail: "/zoom_man.jpeg",
      dateCreated: "2025-02-08",
      fileSize: "5.6 MB",
      downloadUrl: "/man.pptx",
      previewUrl: "/resources/previews/success-stories",
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
        <h2 className="text-heading-2 font-heading text-primary-800">Presentations</h2>
        <div className="text-sm text-neutral-500">
          {presentations.length} {presentations.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {presentations.map((presentation) => (
          <div key={presentation.id} className="bg-white rounded-lg border border-neutral-200 overflow-hidden transition-all hover:shadow-soft group">
            <div className="relative aspect-video bg-neutral-100">
              {/* Display the actual thumbnail image */}
              {presentation.thumbnail ? (
                <Image 
                  src={presentation.thumbnail}
                  alt={presentation.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-50">
                  <FilePresentation size={48} className="text-primary-300" />
                </div>
              )}

              {/* Hover actions overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Link href={presentation.previewUrl} className="bg-white text-primary-700 p-2 rounded-full hover:bg-primary-50">
                  <ExternalLink size={18} />
                </Link>
                <Link href={presentation.downloadUrl} className="bg-white text-primary-700 p-2 rounded-full hover:bg-primary-50">
                  <Download size={18} />
                </Link>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-lg text-primary-900 mb-2">{presentation.title}</h3>
              <p className="text-sm text-neutral-600 mb-4">{presentation.description}</p>
              
              <div className="flex justify-between items-center text-xs text-neutral-500">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(presentation.dateCreated)}</span>
                </div>
                <div>{presentation.fileSize}</div>
              </div>
            </div>

            <div className="p-4 pt-0 flex justify-between">
             
              <Link 
                href={presentation.downloadUrl} 
                className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <span>Download</span>
                <Download size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {presentations.length === 0 && (
        <div className="text-center py-12 px-4">
          <FilePresentation size={48} className="mx-auto text-neutral-300 mb-4" />
          <h3 className="text-lg font-medium text-neutral-700 mb-2">No presentations available</h3>
          <p className="text-neutral-500">Check back later for updated resources.</p>
        </div>
      )}
    </div>
  );
}