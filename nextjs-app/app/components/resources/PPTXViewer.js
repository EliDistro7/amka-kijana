'use client';

import React from 'react';

const PPTXViewer = ({ url, title, allowDownload = false }) => {
  // The Microsoft Office Online Viewer requires a publicly accessible HTTPS URL
  const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {title && (
        <div className="bg-gray-100 py-2 px-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}

      <div className="w-full h-[600px]">
        <iframe
          src={viewerUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      <div className="flex justify-end items-center gap-3 px-4 py-3 bg-gray-50 border-t">
        {allowDownload && (
          <a
            href={url}
            download
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default PPTXViewer;
