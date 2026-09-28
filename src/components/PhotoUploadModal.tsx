import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Camera, Check, RefreshCw, AlertCircle, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { saveCustomPhoto, resetCustomPhotos } from '../services/photoStore';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoId: string;
  photoTitle: string;
  currentPhotoUrl?: string | null;
  onPhotoSaved?: (url: string) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  photoId,
  photoTitle,
  currentPhotoUrl,
  onPhotoSaved,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null);
  const [urlInput, setUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync preview if currentPhotoUrl changes
  React.useEffect(() => {
    if (isOpen) {
      setPreviewUrl(currentPhotoUrl || null);
      setErrorMessage(null);
      setIsSuccess(false);
      setUrlInput('');
      setIsOptimizing(false);
    }
  }, [isOpen, currentPhotoUrl]);

  if (!isOpen) return null;

  const compressImageFile = (file: File, maxDimension = 1280, quality = 0.82): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Image failed to load'));
      };
      img.src = objectUrl;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setErrorMessage(null);
    setIsOptimizing(true);

    try {
      const optimizedBase64 = await compressImageFile(file, 1280, 0.82);
      setPreviewUrl(optimizedBase64);
      setIsOptimizing(false);
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
        setIsOptimizing(false);
      };
      reader.onerror = () => {
        setErrorMessage('Failed to read the selected file.');
        setIsOptimizing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setErrorMessage('Please enter an image URL.');
      return;
    }
    setPreviewUrl(urlInput.trim());
    setErrorMessage(null);
  };

  const handleSave = async () => {
    if (!previewUrl) {
      setErrorMessage('Please choose or upload a photo first.');
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    try {
      const ok = await saveCustomPhoto(photoId, previewUrl);
      if (ok) {
        setIsSuccess(true);
        if (onPhotoSaved) onPhotoSaved(previewUrl);
        setTimeout(() => {
          setIsSaving(false);
          setIsSuccess(false);
          onClose();
        }, 800);
      } else {
        setErrorMessage('Failed to save photo. Please try again.');
        setIsSaving(false);
      }
    } catch {
      setErrorMessage('An unexpected error occurred while saving.');
      setIsSaving(false);
    }
  };

  const handleResetToDefault = async () => {
    setPreviewUrl(null);
    await saveCustomPhoto(photoId, '');
    if (onPhotoSaved) onPhotoSaved('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2E1E14]/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-[420px] bg-[#FAF5EE] border border-[#E8DACB] rounded-3xl p-6 shadow-2xl text-[#2E1E14] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8DACB]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#F5E6D8] text-[#D97D64]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-base text-[#2E1E14] font-bold">
                  Add Couple Photo
                </h3>
                <p className="text-xs text-[#6E5448] font-montserrat">
                  {photoTitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#6E5448] hover:text-[#2E1E14] hover:bg-[#F5E6D8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 p-1 mt-4 rounded-xl bg-[#F4ECE1] border border-[#E8DACB]">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-montserrat font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'bg-white text-[#8C4E3A] shadow-sm'
                  : 'text-[#6E5448] hover:text-[#2E1E14]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-montserrat font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'url'
                  ? 'bg-white text-[#8C4E3A] shadow-sm'
                  : 'text-[#6E5448] hover:text-[#2E1E14]'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Image URL</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4 space-y-4">
            {activeTab === 'upload' ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isOptimizing}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 px-4 rounded-2xl border-2 border-dashed border-[#E8DACB] hover:border-[#D97D64] bg-white hover:bg-[#FDF9F5] transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group disabled:opacity-60 shadow-sm"
                >
                  <div className="p-3 rounded-full bg-[#F5E6D8] text-[#D97D64] group-hover:scale-110 transition-transform">
                    {isOptimizing ? (
                      <RefreshCw className="w-6 h-6 animate-spin text-[#D97D64]" />
                    ) : (
                      <Camera className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="font-cinzel text-xs uppercase tracking-wider text-[#2E1E14] font-bold">
                      {isOptimizing ? 'Optimizing photo resolution...' : 'Click to choose photo from device'}
                    </p>
                    <p className="text-[11px] text-[#6E5448] mt-1 font-montserrat font-medium">
                      {isOptimizing ? 'Compressing for fast mobile loading' : 'Supports JPG, PNG, Screenshots & Photos (up to 20MB)'}
                    </p>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs text-[#5A4234] font-montserrat font-medium">
                  Paste Direct Image Link:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/couple-photo.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#2E1E14] placeholder:text-[#8C7668]/60 focus:outline-none focus:border-[#D97D64]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#D97D64] to-[#C86D58] text-white text-xs font-cinzel font-semibold hover:brightness-105 shadow-sm"
                  >
                    Load
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Live Preview Area */}
            {previewUrl && (
              <div className="relative rounded-2xl overflow-hidden border border-[#E8DACB] bg-white max-h-[190px] flex items-center justify-center shadow-sm">
                <img
                  src={previewUrl}
                  alt="Photo Preview"
                  decoding="async"
                  className="w-full h-[180px] object-cover object-center"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] text-[#8C4E3A] font-cinzel uppercase border border-[#E8DACB] font-bold">
                  Preview
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-[#E8DACB] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="py-2.5 px-3 rounded-xl border border-[#E8DACB] text-[#5A4234] hover:bg-[#F5E6D8] text-xs font-montserrat flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || !previewUrl}
              className={`flex-1 py-3 px-4 rounded-xl font-cinzel text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                isSuccess
                  ? 'bg-emerald-600 text-white'
                  : previewUrl
                  ? 'bg-gradient-to-r from-[#D97D64] via-[#E29578] to-[#C86D58] text-white hover:brightness-105 shadow-md shadow-[#D97D64]/20 cursor-pointer'
                  : 'bg-[#E8DACB] text-[#8C7668] cursor-not-allowed'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Photo Saved!</span>
                </>
              ) : isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving Photo...</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4" />
                  <span>Save to Invitation</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
