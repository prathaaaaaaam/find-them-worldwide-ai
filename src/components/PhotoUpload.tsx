
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  onPhotosUploaded: (count: number) => void;
}

const PhotoUpload = ({ onPhotosUploaded }: PhotoUploadProps) => {
  const [photos, setPhotos] = useState<{ id: number; status: string; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newPhotos = Array.from(files).map((file, index) => {
      const id = Date.now() + index;
      return {
        id,
        status: "uploading",
        preview: URL.createObjectURL(file)
      };
    });
    
    setPhotos([...photos, ...newPhotos]);
    
    // Simulate processing
    newPhotos.forEach(photo => {
      setTimeout(() => {
        setPhotos(prev => 
          prev.map(p => 
            p.id === photo.id 
              ? { ...p, status: Math.random() > 0.3 ? "success" : "warning" } 
              : p
          )
        );
      }, 1500 + Math.random() * 2000);
    });
    
    onPhotosUploaded(newPhotos.length);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const removePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Photo Recognition</h2>
      <p className="text-gray-600 mb-6">
        Upload recent, clear photos of the missing person. Our AI will scan publicly available sources
        for potential matches within legal and ethical boundaries.
      </p>
      
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-lg font-medium">Drag photos here or click to upload</p>
            <p className="text-sm text-gray-500 mt-1">
              Accepts JPG, PNG, HEIC - Max 10MB per file
            </p>
          </div>
          <input 
            type="file" 
            id="photo-upload" 
            multiple 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
          <Button 
            onClick={() => document.getElementById("photo-upload")?.click()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Select Photos
          </Button>
        </div>
      </div>
      
      {photos.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Uploaded Photos ({photos.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map(photo => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={photo.preview} 
                    alt="Uploaded" 
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-opacity",
                      photo.status === "uploading" ? "bg-black/50" : "bg-black/20 opacity-0 group-hover:opacity-100"
                    )}
                  >
                    {photo.status === "uploading" ? (
                      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-white hover:bg-black/30" 
                        onClick={() => removePhoto(photo.id)}
                      >
                        <X size={18} />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="mt-1 flex items-center text-sm">
                  {photo.status === "success" && (
                    <div className="text-green-600 flex items-center">
                      <Check size={14} className="mr-1" />
                      <span>Ready for analysis</span>
                    </div>
                  )}
                  {photo.status === "warning" && (
                    <div className="text-amber-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      <span>Low detail, upload another</span>
                    </div>
                  )}
                  {photo.status === "uploading" && (
                    <div className="text-blue-600">
                      Processing...
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {photos.length < 8 && (
              <button
                onClick={() => document.getElementById("photo-upload")?.click()}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
              >
                <ImageIcon size={24} />
                <span className="mt-2 text-sm">Add More</span>
              </button>
            )}
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 flex items-center">
              <AlertCircle size={16} className="mr-2" />
              Facial Recognition Privacy Notice
            </h4>
            <p className="text-sm text-blue-700 mt-2">
              Our system only analyzes publicly available sources within legal frameworks. 
              We do not access private CCTV networks or breach privacy laws. 
              Results are intended as leads for authorized investigations only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
