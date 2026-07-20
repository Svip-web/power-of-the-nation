"use client";

import { useEffect, useRef, useState } from "react";

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
    let started = false;
    let startTime = 0;
    const duration = 1400;

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
        if (entry.isIntersecting && !started) {
          started = true;
          frame = requestAnimationFrame(run);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
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
  const [directionPage, setDirectionPage] = useState(0);
  const [activeDirection, setActiveDirection] = useState<number | null>(null);
  const [projectPage, setProjectPage] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const currentProject = projectCards[activeProject];

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
      ".section, .direction-card, .founder-card, .project-card, .impact-grid > div, .donation-callout, .rehab-services, .help-grid article, .contact-card, footer",
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

  return (
    <main>
      <header className={`site-header${isHeaderCompact ? " is-compact" : ""}`}>
        <a className="brand" href="#home" aria-label="Power of the Nation">
          <img src="/logo.png" alt="Power of the Nation Humanitarian Alliance" />
        </a>
        <nav aria-label="Основна навігація">
          <a href="#home">Головна</a>
          <a href="#directions">Напрямки</a>
          <a href="#founders">Засновники</a>
          <a href="#projects">Проєкти</a>
          <a href="#contacts">Контакти</a>
        </nav>
        <a className="button primary compact" href="#support">Підтримати</a>
        <button className="language" type="button">UA</button>
      </header>

      <section className="hero section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Сила націй. Гуманітарний альянс</p>
          <h1>Power of the Nation — Humanitarian Alliance</h1>
          <p className="lead">
            Громадська спілка для реалізації суспільно корисних ініціатив,
            підтримки громадян та розвитку громадянського суспільства
          </p>
          <div className="actions">
            <a className="button primary" href="#support">Підтримати</a>
            <a className="button secondary" href="#contacts">
              Стати партнером
              <img className="button-icon" src="/btn-arrow.svg" alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <img src="/logo-shield.png" alt="" />
        </div>
      </section>

      <section className="section directions" id="directions">
        <div className="directions-head">
          <div className="directions-title">
            <p className="directions-eyebrow">Напрямки</p>
            <h2>Ключові Напрямки діяльності</h2>
          </div>
          <div className="directions-controls">
            <button
              aria-label="Попередні напрямки"
              className="direction-control"
              disabled={directionPage === 0}
              onClick={() => setDirectionPage(0)}
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
              aria-label="Наступні напрямки"
              className="direction-control"
              disabled={directionPage === 1}
              onClick={() => setDirectionPage(1)}
              type="button"
            >
              <img src="/slider-next.svg" alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="direction-slider">
          <div
            aria-label="Ключові напрямки діяльності"
            className="direction-grid"
            style={{ transform: `translateX(-${directionPage * 1305}px)` }}
          >
            {directions.map((direction, index) => (
              <article
                aria-expanded={activeDirection === index}
                aria-label={direction}
                className={`direction-card${activeDirection === index ? " is-open" : ""}`}
                key={direction}
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
                    <p className="direction-detail-text">{directionDetails[index]}</p>
                    <button
                      aria-label="Закрити картку"
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
          <p className="eyebrow">Наші засновники</p>
          <h2>Об'єднані спільною метою - служити людям та Україні</h2>
          <p>Три організації об'єднали зусилля для створення потужної гуманітарної платформи</p>
        </div>
        <div className="stats">
          {stats.map(([value, label]) => (
            <div key={label}>
              <AnimatedStat value={value} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="founder-grid">
          {founderCards.map((founder) => (
            <article className="founder-card" key={founder.country}>
              <img className="founder-icon" src={founder.icon} alt="" aria-hidden="true" />
              <h3>{founder.title}</h3>
              <p className="country">{founder.country}</p>
              <p>{founder.text}</p>
              <a className="button secondary full" href="#contacts">
                Дізнатися більше
                <img className="button-icon" src="/btn-arrow.svg" alt="" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects projects-showcase" id="projects">
        <div className="projects-title">
          <div>
            <p className="projects-eyebrow">Наші проєкти</p>
            <h2>Проєкти, що змінюють життя</h2>
          </div>
          <p>
            Ми реалізуємо ініціативи, спрямовані на підтримку військових, допомогу постраждалим та створення сучасної системи реабілітації.
            <br />
            Кожен проєкт — це внесок у сильніше майбутнє України
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
              aria-label="Попередні проєкти"
              className="direction-control"
              disabled={projectPage === 0}
              onClick={() => setProjectPage(0)}
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
              aria-label="Наступні проєкти"
              className="direction-control"
              disabled={projectPage === 1}
              onClick={() => setProjectPage(1)}
              type="button"
            >
              <img src="/slider-next.svg" alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="project-slider">
          <div className="project-card-row" style={{ transform: `translateX(-${projectPage * 670}px)` }}>
            {projectCards.map((project, index) => (
              <article
                aria-pressed={openProject === index}
                className={`project-card${activeProject === index ? " is-active" : ""}${openProject === index ? " is-open" : ""}`}
                key={project.title}
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
                      aria-label="Закрити картку"
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
          <p className="eyebrow">Наші проєкти</p>
          <h2>Проєкти, що змінюють життя</h2>
          <p>
            Ми реалізуємо ініціативи, спрямовані на підтримку військових, допомогу
            постраждалим та створення сучасної системи реабілітації.
          </p>
        </div>
        <div className="project-block">
          <span>01</span>
          <div>
            <h3>Підтримка захисників</h3>
            <p>Забезпечуємо українських захисників необхідним обладнанням, технікою та засобами для ефективного виконання бойових завдань.</p>
          </div>
        </div>
        <div className="project-block">
          <span>02</span>
          <div>
            <h3>Медична евакуація</h3>
            <p>Ми не просто перевозимо поранених, ми відвойовуємо життя у смерті. Екіпажі добровольців щодня долають сотні кілометрів, щоб доставити українських захисників до лікарень.</p>
          </div>
        </div>
        <div className="medevac-intro">
          <div className="medevac-heading">
            <span>02</span>
            <h2>Проєкт MEDEVAC: дорога життя</h2>
          </div>
          <p>
            Ми не просто перевозимо поранених, ми відвойовуємо життя у смерті. Екіпажі добровольців щодня долають сотні кілометрів під загрозою обстрілів та дронів, щоб доставити українських захисників зі стабілізаційних пунктів до лікарень.
            <br />
            Жодних адміністративних витрат — 100% пожертв йдуть на пальне та забезпечення місій
          </p>
        </div>
        <div className="impact-grid">
          {impact.map(([value, label]) => (
            <div key={label}>
              <AnimatedStat value={value} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="donation-callout" id="support">
          <span aria-hidden="true">✚</span>
          <div>
            <h3>Кожен ваш донат - це чийсь шанс повернутися додому</h3>
            <a className="button primary full" href="#contacts">Підтримати діяльність</a>
          </div>
        </div>
        <div className="rehab-showcase">
          <div className="medevac-heading rehab-heading">
            <span>03</span>
            <h2>Мережа реабілітаційних центрів</h2>
          </div>
          <p>
            Створюємо сучасну мережу реабілітаційних центрів для комплексного фізичного, психологічного та соціального відновлення військових і цивільних.
          </p>
          <img src="/rehab-building.png" alt="Мережа реабілітаційних центрів" />
          <div className="rehab-services">
            <ul>
              <li>Реабілітаційний центр</li>
              <li>Корпус для довготривалої терапії</li>
              <li>Геріатричний центр</li>
              <li>Центр для військових і цивільних</li>
            </ul>
            <ul>
              <li>Протезування</li>
              <li>Ділянка іпотерапії</li>
              <li>Сенсорний сад</li>
              <li>Духовний простір - каплиця</li>
            </ul>
            <a className="button primary rehab-support" href="#support">Підтримати</a>
            <a className="button secondary rehab-join" href="#contacts">
              Доєднатися
              <img className="button-icon" src="/btn-arrow.svg" alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="project-block">
          <span>03</span>
          <div>
            <h3>Мережа реабілітаційних центрів</h3>
            <p>Створюємо сучасну мережу реабілітаційних центрів для комплексного фізичного, психологічного та соціального відновлення військових і цивільних.</p>
          </div>
        </div>
        <div className="rehab-panel">
          <ul>
            <li>Реабілітаційний центр</li>
            <li>Корпус для довготривалої терапії</li>
            <li>Геріатричний центр</li>
            <li>Центр для військових і цивільних</li>
          </ul>
          <ul>
            <li>Протезування</li>
            <li>Ділянка іпотерапії</li>
            <li>Сенсорний сад</li>
            <li>Духовний простір - каплиця</li>
          </ul>
        </div>
      </section>

      <section className="section contacts-intro">
        <div className="section-head wide">
          <p className="eyebrow">Контакти та підтримка</p>
          <h2>Зв'яжіться з нами або оберіть спосіб підтримки нашої діяльності</h2>
          <p>Ми відкриті до співпраці, партнерства та нових ініціатив. Разом ми робимо більше для людей і майбутнього України.</p>
        </div>
        <h3 className="help-title">Як ви можете допомогти</h3>
        <div className="help-grid">
          {helpOptions.map(({ icon, title, text }) => (
            <article key={title}>
              <div className="help-card-content">
                <img className="help-icon" src={icon} alt="" aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
              <a className="button white help-button" href="#support">Підтримати</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contacts">
        <div className="contact-card info">
          <h2>Долучайтеся до створення змін, які мають значення</h2>
          <div className="contact-info-block">
            <h3>Контактна інформація</h3>
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
                <strong>Телефон</strong>
                +380 98 882 3888
              </span>
            </a>
          </div>
          <div className="contact-social-block">
            <h3>Ми в соцмережах</h3>
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
        <form className="contact-card form" onSubmit={mailForm}>
          <h3>Надіслати повідомлення</h3>
          <div className="form-row">
            <label>
              <span>Ваше ім'я</span>
              <input name="name" required />
            </label>
            <label>
              <span>Ваш email</span>
              <input name="email" type="email" required />
            </label>
          </div>
          <label>
            <span>Тема повідомлення</span>
            <input name="topic" required />
          </label>
          <label>
            <span>Ваше повідомлення</span>
            <textarea name="message" rows={4} required />
          </label>
          <label className="consent">
            <input type="checkbox" required />
            <span>Я погоджуюся на обробку персональних даних та надаю згоду на зворотній зв'язок щодо моєї заявки</span>
          </label>
          <button className="button white full" type="submit">Надіслати повідомлення</button>
        </form>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <a className="brand" href="#home" aria-label="Power of the Nation">
              <img src="/footer-logo.png" alt="Power of the Nation Humanitarian Alliance" />
            </a>
            <nav aria-label="Навігація футера">
              <a href="#home">Головна</a>
              <a href="#directions">Напрямки</a>
              <a href="#founders">Засновники</a>
              <a href="#contacts">Контакти</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Power of the Nation Humanitarian Alliance. Всі права захищені.</p>
            <p>Громадська спілка «Сила Націй Гуманітарний Альянс»</p>
            <p>Створено з <span aria-hidden="true">❤</span> для України</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
