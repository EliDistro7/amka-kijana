import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from '@sanity/uuid';

// This is a server-side route that converts PPTX files to images

/**
 * Route handler for converting PPTX files to images
 * 
 * @param {Request} req - The incoming request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function GET(req) {
  try {
    // Get the URL of the PPTX file from the query parameters
    const url = new URL(req.url);
    const pptxUrl = url.searchParams.get('url');
    
    if (!pptxUrl) {
      return NextResponse.json(
        { error: 'Missing URL parameter' },
        { status: 400 }
      );
    }
    
    // Fetch the PPTX file
    const response = await fetch(pptxUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch PPTX file: ${response.statusText}` },
        { status: 500 }
      );
    }
    
    // Create a temporary directory to store the file
    const tempDir = path.join(os.tmpdir(), uuidv4());
    const tempFilePath = path.join(tempDir, 'presentation.pptx');
    
    try {
      // Ensure the directory exists
      fs.mkdirSync(tempDir, { recursive: true });
      
      // Save the file
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(tempFilePath, Buffer.from(buffer));
      
      // In a real implementation, you would use a library like libreoffice-convert,
      // unoconv, or a service like LibreOffice Online to convert PPTX to images
      // For this example, we'll simulate the process with a delay
      
      // Generate image URLs
      // In a real implementation, you would save the images to a public directory or cloud storage
      const slideCount = 5; // This would be determined from the actual conversion
      const slideUrls = Array.from({ length: slideCount }, (_, i) => 
        `/api/pptx-slides/${uuidv4()}-slide-${i + 1}.png`
      );
      
      // Clean up
      fs.unlinkSync(tempFilePath);
      fs.rmdirSync(tempDir);
      
      return NextResponse.json({
        success: true,
        slideUrls,
        metadata: {
          title: 'Presentation', // In a real implementation, extract this from the PPTX
          totalSlides: slideCount,
          convertedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      // Clean up on error
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
      
      throw error;
    }
  } catch (error) {
    console.error('Error converting PPTX:', error);
    return NextResponse.json(
      { error: 'Failed to convert PPTX file', details: error.message },
      { status: 500 }
    );
  }
}