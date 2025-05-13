import React, { useState, useEffect } from 'react';
import PPTXViewer from './PPTXViewer';

export default function PresentationViewerDemo() {
  // Use your local file from the public folder
  const [demoUrl, setDemoUrl] = useState('/ukatili.pptx'); // Fixed the URL to be a proper path
  const [isViewing, setIsViewing] = useState(true); // Auto-show the local file
  const [error, setError] = useState('');

  // Automatically load the local presentation on component mount
  useEffect(() => {
    handleViewDemo();
  }, []);

  const handleViewDemo = async () => {
    setError('');
    setIsViewing(false);
    
    try {
      // For local files in the public folder, we don't need the HEAD check
      // as they should be accessible by default
      setIsViewing(true);
    } catch (err) {
      console.error('Error accessing presentation file:', err);
      setError(`${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">PPTX Viewer - Ukatili Presentation</h1>
        <p className="text-gray-600">Viewing your local PowerPoint file from the public folder</p>
      </header>
      
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Local Presentation</h2>
        
        <div className="mb-4">
          <p className="text-gray-700">
            Currently viewing: <strong>ukatili.pptx</strong> from your public folder
          </p>
          <p className="mt-1 text-sm text-gray-500">
            You can also try a different PPTX file by entering its path below
          </p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="demo-url" className="block text-sm font-medium text-gray-700 mb-1">
            PPTX Path or URL
          </label>
          <input
            id="demo-url"
            type="text"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="/path/to/presentation.pptx"
          />
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleViewDemo}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Load Presentation
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}
      </div>
      
      {isViewing && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Presentation Preview</h2>
          <PPTXViewer url={demoUrl} title="Ukatili Presentation" showControls={true} allowDownload={true} />
        </div>
      )}
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <p className="mb-3">
          This viewer uses SheetJS to extract data from PPTX files and convert it to a displayable format.
          It&apos;s important to note that this approach has limitations:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Text content is extracted, but formatting may be simplified</li>
          <li>Animations and transitions aren&apos;t supported</li>
          <li>Complex layouts might not render perfectly</li>
          <li>Images might not be displayed</li>
        </ul>
        <p>
          For full fidelity with complex presentations, consider using dedicated services like Microsoft
          Office Online or Google Slides.
        </p>
      </div>
      
      <div className="text-center text-gray-500 text-sm">
        <p>
          Note: This viewer requires PPTX files to be accessible via URLs that support CORS (Cross-Origin Resource Sharing).
        </p>
      </div>
    </div>
  );
}