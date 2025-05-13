import React, { useState, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css"; // Required styles import

export default function ImprovedPPTXViewer() {
  const [fileUrl, setFileUrl] = useState('/ukatili.pptx');
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Load the document when component mounts or fileUrl changes
  useEffect(() => {
    loadDocument();
  }, [fileUrl]);

  const loadDocument = () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Create the document object with the current URL
      const newDocuments = [{ 
        uri: fileUrl, 
        fileName: fileUrl.split('/').pop() // Extract filename from URL
      }];
      
      setDocuments(newDocuments);
      setIsLoading(false);
    } catch (err) {
      console.error('Error preparing document:', err);
      setError(`Failed to load document: ${err.message}`);
      setIsLoading(false);
    }
  };

  const handleUrlChange = (e) => {
    setFileUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadDocument();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">PPTX Viewer</h1>
        <p className="text-gray-600">View PowerPoint presentations in your browser</p>
      </header>
      
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Document Settings</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file-url" className="block text-sm font-medium text-gray-700 mb-1">
              PPTX Path or URL
            </label>
            <input
              id="file-url"
              type="text"
              value={fileUrl}
              onChange={handleUrlChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="/path/to/presentation.pptx"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter the path to a local file in your public folder or a full URL
            </p>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Load Presentation
            </button>
          </div>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}
      </div>
      
      {documents.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold">
              Viewing: {documents[0].fileName || documents[0].uri.split('/').pop()}
            </h2>
          </div>
          
          <div style={{ height: '600px' }}>
            <DocViewer
              documents={documents}
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: false,
                  disableFileName: false,
                  retainURLParams: false
                }
              }}
              style={{ height: '100%' }}
            />
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Document Viewer Information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>This viewer supports PPTX, PDF, DOCX and other document formats</li>
          <li>For local files, make sure they are in your public folder</li>
          <li>For remote files, ensure they are accessible via URLs that support CORS</li>
          <li>Use the controls in the viewer header to navigate between slides</li>
        </ul>
      </div>
    </div>
  );
}