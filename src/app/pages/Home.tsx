import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Hero slideshow images — hero4 is first per design spec
import hero1 from "../../imports/Homepage-1/e8015c1679873707f8eb2b24670b95324ebeff2a.png";
import hero2 from "../../imports/Homepage-1/44cd69b9fab6292f40896daca0e4a88d2c093ffc.png";
import hero3 from "../../imports/Homepage-1/2457427735e2b9269e2371ef9553f4a48b156b7c.png";
import hero4 from "../../imports/Homepage-1/b324b89e81180dfc7d885e1e9c18113956f68833.png";
import hero5 from "../../imports/Studio1stFloor-1/bf0047675c4396cf2ad494b13132747b677bbe8d.png";

// Floor images
import floor1Img from "../../imports/Homepage-1/e8015c1679873707f8eb2b24670b95324ebeff2a.png";
import floor2Img from "../../imports/Homepage-1/44cd69b9fab6292f40896daca0e4a88d2c093ffc.png";
import floor3Img from "../../imports/Homepage-1/2457427735e2b9269e2371ef9553f4a48b156b7c.png";

// NEWS grid images
import gallery1a from "../../imports/Studio1stFloor-1/61c29ed43cad68d67bbffd8c44143714045732d8.png";
import gallery1b from "../../imports/Studio1stFloor-1/b7593254f0d7ca003c5e1b67098a01b6ff576c8e.png";
import gallery1c from "../../imports/Studio1stFloor-1/1966be5f8611e151b71f33598f184f275a808294.png";
import gallery2a from "../../imports/Studio2ndFloor-1/61c29ed43cad68d67bbffd8c44143714045732d8.png";
import gallery2b from "../../imports/Studio2ndFloor-1/b7593254f0d7ca003c5e1b67098a01b6ff576c8e.png";
import gallery2c from "../../imports/Studio2ndFloor-1/1966be5f8611e151b71f33598f184f275a808294.png";

// Map image
import mapImg from "../../imports/Homepage-1/e25f64f2451e9d65e545cd15fe5b537ec5db47ec.png";

const HERO_IMAGES = [hero4, hero1, hero2, hero3, hero5];
const HERO_INTERVAL = 5000;
const TRANSITION_MS = 1200;

export function Home() {
  const [bottomIndex, setBottomIndex] = useState(0);
  const [topIndex, setTopIndex] = useState<number | null>(null);
  const [topVisible, setTopVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = useCallback((next: number) => {
    if (transitionRef.current) clearTimeout(transitionRef.current);
    setTopIndex(next);
    setTopVisible(false);

    // Double rAF ensures the top layer renders at opacity-0 before we trigger the fade-in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTopVisible(true);
      });
    });

    transitionRef.current = setTimeout(() => {
      setBottomIndex(next);
      setTopIndex(null);
      setTopVisible(false);
    }, TRANSITION_MS + 80);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBottomIndex((prev) => {
        const next = (prev + 1) % HERO_IMAGES.length;
        goToSlide(next);
        return prev; // bottomIndex updates via the timeout inside goToSlide
      });
    }, HERO_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (transitionRef.current) clearTimeout(transitionRef.current);
    };
  }, [goToSlide]);

  const handleDotClick = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goToSlide(i);
    intervalRef.current = setInterval(() => {
      setBottomIndex((prev) => {
        const next = (prev + 1) % HERO_IMAGES.length;
        goToSlide(next);
        return prev;
      });
    }, HERO_INTERVAL);
  };

  const floorData = [
    {
      floor: "1st floor",
      title: "RADIANCE",
      description: "光とセンスが呼応するフロア",
      image: floor1Img,
      link: "/studio/radiance",
      accentColor: "bg-[#AAC7D9]",
    },
    {
      floor: "2nd floor",
      title: "AIR",
      description: "大きな白壁が広がるフロア",
      image: floor2Img,
      link: "/studio/air",
      accentColor: "bg-[#DBDBDB]",
    },
    {
      floor: "3rd floor",
      title: "FUTURE",
      description: "新しく生まれ変わった、３つの撮影スポットが交差するフロア",
      image: floor3Img,
      link: "/studio/future",
      accentColor: "bg-[#E8DC8D]",
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[100svh] min-h-[500px] w-full overflow-hidden">
        {/* Bottom layer — current image */}
        <div key={`bottom-${bottomIndex}`} className="absolute inset-0 z-[1]">
          <ImageWithFallback
            src={HERO_IMAGES[bottomIndex]}
            alt="Studio Far Hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top layer — incoming image, cross-dissolves in */}
        {topIndex !== null && (
          <div
            className="absolute inset-0 z-[2]"
            style={{
              opacity: topVisible ? 1 : 0,
              transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
            }}
          >
            <ImageWithFallback
              src={HERO_IMAGES[topIndex]}
              alt="Studio Far Hero"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Indicator dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === bottomIndex ? "bg-white w-6" : "bg-white/50 w-1.5"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── CONCEPT SECTION ── */}
      <section className="px-4 bg-white text-center py-16 md:py-[194px]">
        <div className="max-w-3xl mx-auto space-y-12 md:space-y-16">
          <div className="space-y-0 text-[#4f6a7b] tracking-[2px] text-xs md:text-base">
            <p className="leading-relaxed md:leading-[42px]">
              まだ見ぬ「未来」を切り拓く新しさに出会い、
              <br />
              澄み渡る「空気」のような心地よさを纏い、
              <br />
              すべての人とクリエイティブに
            </p>
            <p className="leading-relaxed md:leading-[42px]">溢れる「輝き」と「多幸感」を。</p>
          </div>
          <div className="flex justify-center">
            <ConceptLogo />
          </div>
        </div>
      </section>

      {/* ── FLOOR SECTION ── */}
      <section className="bg-[#F3F9F9] py-16 md:py-[178px]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12 md:mb-20 space-y-5">
            <h2 className="font-['Montserrat'] tracking-[8px] md:tracking-[18px] text-[#4F6A7B]" style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>
              FLOOR
            </h2>
            <div className="text-[#4f6a7b] tracking-[2px] text-xs md:text-base">
              <p className="leading-[32px]">広告撮影からイベントの開催まで、個性の光るstudio farの3つのフロア</p>
              <p className="leading-[32px]">イメージやスペックはそれぞれのページで詳しくご紹介しております</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {floorData.map((floor) => (
              <FloorCard
                key={floor.title}
                floor={floor.floor}
                title={floor.title}
                description={floor.description}
                image={floor.image}
                link={floor.link}
                accentColor={floor.accentColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── RESERVE SECTION ── */}
      <section className="px-4 bg-white py-16 md:py-[178px]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10 md:mb-16 space-y-5">
            <h2
              className="font-['Montserrat'] tracking-[6px] md:tracking-[10px] text-[#4F6A7B]"
              style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
            >
              RESERVE
            </h2>
            <p className="text-[#4f6a7b] tracking-[2px] text-sm">
              ご予約方法
            </p>
          </div>

          <div className="border-t border-[#548EB3]/40 mb-12" />

          <div className="space-y-11 max-w-[793px] mx-auto">
            <ReserveStep
              number="STEP-01"
              lines={[
                "メールにて空室状況をご確認ください。",
                "お急ぎの場合はお電話にてお問い合わせください。",
              ]}
            />
            <ReserveStep
              number="STEP-02"
              lines={["スタジオ担当者と予約日時の確定を行ってください。"]}
            />
            <ReserveStep
              number="STEP-03"
              lines={[
                "確定後、以下のお申し込みフォームに必要事項を記入てください。",
                "予約確定メールをお送りしますので、ご確認ください。",
              ]}
            />
          </div>

          <div className="border-t border-[#548EB3]/40 mt-12 mb-16" />

          <div className="flex justify-center">
            <Link
              to="/reserve"
              className="border border-[#F97F7F] flex flex-col items-center justify-center px-6 py-6 md:px-20 md:py-10 text-center hover:bg-[#f97f7f] group transition-colors duration-300"
              style={{ width: "860px", maxWidth: "100%" }}
            >
              <p className="text-sm text-[#f97f7f] group-hover:text-white tracking-[2px] mb-3 transition-colors duration-300">
                ご予約のお申し込みはこちらのメールフォームからお問い合わせください
              </p>
              <p
                className="font-['Montserrat'] text-[#f97f7f] group-hover:text-white tracking-[10px] transition-colors duration-300"
                style={{ fontSize: "clamp(18px, 3vw, 24px)" }}
              >
                RESERVE FORM
              </p>
            </Link>
          </div>

          <div className="mt-14 text-center text-[#4f6a7b] space-y-3">
            <p className="text-sm tracking-[2px]">
              お急ぎの場合はお電話にてお問い合わせください
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm tracking-[2px]">
                (代表)
              </span>
              <span className="font-['Montserrat'] font-medium" style={{ fontSize: "clamp(18px, 4vw, 31px)" }}>
                0 9 0 - 6 5 4 1 - 1 3 3 8
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICE SECTION ── */}
      <section className="px-4 bg-[#F3F9F9] py-16 md:py-[178px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2
            className="font-['Montserrat'] tracking-[8px] md:tracking-[18px] text-[#4F6A7B] mb-5"
            style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
          >
            PRICE
          </h2>
          <div className="text-[#4f6a7b] tracking-[2px] mb-8 md:mb-16 text-sm md:text-base">
            <p className="leading-[32px]">各フロアごとはもちろん、１棟貸しも受付しております</p>
            <p className="leading-[32px]">詳細はプライスページをご覧ください</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#4F6A7B] bg-white">
              <thead>
                <tr>
                  <th className="border border-[#4F6A7B] p-3 md:p-6 font-normal text-[#4f6a7b] tracking-[2px] md:tracking-[4px] font-['Montserrat'] text-xs md:text-sm">
                    1h あたり (4h〜)
                  </th>
                  <th
                    className="border border-[#4F6A7B] p-3 md:p-6 font-normal text-[#4f6a7b] tracking-[1px] md:tracking-[2px] bg-[#C9E1E3] text-sm md:text-lg"
                  >
                    スチール撮影
                  </th>
                  <th
                    className="border border-[#4F6A7B] p-3 md:p-6 font-normal text-[#4f6a7b] tracking-[1px] md:tracking-[2px] bg-[#F6CFCF] text-sm md:text-lg"
                  >
                    ムービー撮影利用
                  </th>
                </tr>
              </thead>
              <tbody>
                <PriceRow name="1st floor" steel="18,000" movie="22,000" />
                <PriceRow name="2nd floor" steel="18,000" movie="22,000" />
                <tr>
                  <td className="border border-[#4F6A7B] p-6 text-sm text-[#4f6a7b] tracking-[6px] font-['Montserrat'] text-center">
                    <span className="block">3rd floor</span>
                    <span className="block" style={{ fontSize: "13px" }}>MAKE ROOM</span>
                  </td>
                  <td
                    colSpan={2}
                    className="border border-[#4F6A7B] p-6 text-sm text-[#4f6a7b] tracking-[2px] text-center leading-relaxed"
                  >
                    現在、3rd floorのみの貸し出しは行っておりません
                  </td>
                </tr>
                <PriceRow name="ALL floor" steel="28,000" movie="32,000" />
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/price"
              className="inline-flex items-center justify-center border border-[#4F6A7B] text-[#4f6a7b] hover:bg-[#4F6A7B] hover:text-white transition-all tracking-[0.7px] uppercase font-['Montserrat']"
              style={{ fontSize: "14px", width: "270px", height: "70px" }}
            >
              More →
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWS / INSTAGRAM SECTION ── */}
      <section className="px-4 bg-white py-16 md:py-[178px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2
            className="font-['Montserrat'] tracking-[6px] md:tracking-[10px] text-[#4F6A7B] mb-3"
            style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
          >
            NEWS
          </h2>
          <a
            href="https://www.instagram.com/studio_far.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Montserrat'] text-sm text-[#4f6a7b] tracking-[6px] mb-4 inline-block hover:opacity-70 transition-opacity"
          >
            @studio_far.official
          </a>
          <p className="text-sm text-[#4f6a7b] tracking-[2px] mb-12 mt-2">
            スタジオの最新情報はインスタグラムをご覧ください
          </p>

          {/* Instagram feed — Behold widget */}
          <div className="max-w-[900px] mx-auto mb-10">
            {/* @ts-ignore */}
            <behold-widget feed-id="N60i44JoqE3LoddEiN49"></behold-widget>
          </div>

          {/* Follow button */}
          <a
            href="https://www.instagram.com/studio_far.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[#4F6A7B] text-[#4f6a7b] hover:bg-[#4F6A7B] hover:text-white transition-all tracking-[3px] font-['Montserrat'] px-10 py-4"
            style={{ fontSize: "13px" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            Instagramをフォロー
          </a>
        </div>
      </section>

      {/* ── ACCESS SECTION ── */}
      <section id="access" className="py-0">
        <div className="w-full h-[280px] md:h-[540px] relative">
          <ImageWithFallback
            src={mapImg}
            alt="Studio Far Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0">
            <iframe
              title="Google Maps"
              src="https://maps.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%96%E7%94%B0%E8%B0%B7%E5%8C%BA%E4%B8%8B%E9%A6%AC1%E4%B8%81%E7%9B%AE5-1&t=&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="absolute bottom-6 right-6 z-10">
            <a
              href="https://www.google.com/maps/search/?api=1&query=東京都世田谷区下馬1丁目5-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white border border-[#4f6a7b] text-[#4f6a7b] px-6 py-3 hover:bg-[#4f6a7b] hover:text-white transition-all tracking-[0.7px]"
              style={{ fontSize: "14px" }}
            >
              大きなMAPで見る
            </a>
          </div>
        </div>

        <div className="px-4 text-center text-[#4f6a7b] py-16 md:py-[162px]">
          <h2
            className="font-['Montserrat'] tracking-[6px] md:tracking-[10px] mb-8 md:mb-10"
            style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
          >
            ACCESS
          </h2>
          <div className="space-y-2">
            <p className="font-['Montserrat'] font-medium" style={{ fontSize: "clamp(16px, 2.5vw, 22px)" }}>
              studio far{" "}
              <span className="tracking-[2px]" style={{ fontSize: "clamp(16px, 2.5vw, 22px)" }}>
                (スタジオファー)
              </span>
            </p>
            <p className="tracking-[2px]" style={{ fontSize: "clamp(13px, 1.5vw, 16px)" }}>
              〒154-0002 東京都世田谷区下馬１丁目５−１
            </p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="tracking-[2px]" style={{ fontSize: "clamp(13px, 1.5vw, 16px)" }}>
              (代表)
            </span>
            <span className="font-['Montserrat'] font-medium" style={{ fontSize: "clamp(18px, 4vw, 31px)" }}>
              0 9 0 - 6 5 4 1 - 1 3 3 8
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ConceptLogo() {
  const c = "#BCCAD2";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1283.06 270.92"
      style={{ width: "100%", maxWidth: "clamp(160px, 50vw, 700px)", height: "auto" }}
      aria-label="studio far"
    >
      {/* s */}
      <path fill={c} d="M37.93,218.91c-9.36-1.54-17.44-2.87-17.44-8.97,0-5.18,5.67-8.15,15.55-8.15,8.06,0,15.12,1.84,21.56,5.63l.35.2,7.16-14.18-.3-.18c-6.53-3.95-18.03-6.6-28.63-6.6-20.53,0-33.79,9.47-33.79,24.12,0,18.22,16.7,20.82,30.12,22.91,9.02,1.4,16.81,2.62,16.81,8.23,0,5.31-5.23,8.01-15.55,8.01-9.06,0-19.36-2.93-26.24-7.47l-.35-.23-7.16,14.18.27.19c7.26,5.14,20.26,8.6,32.35,8.6,10.49,0,19.28-2.24,25.42-6.47,6.13-4.22,9.37-10.23,9.37-17.37,0-17.61-16.35-20.3-29.48-22.46Z" />
      {/* t */}
      <path fill={c} d="M144.78,246.76c-2.52,1.99-5.88,3.05-9.72,3.05-6.63,0-10.14-3.8-10.14-11v-35.74h20.33v-14.98h-20.33v-17.35h-18.53v68.49c0,16.75,9.43,25.97,26.54,25.97,6.86,0,13.17-1.9,17.3-5.2l.22-.17-5.26-13.39-.4.32Z" />
      {/* u */}
      <path fill={c} d="M245.11,226.3c0,7.29-1.9,12.97-5.64,16.89-3.51,3.68-8.61,5.62-14.74,5.62-11.38,0-17.4-6.9-17.4-19.96v-41.33h-18.53v43.75c0,11.16,3.08,19.78,9.16,25.63,5.64,5.43,13.91,8.3,23.92,8.3s18.44-3.64,24.08-10.01v9.02h17.68v-76.69h-18.53v38.77Z" />
      {/* d */}
      <path fill={c} d="M364.28,196.3c-5.79-6.3-14.09-9.62-24.08-9.62-10.91,0-20.76,3.79-27.73,10.67-7.22,7.13-11.04,17-11.04,28.53,0,23.16,15.94,39.34,38.77,39.34,10.36,0,18.9-3.51,24.79-10.16v9.16h17.82v-106.26h-18.53v38.34ZM342.33,249.24c-13.09,0-22.23-9.61-22.23-23.37s9.14-23.37,22.23-23.37,22.23,9.61,22.23,23.37-9.14,23.37-22.23,23.37Z" />
      {/* i bar */}
      <rect fill={c} x="430.28" y="187.53" width="18.53" height="76.69" />
      {/* i dot */}
      <path fill={c} d="M439.62,153.69c-6.7,0-11.75,4.75-11.75,11.04s5.05,11.04,11.75,11.04,11.75-4.82,11.75-11.47c0-6.05-5.05-10.62-11.75-10.62Z" />
      {/* o (small) */}
      <path fill={c} d="M560.59,197.66c-7.41-7.08-17.84-10.98-29.37-10.98s-21.79,3.9-29.2,10.98c-7.46,7.12-11.56,17.14-11.56,28.21,0,22.79,17.14,39.34,40.76,39.34,11.52,0,21.95-3.93,29.38-11.05,7.43-7.14,11.53-17.18,11.53-28.28s-4.09-21.11-11.53-28.21ZM547.1,242.92c-3.99,4.08-9.63,6.32-15.88,6.32-13,0-22.09-9.61-22.09-23.37s9.08-23.37,22.09-23.37c6.26,0,11.9,2.24,15.88,6.32,4.15,4.24,6.34,10.14,6.34,17.05s-2.19,12.8-6.34,17.05Z" />
      {/* f (large) */}
      <path fill={c} d="M798.25,11.4c-9.15-7.24-22.7-11.4-37.17-11.4-34.38,0-55.74,21.23-55.74,55.41v209.86h30.22v-137.04h56.24l.08-6.77c.07-6.54-.62-15.13-4.35-18.9-1.61-1.63-3.71-2.52-5.93-2.52h-46.04v-43.28c0-19.49,8.33-28.56,26.2-28.56,8.94,0,17.01,2.84,22.72,8.01l6.1,5.52,4.32-7.01c6.85-11.12,8.09-18.62,3.77-22.95l-.42-.38Z" />
      {/* o (large) */}
      <path fill={c} d="M1087.44,235.16c-15.94-8.97-24.37-25.41-24.37-47.55,0-.11-.09-10.85-.09-11.02,0-54.66-40.65-94.33-96.66-94.33s-96.66,39.67-96.66,94.33c0,54.66,40.65,94.33,96.66,94.33,16.37,0,31.57-3.31,45.16-9.83,13.45-6.45,24.69-15.73,33.41-27.59,8.7,13.7,21.94,24.32,38.3,30.73l5.89,2.31,2.5-18.75c1.06-9.53-3.93-12.5-4.15-12.62ZM966.32,242.7c-38.69,0-65.72-27.18-65.72-66.11s27.02-66.11,65.72-66.11,65.72,27.18,65.72,66.11-27.02,66.11-65.72,66.11Z" />
      {/* r (large) */}
      <path fill={c} d="M1277.07,76.13c-3.06-.41-6.24-.61-9.46-.61-19.81,0-40.34,7.62-54.92,20.38-16.75,14.67-25.6,35.27-25.6,59.58v109.79h30.79v-105.9c0-34.5,19.81-54.28,54.36-54.28,5.65,0,7.1-4.46,9.88-22.19l.93-5.97-5.99-.8Z" />
    </svg>
  );
}

function FloorCard({
  floor,
  title,
  description,
  image,
  link,
  accentColor,
}: {
  floor: string;
  title: string;
  description: string;
  image: string;
  link: string;
  accentColor: string;
}) {
  return (
    <div className="relative overflow-hidden group">
      <Link to={link} className="block">
        <div className="relative overflow-hidden" style={{ height: "clamp(420px, 55vw, 794px)" }}>
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-500" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8">
            <span className="font-['Montserrat'] tracking-[4px] md:tracking-[6px] mb-3" style={{ fontSize: "clamp(14px, 2vw, 21px)" }}>
              {floor}
            </span>
            <h3 className="font-['Montserrat'] tracking-[6px] md:tracking-[12px] mb-6" style={{ fontSize: "clamp(22px, 3.5vw, 36px)" }}>
              {title}
            </h3>
            <p
              className="tracking-[2px] leading-[32px] max-w-[280px] transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100"
              style={{ fontSize: "16px" }}
            >
              {description}
            </p>
            <p
              className="font-['Montserrat'] tracking-[0.7px] mt-10 transition-all duration-500 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 uppercase"
              style={{ fontSize: "14px" }}
            >
              More →
            </p>
          </div>
        </div>
        <div className={`${accentColor} w-full`} style={{ height: "19px" }} />
      </Link>
    </div>
  );
}

function ReserveStep({ number, lines }: { number: string; lines: string[] }) {
  return (
    <div className="flex gap-6 md:gap-14 items-center">
      <span
        className="font-['Montserrat'] font-medium tracking-[4px] md:tracking-[7px] shrink-0"
        style={{ fontSize: "clamp(14px, 2.5vw, 26px)", color: "#4f6a7b" }}
      >
        {number}
      </span>
      <div className="w-px h-[77px] bg-black shrink-0 hidden md:block" />
      <div className="text-[#4f6a7b] tracking-[2px] text-xs md:text-base">
        {lines.map((line, i) => (
          <p key={i} className="leading-[32px]">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function PriceRow({ name, steel, movie }: { name: string; steel: string; movie: string }) {
  return (
    <tr>
      <td
        className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] tracking-[3px] md:tracking-[6px] font-['Montserrat'] text-center text-sm md:text-base"
      >
        {name}
      </td>
      <td className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] tracking-[1px] md:tracking-[3px] text-center font-['Montserrat'] text-sm md:text-base">
        {steel}
      </td>
      <td className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] tracking-[1px] md:tracking-[3px] text-center font-['Montserrat'] text-sm md:text-base">
        {movie}
      </td>
    </tr>
  );
}
