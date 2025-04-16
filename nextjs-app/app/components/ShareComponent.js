// app/components/ShareComponent.jsx

'use client';
import React, { useState, useEffect } from "react";

// Custom Icons
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="primary" className="w-full h-full text-white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="primary" className="w-full h-full text-white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="primary" className="w-full h-full text-white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="primary" className="w-full h-full text-white">
    <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

// Custom Toast Component
const Toast = ({ message, isVisible, type }) => {
  if (!isVisible) return null;
  
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg ${bgColor} text-white transition-opacity duration-300 flex items-center`}>
      <span>{message}</span>
    </div>
  );
};

const ShareComponent = ({ slug, title = "Check out this post!" }) => {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const eventUrl = `https://amkakijana.org/posts/${slug}`;

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, visible: false });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setToast({ visible: true, message: 'Link copied to clipboard!', type: 'success' });
    } catch (err) {
      console.error("Failed to copy:", err);
      setToast({ visible: true, message: 'Failed to copy link.', type: 'error' });
    }
  };

  // Share functions
  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + eventUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(eventUrl)}`, '_blank');
  };

  const shareToInstagram = () => {
    window.open('https://www.instagram.com/stories/create/', '_blank');
    setToast({ visible: true, message: 'Copy the link first to share on Instagram', type: 'success' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full md:w-auto">
      <div className="flex space-x-4 justify-center">
        {/* WhatsApp */}
        <button 
          onClick={shareToWhatsApp}
          className="w-10 h-10 rounded-full bg-green-500 p-2 hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          aria-label="Share on WhatsApp"
        >
          <WhatsAppIcon />
        </button>

        {/* Facebook */}
        <button 
          onClick={shareToFacebook}
          className="w-10 h-10 rounded-full bg-blue-600 p-2 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          aria-label="Share on Facebook"
        >
          <FacebookIcon />
        </button>

        {/* X (Twitter) */}
        <button 
          onClick={shareToTwitter}
          className="w-10 h-10 rounded-full bg-black p-2 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          aria-label="Share on Twitter"
        >
          <XIcon />
        </button>

        {/* Instagram */}
        <button 
          onClick={shareToInstagram}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-2 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-105"
          aria-label="Share on Instagram"
        >
          <InstagramIcon />
        </button>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="w-10 h-10 rounded-full bg-gray-700 p-2 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          aria-label="Copy link"
        >
          <LinkIcon />
        </button>
      </div>

      {/* Custom Toast */}
      <Toast 
        message={toast.message} 
        isVisible={toast.visible} 
        type={toast.type} 
      />
    </div>
  );
};

export default ShareComponent;