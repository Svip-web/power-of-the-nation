"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";

type Language = "ua" | "en";

const githubPagesBasePath = "/power-of-the-nation";

function assetPath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  if (typeof window === "undefined") {
    return path;
  }

  const isGitHubPagesProject =
    window.location.pathname === githubPagesBasePath ||
    window.location.pathname.startsWith(`${githubPagesBasePath}/`);

  return isGitHubPagesProject ? `${githubPagesBasePath}${path}` : path;
}

const siteCopy = {
  ua: {
    nav: {
      home: "Головна",
      directions: "Напрямки",
      founders: "Засновники",
      projects: "Проєкти",
      contacts: "Контакти",
    },
    support: "Підтримати",
    partner: "Стати партнером",
    learnMore: "Дізнатися більше",
    join: "Доєднатися",
    hero: {
      eyebrow: "Сила націй. Гуманітарний альянс",
      title: "Power of the Nation — Humanitarian Alliance",
      lead: "Громадська спілка для реалізації суспільно корисних ініціатив, підтримки громадян та розвитку громадянського суспільства",
    },
    directions: {
      eyebrow: "Напрямки",
      title: "Ключові напрямки діяльності",
    },
    founders: {
      eyebrow: "Наші засновники",
      title: "Об'єднані спільною метою - служити людям та Україні",
      lead: "Три організації об'єднали зусилля для створення потужної гуманітарної платформи",
    },
    projects: {
      eyebrow: "Наші проєкти",
      title: "Проєкти, що змінюють життя",
      lead: "Ми реалізуємо ініціативи, спрямовані на підтримку військових, допомогу постраждалим та створення сучасної системи реабілітації.",
      leadSecond: "Кожен проєкт — це внесок у сильніше майбутнє України",
      supportTitle: "Підтримка захисників",
      medevacTitle: "Проєкт MEDEVAC: дорога життя",
      medevacText: "Ми не просто перевозимо поранених, ми відвойовуємо життя у смерті. Екіпажі добровольців щодня долають сотні кілометрів під загрозою обстрілів та дронів, щоб доставити українських захисників зі стабілізаційних пунктів до лікарень.",
      medevacTextSecond: "Жодних адміністративних витрат — 100% пожертв йдуть на пальне та забезпечення місій",
      donationTitle: "Кожен ваш донат - це чийсь шанс повернутися додому",
      rehabTitle: "Побудова мережі реабілітаційних центрів",
      rehabText: "Створюємо сучасну мережу реабілітаційних центрів, що забезпечить комплексне фізичне, психологічне та соціальне відновлення військових і цивільних",
    },
    contacts: {
      eyebrow: "Контакти та підтримка",
      title: "Зв'яжіться з нами або оберіть спосіб підтримки нашої діяльності",
      lead: "Ми відкриті до співпраці, партнерства та нових ініціатив. Разом ми робимо більше для людей і майбутнього України.",
      helpTitle: "Як ви можете допомогти",
      infoTitle: "Долучайтеся до створення змін, які мають значення",
      contactInfo: "Контактна інформація",
      phone: "Телефон",
      social: "Ми в соцмережах",
      formTitle: "Надіслати повідомлення",
      name: "Ваше ім'я",
      email: "Ваш email",
      topic: "Тема повідомлення",
      message: "Ваше повідомлення",
      consent: "Я погоджуюся на обробку персональних даних та надаю згоду на зворотній зв'язок щодо моєї заявки",
      submit: "Надіслати повідомлення",
    },
    footer: {
      rights: "© 2025 Power of the Nation Humanitarian Alliance. Всі права захищені.",
      org: "Громадська спілка «Сила Націй Гуманітарний Альянс»",
      made: "Створено з",
      madeTail: "для України",
    },
    aria: {
      mainNav: "Основна навігація",
      footerNav: "Навігація футера",
      language: "Перемкнути мову",
      openMenu: "Відкрити меню",
      closeMenu: "Закрити меню",
      mobileLanguage: "Перемикач мови",
      mobileNav: "Мобільна навігація",
      previousDirections: "Попередні напрямки",
      nextDirections: "Наступні напрямки",
      previousProjects: "Попередні проєкти",
      nextProjects: "Наступні проєкти",
      closeCard: "Закрити картку",
    },
  },
  en: {
    nav: {
      home: "Home",
      directions: "Areas",
      founders: "Founders",
      projects: "Projects",
      contacts: "Contacts",
    },
    support: "Support",
    partner: "Become a partner",
    learnMore: "Learn more",
    join: "Join",
    hero: {
      eyebrow: "Power of nations. Humanitarian alliance",
      title: "Power of the Nation - Humanitarian Alliance",
      lead: "A non-governmental alliance dedicated to implementing high-impact social initiatives, supporting communities, and fostering civil society development.",
    },
    directions: {
      eyebrow: "Areas",
      title: "Core Focus Areas",
    },
    founders: {
      eyebrow: "Our founders",
      title: "United by a common goal: to serve the people and Ukraine.",
      lead: "Three organizations have joined forces to create a powerful, coordinated humanitarian platform.",
    },
    projects: {
      eyebrow: "Our projects",
      title: "Projects That Change Lives",
      lead: "We implement initiatives aimed at supporting the military, aiding those affected by the war, and creating a modern rehabilitation system.",
      leadSecond: "Every project is a contribution to a stronger future for Ukraine.",
      supportTitle: "Support for the Armed Forces of Ukraine",
      medevacTitle: "Project MEDEVAC: The Road of Life",
      medevacText: "We don't just transport the wounded; we reclaim lives from the brink of death. Every day, volunteer crews cover hundreds of kilometers under the constant threat of shelling and drone attacks to safely transport Ukrainian defenders from frontline stabilization points to hospitals.",
      medevacTextSecond: "Zero administrative costs: 100% of your donations go directly to fuel and mission support.",
      donationTitle: "Every donation is someone's chance to return home.",
      rehabTitle: "Building a Network of Rehabilitation Centers",
      rehabText: "We are establishing a modern network of rehabilitation centers to provide comprehensive physical, psychological, and social recovery for both military personnel and civilians.",
    },
    contacts: {
      eyebrow: "Contacts and support",
      title: "Contact us or choose a way to support our joint mission.",
      lead: "We welcome strategic cooperation, institutional partnerships, and joint initiatives. Together, we can achieve a greater impact for the people and the future of Ukraine.",
      helpTitle: "How You Can Help",
      infoTitle: "Join us in making a meaningful impact.",
      contactInfo: "Contact Information",
      phone: "Phone",
      social: "Social Media",
      formTitle: "Send a Message",
      name: "Your Name",
      email: "Your Email",
      topic: "Subject",
      message: "Your Message",
      consent: "I consent to the processing of my personal data and agree to be contacted regarding my inquiry in accordance with the Privacy Policy.",
      submit: "Send a Message",
    },
    footer: {
      rights: "© 2025 Power of the Nation Humanitarian Alliance. All rights reserved.",
      org: "Civic union “Power of Nations Humanitarian Alliance”",
      made: "Created with",
      madeTail: "for Ukraine",
    },
    aria: {
      mainNav: "Main navigation",
      footerNav: "Footer navigation",
      language: "Switch language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mobileLanguage: "Language switcher",
      mobileNav: "Mobile navigation",
      previousDirections: "Previous areas",
      nextDirections: "Next areas",
      previousProjects: "Previous projects",
      nextProjects: "Next projects",
      closeCard: "Close card",
    },
  },
} satisfies Record<Language, Record<string, unknown>>;

const directions = [
  "Психологічна підтримка",
  "Освітня діяльність",
  "Адвокатська діяльність",
  "Соціальна діяльність",
  "Соціальне підприємство",
  "Будівництво та технічні роботи",
  "Культурна діяльність",
  "Екологічна діяльність",
  "Міжнародна діяльність",
  "Медична та реабілітаційна діяльність",
  "Майнова, фінансова та інвестиційна діяльність",
  "Вшанування пам'яті та меморіалізація",
];

const directionIcons = [
  "/direction-icons/01.png",
  "/direction-icons/02.png",
  "/direction-icons/03.png",
  "/direction-icons/04.png",
  "/direction-icons/05.png",
  "/direction-icons/06.png",
  "/direction-icons/07.png",
  "/direction-icons/08.png",
  "/direction-icons/09.png",
  "/direction-icons/10.png",
  "/direction-icons/11.png",
  "/direction-icons/12.png",
];

const directionIconsEn = [
  "/direction-icons/01.png",
  "/direction-icons/02.png",
  "/direction-icons/03.png",
  "/direction-icons/04.png",
  "/direction-icons/05.png",
  "/direction-icons/06.png",
  "/direction-icons/07.png",
  "/direction-icons/08.png",
  "/direction-icons/09.png",
  "/direction-icons/10.png",
  "/direction-icons/11.png",
  "/direction-icons/12.png",
];

const directionDetails = [
  "Надання психологічної допомоги, кризова підтримка, групи взаємодопомоги, психоосвітня діяльність",
  "Розробка освітніх програм, семінари та тренінги, інформаційно-просвітницька робота",
  "Правовий захист, правопросвітницька діяльність, представництво інтересів",
  "Соціальна підтримка, захист прав, соціальна адаптація та реінтеграція",
  "Підтримка зайнятості, розвиток соціальних підприємств, навчання компетенціям",
  "Відновлення об'єктів, ремонтні роботи, технічне обслуговування інфраструктури",
  "Збереження культурної спадщини, організація заходів, міжкультурний діалог",
  "Охорона довкілля, екологічна освіта, стале використання ресурсів",
  "Міжнародне партнерство, залучення фінансування, обмін досвідом",
  "Сприяння медичній допомозі, реабілітація, психосоціальна підтримка",
  "Управління ресурсами, інвестиційна діяльність, донорські програми",
  "Створення меморіалів на честь полеглих іноземних добровольців, реалізація меморіальних ініціатив, а також сприяння міжнародній солідарності та молодіжній освіті",
];

const founders = [
  {
    country: "Латвія",
    title: "Ganta Fonds",
    text: "Латвійський благодійний фонд, що створює національні та міжнародні гуманітарні проєкти. Спеціалізується на мобільній медичній допомозі, евакуації поранених та підтримці українських медиків і військових.",
  },
  {
    country: "Україна - США",
    title: "ГО «Шлях Пам'яті»",
    text: "Українсько-американська громадська організація, що створює меморіали іноземним добровольцям, які загинули захищаючи Україну. Реалізує проєкти вшанування пам’яті, розвитку територій, міжнародної солідарності та освіти молоді.",
  },
  {
    country: "Україна",
    title: "БО “Волонтери Болехівщини”",
    text: "Благодійна організація з Івано-Франківської області, що надає соціальну та гуманітарну допомогу населенню. Активно підтримує військових, займається волонтерською діяльністю та соціальними проєктами.",
  },
];

const stats = [
  ["03", "Країни - партнери"],
  ["12", "Напрямків діяльності"],
  ["1000+", "Охоплених громадян"],
  ["24/7", "Гуманітарна підтримка"],
];

const founderCards = [
  {
    align: "left",
    icon: "/founder-overlay-1.svg",
    country: "Латвія",
    title: "Ganta Fonds",
    text: "Латвійський благодійний фонд, що створює національні та міжнародні гуманітарні проєкти. Спеціалізується на мобільній медичній допомозі, евакуації поранених та підтримці українських медиків і військових.",
  },
  {
    align: "center",
    icon: "/founder-overlay-center.svg",
    country: "Україна - США",
    title: "ГО “Шлях пам’яті”",
    text: "Українсько-американська громадська організація, що створює меморіали іноземним добровольцям, які загинули захищаючи Україну. Реалізує проєкти вшанування пам’яті, розвитку територій, міжнародної солідарності та освіти молоді.",
  },
  {
    align: "left",
    icon: "/founder-overlay-1.svg",
    country: "Україна",
    title: "БО “Волонтери Болехівщини”",
    text: "Благодійна організація з Івано-Франківської області, що надає соціальну та гуманітарну допомогу населенню. Активно підтримує військових, займається волонтерською діяльністю та соціальними проєктами.",
  },
];

const impact = [
  ["4 000+", "врятованих життів військовослужбовців"],
  ["1 200+", "здійснених евакуаційних виїздів"],
  ["85%", "поранених успішно пройшли реабілітацію"],
  ["60%", "захисників повернулися у стрій"],
  ["6", "спецавтомобілів у парку"],
];

const projectCards = [
  {
    title: "РЕБ",
    icon: "/project-icons/03.png",
    detailTitle: "Допомога підрозділам ЗСУ",
    detailText: "Забезпечуємо українських захисників необхідним обладнанням, технікою та засобами для ефективного виконання бойових завдань",
    openText: "Передача сучасних засобів радіоелектронної боротьби",
  },
  {
    title: "Дрони",
    icon: "/project-icons/01.png",
    detailTitle: "Допомога підрозділам ЗСУ",
    detailText: "Забезпечуємо українських захисників необхідним обладнанням, технікою та засобами для ефективного виконання бойових завдань",
    openText: "Закупівля безпілотних літальних апаратів для розвідки та виконання бойових місій",
  },
  {
    title: "Автомобілі",
    icon: "/project-icons/02.png",
    detailTitle: "Допомога підрозділам ЗСУ",
    detailText: "Забезпечуємо українських захисників необхідним обладнанням, технікою та засобами для ефективного виконання бойових завдань",
    openText: "Закупівля та передача транспорту для виконання бойових і логістичних завдань",
  },
  {
    title: "Генератори",
    icon: "/project-icons/04.png",
    detailTitle: "Допомога підрозділам ЗСУ",
    detailText: "Забезпечуємо українських захисників необхідним обладнанням, технікою та засобами для ефективного виконання бойових завдань",
    openText: "Забезпечення автономним живленням підрозділів у польових умовах",
  },
  {
    title: "Екофлоу",
    icon: "/project-icons/05.png",
    detailTitle: "Допомога підрозділам ЗСУ",
    detailText: "Забезпечуємо українських захисників необхідним обладнанням, технікою та засобами для ефективного виконання бойових завдань",
    openText: "Портативні зарядні станції для безперебійного живлення обладнання та засобів зв'язку",
  },
];

const helpOptions = [
  {
    icon: "/help-icons/support.svg",
    title: "Підтримка",
    text: "Допоможіть коштами для реалізації гуманітарних програм",
  },
  {
    icon: "/help-icons/share.svg",
    title: "Інформаційна підтримка",
    text: "Поширте інформацію про нашу діяльність у соціальних мережах",
  },
  {
    icon: "/help-icons/partner.svg",
    title: "Партнерство",
    text: "Стати нашим партнером та реалізовувати спільні проєкти",
  },
  {
    icon: "/help-icons/volunteer.svg",
    title: "Стати волонтером",
    text: "Долучіться до нашої команди волонтерів та допомагайте",
  },
];

const directionsEn = [
  "Psychological Support",
  "Educational Initiatives",
  "Advocacy",
  "Social Services",
  "Social Entrepreneurship",
  "Construction & Infrastructure",
  "Cultural Initiatives",
  "Memorialization & Commemoration",
  "Environmental Protection",
  "International Cooperation",
  "Healthcare & Rehabilitation",
  "Financial & Asset Management",
];

const directionDetailsEn = [
  "Providing psychological assistance, crisis intervention, peer support groups, and psychoeducational outreach.",
  "Developing educational programs, organizing workshops and training sessions, and conducting informational awareness campaigns.",
  "Protecting human rights, promoting legal awareness, and advocating for the public interest at the systemic level.",
  "Providing comprehensive social support, protecting rights, and facilitating social adaptation and reintegration.",
  "Supporting employment, developing social enterprises, and providing capacity building and skills training.",
  "Rebuilding facilities, conducting repair works, and maintaining vital civilian infrastructure.",
  "Preserving cultural heritage, organizing events, and promoting intercultural dialogue.",
  "Creating memorials to honor fallen foreign volunteers, implementing memorial initiatives, and promoting international solidarity and youth education.",
  "Promoting environmental conservation, eco-education, and sustainable resource management.",
  "Fostering international partnerships, fundraising, and facilitating the cross-border exchange of knowledge and expertise.",
  "Facilitating medical care, physical rehabilitation, and psychosocial support for those affected by the war.",
  "Coordinating donor programs, ensuring transparent resource management, and overseeing financial management.",
];

const statsEn = [
  ["3", "Partner Countries"],
  ["13", "Focus Areas"],
  ["1000+", "Beneficiaries Reached"],
  ["24/7", "Humanitarian Support"],
];

const founderCardsEn = [
  {
    align: "left",
    icon: "/founder-overlay-1.svg",
    country: "Latvia",
    title: "Ganta Fonds",
    text: "A Latvian charitable foundation initiating national and international humanitarian projects. It specializes in mobile medical care, casualty evacuation, and supporting Ukrainian medics and military personnel.",
  },
  {
    align: "center",
    icon: "/founder-overlay-center.svg",
    country: "Ukraine - USA",
    title: "NGO \"Path of Memory\"",
    text: "A Ukrainian-American non-governmental organization creating memorials to honor foreign volunteers who have fallen in defense of Ukraine. It implements projects focused on memorialization, community development, international solidarity, and youth education.",
  },
  {
    align: "left",
    icon: "/founder-overlay-1.svg",
    country: "Ukraine",
    title: "Charitable Organization \"Volunteers of Bolekhivshchyna\"",
    text: "A charitable organization based in the Ivano-Frankivsk region, providing targeted social and humanitarian assistance to civilians. It actively supports the military, engages in volunteering, and implements community social projects.",
  },
];

const impactEn = [
  ["4 000+", "lives of military personnel saved"],
  ["1 200+", "successful evacuation missions completed"],
  ["85%", "of the wounded have successfully undergone rehabilitation"],
  ["60%", "defenders have returned to active duty or full civilian life"],
  ["6", "specialized vehicles in our fleet"],
];

const projectCardsEn = [
  {
    title: "Electronic Warfare (EW) Systems",
    icon: "/project-icons/03.png",
    detailTitle: "Support for the Armed Forces of Ukraine",
    detailText: "We provide Ukrainian defenders with the essential equipment, vehicles, and resources needed to effectively execute their combat missions.",
    openText: "Delivery of modern electronic warfare (EW) systems",
  },
  {
    title: "Drones (UAVs)",
    icon: "/project-icons/01.png",
    detailTitle: "Support for the Armed Forces of Ukraine",
    detailText: "We provide Ukrainian defenders with the essential equipment, vehicles, and resources needed to effectively execute their combat missions.",
    openText: "Text will be added",
  },
  {
    title: "Vehicles",
    icon: "/project-icons/02.png",
    detailTitle: "Support for the Armed Forces of Ukraine",
    detailText: "We provide Ukrainian defenders with the essential equipment, vehicles, and resources needed to effectively execute their combat missions.",
    openText: "Text will be added",
  },
  {
    title: "Generators",
    icon: "/project-icons/04.png",
    detailTitle: "Support for the Armed Forces of Ukraine",
    detailText: "We provide Ukrainian defenders with the essential equipment, vehicles, and resources needed to effectively execute their combat missions.",
    openText: "Text will be added",
  },
  {
    title: "Portable Power Stations",
    icon: "/project-icons/05.png",
    detailTitle: "Support for the Armed Forces of Ukraine",
    detailText: "We provide Ukrainian defenders with the essential equipment, vehicles, and resources needed to effectively execute their combat missions.",
    openText: "Text will be added",
  },
];

const rehabServicesEn = [
  "Rehabilitation Center",
  "Long-Term Therapy Facility",
  "Geriatric Center",
  "Center for Military & Civilians",
  "Prosthetics Department",
  "Equine-Assisted Therapy Area",
  "Sensory Garden",
  "Spiritual Care Space (Chapel)",
];

const helpOptionsEn = [
  {
    icon: "/help-icons/support.svg",
    title: "Financial Support",
    text: "Donate to fund our joint humanitarian programs and initiatives.",
  },
  {
    icon: "/help-icons/share.svg",
    title: "Spread the Word",
    text: "Share information about our alliance and our work on your social media platforms.",
  },
  {
    icon: "/help-icons/partner.svg",
    title: "Strategic Partnerships",
    text: "Collaborate with our alliance on joint projects, grant programs, and humanitarian missions.",
  },
  {
    icon: "/help-icons/volunteer.svg",
    title: "Volunteer",
    text: "Join our international volunteer team and make a hands-on difference.",
  },
];

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const match = value.match(/^([\d\s]+)(.*)$/);

    if (!match) {
      setDisplayValue(value);
      return;
    }

    const rawNumber = match[1];
    const target = Number(rawNumber.replace(/\s/g, ""));
    const suffix = match[2] || "";
    const shouldPad = value.startsWith("0");
    const padLength = rawNumber.length;
    const hasThousandsSpace = rawNumber.includes(" ");
    const formatNumber = (current: number) => {
      const base = shouldPad ? String(current).padStart(padLength, "0") : String(current);
      return hasThousandsSpace ? base.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : base;
    };
    const format = (current: number) => `${formatNumber(current)}${suffix}`;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setDisplayValue(format(0));

    if (prefersReducedMotion) {
      setDisplayValue(format(target));
      return;
    }

    let frame = 0;
    let fallback = 0;
    let started = false;
    let startTime = 0;
    const duration = 1400;

    const start = () => {
      if (started) {
        return;
      }

      started = true;
      frame = requestAnimationFrame(run);
    };

    const run = (time: number) => {
      if (!startTime) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(format(Math.round(target * eased)));

      if (progress < 1) {
        frame = requestAnimationFrame(run);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    if (ref.current) {
      observer.observe(ref.current);

      const rect = ref.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        start();
        observer.disconnect();
      }
    }

    fallback = window.setTimeout(() => {
      if (!started) {
        setDisplayValue(format(target));
        observer.disconnect();
      }
    }, duration + 600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <strong ref={ref}>{displayValue}</strong>;
}

function mailForm(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "");
  const email = String(data.get("email") || "");
  const topic = String(data.get("topic") || "Заявка з сайту");
  const message = String(data.get("message") || "");
  const body = [
    `Ім'я: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  window.location.href = `mailto:pn.hum.alliance@gmail.com?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ua");
  const [directionPage, setDirectionPage] = useState(0);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [activeDirection, setActiveDirection] = useState<number | null>(null);
  const [projectPage, setProjectPage] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const copy = siteCopy[language];
  const currentDirections = language === "en" ? directionsEn : directions;
  const currentDirectionDetails = language === "en" ? directionDetailsEn : directionDetails;
  const currentDirectionIcons = language === "en" ? directionIconsEn : directionIcons;
  const currentStats = language === "en" ? statsEn : stats;
  const currentFounderCards = language === "en" ? founderCardsEn : founderCards;
  const currentImpact = language === "en" ? impactEn : impact;
  const currentProjectCards = language === "en" ? projectCardsEn : projectCards;
  const currentHelpOptions = language === "en" ? helpOptionsEn : helpOptions;
  const currentRehabServices = language === "en"
    ? rehabServicesEn
    : [
      "Реабілітаційний центр",
      "Корпус для довготривалої терапії",
      "Геріатричний центр",
      "Центр для військових і цивільних",
      "Протезування",
      "Ділянка іпотерапії",
      "Сенсорний сад",
      "Духовний простір - каплиця",
    ];
  const currentProject = currentProjectCards[activeProject];
  const directionMaxPage = isMobileLayout ? 2 : 1;
  const projectMaxPage = isMobileLayout ? 2 : 1;

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "uk";
  }, [language]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const updateMobileLayout = () => setIsMobileLayout(media.matches);

    updateMobileLayout();
    media.addEventListener("change", updateMobileLayout);
    return () => media.removeEventListener("change", updateMobileLayout);
  }, []);

  useEffect(() => {
    setDirectionPage((page) => Math.min(page, directionMaxPage));
  }, [directionMaxPage]);

  useEffect(() => {
    setProjectPage((page) => Math.min(page, projectMaxPage));
  }, [projectMaxPage]);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-lock", isMobileMenuOpen);

    return () => {
      document.body.classList.remove("mobile-menu-lock");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY < 30) {
        setIsHeaderCompact(false);
      } else if (delta > 8) {
        setIsHeaderCompact(true);
      } else if (delta < -8) {
        setIsHeaderCompact(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const elements = document.querySelectorAll<HTMLElement>(
      ".section, .donation-callout, .rehab-services, .contact-card, footer",
    );

    elements.forEach((element) => element.classList.add("reveal-on-scroll"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    const headerHeight = window.innerWidth <= 720 ? 136 : 140;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.history.pushState(null, "", `#${targetId}`);
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  return (
    <main>
      <header className={`site-header${isHeaderCompact ? " is-compact" : ""}`}>
        <a className="brand" href="#home" aria-label="Power of the Nation">
          <img src={assetPath("/logo.png")} alt="Power of the Nation Humanitarian Alliance" />
        </a>
        <nav className={isMobileMenuOpen ? "is-open" : ""} aria-label={copy.aria.mainNav}>
          <a href="#home" onClick={(event) => handleNavClick(event, "home")}>{copy.nav.home}</a>
          <a href="#directions" onClick={(event) => handleNavClick(event, "directions")}>{copy.nav.directions}</a>
          <a href="#founders" onClick={(event) => handleNavClick(event, "founders")}>{copy.nav.founders}</a>
          <a href="#projects" onClick={(event) => handleNavClick(event, "projects")}>{copy.nav.projects}</a>
          <a href="#contacts" onClick={(event) => handleNavClick(event, "contacts")}>{copy.nav.contacts}</a>
        </nav>
        <a className="button primary compact" href="#support">{copy.support}</a>
        <button
          className={`mobile-menu-toggle${isMobileMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={copy.aria.openMenu}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          <img
            src={assetPath(isMobileMenuOpen ? "/menu-open.svg" : "/menu-hamburger.svg")}
            alt=""
            aria-hidden="true"
          />
        </button>
        <button
          className="language"
          type="button"
          aria-label={copy.aria.language}
          onClick={() => setLanguage((current) => (current === "ua" ? "en" : "ua"))}
        >
          {language.toUpperCase()}
        </button>
      </header>

      <div className={`mobile-menu-panel${isMobileMenuOpen ? " is-open" : ""}`} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-menu-shell">
          <div className="mobile-menu-card">
            <a className="mobile-menu-brand" href="#home" onClick={(event) => handleNavClick(event, "home")} aria-label="Power of the Nation">
              <img src={assetPath("/logo.png")} alt="Power of the Nation Humanitarian Alliance" />
            </a>
            <button
              className="mobile-menu-close"
              type="button"
              aria-label={copy.aria.closeMenu}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img src={assetPath("/menu-open.svg")} alt="" aria-hidden="true" />
            </button>
          </div>

          <div className="mobile-language-switch" aria-label={copy.aria.mobileLanguage}>
            <button className={language === "ua" ? "is-active" : ""} type="button" onClick={() => setLanguage("ua")}><span />UA</button>
            <button className={language === "en" ? "is-active" : ""} type="button" onClick={() => setLanguage("en")}><span />EN</button>
          </div>

          <nav className="mobile-menu-links" aria-label={copy.aria.mobileNav}>
            <a href="#home" onClick={(event) => handleNavClick(event, "home")}>{copy.nav.home}</a>
            <a href="#directions" onClick={(event) => handleNavClick(event, "directions")}>{copy.nav.directions}</a>
            <a href="#founders" onClick={(event) => handleNavClick(event, "founders")}>{copy.nav.founders}</a>
            <a href="#projects" onClick={(event) => handleNavClick(event, "projects")}>{copy.nav.projects}</a>
            <a href="#contacts" onClick={(event) => handleNavClick(event, "contacts")}>{copy.nav.contacts}</a>
          </nav>

          <a className="mobile-menu-support" href="#support" onClick={(event) => handleNavClick(event, "support")}>{copy.support}</a>
        </div>
      </div>

      <section className="hero section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className="lead">{copy.hero.lead}</p>
          <div className="actions">
            <a className="button primary" href="#support">{copy.support}</a>
            <a className="button secondary" href="#contacts">
              {copy.partner}
              <img className="button-icon" src={assetPath("/btn-arrow.svg")} alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <img src={assetPath("/hero-shield.png")} alt="" width={760} height={755} decoding="async" fetchPriority="high" />
        </div>
      </section>

      <section className="section directions" id="directions">
        <div className="directions-head">
          <div className="directions-title">
            <p className="directions-eyebrow">{copy.directions.eyebrow}</p>
            <h2>{copy.directions.title}</h2>
          </div>
          <div className="directions-controls">
            <button
              aria-label={copy.aria.previousDirections}
              className="direction-control"
              disabled={directionPage === 0}
              onClick={() => setDirectionPage((page) => Math.max(0, page - 1))}
              type="button"
            >
              <img
                className={directionPage === 0 ? "" : "is-flipped"}
                src={assetPath(directionPage === 0 ? "/slider-prev.svg" : "/slider-next.svg")}
                alt=""
                aria-hidden="true"
              />
            </button>
            <button
              aria-label={copy.aria.nextDirections}
              className="direction-control"
              disabled={directionPage === directionMaxPage}
              onClick={() => setDirectionPage((page) => Math.min(directionMaxPage, page + 1))}
              type="button"
            >
              <img src={assetPath("/slider-next.svg")} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="direction-slider">
          <div
            aria-label={copy.directions.title}
            className="direction-grid"
            style={{
              "--slide-x": `-${directionPage * (isMobileLayout ? 350 : 1305)}px`,
            } as React.CSSProperties}
          >
            {currentDirections.map((direction, index) => (
              <article
                aria-expanded={activeDirection === index}
                aria-label={direction}
                className={`direction-card${activeDirection === index ? " is-open" : ""}`}
                key={`${language}-direction-${index}`}
                onClick={() => setActiveDirection(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveDirection(index);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {activeDirection === index ? (
                  <>
                    <p className="direction-detail-text">{currentDirectionDetails[index]}</p>
                    <button
                      aria-label={copy.aria.closeCard}
                      className="direction-close"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveDirection(null);
                      }}
                      type="button"
                    />
                  </>
                ) : (
                  <>
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                    <img className="card-icon" src={assetPath(currentDirectionIcons[index])} alt="" aria-hidden="true" />
                    <h3>{direction}</h3>
                    <img className="arrow" src={assetPath("/arrow-right-circle.svg")} alt="" aria-hidden="true" />
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section founders" id="founders">
        <div className="section-head wide">
          <p className="eyebrow">{copy.founders.eyebrow}</p>
          <h2>{copy.founders.title}</h2>
          <p>{copy.founders.lead}</p>
        </div>
        <div className="stats">
          {currentStats.map(([value, label], index) => (
            <div key={`${language}-stat-${index}`}>
              <AnimatedStat value={value} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="founder-grid">
          {currentFounderCards.map((founder, index) => (
            <article className="founder-card" key={`${language}-founder-${index}`}>
              <img className="founder-icon" src={assetPath(founder.icon)} alt="" aria-hidden="true" />
              <h3>{founder.title}</h3>
              <p className="country">{founder.country}</p>
              <p>{founder.text}</p>
              <a className="button secondary full" href="#contacts">
                {copy.learnMore}
                <img className="button-icon" src={assetPath("/btn-arrow.svg")} alt="" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects projects-showcase" id="projects">
        <div className="projects-title">
          <div>
            <p className="projects-eyebrow">{copy.projects.eyebrow}</p>
            <h2>{copy.projects.title}</h2>
          </div>
          <p>
            {copy.projects.lead}
            <br />
            {copy.projects.leadSecond}
          </p>
        </div>
        <div className="project-feature">
          <div className="project-feature-copy">
            <div className="project-feature-heading">
              <span>01</span>
              <h3>{currentProject.detailTitle}</h3>
            </div>
            <p>{currentProject.detailText}</p>
          </div>
          <div className="project-controls">
            <button
              aria-label={copy.aria.previousProjects}
              className="direction-control"
              disabled={projectPage === 0}
              onClick={() => setProjectPage((page) => Math.max(0, page - 1))}
              type="button"
            >
              <img
                className={projectPage === 0 ? "" : "is-flipped"}
                src={assetPath(projectPage === 0 ? "/slider-prev.svg" : "/slider-next.svg")}
                alt=""
                aria-hidden="true"
              />
            </button>
            <button
              aria-label={copy.aria.nextProjects}
              className="direction-control"
              disabled={projectPage === projectMaxPage}
              onClick={() => setProjectPage((page) => Math.min(projectMaxPage, page + 1))}
              type="button"
            >
              <img src={assetPath("/slider-next.svg")} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="project-slider">
          <div className="project-card-row" style={{ "--slide-x": `-${projectPage * (isMobileLayout ? 350 : 670)}px` } as React.CSSProperties}>
            {currentProjectCards.map((project, index) => (
              <article
                aria-pressed={openProject === index}
                className={`project-card${activeProject === index ? " is-active" : ""}${openProject === index ? " is-open" : ""}`}
                key={`${language}-project-${index}`}
                onClick={() => {
                  setActiveProject(index);
                  setOpenProject(index);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveProject(index);
                    setOpenProject(index);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {openProject === index ? (
                  <>
                    <p className="project-open-text">{project.openText}</p>
                    <button
                      aria-label={copy.aria.closeCard}
                      className="direction-close project-close"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenProject(null);
                      }}
                      type="button"
                    />
                  </>
                ) : (
                  <>
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                    <img className="project-card-icon" src={assetPath(project.icon)} alt="" aria-hidden="true" />
                    <h3>{project.title}</h3>
                    <img className="arrow" src={assetPath("/arrow-right-circle.svg")} alt="" aria-hidden="true" />
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
        <div className="section-head wide">
          <p className="eyebrow">{copy.projects.eyebrow}</p>
          <h2>{copy.projects.title}</h2>
          <p>
            {copy.projects.lead}
          </p>
        </div>
        <div className="project-block">
          <span>01</span>
          <div>
            <h3>{copy.projects.supportTitle}</h3>
            <p>{currentProjectCards[0].detailText}</p>
          </div>
        </div>
        <div className="project-block">
          <span>02</span>
          <div>
            <h3>{copy.projects.medevacTitle}</h3>
            <p>{copy.projects.medevacText}</p>
          </div>
        </div>
        <div className="medevac-intro">
          <div className="medevac-heading">
            <span>02</span>
            <h2>{copy.projects.medevacTitle}</h2>
          </div>
          <p>
            {copy.projects.medevacText}
            <br />
            {copy.projects.medevacTextSecond}
          </p>
        </div>
        <div className="impact-grid">
          {currentImpact.map(([value, label], index) => (
            <div key={`${language}-impact-${index}`}>
              <AnimatedStat value={value} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="donation-callout" id="support">
          <span aria-hidden="true">✚</span>
          <div>
            <h3>{copy.projects.donationTitle}</h3>
            <a className="button primary full" href="#contacts">{copy.support}</a>
          </div>
        </div>
        <div className="rehab-showcase">
          <div className="medevac-heading rehab-heading">
            <span>03</span>
            <h2>{copy.projects.rehabTitle}</h2>
          </div>
          <p>{copy.projects.rehabText}</p>
          <img src={assetPath("/rehab-building.png")} alt={copy.projects.rehabTitle} decoding="async" loading="lazy" />
          <div className="rehab-services">
            <ul>
              {currentRehabServices.slice(0, 4).map((service) => (
                <li key={service}>
                  <img className="rehab-service-icon" src={assetPath("/rehab-service-bullet.svg")} alt="" aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <ul>
              {currentRehabServices.slice(4).map((service) => (
                <li key={service}>
                  <img className="rehab-service-icon" src={assetPath("/rehab-service-bullet.svg")} alt="" aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <a className="button primary rehab-support" href="#support">{copy.support}</a>
            <a className="button secondary rehab-join" href="#contacts">
              {copy.join}
              <img className="button-icon" src={assetPath("/btn-arrow.svg")} alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="project-block">
          <span>03</span>
          <div>
            <h3>{copy.projects.rehabTitle}</h3>
            <p>{copy.projects.rehabText}</p>
          </div>
        </div>
        <div className="rehab-panel">
          <ul>
            {currentRehabServices.slice(0, 4).map((service) => (
              <li key={service}>
                <img className="rehab-service-icon" src={assetPath("/rehab-service-bullet.svg")} alt="" aria-hidden="true" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
          <ul>
            {currentRehabServices.slice(4).map((service) => (
              <li key={service}>
                <img className="rehab-service-icon" src={assetPath("/rehab-service-bullet.svg")} alt="" aria-hidden="true" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section contacts-intro">
        <div className="section-head wide">
          <p className="eyebrow">{copy.contacts.eyebrow}</p>
          <h2>{copy.contacts.title}</h2>
          <p>{copy.contacts.lead}</p>
        </div>
        <h3 className="support-help-title">{copy.contacts.helpTitle}</h3>
        <div className="support-help-list">
          {currentHelpOptions.map(({ icon, title, text }, index) => (
            <article className="support-help-card" key={`${language}-help-${index}`}>
              <div className="support-help-glass">
                <div className="support-help-content">
                  <img className="support-help-icon" src={assetPath(icon)} alt="" aria-hidden="true" />
                  <div className="support-help-copy">
                  <h3>{title}</h3>
                  <p>{text}</p>
                  </div>
                </div>
                <a className="support-help-button" href="#support">{copy.support}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contacts">
        <div className="contact-card info">
          <h2>{copy.contacts.infoTitle}</h2>
          <div className="contact-info-block">
            <h3>{copy.contacts.contactInfo}</h3>
            <a className="contact-link" href="mailto:pn.hum.alliance@gmail.com">
              <img src={assetPath("/contact-icons/email.svg")} alt="" aria-hidden="true" />
              <span>
                <strong>Email</strong>
                pn.hum.alliance@gmail.com
              </span>
            </a>
            <a className="contact-link" href="tel:+380988823888">
              <img src={assetPath("/contact-icons/phone.svg")} alt="" aria-hidden="true" />
              <span>
                <strong>{copy.contacts.phone}</strong>
                +380 98 882 3888
              </span>
            </a>
          </div>
          <div className="contact-social-block">
            <h3>{copy.contacts.social}</h3>
            <div className="socials">
              <a href="#" aria-label="Facebook">
                <img src={assetPath("/contact-icons/facebook.svg")} alt="" aria-hidden="true" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src={assetPath("/contact-icons/linkedin.svg")} alt="" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <form className="contact-request-form" onSubmit={mailForm}>
          <h3 className="contact-request-title">{copy.contacts.formTitle}</h3>
          <div className="contact-request-row">
            <label className="contact-request-field">
              <span>{copy.contacts.name}</span>
              <input name="name" required />
            </label>
            <label className="contact-request-field">
              <span>{copy.contacts.email}</span>
              <input name="email" type="email" required />
            </label>
          </div>
          <label className="contact-request-field contact-request-topic">
            <span>{copy.contacts.topic}</span>
            <input name="topic" required />
          </label>
          <label className="contact-request-field contact-request-message">
            <span>{copy.contacts.message}</span>
            <textarea name="message" required />
          </label>
          <label className="contact-request-consent">
            <input type="checkbox" required />
            <span>{copy.contacts.consent}</span>
          </label>
          <button className="contact-request-submit" type="submit">{copy.contacts.submit}</button>
        </form>
      </section>

      <footer className="site-footer-v2">
        <div className="site-footer-v2__inner">
          <div className="site-footer-v2__top">
            <a className="site-footer-v2__logo" href="#home" aria-label="Power of the Nation">
              <img src={assetPath("/footer-logo.png")} alt="Power of the Nation Humanitarian Alliance" />
            </a>
            <nav className="site-footer-v2__nav" aria-label={copy.aria.footerNav}>
              <a href="#home">{copy.nav.home}</a>
              <a href="#directions">{copy.nav.directions}</a>
              <a href="#founders">{copy.nav.founders}</a>
              <a href="#contacts">{copy.nav.contacts}</a>
            </nav>
          </div>
          <div className="site-footer-v2__divider" aria-hidden="true" />
          <div className="site-footer-v2__bottom">
            <p className="site-footer-v2__rights">{copy.footer.rights}</p>
            <p className="site-footer-v2__org">{copy.footer.org}</p>
            <p className="site-footer-v2__made">
              {copy.footer.made} <span className="site-footer-v2__heart" aria-hidden="true">{"\u2665"}</span> {copy.footer.madeTail}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
