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
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Failed to load image file'));
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

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('File size exceeds 20MB. Please select a smaller photo.');
      return;
    }

    setErrorMessage(null);
    setIsOptimizing(true);
    try {
      const optimizedDataUrl = await compressImageFile(file);
      setPreviewUrl(optimizedDataUrl);
    } catch (err) {
      console.warn('Image optimization failed, falling back to direct reader:', err);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsOptimizing(false);
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
    } catch (err) {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-[420px] bg-[#0E1626] border border-[#D4AF37]/40 rounded-3xl p-6 shadow-2xl text-[#FAF8F5] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-base text-[#FAF8F5] font-semibold">
                  Add Couple Photo
                </h3>
                <p className="text-xs text-[#FAF8F5]/60 font-montserrat">
                  {photoTitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#FAF8F5]/60 hover:text-[#FAF8F5] hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-2 p-1 mt-4 rounded-xl bg-[#090E1A] border border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-montserrat font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'bg-[#18233C] text-[#D4AF37] shadow-sm'
                  : 'text-[#FAF8F5]/60 hover:text-[#FAF8F5]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-montserrat font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'url'
                  ? 'bg-[#18233C] text-[#D4AF37] shadow-sm'
                  : 'text-[#FAF8F5]/60 hover:text-[#FAF8F5]'
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
                  className="w-full py-8 px-4 rounded-2xl border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] bg-[#121B2F]/60 hover:bg-[#121B2F] transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group disabled:opacity-60"
                >
                  <div className="p-3 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] group-hover:scale-110 transition-transform">
                    {isOptimizing ? (
                      <RefreshCw className="w-6 h-6 animate-spin text-[#D4AF37]" />
                    ) : (
                      <Camera className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="font-cinzel text-xs uppercase tracking-wider text-[#FAF8F5] font-semibold">
                      {isOptimizing ? 'Optimizing photo resolution...' : 'Click to choose photo from device'}
                    </p>
                    <p className="text-[11px] text-[#FAF8F5]/60 mt-1 font-montserrat">
                      {isOptimizing ? 'Compressing for fast mobile loading' : 'Supports JPG, PNG, Screenshots & Photos (up to 20MB)'}
                    </p>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs text-[#FAF8F5]/80 font-montserrat">
                  Paste Direct Image Link:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/couple-photo.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#090E1A] border border-[#D4AF37]/30 text-xs text-[#FAF8F5] placeholder:text-[#FAF8F5]/30 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="py-2 px-3 rounded-xl bg-[#D4AF37] text-[#0B1325] text-xs font-cinzel font-semibold hover:brightness-110"
                  >
                    Load
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Live Preview Area */}
            {previewUrl && (
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-[#090E1A] max-h-[190px] flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Photo Preview"
                  className="w-full h-[180px] object-cover object-center"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-[10px] text-[#D4AF37] font-cinzel uppercase border border-[#D4AF37]/30">
                  Preview
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="py-2.5 px-3 rounded-xl border border-white/15 text-[#FAF8F5]/70 hover:text-[#FAF8F5] hover:bg-white/5 text-xs font-montserrat flex items-center gap-1.5 transition-colors"
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
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#C5A059] text-[#0B1325] hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 cursor-pointer'
                  : 'bg-white/10 text-[#FAF8F5]/30 cursor-not-allowed'
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
