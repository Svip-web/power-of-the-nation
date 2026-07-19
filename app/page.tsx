"use client";

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

const impact = [
  ["4 000+", "врятованих життів військовослужбовців"],
  ["1 200+", "здійснених евакуаційних виїздів"],
  ["85%", "поранених успішно пройшли реабілітацію"],
  ["60%", "захисників повернулися у стрій"],
  ["6", "спецавтомобілів у парку"],
];

const helpOptions = [
  ["Підтримати коштами", "Допоможіть коштами для реалізації гуманітарних програм"],
  ["Поширити інформацію", "Поширте інформацію про нашу діяльність у соціальних мережах"],
  ["Стати партнером", "Стати нашим партнером та реалізовувати спільні проєкти"],
  ["Волонтерство", "Долучіться до нашої команди волонтерів та допомагайте"],
];

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
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Power of the Nation">
          <img src="/logo-mark.png" alt="" />
          <span>
            <strong>POWER OF THE NATION</strong>
            <small>HUMANITARIAN ALLIANCE</small>
          </span>
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
            <a className="button secondary" href="#contacts">Стати партнером <span>→</span></a>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <img src="/logo-shield.png" alt="" />
        </div>
      </section>

      <section className="section directions" id="directions">
        <div className="section-head">
          <p className="eyebrow">Напрямки</p>
          <h2>Ключові напрямки діяльності</h2>
        </div>
        <div className="direction-grid">
          {directions.map((direction, index) => (
            <article className="direction-card" key={direction}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <span className="card-icon" aria-hidden="true">{["◌", "⌂", "⚖", "✚", "●", "▣", "▥", "⌁", "◎", "+", "◇", "✦"][index]}</span>
              <h3>{direction}</h3>
              <span className="arrow" aria-hidden="true">→</span>
            </article>
          ))}
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
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="founder-grid">
          {founders.map((founder) => (
            <article className="founder-card" key={founder.country}>
              <div className="dot" />
              <h3>{founder.title}</h3>
              <p className="country">{founder.country}</p>
              <p>{founder.text}</p>
              <a className="button secondary full" href="#contacts">Зв'язатися</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects" id="projects">
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
        <div className="impact-grid">
          {impact.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
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
        <div className="help-grid">
          {helpOptions.map(([title, text]) => (
            <article key={title}>
              <span aria-hidden="true">●</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contacts">
        <div className="contact-card info">
          <h2>Долучайтеся до створення змін, які мають значення</h2>
          <div>
            <h3>Контактна інформація</h3>
            <a href="mailto:pn.hum.alliance@gmail.com">pn.hum.alliance@gmail.com</a>
            <a href="tel:+380988823888">+380 98 882 3888</a>
          </div>
          <div>
            <h3>Ми в соцмережах</h3>
            <div className="socials">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="LinkedIn">in</a>
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
        <a className="brand" href="#home" aria-label="Power of the Nation">
          <img src="/logo-mark.png" alt="" />
          <span>
            <strong>POWER OF THE NATION</strong>
            <small>HUMANITARIAN ALLIANCE</small>
          </span>
        </a>
        <nav aria-label="Навігація футера">
          <a href="#home">Головна</a>
          <a href="#directions">Напрямки</a>
          <a href="#founders">Засновники</a>
          <a href="#contacts">Контакти</a>
        </nav>
        <p>© 2025 Power of the Nation Humanitarian Alliance. Всі права захищені.</p>
      </footer>
    </main>
  );
}
