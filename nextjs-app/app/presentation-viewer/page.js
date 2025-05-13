'use client';

import { useState } from 'react';
import PPTXViewer from '@/app/components/resources/PresentationViewer';
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
      <div className="mb-8">
        <h1 className="text-heading-1 font-heading text-primary-700 mb-4">Presentation Viewer</h1>
        <p className="text-lg text-neutral-700 max-w-3xl">
          View PowerPoint presentations directly in your browser without needing Microsoft Office installed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar with options */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
            <h2 className="text-lg font-medium text-primary-800 mb-4">Upload Presentation</h2>
            
            {/* File upload */}
            <div className="mb-6">
              <label 
                htmlFor="presentation-upload" 
                className={`
                  flex flex-col items-center justify-center w-full h-32 
                  border-2 border-dashed rounded-lg cursor-pointer 
                  ${error ? 'border-error-300 bg-error-50' : 'border-primary-200 bg-primary-50 hover:bg-primary-100'}
                  transition-colors
                `}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-primary-500" />
                  <p className="mb-1 text-sm text-neutral-700">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-neutral-500">PowerPoint files only (.ppt, .pptx)</p>
                </div>
                <input 
                  id="presentation-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation" 
                  onChange={handleFileChange}
                />
              </label>
              
              {error && (
                <p className="mt-2 text-sm text-error-600">{error}</p>
              )}
              
              {uploadedFile && (
                <div className="mt-3 flex items-center justify-between bg-primary-50 p-3 rounded-md">
                  <div className="flex items-center">
                    <FilePresentation className="text-primary-500 mr-2" size={16} />
                    <span className="text-sm text-neutral-700 truncate max-w-[180px]">
                      {uploadedFile.name}
                    </span>
                  </div>
                  <button 
                    onClick={clearUploadedFile}
                    className="text-neutral-500 hover:text-error-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
            
            <div className="border-t border-neutral-200 pt-4">
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Sample Presentations</h3>
              <ul className="space-y-2">
                {samplePresentations.map(presentation => (
                  <li key={presentation.id}>
                    <button
                      onClick={() => selectSamplePresentation(presentation)}
                      className={`
                        w-full text-left px-3 py-2 rounded-md flex items-center
                        ${presentationUrl === presentation.url ? 'bg-primary-100 text-primary-700' : 'hover:bg-neutral-100'}
                      `}
                    >
                      <FilePresentation size={16} className="mr-2 text-primary-500" />
                      <span className="text-sm">{presentation.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main content area with PPTX viewer */}
        <div className="lg:col-span-2">
          <PPTXViewer 
            url={presentationUrl} 
            title={presentationTitle}
            showControls={true}
            allowDownload={true}
          />
          
          <div className="mt-4 text-sm text-neutral-500">
            <p>
              Note: The viewer works best with modern PowerPoint files (.pptx). Some features may not be supported for all presentations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}