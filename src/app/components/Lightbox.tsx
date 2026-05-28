import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-8 text-white hover:opacity-70 transition-opacity z-10"
        onClick={onClose}
      >
        <X size={32} />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          className="absolute left-4 md:left-8 text-white hover:opacity-70 transition-opacity z-10 p-2"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        className="max-w-[90vw] max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next button */}
      {images.length > 1 && (
        <button
          className="absolute right-4 md:right-8 text-white hover:opacity-70 transition-opacity z-10 p-2"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight size={40} />
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-['Montserrat'] tracking-[2px]" style={{ fontSize: "13px" }}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
