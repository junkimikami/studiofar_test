import { useForm } from "react-hook-form";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";

import mainImg from "../../imports/Reserve-1/b324b89e81180dfc7d885e1e9c18113956f68833.png";

const timeOptions = Array.from({ length: 19 }, (_, i) => {
  const hour = i + 6;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export function Reserve() {
  const { register, handleSubmit, reset, watch } = useForm();

  const agreements = watch(["agree_guide", "agree_no_staff", "agree_time", "agree_privacy"]);
  const allAgreed = Array.isArray(agreements) && agreements.every(Boolean);

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "5d6f30d8-6043-44c9-8554-fdaa23e34340",
          subject: "【Studio Far】予約フォームからのお問い合わせ",
          ...data,
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("予約申し込みを受け付けました。担当者からの連絡をお待ちください。");
        reset();
      } else {
        toast.error("送信に失敗しました。もう一度お試しください。");
      }
    } catch {
      toast.error("送信に失敗しました。もう一度お試しください。");
    }
  };

  const steps = [
    {
      number: "STEP-01",
      lines: ["メールにて空室状況をご確認ください。", "お急ぎの場合はお電話にてお問い合わせください。"],
    },
    {
      number: "STEP-02",
      lines: ["スタジオ担当者と予約日時の確定を行ってください。"],
    },
    {
      number: "STEP-03",
      lines: [
        "確定後、以下のお申し込みフォームに必要事項を記入てください。",
        "予約確定メールをお送りしますので、ご確認ください。",
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Accent line */}
      <div className="h-[10px] w-full bg-[#AAC7D9]" />

      {/* Hero image */}
      <section className="relative w-full" style={{ height: "462px" }}>
        <ImageWithFallback src={mainImg} alt="Reserve" className="w-full h-full object-cover" />
      </section>

      {/* Title */}
      <section className="pt-24 pb-12 px-4 text-center">
        <h1
          className="font-['Montserrat'] tracking-[10px] text-[#4F6A7B] mb-3"
          style={{ fontSize: "40px" }}
        >
          RESERVE
        </h1>
        <p className="text-[#4f6a7b] tracking-[2px] leading-[32px]" style={{ fontSize: "16px" }}>
          必ずガイドページをご確認いただき、ご予約へとお進みください。
        </p>
      </section>

      {/* Steps */}
      <section className="pb-24 px-4">
        <div className="max-w-[1230px] mx-auto">
          <div className="border-t border-[#548EB3]/40" />
          <div className="py-16 space-y-11 max-w-[793px] mx-auto">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-14 items-center">
                <span
                  className="font-['Montserrat'] font-medium tracking-[7px] shrink-0 text-[#4f6a7b]"
                  style={{ fontSize: "26px" }}
                >
                  {step.number}
                </span>
                <div className="w-px h-[77px] bg-black shrink-0 hidden md:block" />
                <div className="text-[#4f6a7b] tracking-[2px]" style={{ fontSize: "16px" }}>
                  {step.lines.map((line, i) => (
                    <p key={i} className="leading-[32px]">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#548EB3]/40" />
        </div>
      </section>

      {/* FORM section */}
      <section className="pb-32 px-4">
        <div className="max-w-[1230px] mx-auto">
          <h2
            className="font-['Montserrat'] tracking-[10px] text-[#4F6A7B] text-center mb-16"
            style={{ fontSize: "40px" }}
          >
            FORM
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-[660px] mx-auto space-y-10">

            {/* ご担当者氏名：漢字 */}
            <FormField label="ご担当者氏名：漢字">
              <input
                {...register("name_kanji")}
                required
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご担当者氏名：カナ */}
            <FormField label="ご担当者氏名：カナ">
              <input
                {...register("name_kana")}
                required
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* 会社名/組織名 */}
            <FormField label="会社名/組織名">
              <input
                {...register("company")}
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* 電話番号 */}
            <FormField label="電話番号">
              <input
                {...register("tel")}
                type="tel"
                required
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* メールアドレス */}
            <FormField label="メールアドレス">
              <input
                {...register("email")}
                type="email"
                required
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご希望日 */}
            <FormField label="ご希望日">
              <input
                {...register("date")}
                type="date"
                required
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご利用開始時間 */}
            <FormField label="ご利用開始時間" note="搬入を含む入室時間がご利用開始時刻となります">
              <select
                {...register("start_time")}
                required
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              >
                <option value="">選択してください</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </FormField>

            {/* ご利用終了時刻 */}
            <FormField label="ご利用終了時刻" note="搬出を含む退室時間がご利用終了時刻となります">
              <select
                {...register("end_time")}
                required
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              >
                <option value="">選択してください</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </FormField>

            {/* 利用目的 */}
            <FormField label="利用目的">
              <div className="grid grid-cols-2 gap-4">
                {["スチール撮影", "ムービー撮影", "イベント", "展示会", "その他"].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "16px" }}>
                    <input type="checkbox" {...register("purpose")} value={item} className="w-4 h-4 accent-[#4F6A7B]" />
                    {item}
                  </label>
                ))}
              </div>
            </FormField>

            {/* 使用予定フロア */}
            <FormField label="使用予定フロア">
              <div className="grid grid-cols-2 gap-4">
                {["RADIANCE (1F)", "AIR (2F)", "1棟貸し"].map((floor) => (
                  <label key={floor} className="flex items-center gap-3 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "16px" }}>
                    <input type="checkbox" {...register("floors")} value={floor} className="w-4 h-4 accent-[#4F6A7B]" />
                    {floor}
                  </label>
                ))}
              </div>
              <p className="mt-3 tracking-[1px]" style={{ fontSize: "14px", color: "#f97f7f" }}>
                ※floor3は1棟貸しでのみレンタル可能です
              </p>
            </FormField>

            {/* 媒体名 / クライアント名 */}
            <FormField label="媒体名 / クライアント名">
              <input
                {...register("client_name")}
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* 撮影内容詳細 */}
            <FormField label="撮影内容詳細">
              <textarea
                {...register("details")}
                rows={4}
                className="w-full bg-[#F1F7FA] p-4 text-[#4f6a7b] outline-none resize-none tracking-[1px] leading-relaxed"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* 機材確認 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <RadioField label="ストロボ使用有無" name="strobe" register={register} />
              <RadioField label="大型機材搬入有無" name="large_equipment" register={register} />
              <RadioField label="音出し有無" name="sound" register={register} />
              <RadioField label="ケータリング有無" name="catering" register={register} />
            </div>

            {/* オプション */}
            <FormField label="オプション">
              <div className="space-y-3">
                {["ロケハン希望", "事前搬入希望", "領収書希望"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "16px" }}>
                    <input type="checkbox" {...register("options")} value={opt} className="w-4 h-4 accent-[#4F6A7B]" />
                    {opt}
                  </label>
                ))}
              </div>
            </FormField>

            {/* スタッフ総人数 */}
            <FormField label="スタッフ総人数">
              <input
                {...register("staff_count")}
                type="number"
                min="1"
                required
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* フォトグラファー・ビデオグラファー名 */}
            <FormField label="フォトグラファー・ビデオグラファー名">
              <input
                {...register("photographer")}
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* スタイリスト名 */}
            <FormField label="スタイリスト名">
              <input
                {...register("stylist")}
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ヘアメイク名 */}
            <FormField label="ヘアメイク名">
              <input
                {...register("hair_makeup")}
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* モデル名 */}
            <FormField label="モデル名">
              <input
                {...register("model")}
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご請求先会社名・担当者氏名 */}
            <FormField label="ご請求先会社名・担当者氏名">
              <input
                {...register("billing_name")}
                required
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご請求先郵便番号 */}
            <FormField label="ご請求先郵便番号" note="例: 1600023（半角）">
              <input
                {...register("billing_zip")}
                required
                placeholder="1600023"
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px] placeholder:text-[#4f6a7b]/40"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご請求先住所 */}
            <FormField label="ご請求先住所" note="例: 新宿区西新宿7丁目22-42　○○マンション 5F">
              <input
                {...register("billing_address")}
                required
                placeholder="新宿区西新宿7丁目22-42　○○マンション 5F"
                className="w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px] placeholder:text-[#4f6a7b]/40"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* 備考欄 */}
            <FormField label="備考欄（自由記入）">
              <textarea
                {...register("remarks")}
                rows={6}
                className="w-full bg-[#F1F7FA] p-4 text-[#4f6a7b] outline-none resize-none tracking-[1px] leading-relaxed"
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* 同意事項 */}
            <div className="space-y-4 pt-4 border-t border-[#548EB3]/40">
              <p className="font-['Montserrat'] font-medium tracking-[2px] text-[#4f6a7b]" style={{ fontSize: "14px" }}>
                同意事項（すべてにチェックが必要です）
              </p>
              <label className="flex items-start gap-3 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "13px" }}>
                <input type="checkbox" {...register("agree_guide")} className="w-4 h-4 mt-0.5 shrink-0 accent-[#4F6A7B]" />
                <span>GUIDEページを確認しました。</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "13px" }}>
                <input type="checkbox" {...register("agree_no_staff")} className="w-4 h-4 mt-0.5 shrink-0 accent-[#4F6A7B]" />
                <span>スタジオアシスタントはおりません。撮影の補助等は行えませんのでご了承ください。</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "13px" }}>
                <input type="checkbox" {...register("agree_time")} className="w-4 h-4 mt-0.5 shrink-0 accent-[#4F6A7B]" />
                <span>利用時間は、入室時間から退室時間（搬入から搬出まで）を含む時間です。ご予約時間より変更される場合は事前にご連絡ください。</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "13px" }}>
                <input type="checkbox" {...register("agree_privacy")} className="w-4 h-4 mt-0.5 shrink-0 accent-[#4F6A7B]" />
                <span>入力いただいた個人情報は、studio farからのご連絡およびスタジオご利用に関する対応の目的にのみ使用し、その他の目的での利用や、関係者以外の第三者へ提供することは一切ございません。また、個人情報に関する開示・訂正・削除等をご希望の場合は <a href="mailto:info@studio-far.com" className="underline">info@studio-far.com</a> までご連絡ください。</span>
              </label>
            </div>

            <div className="pt-8 flex justify-center">
              <button
                type="submit"
                disabled={!allAgreed}
                className={`text-white py-5 px-16 uppercase font-['Montserrat'] tracking-[4px] transition-all ${allAgreed ? "bg-[#4F6A7B] hover:opacity-90 cursor-pointer" : "bg-[#4F6A7B]/40 cursor-not-allowed"}`}
                style={{ fontSize: "14px", width: "100%", maxWidth: "400px" }}
              >
                Confirm & Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function FormField({ label, children, note }: { label: string; children: React.ReactNode; note?: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#4f6a7b] shrink-0" />
        <label className="font-['Montserrat'] font-medium tracking-[3px] text-[#4f6a7b]" style={{ fontSize: "16px" }}>
          {label}
        </label>
      </div>
      {note && (
        <p className="text-[#f97f7f] tracking-[1px]" style={{ fontSize: "13px" }}>{note}</p>
      )}
      {children}
    </div>
  );
}

function RadioField({
  label,
  name,
  register,
}: {
  label: string;
  name: string;
  register: any;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#4f6a7b] shrink-0" />
        <label className="font-['Montserrat'] font-medium tracking-[3px] text-[#4f6a7b]" style={{ fontSize: "16px" }}>
          {label}
        </label>
      </div>
      <div className="flex gap-8">
        {["有", "無"].map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "16px" }}>
            <input type="radio" {...register(name)} value={opt} className="w-4 h-4 accent-[#4F6A7B]" />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
