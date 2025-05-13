'use client';

/**
 * PPTX.js Wrapper Library
 * 
 * This library provides functions to convert PPTX files to HTML for web display
 * It uses SheetJS with enhanced error handling and fallback mechanisms
 */

import * as XLSX from 'xlsx';

/**
 * Parses a PPTX file and converts it to HTML slides
 * 
 * @param {string} url - URL to the PPTX file
 * @returns {Promise<{slides: string[], metadata: Object}>} - Array of HTML slides and presentation metadata
 */
export async function renderPptx(url) {
  try {
    // Fetch the PPTX file
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch PPTX file: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    
    try {
      // Use SheetJS to parse the PPTX file
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      // Extract presentation data
      const presentationData = extractPresentationData(workbook);
      
      // Convert to HTML slides
      const htmlSlides = convertToHtmlSlides(presentationData);
      
      return {
        slides: htmlSlides,
        metadata: {
          title: presentationData.title || 'Untitled Presentation',
          author: presentationData.author || 'Unknown',
          totalSlides: htmlSlides.length,
        }
      };
    } catch (parseError) {
      console.warn('Error parsing with SheetJS, using fallback method', parseError);
      
      // Fallback: Create placeholder slides
      return createFallbackSlides(arrayBuffer);
    }
  } catch (error) {
    console.error('Error rendering PPTX:', error);
    throw error;
  }
}

/**
 * Extract presentation data from the parsed workbook
 * 
 * @param {Object} workbook - SheetJS workbook object
 * @returns {Object} - Structured presentation data
 */
function extractPresentationData(workbook) {
  if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
    // Create a minimal data structure if workbook is invalid
    return {
      title: '',
      author: '',
      company: '',
      slides: [{ name: 'Slide 1', data: [['No content available']] }],
    };
  }
  
  // For demonstration - in a real implementation, you would extract more data
  const props = workbook.Props || {};
  const sheets = workbook.SheetNames.map(name => ({
    name,
    data: XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 }),
  }));
  
  return {
    title: props.Title || '',
    author: props.Author || '',
    company: props.Company || '',
    slides: sheets.length ? sheets : [{ name: 'Slide 1', data: [] }],
  };
}

/**
 * Convert extracted presentation data to HTML slides
 * 
 * @param {Object} presentationData - Structured presentation data
 * @returns {string[]} - Array of HTML strings representing each slide
 */
function convertToHtmlSlides(presentationData) {
  // If no slides, create a placeholder slide
  if (!presentationData.slides || presentationData.slides.length === 0) {
    return [`
      <div class="slide" data-slide-index="0">
        <div class="slide-content">
          <div class="slide-placeholder">No content available</div>
        </div>
      </div>
    `];
  }
  
  return presentationData.slides.map((slide, index) => {
    const slideData = slide.data;
    let slideContent = '';
    
    // Create HTML content from slide data
    if (slideData && slideData.length) {
      slideContent = slideData
        .filter(row => row && row.length)
        .map(row => {
          return `<div class="slide-row">${
            row.map(cell => `<div class="slide-cell">${cell || ''}</div>`).join('')
          }</div>`;
        })
        .join('');
    }
    
    // For simplicity, we're creating a basic slide layout
    return `
      <div class="slide" data-slide-index="${index}">
        <div class="slide-content">
          ${slideContent || `<div class="slide-placeholder">Slide ${index + 1}</div>`}
        </div>
      </div>
    `;
  });
}

/**
 * Create fallback slides when PPTX parsing fails
 * 
 * @param {ArrayBuffer} buffer - The PPTX file buffer
 * @returns {Promise<{slides: string[], metadata: Object}>} - Fallback slides and metadata
 */
async function createFallbackSlides(buffer) {
  // Create a simple representation based on file size
  // In a real application, you might use a different library or service here
  
  // Estimate number of slides based on file size (very rough estimation)
  const fileSizeInKB = buffer.byteLength / 1024;
  const estimatedSlides = Math.max(1, Math.min(30, Math.floor(fileSizeInKB / 10)));
  
  const slides = [];
  
  for (let i = 0; i < estimatedSlides; i++) {
    slides.push(`
      <div class="slide" data-slide-index="${i}">
        <div class="slide-content">
          <div class="slide-placeholder">
            <div style="text-align: center; padding: 2rem;">
              <h2 style="margin-bottom: 1rem;">Slide ${i + 1}</h2>
              <p>Preview not available</p>
            </div>
          </div>
        </div>
      </div>
    `);
  }
  
  return {
    slides,
    metadata: {
      title: 'Untitled Presentation',
      author: 'Unknown',
      totalSlides: slides.length,
    }
  };
}

/**
 * Get a preview of the first slide of a PPTX file
 * 
 * @param {string} url - URL to the PPTX file
 * @returns {Promise<string>} - HTML preview of the first slide
 */
export async function getPptxPreview(url) {
  try {
    const result = await renderPptx(url);
    return result.slides[0] || '';
  } catch (error) {
    console.error('Error generating preview:', error);
    return `
      <div class="slide-preview-error">
        <p>Preview not available</p>
      </div>
    `;
  }
}