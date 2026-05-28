export function PrivacyPolicy() {
  const sections = [
    {
      title: "1. 個人情報の収集について",
      body: "当スタジオ（studio far）は、ご予約・お問い合わせの際に、お名前、メールアドレス、電話番号、ご住所などの個人情報をご提供いただく場合があります。これらの情報は、ご予約の確認・管理、お問い合わせへの回答、および必要な連絡を行うためにのみ使用します。",
    },
    {
      title: "2. 個人情報の利用目的",
      body: "収集した個人情報は、以下の目的で利用します。\n・スタジオのご予約受付および管理\n・お問い合わせへの対応\n・ご請求書の発行など予約に付随する業務\n・重要なお知らせやサービス変更のご案内",
    },
    {
      title: "3. 個人情報の第三者提供について",
      body: "当スタジオは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。",
    },
    {
      title: "4. 個人情報の管理・安全対策",
      body: "当スタジオは、個人情報の漏洩・紛失・破壊などのリスクに対して適切な安全対策を講じます。個人情報へのアクセスは、必要な業務を行う担当者に限定します。",
    },
    {
      title: "5. 個人情報の開示・訂正・削除",
      body: "お客様ご自身の個人情報について、開示・訂正・削除のご要望がある場合は、下記の連絡先までお問い合わせください。ご本人確認のうえ、合理的な期間内に対応いたします。",
    },
    {
      title: "6. Cookieの使用について",
      body: "当ウェブサイトでは、サービス向上のためCookieを使用することがあります。Cookieはブラウザの設定により無効にすることができますが、一部のサービスが正しく動作しない場合があります。",
    },
    {
      title: "7. プライバシーポリシーの変更",
      body: "本プライバシーポリシーは、法令の改正やサービス内容の変更に伴い、予告なく変更する場合があります。変更後のポリシーは、当ウェブサイトに掲載した時点で効力を生じるものとします。",
    },
    {
      title: "8. お問い合わせ",
      body: "個人情報の取り扱いに関するお問い合わせは、以下の連絡先までお願いいたします。\n\nstudio far（スタジオファー）\n〒154-0002 東京都世田谷区下馬１丁目５−１\nTEL: 090-6541-1338",
    },
  ];

  return (
    <div className="w-full">
      {/* Accent line */}
      <div className="h-[10px] w-full bg-[#AAC7D9]" />

      {/* Title */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          <h1
            className="font-['Montserrat'] tracking-[6px] md:tracking-[16px] text-[#4F6A7B]"
            style={{ fontSize: "clamp(22px, 5vw, 36px)" }}
          >
            PRIVACY POLICY
          </h1>
          <div className="text-[#4f6a7b] tracking-[2px] leading-loose text-sm">
            <p>studio farは、お客様の個人情報保護を重要と考え、</p>
            <p>以下のプライバシーポリシーに基づいて取り扱います。</p>
          </div>
        </div>
      </section>

      {/* Policy sections */}
      <section className="pb-32 px-4">
        <div className="max-w-[760px] mx-auto space-y-12">

          {/* Last updated */}
          <p className="text-right text-[#4f6a7b] tracking-[1px] opacity-60" style={{ fontSize: "12px" }}>
            制定日：2026年1月1日
          </p>

          {sections.map((section) => (
            <div key={section.title} className="space-y-4 border-b border-[#4F6A7B]/15 pb-10 last:border-0">
              <h2
                className="text-[#4F6A7B] tracking-[1px] font-medium"
                style={{ fontSize: "clamp(13px, 1.8vw, 15px)" }}
              >
                {section.title}
              </h2>
              <p
                className="text-[#4f6a7b] tracking-[1px] leading-loose whitespace-pre-line"
                style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
              >
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
