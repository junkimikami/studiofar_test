import { Link } from "react-router";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "../components/Reveal";

export function Contact() {
  return (
    <div className="w-full">
      {/* Accent line */}
      <div className="h-[10px] w-full bg-[#AAC7D9]" />

      {/* Title */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          <Reveal variant="clip">
            <h1
              className="font-['Montserrat'] tracking-[6px] md:tracking-[16px] text-[#4F6A7B]"
              style={{ fontSize: "clamp(22px, 5vw, 36px)" }}
            >
              CONTACT
            </h1>
          </Reveal>
          <Reveal variant="blur" delay={200}>
            <div className="text-[#4f6a7b] tracking-[2px] leading-loose text-sm">
              <p>お気軽にお問い合わせください。</p>
              <p>ご予約はRESERVEページのフォームよりお申し込みください。</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-16 px-4 pb-32">
        <div className="max-w-[680px] mx-auto space-y-10">

          {/* Address */}
          <Reveal variant="blur" delay={0}>
          <div className="flex gap-6 items-start border-b border-[#4F6A7B]/15 pb-10">
            <MapPin size={18} className="text-[#4F6A7B] shrink-0 mt-1" />
            <div className="space-y-1 text-[#4f6a7b]">
              <p className="font-['Montserrat'] tracking-[2px] text-sm font-medium">ADDRESS</p>
              <p className="tracking-[1px] leading-loose text-sm">
                studio far（スタジオファー）
              </p>
              <p className="tracking-[1px] text-sm">
                〒154-0002 東京都世田谷区下馬１丁目５−１
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=東京都世田谷区下馬1丁目5-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-[#4F6A7B] underline underline-offset-4 hover:opacity-60 transition-opacity tracking-[1px]"
                style={{ fontSize: "12px" }}
              >
                Google マップで見る →
              </a>
            </div>
          </div>
          </Reveal>

          {/* Phone */}
          <Reveal variant="blur" delay={100}>
          <div className="flex gap-6 items-start border-b border-[#4F6A7B]/15 pb-10">
            <Phone size={18} className="text-[#4F6A7B] shrink-0 mt-1" />
            <div className="space-y-1 text-[#4f6a7b]">
              <p className="font-['Montserrat'] tracking-[2px] text-sm font-medium">PHONE</p>
              <a
                href="tel:09065411338"
                className="font-['Montserrat'] tracking-[3px] hover:opacity-60 transition-opacity"
                style={{ fontSize: "clamp(16px, 3vw, 22px)" }}
              >
                090-6541-1338
              </a>
              <p className="tracking-[1px] text-sm opacity-70">（代表）</p>
            </div>
          </div>
          </Reveal>

          {/* Instagram */}
          <Reveal variant="blur" delay={200}>
          <div className="flex gap-6 items-start border-b border-[#4F6A7B]/15 pb-10">
            <Instagram size={18} className="text-[#4F6A7B] shrink-0 mt-1" />
            <div className="space-y-1 text-[#4f6a7b]">
              <p className="font-['Montserrat'] tracking-[2px] text-sm font-medium">INSTAGRAM</p>
              <a
                href="https://www.instagram.com/studio_far.official"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Montserrat'] tracking-[2px] text-sm hover:opacity-60 transition-opacity underline underline-offset-4"
              >
                @studio_far.official
              </a>
            </div>
          </div>
          </Reveal>

          {/* Reserve CTA */}
          <Reveal variant="blur" delay={300}>
          <div className="flex gap-6 items-start">
            <Mail size={18} className="text-[#4F6A7B] shrink-0 mt-1" />
            <div className="space-y-3 text-[#4f6a7b]">
              <p className="font-['Montserrat'] tracking-[2px] text-sm font-medium">RESERVATION</p>
              <p className="tracking-[1px] leading-loose text-sm">
                ご予約・お問い合わせはRESERVEページのフォームよりお願いいたします。
              </p>
              <Link
                to="/reserve"
                className="inline-block border border-[#4F6A7B] text-[#4F6A7B] px-8 py-3 font-['Montserrat'] tracking-[3px] hover:bg-[#4F6A7B] hover:text-white transition-all"
                style={{ fontSize: "13px" }}
              >
                RESERVE FORM →
              </Link>
            </div>
          </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
}
