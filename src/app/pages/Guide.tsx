import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Figma Assets
import mainImg from "../../imports/Guide利用規約-1/ff78e042170dc8a15f1bf826b98fafd95fe5b76a.png";

export function Guide() {
  const [activeTab, setActiveTab] = useState("terms");

  const tabs = [
    { id: "terms", label: "利用規約" },
    { id: "prohibitions", label: "禁止事項" },
    { id: "loading", label: "事前搬入・ロケハン" },
    { id: "request", label: "お願い" },
  ];

  return (
    <div className="w-full">
      <div className="h-2 w-full bg-[#AAC7D9]" />
      <section className="relative h-[40vh] min-h-[300px] w-full">
        <ImageWithFallback src={mainImg} alt="Guide" className="w-full h-full object-cover" />
      </section>

      <section className="py-24 px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          <h1 className="font-['Montserrat'] tracking-[6px] md:tracking-[16px] text-[#4F6A7B]" style={{ fontSize: "clamp(22px, 5vw, 36px)" }}>GUIDE</h1>
          <div className="text-[#4F6A7B] tracking-[2px] leading-loose text-sm">
            <p>スタジオご利用にあたっての利用規約や注意事項をまとめています。</p>
            <p>必ずお読みください。</p>
          </div>

          {/* Tabs */}
          <div className="border-y border-[#548EB3]/30 flex flex-wrap justify-center overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-6 text-sm tracking-[2px] transition-colors min-w-max ${
                  activeTab === tab.id
                    ? "text-[#4F6A7B] font-medium"
                    : "text-[#BAC9D2] hover:text-[#4F6A7B]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="text-left max-w-4xl mx-auto py-12 text-[#4F6A7B] leading-[2.5] tracking-[1px] text-sm">
            {activeTab === "terms" && <TermsContent />}
            {activeTab === "prohibitions" && <ProhibitionsContent />}
            {activeTab === "loading" && <LoadingContent />}
            {activeTab === "request" && <RequestContent />}
          </div>
        </div>
      </section>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="space-y-6">
      <h3 className="font-bold border-b border-gray-100 pb-4">利用規約</h3>
      <ul className="space-y-1 list-none">
        <li>・スタジオアシスタントは常駐しておりません。</li>
        <li>・スタジオ基本利用時間は 8:00〜18:00 となります。</li>
        <li>　※時間外利用は事前にご相談ください。</li>
        <li>・ご利用時間は、入室から退室まで（搬入・搬出・原状復帰を含む）となります。</li>
        <li>・予約時間前の入室はできません。</li>
        <li>・予約時間を超過した場合は延長料金が発生いたします。</li>
        <li>　※後続予約により延長をお受けできない場合がございます。</li>
        <li>・撮影以外の用途（展示会、ポップアップ、イベント、パーティー等）は別途ご相談ください。</li>
        <li>　※内容により別途料金が発生する場合がございます。</li>
        <li>・スタジオ内の家具・小物はご自由にご利用いただけます。</li>
        <li>　※ご利用後は元の位置へお戻しください。</li>
        <li>　※都合により家具・植物・備品等の仕様が変更となる場合がございます。</li>
        <li>・壁、床、家具への釘打ち、ビス、強粘着テープ（ガムテープ等）の使用は禁止しております。</li>
        <li>・自然光は天候・季節・時間帯により変動いたします。</li>
        <li>　※これに伴う返金・補償はいたしかねます。</li>
        <li>・宅配便での荷物送付は、事前に受取可能日時をご確認ください。</li>
        <li>　※無断配送は受取できない場合がございます。</li>
        <li>・事前搬入、荷物預かりは事前申請制となります。</li>
        <li>・日没後のストロボ使用は完全遮光をお願いいたします。</li>
        <li>　※外部へ向けての発光は禁止しております。</li>
        <li>・ムービー撮影、同録、大人数での撮影、建て込み撮影は事前に詳細をご共有ください。</li>
        <li>・大音量での音楽再生、楽器演奏、大声での通話、振動を伴う行為はご遠慮ください。</li>
        <li>・共用部、スタジオ外での撮影・待機・談笑は禁止しております。</li>
        <li>・駐車場のご用意はございません。</li>
        <li>　※近隣コインパーキングをご利用ください。</li>
        <li>・ゴミは原則お持ち帰りをお願いいたします。</li>
        <li>　※ゴミ箱に入らないもの、大量のゴミは必ずお持ち帰りください。</li>
        <li>・お忘れ物、お預かり物は1ヶ月保管後、処分させていただきます。</li>
        <li>・スタジオ内は全面禁煙となります。</li>
        <li>・スタジオ内、家具、設備、床、壁等を破損・汚損された場合は、修繕費および営業補償をご請求させていただきます。</li>
        <li>・スタジオ内外で発生した事故、怪我、盗難、紛失、機材トラブル等につきまして、当スタジオでは責任を負いかねます。</li>
        <li>・貴重品、機材等は利用者様ご自身で管理をお願いいたします。</li>
        <li>・利用内容が申請内容と著しく異なる場合、または規約違反が認められた場合は、利用途中でも中止させていただく場合がございます。</li>
        <li>　※その際の返金はいたしかねます。</li>
      </ul>
    </div>
  );
}

function ProhibitionsContent() {
  return (
    <div className="space-y-6">
      <h3 className="font-bold border-b border-gray-100 pb-4">禁止事項</h3>
      <ul className="space-y-1 list-none">
        <li>・ヌード、アダルト撮影、公序良俗に反する内容でのご利用</li>
        <li>・火気、スモーク、煙、水、砂、塗料、オイル等を使用した撮影</li>
        <li>・危険物の持ち込み</li>
        <li>・大音量、振動を伴う行為</li>
        <li>・壁、床、天井、家具、貸し出し備品への加工・破損行為</li>
        <li>・無断での動物、ペットの持ち込み</li>
        <li>・スタジオ外、共用部での撮影および占有</li>
        <li>・近隣住民への迷惑行為（騒音、滞留、違法駐車等）</li>
        <li>・申請内容と異なる用途での利用</li>
      </ul>
      <p className="text-[#F97F7F] mt-8 pt-8 border-t border-gray-100 font-medium italic">
        これらの禁止行為が発覚した際には即時撤収の上、違約金をご請求致します。
      </p>
    </div>
  );
}

function LoadingContent() {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <h3 className="font-bold border-b border-gray-100 pb-4">事前搬入</h3>
        <ul className="space-y-1 list-none">
          <li>・予約時間外の搬入は事前にご相談ください。</li>
          <li>・スタジオスタッフ対応可能時間のみ受取可能となります。</li>
          <li>・事前連絡がない場合は受取できない場合がございます。</li>
          <li>・大型荷物、大量搬入の場合は事前に詳細をご共有ください。</li>
          <li>・お預かりした荷物の紛失、破損につきましては責任を負いかねます。</li>
        </ul>
      </div>
      <div className="space-y-6">
        <h3 className="font-bold border-b border-gray-100 pb-4">ロケハン</h3>
        <ul className="space-y-1 list-none">
          <li>・ロケハンは事前予約制となります。</li>
          <li>・原則30分程度でお願いいたします。</li>
          <li>・クライアント帯同、テスト撮影、長時間利用の場合は別途料金をお願いする場合がございます。</li>
          <li>・利用状況によりご希望日時に添えない場合がございます。</li>
        </ul>
      </div>
    </div>
  );
}

function RequestContent() {
  return (
    <div className="space-y-6">
      <h3 className="font-bold border-b border-gray-100 pb-4">お願い</h3>
      <ul className="space-y-1 list-none">
        <li>・studio farは住宅地に位置するハウススタジオです。近隣へのご配慮をお願いいたします。</li>
        <li>・日没後のストロボの使用は完全遮光でお願いします。（暗幕等の遮光用具は当スタジオにはございませんので、ご用意をお願いします。）</li>
        <li>・搬入出時の会話、屋外での滞留は最小限にお願いいたします。</li>
        <li>・スタジオ内は一部土足禁止となります。フロアマップをご確認ください。</li>
        <li>　※撮影用靴は靴裏を養生のうえご利用ください。</li>
        <li>・1Fフロアを撮影以外（パーティー・イベント等）でご利用の場合は、事前に清掃・ゴミ処理等の規定をご確認ください。</li>
        <li>・メイクルームは清潔にご利用ください。</li>
        <li>・家具、植物、小物は空間演出の一部ですので、丁寧にお取り扱いください。</li>
        <li>・水、薬剤、塗料、オイル等をご使用の場合は事前に必ずご相談ください。</li>
      </ul>
    </div>
  );
}
