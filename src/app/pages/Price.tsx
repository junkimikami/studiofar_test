import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";

import mainImg from "../../imports/Price-1/bf0047675c4396cf2ad494b13132747b677bbe8d.png";

export function Price() {
  const notes = [
    "ご予約された時間分がご請求金額となります。",
    "土・日・祝日は上記金額より20%割増となります。",
    "ご利用は入室から退出までとさせて頂きます。",
    "予約時間は1時間単位の請求となります。",
    "延長は30分単位の請求となります。",
    "展示会スペース貸し料金はご相談下さい。",
    "決定後のキャンセルはキャンセル料が発生致します。",
    "密着取材（ドキュメンタリー/YouTube）など、撮影利用と別の取材などが入る場合は事前にご連絡をお願いします。",
  ];

  return (
    <div className="w-full">
      {/* Accent line */}
      <div className="h-[10px] w-full bg-[#AAC7D9]" />

      {/* Hero image */}
      <section className="relative h-[40vh] min-h-[300px] w-full">
        <ImageWithFallback src={mainImg} alt="Price" className="w-full h-full object-cover" />
      </section>

      {/* Title */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          <h1
            className="font-['Montserrat'] tracking-[6px] md:tracking-[16px] text-[#4F6A7B]"
            style={{ fontSize: "clamp(22px, 5vw, 36px)" }}
          >
            PRICE
          </h1>
          <div className="text-[#4f6a7b] tracking-[2px] leading-loose text-sm">
            <p>オープン記念特別割引を実施中です。</p>
            <p>この機会にぜひご利用ください。</p>
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="py-8 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#4F6A7B] bg-white">
              {/* オープン記念特別価格 banner */}
              <thead>
                <tr>
                  <th
                    colSpan={3}
                    className="border border-[#4F6A7B] p-4 font-normal text-white tracking-[4px] text-sm"
                    style={{ background: "#F97F7F" }}
                  >
                    オープン記念特別価格
                  </th>
                </tr>
                <tr>
                  <th className="border border-[#4F6A7B] p-3 md:p-6 font-normal text-[#4f6a7b] tracking-[2px] font-['Montserrat'] text-sm">
                    1hあたり(4h〜)
                  </th>
                  <th className="border border-[#4F6A7B] p-3 md:p-6 font-normal text-[#4f6a7b] tracking-[2px] bg-[#C9E1E3] text-sm">
                    スチール撮影利用
                  </th>
                  <th className="border border-[#4F6A7B] p-3 md:p-6 font-normal text-[#4f6a7b] tracking-[2px] bg-[#E8DC8D] text-sm">
                    ムービー撮影利用
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* 1F + 2F */}
                <tr>
                  <td className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] text-center font-['Montserrat'] text-sm">
                    <span className="block tracking-[3px]">1st floor</span>
                    <span className="block tracking-[3px] opacity-60">+</span>
                    <span className="block tracking-[3px]">2nd floor</span>
                  </td>
                  <td className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] tracking-[1px] text-center text-sm">
                    19,800円(税込)
                  </td>
                  <td className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] tracking-[1px] text-center text-sm">
                    27,500円(税込)
                  </td>
                </tr>
                {/* 3F */}
                <tr>
                  <td className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] text-center font-['Montserrat'] tracking-[3px] text-sm">
                    3rd floor
                  </td>
                  <td
                    colSpan={2}
                    className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] text-center tracking-[1px] text-sm leading-relaxed"
                  >
                    1・2Fをご利用いただいた方のみ11,000円で貸し出しを行なっております
                  </td>
                </tr>
                {/* ALL */}
                <tr>
                  <td className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] text-center font-['Montserrat'] tracking-[3px] text-sm">
                    ALL floor
                  </td>
                  <td className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] tracking-[1px] text-center text-sm">
                    24,200円(税込)
                  </td>
                  <td className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] tracking-[1px] text-center text-sm">
                    33,500円(税込)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cancel policy box */}
      <section className="py-8 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="border border-[#f97f7f] p-8 text-[#f97f7f] tracking-[1px] leading-loose text-center text-sm space-y-1">
            <p>料金は税込価格です。</p>
            <p>キャンセル料：当日・前日 100%、2〜3日前 80%、4〜5日前 60%、6日前 40%</p>
            <p>最低利用時間は4時間からとなります。</p>
          </div>
        </div>
      </section>

      {/* Notes list */}
      <section className="py-12 px-4 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <ul className="space-y-3 text-[#4f6a7b] tracking-[1px] leading-relaxed text-sm">
            {notes.map((note, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0">・</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
