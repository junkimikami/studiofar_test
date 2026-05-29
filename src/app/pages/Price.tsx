import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";

import mainImg from "../../imports/Price-1/bf0047675c4396cf2ad494b13132747b677bbe8d.png";

export function Price() {
  const notes = [
    "料金は税込価格です。",
    "ご予約された時間分がご請求金額となります。",
    "土・日・祝日は上記金額より20%割増となります。",
    "ご利用は入室から退出までとさせて頂きます。",
    "予約時間は1時間単位の請求となります。",
    "延長は30分単位の請求となります。",
    "展示会スペース貸し料金はご相談下さい。",
    "決定後のキャンセルはキャンセル料が発生致します。",
    "スチール利用のカメラマン様2名以上が同時刻に撮影利用させる場合、別途料金が発生いたします。",
    "1名増えるごとに¥10,000/1DAY（スマートフォン・タブレット等での撮影の場合、料金はかかりません）",
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
            <p>スタジオご利用にあたっての利用規約や注意事項をまとめています。</p>
            <p>必ずお読みください。</p>
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="py-16 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-[#4F6A7B] bg-white">
              <thead>
                <tr>
                  <th
                    className="border border-[#4F6A7B] p-3 md:p-6 font-normal text-[#4f6a7b] tracking-[2px] font-['Montserrat'] text-sm"
                  >
                    1h あたり (4h〜)
                  </th>
                  <th
                    className="border border-[#4F6A7B] p-3 md:p-6 font-normal text-[#4f6a7b] tracking-[2px] bg-[#C9E1E3] text-sm"
                  >
                    スチール撮影
                  </th>
                  <th
                    className="border border-[#4F6A7B] p-3 md:p-6 font-normal text-[#4f6a7b] tracking-[2px] bg-[#F6CFCF] text-sm"
                  >
                    ムービー撮影利用
                  </th>
                </tr>
              </thead>
              <tbody>
                <PriceRow name="1st floor" steel="18,000" movie="22,000" />
                <PriceRow name="2nd floor" steel="18,000" movie="22,000" />
                <tr>
                  <td
                    className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] text-center font-['Montserrat'] text-sm"
                  >
                    <span className="block tracking-[3px]">3rd floor</span>
                    <span className="block tracking-[2px] opacity-70" style={{ fontSize: "12px" }}>MAKE ROOM</span>
                  </td>
                  <td
                    colSpan={2}
                    className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] text-center tracking-[1px] text-sm"
                  >
                    現在、3rd floorのみの貸し出しは行っておりません
                  </td>
                </tr>
                <PriceRow name="ALL floor" steel="28,000" movie="32,000" />
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Cancel policy box */}
      <section className="py-8 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="border border-[#f97f7f] p-8 text-[#f97f7f] tracking-[1px] leading-loose text-center text-sm">
            <p>キャンセル料：当日・前日 100%、2〜3日前 80%、4〜5日前 60%、6日前 40%</p>
            <p>最低利用時間は4時間からとなります。</p>
          </div>

        </div>
      </section>

      {/* Notes list */}
      <section className="py-16 px-4 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <ul className="list-disc space-y-2 text-[#4f6a7b] tracking-[1px] leading-relaxed ml-6 text-sm">
            {notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function PriceRow({ name, steel, movie }: { name: string; steel: string; movie: string }) {
  return (
    <tr>
      <td
        className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] tracking-[3px] font-['Montserrat'] text-center text-sm"
      >
        {name}
      </td>
      <td
        className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] tracking-[2px] text-center font-['Montserrat'] text-sm"
      >
        ¥{steel}
      </td>
      <td
        className="border border-[#4F6A7B] p-3 md:p-6 text-[#4f6a7b] tracking-[2px] text-center font-['Montserrat'] text-sm"
      >
        ¥{movie}
      </td>
    </tr>
  );
}
