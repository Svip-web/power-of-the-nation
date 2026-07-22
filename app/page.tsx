"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";

type Language = "ua" | "en";

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
      title: "Power of the Nation — Humanitarian Alliance",
      lead: "A civic union created to deliver socially valuable initiatives, support communities, and strengthen civil society",
    },
    directions: {
      eyebrow: "Areas",
      title: "Key Areas of Activity",
    },
    founders: {
      eyebrow: "Our founders",
      title: "United by a common purpose - to serve people and Ukraine",
      lead: "Three organizations joined forces to build a strong humanitarian platform",
    },
    projects: {
      eyebrow: "Our projects",
      title: "Projects That Change Lives",
      lead: "We implement initiatives focused on supporting the military, helping people affected by the war, and building a modern rehabilitation system.",
      leadSecond: "Every project is a contribution to a stronger future for Ukraine",
      supportTitle: "Support for AFU units",
      medevacTitle: "Project MEDEVAC: Road of Life",
      medevacText: "We do more than transport the wounded - we fight for life against death. Volunteer crews travel hundreds of kilometers every day under shelling and drone threats to deliver Ukrainian defenders from stabilization points to hospitals.",
      medevacTextSecond: "No administrative costs - 100% of donations go to fuel and mission support",
      donationTitle: "Every donation is someone's chance to return home",
      rehabTitle: "Building a Network of Rehabilitation Centers",
      rehabText: "We are creating a modern network of rehabilitation centers to provide comprehensive physical, psychological, and social recovery for military personnel and civilians",
    },
    contacts: {
      eyebrow: "Contacts and support",
      title: "Contact us or choose a way to support our work",
      lead: "We are open to cooperation, partnerships, and new initiatives. Together we do more for people and the future of Ukraine.",
      helpTitle: "How You Can Help",
      infoTitle: "Join the creation of meaningful change",
      contactInfo: "Contact information",
      phone: "Phone",
      social: "We are on social media",
      formTitle: "Send a message",
      name: "Your name",
      email: "Your email",
      topic: "Message subject",
      message: "Your message",
      consent: "I agree to the processing of personal data and consent to feedback regarding my request",
      submit: "Send message",
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
  "Адвокатська та правова діяльність",
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
  "Буде текст",
];

const founders = [
  {
    country: "Латвія",
    title: "ГО «Шлях Пам'яті»",
    text: "Латвійський благодійний фонд, що створює національні та міжнародні гуманітарні проєкти. Спеціалізується на мобільній медичній допомозі, евакуації поранених та підтримці українських медиків і військових.",
  },
  {
    country: "Україна - США",
    title: "ГО «Шлях Пам'яті»",
    text: "Українсько-американська громадська організація, що створює меморіали іноземним добровольцям, які загинули захищаючи Україну. Реалізує проєкти вшанування пам'яті, розвитку територій, міжнародної солідарності та освіти молоді.",
  },
  {
    country: "Україна",
    title: "БФ «Сила націй»",
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
    openText: "Буде текст",
  },
  {
    title: "Автомобілі",
    icon: "/project-icons/02.png",
    detailTitle: "Допомога підрозділам ЗСУ",
    detailText: "Забезпечуємо українських захисників необхідним обладнанням, технікою та засобами для ефективного виконання бойових завдань",
    openText: "Буде текст",
  },
  {
    title: "Генератори",
    icon: "/project-icons/04.png",
    detailTitle: "Допомога підрозділам ЗСУ",
    detailText: "Забезпечуємо українських захисників необхідним обладнанням, технікою та засобами для ефективного виконання бойових завдань",
    openText: "Буде текст",
  },
  {
    title: "Екофлоу",
    icon: "/project-icons/05.png",
    detailTitle: "Допомога підрозділам ЗСУ",
    detailText: "Забезпечуємо українських захисників необхідним обладнанням, технікою та засобами для ефективного виконання бойових завдань",
    openText: "Буде текст",
  },
  {
    title: "Спорядження",
    icon: "/project-icons/06.png",
    detailTitle: "Допомога підрозділам ЗСУ",
    detailText: "Забезпечуємо українських захисників необхідним обладнанням, технікою та засобами для ефективного виконання бойових завдань",
    openText: "Буде текст",
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
  "Psychological support",
  "Educational activity",
  "Advocacy and legal activity",
  "Social activity",
  "Social entrepreneurship",
  "Construction and technical works",
  "Cultural activity",
  "Environmental activity",
  "International activity",
  "Medical and rehabilitation activity",
  "Property, financial and investment activity",
  "Memorial and remembrance activity",
];

const directionDetailsEn = [
  "Providing psychological assistance, crisis support, mutual aid groups, and psychoeducational outreach",
  "Development of educational programs, seminars, trainings, and informational outreach",
  "Legal protection, legal education, and representation of interests",
  "Social support, protection of rights, social adaptation and reintegration",
  "Employment support, development of social enterprises, skills training",
  "Restoration of facilities, repair works, technical maintenance of infrastructure",
  "Preservation of cultural heritage, event organization, intercultural dialogue",
  "Environmental protection, environmental education, sustainable use of resources",
  "International partnerships, fundraising, exchange of experience",
  "Support for medical assistance, rehabilitation, psychosocial support",
  "Resource management, investment activity, donor programs",
  "Text will be added",
];

const statsEn = [
  ["03", "Partner countries"],
  ["12", "Areas of activity"],
  ["1000+", "Citizens reached"],
  ["24/7", "Humanitarian support"],
];

const founderCardsEn = [
  {
    align: "left",
    icon: "/founder-overlay-1.svg",
    country: "Latvia",
    title: "Ganta Fonds",
    text: "Latvian charitable foundation creating national and international humanitarian projects. Specializes in mobile medical aid, evacuation of wounded people, and support for Ukrainian medics and military personnel.",
  },
  {
    align: "center",
    icon: "/founder-overlay-center.svg",
    country: "Ukraine - USA",
    title: "NGO “Path of Memory”",
    text: "Ukrainian-American civic organization creating memorials to foreign volunteers who died defending Ukraine. Implements remembrance, territorial development, international solidarity, and youth education projects.",
  },
  {
    align: "left",
    icon: "/founder-overlay-1.svg",
    country: "Ukraine",
    title: "CO “Volunteers of Bolekhiv Region”",
    text: "Charitable organization from Ivano-Frankivsk region providing social and humanitarian assistance to people. Actively supports the military and implements volunteer and social projects.",
  },
];

const impactEn = [
  ["4 000+", "lives of service members saved"],
  ["1 200+", "evacuation trips completed"],
  ["85%", "of wounded successfully completed rehabilitation"],
  ["60%", "defenders returned to service"],
  ["6", "special vehicles in the fleet"],
];

const projectCardsEn = [
  {
    title: "EW systems",
    icon: "/project-icons/03.png",
    detailTitle: "Support for AFU units",
    detailText: "We provide Ukrainian defenders with the equipment, vehicles, and tools they need to perform combat missions effectively",
    openText: "Delivery of modern electronic warfare (EW) systems",
  },
  {
    title: "Drones",
    icon: "/project-icons/01.png",
    detailTitle: "Support for AFU units",
    detailText: "We provide Ukrainian defenders with the equipment, vehicles, and tools they need to perform combat missions effectively",
    openText: "Text will be added",
  },
  {
    title: "Vehicles",
    icon: "/project-icons/02.png",
    detailTitle: "Support for AFU units",
    detailText: "We provide Ukrainian defenders with the equipment, vehicles, and tools they need to perform combat missions effectively",
    openText: "Text will be added",
  },
  {
    title: "Generators",
    icon: "/project-icons/04.png",
    detailTitle: "Support for AFU units",
    detailText: "We provide Ukrainian defenders with the equipment, vehicles, and tools they need to perform combat missions effectively",
    openText: "Text will be added",
  },
  {
    title: "EcoFlow",
    icon: "/project-icons/05.png",
    detailTitle: "Support for AFU units",
    detailText: "We provide Ukrainian defenders with the equipment, vehicles, and tools they need to perform combat missions effectively",
    openText: "Text will be added",
  },
  {
    title: "Equipment",
    icon: "/project-icons/06.png",
    detailTitle: "Support for AFU units",
    detailText: "We provide Ukrainian defenders with the equipment, vehicles, and tools they need to perform combat missions effectively",
    openText: "Text will be added",
  },
];

const rehabServicesEn = [
  "Rehabilitation center",
  "Long-term therapy building",
  "Geriatric center",
  "Center for military and civilians",
  "Prosthetics",
  "Hippotherapy area",
  "Sensory garden",
  "Spiritual space - chapel",
];

const helpOptionsEn = [
  {
    icon: "/help-icons/support.svg",
    title: "Support",
    text: "Help with funds for humanitarian programs",
  },
  {
    icon: "/help-icons/share.svg",
    title: "Information support",
    text: "Share information about our work on social media",
  },
  {
    icon: "/help-icons/partner.svg",
    title: "Partnership",
    text: "Become our partner and implement joint projects",
  },
  {
    icon: "/help-icons/volunteer.svg",
    title: "Become a volunteer",
    text: "Join our team of volunteers and help",
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
          <img src="/logo.png" alt="Power of the Nation Humanitarian Alliance" />
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
          <span />
          <span />
          <span />
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
              <img src="/logo.png" alt="Power of the Nation Humanitarian Alliance" />
            </a>
            <button
              className="mobile-menu-close"
              type="button"
              aria-label={copy.aria.closeMenu}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span />
              <span />
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
              <img className="button-icon" src="/btn-arrow.svg" alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <picture>
            <source media="(max-width: 720px)" srcSet="/hero-shield-mobile.webp" type="image/webp" />
            <source srcSet="/hero-shield.webp" type="image/webp" />
            <img src="/hero-shield.png" alt="" width={760} height={755} decoding="async" fetchPriority="high" />
          </picture>
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
                src={directionPage === 0 ? "/slider-prev.svg" : "/slider-next.svg"}
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
              <img src="/slider-next.svg" alt="" aria-hidden="true" />
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
                    <img className="card-icon" src={directionIcons[index]} alt="" aria-hidden="true" />
                    <h3>{direction}</h3>
                    <img className="arrow" src="/arrow-right-circle.svg" alt="" aria-hidden="true" />
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
              <img className="founder-icon" src={founder.icon} alt="" aria-hidden="true" />
              <h3>{founder.title}</h3>
              <p className="country">{founder.country}</p>
              <p>{founder.text}</p>
              <a className="button secondary full" href="#contacts">
                {copy.learnMore}
                <img className="button-icon" src="/btn-arrow.svg" alt="" aria-hidden="true" />
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
                src={projectPage === 0 ? "/slider-prev.svg" : "/slider-next.svg"}
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
              <img src="/slider-next.svg" alt="" aria-hidden="true" />
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
                    <img className="project-card-icon" src={project.icon} alt="" aria-hidden="true" />
                    <h3>{project.title}</h3>
                    <img className="arrow" src="/arrow-right-circle.svg" alt="" aria-hidden="true" />
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
          <img src="/rehab-building.webp" alt={copy.projects.rehabTitle} decoding="async" loading="lazy" />
          <div className="rehab-services">
            <ul>
              {currentRehabServices.slice(0, 4).map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <ul>
              {currentRehabServices.slice(4).map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <a className="button primary rehab-support" href="#support">{copy.support}</a>
            <a className="button secondary rehab-join" href="#contacts">
              {copy.join}
              <img className="button-icon" src="/btn-arrow.svg" alt="" aria-hidden="true" />
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
              <li key={service}>{service}</li>
            ))}
          </ul>
          <ul>
            {currentRehabServices.slice(4).map((service) => (
              <li key={service}>{service}</li>
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
                  <img className="support-help-icon" src={icon} alt="" aria-hidden="true" />
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
              <img src="/contact-icons/email.svg" alt="" aria-hidden="true" />
              <span>
                <strong>Email</strong>
                pn.hum.alliance@gmail.com
              </span>
            </a>
            <a className="contact-link" href="tel:+380988823888">
              <img src="/contact-icons/phone.svg" alt="" aria-hidden="true" />
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
                <img src="/contact-icons/facebook.svg" alt="" aria-hidden="true" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src="/contact-icons/linkedin.svg" alt="" aria-hidden="true" />
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

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <a className="brand" href="#home" aria-label="Power of the Nation">
              <img src="/footer-logo.png" alt="Power of the Nation Humanitarian Alliance" />
            </a>
            <nav aria-label={copy.aria.footerNav}>
              <a href="#home">{copy.nav.home}</a>
              <a href="#directions">{copy.nav.directions}</a>
              <a href="#founders">{copy.nav.founders}</a>
              <a href="#contacts">{copy.nav.contacts}</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <p>{copy.footer.rights}</p>
            <p>{copy.footer.org}</p>
            <p>{copy.footer.made} <span aria-hidden="true">❤</span> {copy.footer.madeTail}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
