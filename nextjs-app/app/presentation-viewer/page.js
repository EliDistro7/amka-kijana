'use client';

import { useState } from 'react';
import ImprovedPPTXViewer from "@/app/components/resources/PresentationViewer"
import {FileArchive as FilePresentation, Upload, X } from 'lucide-react';

export default function PresentationViewerPage() {
  const [presentationUrl, setPresentationUrl] = useState('/ukatili.pptx');
  const [presentationTitle, setPresentationTitle] = useState('Sample Presentation');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  // Sample presentations
  const samplePresentations = [
    {
      id: 1,
      title: 'Sample Presentation',
      url: '/ukatili.pptx'
    },
    {
      id: 2,
      title: 'Company Overview',
      url: '/ukatili.pptx'
    },
    {
      id: 3,
      title: 'Product Roadmap',
      url: '/ukatili.pptx'
    }
  ];

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.pptx') && !file.name.endsWith('.ppt')) {
      setError('Please select a valid PowerPoint file (.ppt or .pptx)');
      return;
    }

    setError(null);
    setUploadedFile(file);
    setPresentationTitle(file.name);

    // Create a temporary URL for the file
    const fileUrl = URL.createObjectURL(file);
    setPresentationUrl(fileUrl);
  };

  // Handle sample presentation selection
  const selectSamplePresentation = (presentation) => {
    setUploadedFile(null);
    setPresentationUrl(presentation.url);
    setPresentationTitle(presentation.title);
    setError(null);
  };

  // Clear uploaded file
  const clearUploadedFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(presentationUrl);
    }
    setUploadedFile(null);
    selectSamplePresentation(samplePresentations[0]);
  };

  return (
    <div className="container py-12 max-w-6xl mx-auto">
    

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     
        {/* Main content area with PPTX viewer */}
        <div className="lg:col-span-2">
          <ImprovedPPTXViewer />
          
       
        </div>
      </div>
    </div>
  );
}