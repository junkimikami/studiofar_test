import { useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "../components/Lightbox";
import { Reveal } from "../components/Reveal";

import mainImg from "../../imports/photos-compressed/2f/Cut1_0094.webp";
import floorMapImg from "../../imports/Studio2ndFloor-1/150d2622828e6a2162134aca77e9a327f50ad3e8.png";
import thumb1 from "../../imports/photos-compressed/2f/Cut1_0013.webp";
import thumb2 from "../../imports/photos-compressed/2f/Cut1_0022.webp";
import thumb3 from "../../imports/photos-compressed/2f/Cut1_0052.webp";
import thumb4 from "../../imports/photos-compressed/2f/Cut1_0073.webp";
import thumb5 from "../../imports/photos-compressed/2f/Cut1_0102.webp";
import thumb6 from "../../imports/photos-compressed/2f/DSC07184.webp";
import nextFloorImg1 from "../../imports/photos-compressed/2f/Cut1_0094.webp";
import nextFloorImg2 from "../../imports/photos-compressed/2f/Cut1_0013.webp";

const GALLERY_IMAGES = [mainImg, thumb1, thumb2, thumb3, thumb4, thumb5, thumb6];
const THUMB_STRIP = GALLERY_IMAGES;

export function StudioAir() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeStripIndex, setActiveStripIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prevGallery = () => { setActiveStripIndex(null); setGalleryIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length); };
  const nextGallery = () => { setActiveStripIndex(null); setGalleryIndex((i) => (i + 1) % GALLERY_IMAGES.length); };

  const specs = [
    { label: "自然光", value: "○" },
    { label: "インターネット回線", value: "○" },
    { label: "メイクルーム", value: "○" },
    { label: "広さ", value: "約130m²" },
    { label: "電気容量", value: "5kW／1F・2F 共用照明用回線あり(5kW)" },
  ];

  return (
    <div className="w-full">
      <div className="h-[10px] w-full bg-[#DBDBDB]" />

      <section className="relative h-[40vh] min-h-[300px] w-full">
        <ImageWithFallback src={mainImg} alt="Air" className="w-full h-full object-cover" />
      </section>

      <section className="py-24 px-4 text-center">
        <Reveal variant="blur" duration={1100}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-10">
            <svg viewBox="0 0 349.67 217.39" fill="#4F6A7B" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "clamp(100px, 28vw, 220px)", width: "100%", height: "auto" }}>
              <path d="M141.99,209.85h-15.66l-3.24,7.36h-4.33l13.34-29.46h4.17l13.38,29.46h-4.42l-3.24-7.36ZM140.51,206.49l-6.35-14.43-6.35,14.43h12.71Z"/>
              <path d="M171.69,187.76h4.21v29.46h-4.21v-29.46Z"/>
              <path d="M222.1,217.22l-6.35-9.05c-.59.04-1.22.08-1.85.08h-7.28v8.96h-4.21v-29.46h11.49c7.66,0,12.29,3.87,12.29,10.27,0,4.55-2.36,7.83-6.48,9.3l6.99,9.89h-4.59ZM221.98,198.03c0-4.21-2.82-6.61-8.21-6.61h-7.15v13.26h7.15c5.39,0,8.21-2.44,8.21-6.65Z"/>
              <path d="M234.76,114.04v3.14h-77.42v-2.48l50.12-50.78c14.72-14.89,17.7-23.49,17.7-33.25,0-16.21-11.25-26.63-32.26-26.63-15.88,0-27.29,4.63-35.73,14.06l-2.32-2.32c8.6-9.59,21.17-14.89,38.05-14.89,21.83,0,35.57,11.25,35.57,29.61,0,10.92-3.64,20.35-18.69,35.57l-47.31,47.97h72.29Z"/>
              <path d="M133.94,6.18h-1.5v5.04h-2.58v-4.97h-14.75v-3.14h14.75V.17h2.58v2.94h1.54c3.37,0,5.59,2.03,5.59,5.72,0,1.34-.33,2.65-1.01,3.53l-2.39-.95c.49-.65.82-1.5.82-2.42,0-1.86-1.05-2.81-3.04-2.81Z"/>
              <path d="M139.37,21.39v3.14h-24.26v-3.14h24.26Z"/>
              <path d="M123.77,36.1c5.17,0,8.83,3.83,8.83,9.03s-3.66,8.99-8.83,8.99-8.86-3.79-8.86-8.99,3.69-9.03,8.86-9.03ZM123.77,50.95c3.7,0,6.08-2.49,6.08-5.82s-2.39-5.85-6.08-5.85-6.12,2.52-6.12,5.85,2.42,5.82,6.12,5.82Z"/>
              <path d="M123.77,64.06c5.17,0,8.83,3.83,8.83,9.03s-3.66,8.99-8.83,8.99-8.86-3.79-8.86-8.99,3.69-9.03,8.86-9.03ZM123.77,78.91c3.7,0,6.08-2.49,6.08-5.82s-2.39-5.85-6.08-5.85-6.12,2.52-6.12,5.85,2.42,5.82,6.12,5.82Z"/>
              <path d="M132.6,102.94h-3.04c.03-.26.03-.49.03-.72,0-3.37-2.06-5.46-5.85-5.46h-8.63v-3.14h17.33v3.01h-2.91c2.03,1.11,3.07,3.27,3.07,6.31Z"/>
            </svg>
          </div>
          <div className="text-sm text-[#4F6A7B] tracking-[2px] leading-loose">
            <p>白を基調としたミニマルテイスト。</p>
            <p>大きな窓から時間帯によってさまざまな光が入るので、自然光を活かした撮影もおすすめです。</p>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Photo Gallery — main viewer + thumbnail strip */}
      <Reveal variant="scale-in" duration={1200}>
      <section className="pb-12 md:pb-24 max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Main image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
          <ImageWithFallback
            src={GALLERY_IMAGES[galleryIndex]}
            alt={`Air gallery ${galleryIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setLightboxIndex(galleryIndex)}
          />
          <button
            onClick={prevGallery}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-white hover:opacity-50 transition-opacity focus:outline-none"
            aria-label="前の画像"
          >
            <ChevronLeft size={44} strokeWidth={1} />
          </button>
          <button
            onClick={nextGallery}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-white hover:opacity-50 transition-opacity focus:outline-none"
            aria-label="次の画像"
          >
            <ChevronRight size={44} strokeWidth={1} />
          </button>
        </div>
        {/* Thumbnail strip — 10 per row */}
        <div className="grid grid-cols-5 md:flex gap-[2px] mt-[2px]">
          {THUMB_STRIP.map((src, i) => {
            const mappedIndex = i % GALLERY_IMAGES.length;
            const isActive = activeStripIndex !== null
              ? i === activeStripIndex
              : (mappedIndex === galleryIndex && i < GALLERY_IMAGES.length);
            return (
              <button
                key={i}
                onClick={() => { setGalleryIndex(mappedIndex); setActiveStripIndex(i); }}
                className={`thumb-btn flex-1 overflow-hidden focus:outline-none transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-45 hover:opacity-75"
                }`}
                style={{ aspectRatio: "1/1" }}
              >
                <ImageWithFallback
                  src={src}
                  alt={`Air thumb ${i + 1}`}
                  className="thumb-img w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </section>
      </Reveal>

      {/* Floor Map */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="relative inline-block">
            <ImageWithFallback src={floorMapImg} alt="Floor Map" className="max-w-full h-auto blur-[1px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#F97F7F] text-white px-8 py-4 tracking-[2px] text-sm">
                図面ご支給ください
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs & Downloads */}
      <section className="py-12 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-0">
              {specs.map((spec) => (
                <div key={spec.label} className="flex justify-between py-5 border-b border-[#548EB3]/25 text-[#4F6A7B]">
                  <span className="text-sm tracking-[2px]">{spec.label}</span>
                  <span className="text-sm tracking-[1px] text-right max-w-[300px]">{spec.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center justify-between bg-[#548EB3] text-white p-6 hover:opacity-90 transition-opacity">
                <span className="text-sm tracking-[2px]">スタジオ詳細図面</span>
                <FileText size={20} />
              </a>
              <a href="#" className="flex items-center justify-between bg-[#548EB3] text-white p-6 hover:opacity-90 transition-opacity">
                <span className="text-sm tracking-[2px]">撮影備品・貸し出し品リスト</span>
                <FileText size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-0 px-4 md:px-0 border-y border-gray-100 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2">
          <Link to="/price" className="border border-[#4F6A7B]/20 md:border-0 md:border-r md:border-gray-100 p-5 md:p-20 text-center group hover:bg-[#4F6A7B] active:bg-[#4F6A7B] transition-colors flex flex-col items-center justify-center gap-2 md:gap-5">
            <h3 className="font-['Montserrat'] tracking-[6px] md:tracking-[16px] text-[#4F6A7B] group-hover:text-white group-active:text-white transition-colors" style={{ fontSize: "clamp(14px, 2.5vw, 20px)" }}>PRICE</h3>
            <p className="hidden md:block text-gray-400 group-hover:text-white/80 tracking-[1px] leading-relaxed" style={{ fontSize: "13px" }}>
              各フロアの料金はプライスページをご覧ください<br/>１棟貸しも受付しております
            </p>
            <ChevronRight size={16} className="text-[#4F6A7B] group-hover:text-white group-active:text-white transition-colors md:hidden" />
          </Link>
          <Link to="/guide" className="border border-[#4F6A7B]/20 border-l-0 md:border-0 p-5 md:p-20 text-center group hover:bg-[#4F6A7B] active:bg-[#4F6A7B] transition-colors flex flex-col items-center justify-center gap-2 md:gap-5">
            <h3 className="font-['Montserrat'] tracking-[6px] md:tracking-[16px] text-[#4F6A7B] group-hover:text-white group-active:text-white transition-colors" style={{ fontSize: "clamp(14px, 2.5vw, 20px)" }}>GUIDE</h3>
            <p className="hidden md:block text-gray-400 group-hover:text-white/80 tracking-[1px] leading-relaxed" style={{ fontSize: "13px" }}>
              利用規約や禁止事項をまとめています。<br/>必ずご確認ください。
            </p>
            <ChevronRight size={16} className="text-[#4F6A7B] group-hover:text-white group-active:text-white transition-colors md:hidden" />
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <Link to="/reserve" className="block border border-[#F97F7F] p-10 md:p-20 text-center hover:bg-[#F97F7F] group transition-colors">
            <h3 className="font-['Montserrat'] tracking-[10px] text-[#F97F7F] group-hover:text-white mb-5" style={{ fontSize: "clamp(18px, 3vw, 24px)" }}>RESERVE</h3>
            <p className="text-sm text-[#F97F7F] group-hover:text-white/80 tracking-[2px]">
              ご予約や空き状況の確認につきましてはこちらのページをご覧ください。
            </p>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2">
        <Link to="/studio/radiance" className="relative overflow-hidden group" style={{ height: "400px" }}>
          <ImageWithFallback src={nextFloorImg1} alt="Radiance" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center text-white">
            <span className="font-['Montserrat'] tracking-[4px] mb-3" style={{ fontSize: "14px" }}>1st floor</span>
            <h3 className="font-['Montserrat'] tracking-[10px]" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>RADIANCE</h3>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-[#AAC7D9]" style={{ height: "19px" }} />
        </Link>
        <Link to="/studio/future" className="relative overflow-hidden group" style={{ height: "400px" }}>
          <ImageWithFallback src={nextFloorImg2} alt="Future" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center text-white">
            <span className="font-['Montserrat'] tracking-[4px] mb-3" style={{ fontSize: "14px" }}>3rd floor</span>
            <h3 className="font-['Montserrat'] tracking-[10px]" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>FUTURE</h3>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-[#E8DC8D]" style={{ height: "19px" }} />
        </Link>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length)}
        />
      )}
    </div>
  );
}
