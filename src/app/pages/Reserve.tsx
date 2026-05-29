import { useForm } from "react-hook-form";
import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";

import mainImg from "../../imports/Reserve-1/b324b89e81180dfc7d885e1e9c18113956f68833.png";

const timeOptions = Array.from({ length: 19 }, (_, i) => {
  const hour = i + 6;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export function Reserve() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [zipLoading, setZipLoading] = useState(false);
  const [zipFetched, setZipFetched] = useState(false);
  const [zipFetchError, setZipFetchError] = useState("");

  const agreements = watch(["agree_guide", "agree_no_staff", "agree_time", "agree_privacy"]);
  const allAgreed = Array.isArray(agreements) && agreements.every(Boolean);

  const fetchAddress = async (zip: string) => {
    const cleaned = zip.replace(/-/g, "");
    if (cleaned.length !== 7) {
      setZipFetched(false);
      setZipFetchError("");
      return;
    }
    setZipLoading(true);
    setZipFetched(false);
    setZipFetchError("");
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleaned}`);
      const data = await res.json();
      if (data.results) {
        const r = data.results[0];
        const address = `${r.address1}${r.address2}${r.address3}`;
        setValue("billing_address", address, { shouldValidate: true });
        setZipFetched(true);
      } else {
        setZipFetchError("住所が見つかりませんでした。郵便番号をご確認ください。");
      }
    } catch {
      setZipFetchError("住所の取得に失敗しました。手動で入力してください。");
    } finally {
      setZipLoading(false);
    }
  };

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
        setZipFetched(false);
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

  const inputClass = "w-full bg-[#F1F7FA] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px]";
  const inputErrorClass = "w-full bg-[#fff0f0] h-[54px] px-4 text-[#4f6a7b] outline-none tracking-[1px] border border-[#f97f7f]";

  return (
    <div className="w-full">
      {/* Accent line */}
      <div className="h-[10px] w-full bg-[#AAC7D9]" />

      {/* Hero image */}
      <section className="relative h-[40vh] min-h-[300px] w-full">
        <ImageWithFallback src={mainImg} alt="Reserve" className="w-full h-full object-cover" />
      </section>

      {/* Title */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          <h1
            className="font-['Montserrat'] tracking-[6px] md:tracking-[16px] text-[#4F6A7B]"
            style={{ fontSize: "clamp(22px, 5vw, 36px)" }}
          >
            RESERVE
          </h1>
          <p className="text-sm text-[#4f6a7b] tracking-[2px] leading-loose">
            必ずガイドページをご確認いただき、ご予約へとお進みください。
          </p>
        </div>
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
                <div className="text-sm text-[#4f6a7b] tracking-[2px]">
                  {step.lines.map((line, i) => (
                    <p key={i} className="leading-relaxed">{line}</p>
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
            className="font-['Montserrat'] tracking-[6px] md:tracking-[16px] text-[#4F6A7B] text-center mb-16"
            style={{ fontSize: "clamp(18px, 4vw, 30px)" }}
          >
            FORM
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-[660px] mx-auto space-y-10">

            {/* ご担当者氏名：漢字 */}
            <FormField label="ご担当者氏名：漢字" error={errors.name_kanji?.message as string}>
              <input
                {...register("name_kanji", { required: "氏名（漢字）を入力してください" })}
                className={errors.name_kanji ? inputErrorClass : inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご担当者氏名：カナ */}
            <FormField label="ご担当者氏名：カナ" error={errors.name_kana?.message as string}>
              <input
                {...register("name_kana", { required: "氏名（カナ）を入力してください" })}
                className={errors.name_kana ? inputErrorClass : inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* 会社名/組織名 */}
            <FormField label="会社名/組織名">
              <input
                {...register("company")}
                className={inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* 電話番号 */}
            <FormField label="電話番号" error={errors.tel?.message as string}>
              <input
                {...register("tel", {
                  required: "電話番号を入力してください",
                  pattern: { value: /^[0-9\-+() ]{10,15}$/, message: "正しい電話番号を入力してください" },
                })}
                type="tel"
                className={errors.tel ? inputErrorClass : inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* メールアドレス */}
            <FormField label="メールアドレス" error={errors.email?.message as string}>
              <input
                {...register("email", {
                  required: "メールアドレスを入力してください",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "正しいメールアドレスを入力してください" },
                })}
                type="email"
                className={errors.email ? inputErrorClass : inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご希望日 */}
            <FormField label="ご希望日" error={errors.date?.message as string}>
              <input
                {...register("date", { required: "ご希望日を選択してください" })}
                type="date"
                className={errors.date ? inputErrorClass : inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご利用開始時間 */}
            <FormField label="ご利用開始時間" note="搬入を含む入室時間がご利用開始時刻となります" error={errors.start_time?.message as string}>
              <select
                {...register("start_time", { required: "開始時間を選択してください" })}
                className={errors.start_time ? inputErrorClass : inputClass}
                style={{ fontSize: "16px" }}
              >
                <option value="">選択してください</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </FormField>

            {/* ご利用終了時刻 */}
            <FormField label="ご利用終了時刻" note="搬出を含む退室時間がご利用終了時刻となります" error={errors.end_time?.message as string}>
              <select
                {...register("end_time", { required: "終了時間を選択してください" })}
                className={errors.end_time ? inputErrorClass : inputClass}
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
                  <label key={item} className="flex items-center gap-3 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "14px" }}>
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
                  <label key={floor} className="flex items-center gap-3 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "14px" }}>
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
                className={inputClass}
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

            {/* スタッフ総人数 */}
            <FormField label="スタッフ総人数" error={errors.staff_count?.message as string}>
              <input
                {...register("staff_count", { required: "スタッフ人数を入力してください", min: { value: 1, message: "1名以上を入力してください" } })}
                type="number"
                min="1"
                className={errors.staff_count ? inputErrorClass : inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* フォトグラファー・ビデオグラファー名 */}
            <FormField label="フォトグラファー・ビデオグラファー名">
              <input
                {...register("photographer")}
                className={inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* スタイリスト名 */}
            <FormField label="スタイリスト名">
              <input
                {...register("stylist")}
                className={inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ヘアメイク名 */}
            <FormField label="ヘアメイク名">
              <input
                {...register("hair_makeup")}
                className={inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* モデル名 */}
            <FormField label="モデル名">
              <input
                {...register("model")}
                className={inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご請求先会社名・担当者氏名 */}
            <FormField label="ご請求先会社名・担当者氏名" error={errors.billing_name?.message as string}>
              <input
                {...register("billing_name", { required: "請求先の会社名または担当者氏名を入力してください" })}
                className={errors.billing_name ? inputErrorClass : inputClass}
                style={{ fontSize: "16px" }}
              />
            </FormField>

            {/* ご請求先郵便番号 */}
            <FormField label="ご請求先郵便番号" note="例: 1600023（ハイフンなし・半角7桁）" error={errors.billing_zip?.message as string || zipFetchError}>
              <div className="flex gap-2">
                <input
                  {...register("billing_zip", {
                    required: "郵便番号を入力してください",
                    pattern: { value: /^\d{7}$/, message: "ハイフンなしの7桁で入力してください" },
                  })}
                  placeholder="1600023"
                  maxLength={7}
                  className={`flex-1 ${errors.billing_zip || zipFetchError ? inputErrorClass : inputClass} placeholder:text-[#4f6a7b]/40`}
                  style={{ fontSize: "16px" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const zip = (document.querySelector('input[name="billing_zip"]') as HTMLInputElement)?.value;
                    fetchAddress(zip);
                  }}
                  disabled={zipLoading}
                  className="shrink-0 bg-[#4F6A7B] text-white px-4 h-[54px] tracking-[1px] hover:opacity-80 transition-opacity disabled:opacity-50"
                  style={{ fontSize: "13px", minWidth: "100px" }}
                >
                  {zipLoading ? "検索中…" : "住所を検索"}
                </button>
              </div>
              {zipFetched && !zipLoading && (
                <p className="text-[#5a9e7a] tracking-[0.5px]" style={{ fontSize: "12px" }}>✓ 住所を取得しました</p>
              )}
            </FormField>

            {/* ご請求先住所 */}
            <FormField label="ご請求先住所" note="番地・建物名・部屋番号まで入力してください" error={errors.billing_address?.message as string}>
              <input
                {...register("billing_address", { required: "住所を入力してください" })}
                placeholder="新宿区西新宿7丁目22-42　○○マンション 5F"
                className={`${errors.billing_address ? inputErrorClass : inputClass} placeholder:text-[#4f6a7b]/40`}
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
                  <label key={opt} className="flex items-center gap-3 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "14px" }}>
                    <input type="checkbox" {...register("options")} value={opt} className="w-4 h-4 accent-[#4F6A7B]" />
                    {opt}
                  </label>
                ))}
              </div>
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
            <div className="border-2 border-[#4F6A7B] rounded-sm p-6 space-y-6 bg-[#F1F7FA]/60">
              <p className="font-['Montserrat'] font-semibold tracking-[2px] text-[#4f6a7b] border-b border-[#4F6A7B]/30 pb-4" style={{ fontSize: "15px" }}>
                同意事項（すべてにチェックが必要です）
              </p>
              <label className="flex items-start gap-4 cursor-pointer text-[#4f6a7b] leading-relaxed" style={{ fontSize: "15px" }}>
                <input type="checkbox" {...register("agree_guide")} className="w-5 h-5 mt-0.5 shrink-0 accent-[#4F6A7B]" />
                <span>
                  <Link to="/guide" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-70 transition-opacity font-medium">GUIDEページ</Link>を確認しました。
                </span>
              </label>
              <label className="flex items-start gap-4 cursor-pointer text-[#4f6a7b] leading-relaxed" style={{ fontSize: "15px" }}>
                <input type="checkbox" {...register("agree_no_staff")} className="w-5 h-5 mt-0.5 shrink-0 accent-[#4F6A7B]" />
                <span>スタジオアシスタントはおりません。撮影の補助等は行えませんのでご了承ください。</span>
              </label>
              <label className="flex items-start gap-4 cursor-pointer text-[#4f6a7b] leading-relaxed" style={{ fontSize: "15px" }}>
                <input type="checkbox" {...register("agree_time")} className="w-5 h-5 mt-0.5 shrink-0 accent-[#4F6A7B]" />
                <span>利用時間は、入室時間から退室時間（搬入から搬出まで）を含む時間です。ご予約時間より変更される場合は事前にご連絡ください。</span>
              </label>
              <label className="flex items-start gap-4 cursor-pointer text-[#4f6a7b] leading-relaxed" style={{ fontSize: "15px" }}>
                <input type="checkbox" {...register("agree_privacy")} className="w-5 h-5 mt-0.5 shrink-0 accent-[#4F6A7B]" />
                <span>入力いただいた個人情報は、studio farからのご連絡およびスタジオご利用に関する対応の目的にのみ使用し、その他の目的での利用や、関係者以外の第三者へ提供することは一切ございません。また、個人情報に関する開示・訂正・削除等をご希望の場合は <a href="mailto:info@studio-far.com" className="underline">info@studio-far.com</a> までご連絡ください。</span>
              </label>
            </div>

            <div className="pt-8 flex justify-center">
              <button
                type="submit"
                disabled={!allAgreed}
                className={`relative text-white uppercase font-['Montserrat'] tracking-[4px] transition-all active:scale-[0.98] ${allAgreed ? "bg-[#4F6A7B] hover:bg-[#3d5769] shadow-[0_4px_0_#2e4254] active:shadow-none active:translate-y-[4px] cursor-pointer" : "bg-[#4F6A7B]/40 cursor-not-allowed shadow-[0_4px_0_rgba(79,106,123,0.2)]"}`}
                style={{ fontSize: "14px", width: "100%", maxWidth: "400px", padding: "18px 32px" }}
              >
                <span className="flex items-center justify-center gap-3">
                  Confirm &amp; Send
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  children,
  note,
  error,
}: {
  label: string;
  children: ReactNode;
  note?: string;
  error?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#4f6a7b] shrink-0" />
        <label className="font-['Montserrat'] font-medium tracking-[2px] text-[#4f6a7b]" style={{ fontSize: "clamp(12px, 2vw, 14px)" }}>
          {label}
        </label>
      </div>
      {note && (
        <p className="text-[#f97f7f] tracking-[0.5px]" style={{ fontSize: "12px" }}>{note}</p>
      )}
      {children}
      {error && (
        <p className="text-[#f97f7f] tracking-[0.5px] flex items-center gap-1" style={{ fontSize: "12px" }}>
          <span>⚠</span> {error}
        </p>
      )}
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
        <label className="font-['Montserrat'] font-medium tracking-[2px] text-[#4f6a7b]" style={{ fontSize: "clamp(12px, 2vw, 14px)" }}>
          {label}
        </label>
      </div>
      <div className="flex gap-8">
        {["有", "無"].map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer text-[#4f6a7b] tracking-[1px]" style={{ fontSize: "14px" }}>
            <input type="radio" {...register(name)} value={opt} className="w-4 h-4 accent-[#4F6A7B]" />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
