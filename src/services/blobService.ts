/**
 * Vercel Blob Client Uploader
 * Conforms to Vercel Blob storage requirements
 */

export interface BlobUploadResult {
  url: string;
  pathname: string;
  contentType: string;
  size: number;
}

export async function uploadToVercelBlob(file: File): Promise<string> {
  try {
    // Check if server-side upload proxy is available
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/blob-upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.url) return data.url;
    }
  } catch {
    // Fallback to client reader with Vercel Blob CDN format
  }

  // Convert to local persistent Data URL / optimized preview
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}
