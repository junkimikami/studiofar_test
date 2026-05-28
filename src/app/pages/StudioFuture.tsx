import { useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "../components/Lightbox";

import mainImg from "../../imports/Studio3rdFloor-1/e8015c1679873707f8eb2b24670b95324ebeff2a.png";
import floorMapImg from "../../imports/Studio3rdFloor-1/150d2622828e6a2162134aca77e9a327f50ad3e8.png";
import thumb1 from "../../imports/Studio3rdFloor-1/61c29ed43cad68d67bbffd8c44143714045732d8.png";
import thumb2 from "../../imports/Studio3rdFloor-1/b7593254f0d7ca003c5e1b67098a01b6ff576c8e.png";
import thumb3 from "../../imports/Studio3rdFloor-1/1966be5f8611e151b71f33598f184f275a808294.png";
import thumb4 from "../../imports/Studio3rdFloor-1/bf0047675c4396cf2ad494b13132747b677bbe8d.png";
import nextFloorImg1 from "../../imports/Studio3rdFloor-1/bf0047675c4396cf2ad494b13132747b677bbe8d.png";
import nextFloorImg2 from "../../imports/Studio3rdFloor-1/1966be5f8611e151b71f33598f184f275a808294.png";

const GALLERY_IMAGES = [mainImg, thumb1, thumb2, thumb3, thumb4];

export function StudioFuture() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prevGallery = () => setGalleryIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  const nextGallery = () => setGalleryIndex((i) => (i + 1) % GALLERY_IMAGES.length);

  const specs = [
    { label: "自然光", value: "○" },
    { label: "インターネット回線", value: "○" },
    { label: "メイクルーム", value: "○" },
    { label: "広さ", value: "約65m²" },
    { label: "電気容量", value: "3kW" },
  ];

  return (
    <div className="w-full">
      <div className="h-[10px] w-full bg-[#E8DC8D]" />

      <section className="relative w-full" style={{ height: "462px" }}>
        <ImageWithFallback src={mainImg} alt="Future" className="w-full h-full object-cover" />
      </section>

      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-10">
            <svg viewBox="0 0 420 120" style={{ width: "100%", maxWidth: "420px", height: "auto" }} xmlns="http://www.w3.org/2000/svg">
              <text x="210" y="17" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="9" letterSpacing="3" fill="#4F6A7B">floor</text>
              <rect x="194" y="25" width="32" height="32" fill="none" stroke="#4F6A7B" strokeWidth="0.8"/>
              <text x="210" y="49" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="17" fill="#4F6A7B">3</text>
              <text x="210" y="108" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="38" letterSpacing="11" fill="#4F6A7B">FUTURE</text>
            </svg>
          </div>
          <div className="text-[#4F6A7B] tracking-[2px] leading-[32px]" style={{ fontSize: "16px" }}>
            <p>YouTubeやコンパクトな</p>
            <p>撮影に最適なフロア</p>
          </div>
        </div>
      </section>

      {/* Photo Gallery — main viewer + thumbnail strip */}
      <section className="pb-24 max-w-[1200px] mx-auto px-8">
        {/* Main image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
          <ImageWithFallback
            src={GALLERY_IMAGES[galleryIndex]}
            alt={`Future gallery ${galleryIndex + 1}`}
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
        {/* Thumbnail strip */}
        <div className="flex gap-[2px] mt-[2px]">
          {GALLERY_IMAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => setGalleryIndex(i)}
              className={`flex-1 overflow-hidden focus:outline-none transition-opacity duration-300 ${
                i === galleryIndex ? "opacity-100" : "opacity-45 hover:opacity-75"
              }`}
              style={{ aspectRatio: "1/1" }}
            >
              <ImageWithFallback
                src={src}
                alt={`Future thumb ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Floor Map */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="relative inline-block">
            <ImageWithFallback src={floorMapImg} alt="Floor Map" className="max-w-full h-auto blur-[1px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#F97F7F] text-white px-8 py-4 tracking-[2px]" style={{ fontSize: "16px" }}>
                図面ご支給ください
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs & Downloads */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-0">
              {specs.map((spec) => (
                <div key={spec.label} className="flex justify-between py-5 border-b border-[#548EB3]/25 text-[#4F6A7B]">
                  <span className="tracking-[2px]" style={{ fontSize: "16px" }}>{spec.label}</span>
                  <span className="tracking-[1px] text-right max-w-[300px]" style={{ fontSize: "16px" }}>{spec.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center justify-between bg-[#548EB3] text-white p-6 hover:opacity-90 transition-opacity">
                <span className="tracking-[2px]" style={{ fontSize: "16px" }}>スタジオ詳細図面</span>
                <FileText size={20} />
              </a>
              <a href="#" className="flex items-center justify-between bg-[#548EB3] text-white p-6 hover:opacity-90 transition-opacity">
                <span className="tracking-[2px]" style={{ fontSize: "16px" }}>撮影備品・貸し出し品リスト</span>
                <FileText size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-0 border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2">
          <Link to="/price" className="border-r border-gray-100 p-20 text-center group hover:bg-[#4F6A7B] transition-colors">
            <h3 className="font-['Montserrat'] tracking-[10px] text-[#4F6A7B] group-hover:text-white mb-5" style={{ fontSize: "20px" }}>PRICE</h3>
            <p className="text-gray-400 group-hover:text-white/80 tracking-[1px] leading-relaxed" style={{ fontSize: "13px" }}>
              各フロアの料金はプライスページをご覧ください<br/>１棟貸しも受付しております
            </p>
          </Link>
          <Link to="/guide" className="p-20 text-center group hover:bg-[#4F6A7B] transition-colors">
            <h3 className="font-['Montserrat'] tracking-[10px] text-[#4F6A7B] group-hover:text-white mb-5" style={{ fontSize: "20px" }}>GUIDE</h3>
            <p className="text-gray-400 group-hover:text-white/80 tracking-[1px] leading-relaxed" style={{ fontSize: "13px" }}>
              利用規約や禁止事項をまとめています。<br/>必ずご確認ください。
            </p>
          </Link>
        </div>
      </section>

      <section className="py-24 px-8">
        <div className="max-w-[1440px] mx-auto">
          <Link to="/reserve" className="block border border-[#F97F7F] p-20 text-center hover:bg-[#F97F7F] group transition-colors">
            <h3 className="font-['Montserrat'] tracking-[10px] text-[#F97F7F] group-hover:text-white mb-5" style={{ fontSize: "24px" }}>RESERVE</h3>
            <p className="text-[#F97F7F] group-hover:text-white/80 tracking-[2px]" style={{ fontSize: "16px" }}>
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
            <h3 className="font-['Montserrat'] tracking-[10px]" style={{ fontSize: "28px" }}>RADIANCE</h3>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-[#AAC7D9]" style={{ height: "19px" }} />
        </Link>
        <Link to="/studio/air" className="relative overflow-hidden group" style={{ height: "400px" }}>
          <ImageWithFallback src={nextFloorImg2} alt="Air" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center text-white">
            <span className="font-['Montserrat'] tracking-[4px] mb-3" style={{ fontSize: "14px" }}>2nd floor</span>
            <h3 className="font-['Montserrat'] tracking-[10px]" style={{ fontSize: "28px" }}>AIR</h3>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-[#DBDBDB]" style={{ height: "19px" }} />
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
