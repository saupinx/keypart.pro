
const header = document.querySelector('.site-header');
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileBackdrop = document.querySelector('.mobile-backdrop');
const progressBar = document.querySelector('.scroll-progress span');
const backToTop = document.querySelector('.back-to-top');
const themeToggles = document.querySelectorAll('.theme-toggle');
const languageButtons = document.querySelectorAll('[data-lang-btn]');
const themeStorageKey = 'theme';
const languageStorageKey = 'site-language';
const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let currentLanguage = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'ru';
const phoneInputs = document.querySelectorAll('input[name="phone"]');
const phoneInstances = new Map();

const translations = {
  ru: {
    metaTitle: 'Key Part Solutions',
    metaDescription: 'IT-сопровождение для действующего бизнеса и новых проектов',
    navLabel: 'Основная навигация',
    nav: ['О компании', 'Услуги', 'Тарифы', 'Оборудование', 'Нам доверяют'],
    actions: { apply: 'Оставить заявку', whatsapp: 'WhatsApp' },
    languageSwitcher: 'Переключение языка',
    theme: {
      change: 'Тема',
      toLight: 'Переключить на светлую тему',
      toDark: 'Переключить на тёмную тему',
      lightTitle: 'Светлая тема',
      darkTitle: 'Тёмная тема'
    },
    burger: { open: 'Открыть меню', close: 'Закрыть меню' },
    hero: {
      title: '<span class="hero-line">IT аутсорсинг –</span><span class="hero-line">Ваш бизнес заслуживает</span><span class="hero-line">безупречной IT‑поддержки!</span>',
      formTitle: 'Оставьте заявку для просчета стоимости обслуживания прямо сейчас!',
      formText: 'Менеджер перезвонит в течение 10 минут',
      name: 'Ваше имя',
      phone: 'Введите номер телефона',
      email: 'Ваш email',
      submit: 'Отправить',
      privacy: 'Отправляя форму, Вы соглашаетесь с политикой конфиденциальности'
    },
    valuesTitle: 'Наши ценности',
    values: [
      ['Конфиденциальность информации', 'Гарантируем сохранность Ваших секретов'],
      ['Небольшой, но экспертный штат специалистов', 'Мы подобрали оптимальные инструменты, наладили и автоматизировали внутренние процессы для повышения Вашего комфорта'],
      ['Опыт и экспертиза', 'Более 20 лет на рынке IT‑услуг'],
      ['Работаем не 24/7, а головой', 'Сводим к минимуму количество Ваших заявок. Фокусируем внимание на основных проблемах и искореняем их.'],
      ['Надежность', 'Гарантия быстрого реагирования и решения проблем'],
      ['Берёмся не за всё', 'Наши услуги для тех, кто ценит качество']
    ],
    trustedTitle: 'Нам доверяют',
    contactBanner: 'Оставьте заявку прямо сейчас',
    includedTitle: 'Что входит в абонентскую плату?',
    included: [
      ['Поддержка пользователей', 'Рабочее состояние компьютеров и ноутбуков, программ на компьютерах, удаленный доступ, телефонные консультации'],
      ['Поддержка серверов', 'Безопасное хранение и резервирование данных компании, работа почты'],
      ['Поддержка оборудования', 'Принтеры, сканеры, МФУ'],
      ['Поддержка сетевого оборудования', 'Роутеры, коммутаторы, проводные и беспроводные сети и их безопасность'],
      ['Проектирование IT инфраструктуры', 'От рекомендаций по прокладке проводов, подбора провайдера интернет‑услуг — до полного запуска объекта в работу.'],
      ['Закуп оборудования', 'Оптимальный подбор и закуп компьютеров, ноутбуков, принтеров, серверов, сетевого оборудования и другого IT‑оснащения.']
    ],
    tickerServices: ['Поддержка пользователей', 'Поддержка сетевого, серверного оборудования', 'Абонентское обслуживание'],
    tariffsTitle: 'Тарифы',
    tariffs: {
      firstColumn: 'Количество обслуживаемых компьютеров',
      packages: [
        ['Пакет «Базовый»', 'Режим поддержки:<br>с 9:00 до 18:00 в рабочие дни'],
        ['Пакет «Бизнес»', 'Режим поддержки:<br>с 9:00 до 18:00, без выходных'],
        ['Пакет «Безлимит»', 'Режим поддержки: 24/7']
      ],
      rows: ['до 10 ПК', 'от 11 до 20 ПК', 'от 21 до 30 ПК', 'от 31 до 40 ПК', 'от 41 и более'],
      uponRequest: 'По запросу',
      calculate: 'Рассчитать стоимость'
    },
    statsTitle: 'В цифрах',
    stats: [
      'Сотрудников на поддержке',
      'Средний процент снижения количества сбоев у клиентов',
      'Объектов на поддержке',
      'Клиентов к нам пришли по рекомендациям'
    ],
    statsMinuteSuffix: ' мин',
    tickerBenefits: ['Стабильная IT‑инфраструктура', 'Предсказуемые расходы', 'Быстрая реакция на заявки', 'Профилактика, а не только тушение пожаров'],
    deliverablesTitle: 'Что вы получите?',
    businessTitle: 'Для действующего бизнеса',
    businessBlocks: [
      ['Поддержка для сотрудников', 'Поддержка компьютеров и ноутбуков сотрудников<br>Установка, удаление программ<br>Подключение принтеров, сканеров, МФУ<br>Настройка и подключение удаленных доступов<br>Настройка и подключение контролируемого доступа сотрудников к корпоративной информации'],
      ['Поддержка для бухгалтерии', 'Установка, настройка, обновление систем Интернет‑банкинга<br>Установка и настройка специфичного ПО<br>Обновление СОНО<br>NClayer'],
      ['Поддержка сети и серверов', 'Настройка и поддержка Серверов<br>Организация системы резервного копирования данных<br>Настройка безопасности сети<br>Построение общей корпоративной сети для филиалов<br>Подключение к онлайн мониторингу<br>Установка и обновление антивируса<br>Подключение и настройка бесшовной Wi‑Fi'],
      ['Подбор и закуп оборудования', 'Помощь в подборе компьютерного, телекоммуникационного оборудования<br>Бесплатная доставка и установка товаров на сумму более 30 000тг']
    ],
    projectTitle: 'Проектирование для новых объектов',
    projectBlocks: [
      ['Сбор информации', 'Выясняем потребности бизнеса, готовим ТехЗадание'],
      ['Разрабатываем оптимальный вариант проекта', 'Ориентир на стоимость | надёжность | функциональность'],
      ['Подбираем, согласовываем, закупаем оборудование', ''],
      ['Сопровождаем и помогаем в вопросах', 'Размещения WiFi оборудования<br>Подключения Интернета<br>Прокладки проводов и установки розеток (для компьютеров, сетевого и печатного оборудования)<br>Систем видеонаблюдения<br>Систем контроля доступа<br>Систем учёта рабочего времени'],
      ['Настраиваем и запускаем Вашу IT инфраструктуру', 'Серверы<br>Сетевое оборудование, WiFI APs<br>Сетевые сервисы<br>Всё необходимое для работы']
    ],
    ctaText: 'Для быстрого расчета стоимости, заполните форму, указав количество ПК, серверов и задач, которые необходимо выполнять',
    ctaButton: 'Заказать расчет',
    equipmentTitle: 'Оборудование',
    footerServicesTitle: 'НАШИ УСЛУГИ',
    footerServices: ['Поддержка пользователей', 'Поддержка серверов и сетевого оборудования', 'Продажа и поставка компьютерного оборудования'],
    footerContactsTitle: 'КОНТАКТЫ',
    footerCopyright: '© 2025 ТОО «KeyPartSolutions»',
    backToTop: 'Наверх',
    floatingChat: 'Написать в WhatsApp',
    form: {
      nameError: 'Введите имя, чтобы мы знали, как к вам обращаться.',
      phoneError: 'Укажите номер телефона, включая код страны.',
      emailError: 'Проверьте email — похоже, в нём есть ошибка.',
      opening: 'Открываем WhatsApp...',
      popupBlocked: 'Браузер заблокировал открытие WhatsApp. Разрешите всплывающие окна и попробуйте ещё раз.',
      success: 'Форма заполнена верно. Открываем WhatsApp для отправки заявки…',
      intro: 'Здравствуйте! Хочу оставить заявку на IT-сопровождение.',
      nameLabel: 'Имя',
      phoneLabel: 'Телефон',
      emailLabel: 'Email'
    }
  },
  en: {
    metaTitle: 'Key Part Solutions',
    metaDescription: 'IT support for established businesses and new projects',
    navLabel: 'Main navigation',
    nav: ['About', 'Services', 'Pricing', 'Equipment', 'Trusted by'],
    actions: { apply: 'Request a quote', whatsapp: 'WhatsApp' },
    languageSwitcher: 'Language switcher',
    theme: {
      change: 'Theme',
      toLight: 'Switch to light mode',
      toDark: 'Switch to dark mode',
      lightTitle: 'Light mode',
      darkTitle: 'Dark mode'
    },
    burger: { open: 'Open menu', close: 'Close menu' },
    hero: {
      title: '<span class="hero-line">IT outsourcing —</span><span class="hero-line">Your business deserves</span><span class="hero-line">flawless IT support!</span>',
      formTitle: 'Submit a request to calculate your support cost right now!',
      formText: 'A manager will call you back within 10 minutes',
      name: 'Your name',
      phone: 'Enter your phone number',
      email: 'Your email',
      submit: 'Send',
      privacy: 'By submitting the form, you agree to the privacy policy'
    },
    valuesTitle: 'Our values',
    values: [
      ['Information confidentiality', 'We ensure the safety of your confidential data'],
      ['Small but expert team', 'We have selected the right tools and streamlined and automated internal processes to improve your experience'],
      ['Experience and expertise', 'More than 20 years in the IT services market'],
      ['We work smart, not 24/7', 'We minimize the number of your support requests, focus on the main issues and eliminate them.'],
      ['Reliability', 'Guaranteed fast response and issue resolution'],
      ['We do not take on everything', 'Our services are for those who value quality']
    ],
    trustedTitle: 'Trusted by',
    contactBanner: 'Leave a request right now',
    includedTitle: 'What is included in the monthly service fee?',
    included: [
      ['User support', 'Stable operation of PCs and laptops, software support, remote access and phone consultations'],
      ['Server support', 'Secure company data storage and backups, plus mail system management'],
      ['Equipment support', 'Printers, scanners, multifunction devices'],
      ['Network equipment support', 'Routers, switches, wired and wireless networks and their security'],
      ['IT infrastructure design', 'From cable routing and internet provider selection to the full launch of the facility'],
      ['Equipment procurement', 'Optimal selection and purchase of PCs, laptops, printers, servers, network equipment and other IT hardware']
    ],
    tickerServices: ['User support', 'Network and server support', 'Managed IT services'],
    tariffsTitle: 'Pricing',
    tariffs: {
      firstColumn: 'Number of computers covered',
      packages: [
        ['Basic package', 'Support hours:<br>9:00 AM to 6:00 PM on business days'],
        ['Business package', 'Support hours:<br>9:00 AM to 6:00 PM, seven days a week'],
        ['Unlimited package', 'Support hours: 24/7']
      ],
      rows: ['up to 10 PCs', '11 to 20 PCs', '21 to 30 PCs', '31 to 40 PCs', '41+ PCs'],
      uponRequest: 'Upon request',
      calculate: 'Calculate cost'
    },
    statsTitle: 'By the numbers',
    stats: [
      'Employees under support',
      'Average reduction in the number of client incidents',
      'Facilities under support',
      'Clients came to us through referrals'
    ],
    statsMinuteSuffix: ' min',
    tickerBenefits: ['Stable IT infrastructure', 'Predictable costs', 'Fast response to requests', 'Prevention instead of only firefighting'],
    deliverablesTitle: 'What will you get?',
    businessTitle: 'For existing businesses',
    businessBlocks: [
      ['Employee support', 'Support for employees’ computers and laptops<br>Software installation and removal<br>Connecting printers, scanners and multifunction devices<br>Remote access setup and configuration<br>Controlled employee access to corporate information'],
      ['Accounting support', 'Installation, configuration and updates for online banking systems<br>Installation and configuration of specialized software<br>SONO updates<br>NCALayer'],
      ['Network and server support', 'Server deployment and support<br>Backup system implementation<br>Network security configuration<br>Building a unified corporate network for branches<br>Integration with online monitoring<br>Antivirus installation and updates<br>Seamless Wi‑Fi setup and configuration'],
      ['Equipment selection and procurement', 'Assistance in selecting computer and telecommunications equipment<br>Free delivery and installation for orders over 30,000 KZT']
    ],
    projectTitle: 'Design for new facilities',
    projectBlocks: [
      ['Information gathering', 'We identify business needs and prepare the technical brief'],
      ['We develop the optimal project solution', 'Focus on cost | reliability | functionality'],
      ['We select, approve and purchase equipment', ''],
      ['We support the implementation process', 'Wi‑Fi equipment placement<br>Internet connection<br>Cable routing and socket installation (for computers, network and printing equipment)<br>Video surveillance systems<br>Access control systems<br>Time tracking systems'],
      ['We configure and launch your IT infrastructure', 'Servers<br>Network equipment, Wi‑Fi APs<br>Network services<br>Everything required for operations']
    ],
    ctaText: 'To quickly calculate the service cost, fill out the form and specify the number of PCs, servers and tasks to be handled',
    ctaButton: 'Request estimate',
    equipmentTitle: 'Equipment',
    footerServicesTitle: 'OUR SERVICES',
    footerServices: ['User support', 'Server and network equipment support', 'Sale and supply of computer equipment'],
    footerContactsTitle: 'CONTACTS',
    footerCopyright: '© 2025 LLP “KeyPartSolutions”',
    backToTop: 'Back to top',
    floatingChat: 'Message us on WhatsApp',
    form: {
      nameError: 'Enter your name so we know how to address you.',
      phoneError: 'Enter a phone number including the country code.',
      emailError: 'Please check the email address — it looks incorrect.',
      opening: 'Opening WhatsApp...',
      popupBlocked: 'The browser blocked WhatsApp. Allow pop-ups and try again.',
      success: 'The form looks good. Opening WhatsApp to send your request…',
      intro: 'Hello! I would like to leave a request for IT support.',
      nameLabel: 'Name',
      phoneLabel: 'Phone',
      emailLabel: 'Email'
    }
  }
};

function getStoredTheme() {
  try {
    return localStorage.getItem(themeStorageKey);
  } catch (error) {
    return null;
  }
}

function getStoredLanguage() {
  try {
    return localStorage.getItem(languageStorageKey);
  } catch (error) {
    return null;
  }
}

function setTextContent(elements, values) {
  elements.forEach((element, index) => {
    if (!element || values[index] === undefined) return;
    element.textContent = values[index];
  });
}

function setInnerHTML(elements, values) {
  elements.forEach((element, index) => {
    if (!element || values[index] === undefined) return;
    element.innerHTML = values[index];
  });
}

function updateThemeControls(theme) {
  const locale = translations[currentLanguage];
  themeToggles.forEach((toggle) => {
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? locale.theme.toLight : locale.theme.toDark);
    toggle.setAttribute('title', isDark ? locale.theme.lightTitle : locale.theme.darkTitle);
  });

  const mobileThemeText = document.querySelector('.theme-toggle-mobile .theme-toggle__text');
  if (mobileThemeText) mobileThemeText.textContent = locale.theme.change;
}

function updateLanguageControls(lang) {
  languageButtons.forEach((button) => {
    const isActive = button.dataset.langBtn === lang;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  document.querySelectorAll('.lang-switch').forEach((switcher) => {
    switcher.setAttribute('aria-label', translations[lang].languageSwitcher);
  });
}

function updateBurgerLabel(isOpen = false) {
  if (!burger) return;
  burger.setAttribute('aria-label', isOpen ? translations[currentLanguage].burger.close : translations[currentLanguage].burger.open);
}

function updateCountSuffixes() {
  const minuteCount = document.querySelector('.stats-grid [data-count="17"]');
  if (minuteCount) {
    minuteCount.dataset.suffix = translations[currentLanguage].statsMinuteSuffix;
    minuteCount.textContent = `${minuteCount.dataset.count}${minuteCount.dataset.suffix}`;
  }

  document.querySelectorAll('.stats-grid [data-count]:not([data-count="17"])').forEach((item) => {
    const suffix = item.dataset.suffix || '';
    item.textContent = `${item.dataset.count}${suffix}`;
  });
}

function applyLanguage(lang, persist = false) {
  currentLanguage = translations[lang] ? lang : 'ru';
  const locale = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;
  document.documentElement.setAttribute('data-lang', currentLanguage);
  document.title = locale.metaTitle;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', locale.metaDescription);

  const mainNav = document.querySelectorAll('.main-nav a');
  setTextContent([...mainNav], locale.nav);
  const mobileLinks = mobileMenu ? [...mobileMenu.querySelectorAll('a')] : [];
  mobileLinks.forEach((link, index) => {
    if (index < 5) link.textContent = locale.nav[index];
    if (index === 5) link.textContent = locale.actions.apply;
    if (index === 6) link.textContent = locale.actions.whatsapp;
  });

  const mainNavLabel = document.querySelector('.main-nav');
  if (mainNavLabel) mainNavLabel.setAttribute('aria-label', locale.navLabel);

  const headerApply = document.querySelector('.header-actions .btn-outline:not(.btn-pink)');
  if (headerApply) headerApply.textContent = locale.actions.apply;
  const headerWhatsapp = document.querySelector('.header-actions .btn-pink');
  if (headerWhatsapp) headerWhatsapp.textContent = locale.actions.whatsapp;

  const heroTitle = document.querySelector('.hero-copy h1');
  if (heroTitle) heroTitle.innerHTML = locale.hero.title;
  const formTitle = document.querySelector('.hero-form h2');
  if (formTitle) formTitle.textContent = locale.hero.formTitle;
  const formText = document.querySelector('.hero-form p');
  if (formText) formText.textContent = locale.hero.formText;
  const nameInput = document.querySelector('input[name="name"]');
  const phoneInput = document.querySelector('input[name="phone"]');
  const emailInput = document.querySelector('input[name="email"]');
  if (nameInput) nameInput.setAttribute('placeholder', locale.hero.name);
  if (phoneInput && !phoneInput.dataset.itiInitialized) phoneInput.setAttribute('placeholder', locale.hero.phone);
  if (emailInput) emailInput.setAttribute('placeholder', locale.hero.email);
  const formSubmit = document.querySelector('.hero-form button[type="submit"]');
  if (formSubmit && !formSubmit.disabled) formSubmit.textContent = locale.hero.submit;
  const formPrivacy = document.querySelector('.hero-form small');
  if (formPrivacy) formPrivacy.textContent = locale.hero.privacy;

  const sectionTitles = document.querySelectorAll('.section-title');
  if (sectionTitles[0]) sectionTitles[0].textContent = locale.valuesTitle;
  if (sectionTitles[1]) sectionTitles[1].textContent = locale.trustedTitle;
  if (sectionTitles[2]) sectionTitles[2].textContent = locale.includedTitle;
  if (sectionTitles[3]) sectionTitles[3].textContent = locale.tariffsTitle;
  if (sectionTitles[4]) sectionTitles[4].textContent = locale.statsTitle;
  if (sectionTitles[5]) sectionTitles[5].textContent = locale.deliverablesTitle;
  if (sectionTitles[6]) sectionTitles[6].textContent = locale.equipmentTitle;

  const valueTitles = [...document.querySelectorAll('.values-grid .value-item h3')];
  const valueTexts = [...document.querySelectorAll('.values-grid .value-item p')];
  locale.values.forEach((item, index) => {
    if (valueTitles[index]) valueTitles[index].textContent = item[0];
    if (valueTexts[index]) valueTexts[index].textContent = item[1];
  });

  const bannerTitle = document.querySelector('.contact-banner h2');
  if (bannerTitle) bannerTitle.textContent = locale.contactBanner;

  const includedTitles = [...document.querySelectorAll('.included-grid .included-item h3')];
  const includedTexts = [...document.querySelectorAll('.included-grid .included-item p')];
  locale.included.forEach((item, index) => {
    if (includedTitles[index]) includedTitles[index].textContent = item[0];
    if (includedTexts[index]) includedTexts[index].textContent = item[1];
  });

  document.querySelectorAll('.ticker-pink .ticker-track span').forEach((item, index) => {
    item.textContent = locale.tickerServices[index % locale.tickerServices.length];
  });

  const tariffsHead = document.querySelectorAll('.tariffs-table thead th');
  if (tariffsHead[0]) tariffsHead[0].textContent = locale.tariffs.firstColumn;
  locale.tariffs.packages.forEach((item, index) => {
    const headCell = tariffsHead[index + 1];
    if (!headCell) return;
    headCell.innerHTML = `<span>${item[0]}</span><small>${item[1]}</small>`;
  });

  const rowLabels = [...document.querySelectorAll('.tariffs-table tbody tr td:first-child')];
  setTextContent(rowLabels, locale.tariffs.rows);
  const lastRowCells = document.querySelectorAll('.tariffs-table tbody tr:last-child td:not(:first-child)');
  lastRowCells.forEach((cell) => {
    cell.textContent = locale.tariffs.uponRequest;
  });
  document.querySelectorAll('.tariffs-table tfoot .btn').forEach((button) => {
    button.textContent = locale.tariffs.calculate;
  });

  const statsTexts = [...document.querySelectorAll('.stats-grid article p')];
  setTextContent(statsTexts, locale.stats);
  updateCountSuffixes();

  document.querySelectorAll('.ticker-blue .ticker-track span').forEach((item, index) => {
    item.textContent = locale.tickerBenefits[index % locale.tickerBenefits.length];
  });

  const splitTitles = [...document.querySelectorAll('.split-copy > h3')];
  if (splitTitles[0]) splitTitles[0].textContent = locale.businessTitle;
  if (splitTitles[1]) splitTitles[1].textContent = locale.projectTitle;

  const businessBlocks = [...document.querySelectorAll('.split-section:first-of-type .bullet-block')];
  locale.businessBlocks.forEach((item, index) => {
    const title = businessBlocks[index]?.querySelector('h4');
    const text = businessBlocks[index]?.querySelector('p');
    if (title) title.innerHTML = `<span class="check"></span>${item[0]}`;
    if (text) text.innerHTML = item[1];
  });

  const projectBlocks = [...document.querySelectorAll('.split-project .bullet-block')];
  locale.projectBlocks.forEach((item, index) => {
    const title = projectBlocks[index]?.querySelector('h4');
    let text = projectBlocks[index]?.querySelector('p');
    if (title) title.innerHTML = `<span class="check"></span>${item[0]}`;
    if (!text && item[1]) {
      text = document.createElement('p');
      projectBlocks[index]?.appendChild(text);
    }
    if (text) {
      text.innerHTML = item[1];
      text.style.display = item[1] ? '' : 'none';
    }
  });

  const ctaText = document.querySelector('.cta-strip p');
  if (ctaText) ctaText.textContent = locale.ctaText;
  const ctaButton = document.querySelector('.cta-strip .btn');
  if (ctaButton) ctaButton.textContent = locale.ctaButton;

  const footerTitles = document.querySelectorAll('.site-footer h4');
  if (footerTitles[0]) footerTitles[0].textContent = locale.footerServicesTitle;
  if (footerTitles[1]) footerTitles[1].textContent = locale.footerContactsTitle;
  const footerServiceItems = [...document.querySelectorAll('.footer-inner > div:nth-child(2) li')];
  setTextContent(footerServiceItems, locale.footerServices);
  const copyright = document.querySelector('.copyright');
  if (copyright) copyright.textContent = locale.footerCopyright;

  if (backToTop) backToTop.setAttribute('aria-label', locale.backToTop);
  const floatingChat = document.querySelector('.floating-chat');
  if (floatingChat) floatingChat.setAttribute('aria-label', locale.floatingChat);

  updateLanguageControls(currentLanguage);
  updateThemeControls(document.documentElement.getAttribute('data-theme') || 'light');
  updateBurgerLabel(mobileMenu?.classList.contains('open'));

  if (persist) {
    try {
      localStorage.setItem(languageStorageKey, currentLanguage);
    } catch (error) {
      // ignore storage errors silently
    }
  }
}

function applyTheme(theme, persist = false) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
  updateThemeControls(theme);

  if (!persist) return;

  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch (error) {
    // ignore storage errors silently
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme, true);
}

const initialTheme = document.documentElement.getAttribute('data-theme') || getStoredTheme() || (colorSchemeQuery.matches ? 'dark' : 'light');
initializePhoneInputs();
applyTheme(initialTheme);
applyLanguage(getStoredLanguage() || currentLanguage);

themeToggles.forEach((toggle) => {
  toggle.addEventListener('click', toggleTheme);
});

languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextLanguage = button.dataset.langBtn === 'en' ? 'en' : 'ru';
    applyLanguage(nextLanguage, true);
  });
});

const handleSystemThemeChange = (event) => {
  if (getStoredTheme()) return;
  applyTheme(event.matches ? 'dark' : 'light');
};

if (typeof colorSchemeQuery.addEventListener === 'function') {
  colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
} else if (typeof colorSchemeQuery.addListener === 'function') {
  colorSchemeQuery.addListener(handleSystemThemeChange);
}

function setHeaderState() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
}

function setProgress() {
  if (!progressBar) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function toggleBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle('show', window.scrollY > 500);
}

function closeMenu() {
  if (!burger || !mobileMenu || !mobileBackdrop) return;
  burger.setAttribute('aria-expanded', 'false');
  updateBurgerLabel(false);
  mobileMenu.classList.remove('open');
  mobileBackdrop.classList.remove('show');
  mobileBackdrop.hidden = true;
  document.body.classList.remove('menu-open');
}

function openMenu() {
  if (!burger || !mobileMenu || !mobileBackdrop) return;
  burger.setAttribute('aria-expanded', 'true');
  updateBurgerLabel(true);
  mobileMenu.classList.add('open');
  mobileBackdrop.hidden = false;
  requestAnimationFrame(() => mobileBackdrop.classList.add('show'));
  document.body.classList.add('menu-open');
}

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', closeMenu)
  );

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function getHeaderOffset() {
  return header ? header.offsetHeight + 12 : 0;
}

document.querySelectorAll('a[data-scroll]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetSelector = link.getAttribute('href');
    if (!targetSelector || !targetSelector.startsWith('#')) return;
    const target = document.querySelector(targetSelector);
    if (!target) return;
    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', targetSelector);
  });
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

function formatPhoneFallback(value) {
  const digits = value.replace(/\D/g, '').slice(0, 15);
  if (!digits) return '';
  return `+${digits}`;
}

function getSelectedDialCode(input) {
  const phoneInstance = phoneInstances.get(input);
  if (!phoneInstance) return '';
  const countryData = phoneInstance.getSelectedCountryData();
  return countryData?.dialCode ? String(countryData.dialCode) : '';
}

function syncPhoneDialCode(input, force = false) {
  const phoneInstance = phoneInstances.get(input);
  if (!phoneInstance) return;

  const newDialCode = getSelectedDialCode(input);
  if (!newDialCode) return;

  const oldDialCode = input.dataset.previousDialCode || '';
  const rawDigits = (input.value || '').replace(/\D/g, '');

  let nationalDigits = rawDigits;
  if (oldDialCode && rawDigits.startsWith(oldDialCode)) {
    nationalDigits = rawDigits.slice(oldDialCode.length);
  } else if (rawDigits.startsWith(newDialCode)) {
    nationalDigits = rawDigits.slice(newDialCode.length);
  }

  const nextValue = `+${newDialCode}${nationalDigits ? ` ${nationalDigits}` : ' '}`;
  if (force || !input.value.trim() || input.value.trim() === `+${oldDialCode}` || input.value.trim() === `+${newDialCode}` || oldDialCode !== newDialCode) {
    input.value = nextValue;
  }

  input.dataset.previousDialCode = newDialCode;

  if (document.activeElement === input) {
    const caret = input.value.length;
    requestAnimationFrame(() => input.setSelectionRange(caret, caret));
  }
}

function initializePhoneInputs() {
  if (typeof window.intlTelInput === 'function') {
    phoneInputs.forEach((input) => {
      if (phoneInstances.has(input)) return;
      const iti = window.intlTelInput(input, {
        initialCountry: 'kz',
        preferredCountries: ['kz', 'ru', 'kg', 'uz', 'tr'],
        nationalMode: true,
        separateDialCode: true,
        autoPlaceholder: 'aggressive',
        formatOnDisplay: true,
        utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js'
      });
      phoneInstances.set(input, iti);
      input.dataset.itiInitialized = 'true';
      input.addEventListener('focus', () => {
        const form = input.closest('form');
        if (form) setFormStatus(form);
      });
      input.addEventListener('countrychange', () => {
        const form = input.closest('form');
        if (form) setFormStatus(form);
      });
    });
    return;
  }

  phoneInputs.forEach((input) => {
    input.addEventListener('focus', () => {
      if (!input.value.trim()) input.value = '+7 ';
    });
    input.addEventListener('input', () => {
      input.value = formatPhoneFallback(input.value);
    });
  });
}

function setFormStatus(form, message = '', type = '') {
  const status = form.querySelector('.form-status');
  if (!status) return;
  status.textContent = message;
  status.className = `form-status${type ? ` is-${type}` : ''}`;
}

function isValidEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

function validateForm(form) {
  const name = form.querySelector('[name="name"]')?.value.trim() || '';
  const phoneInput = form.querySelector('[name="phone"]');
  const rawPhone = phoneInput?.value.trim() || '';
  const email = form.querySelector('[name="email"]')?.value.trim() || '';
  const locale = translations[currentLanguage].form;
  const phoneInstance = phoneInput ? phoneInstances.get(phoneInput) : null;
  let phone = rawPhone;

  if (name.length < 2) {
    return { valid: false, message: locale.nameError };
  }

  if (phoneInstance) {
    if (!rawPhone || !phoneInstance.isValidNumber()) {
      return { valid: false, message: locale.phoneError };
    }
    phone = phoneInstance.getNumber();
  } else {
    const phoneDigits = rawPhone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return { valid: false, message: locale.phoneError };
    }
    phone = rawPhone.startsWith('+') ? rawPhone : `+${phoneDigits}`;
  }

  if (!isValidEmail(email)) {
    return { valid: false, message: locale.emailError };
  }

  return { valid: true, data: { name, phone, email } };
}

function sendToWhatsApp(form, data) {
  const { name = '', phone = '', email = '' } = data || {};
  const locale = translations[currentLanguage].form;
  const lines = [
    locale.intro,
    name ? `${locale.nameLabel}: ${name}` : '',
    phone ? `${locale.phoneLabel}: ${phone}` : '',
    email ? `${locale.emailLabel}: ${email}` : ''
  ].filter(Boolean);

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    const originalText = translations[currentLanguage].hero.submit;
    submitButton.textContent = locale.opening;
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1600);
  }

  const url = `https://wa.me/77017218762?text=${encodeURIComponent(lines.join('\n'))}`;
  const popup = window.open(url, '_blank', 'noopener');

  if (!popup) {
    setFormStatus(form, locale.popupBlocked, 'error');
    return;
  }

  setFormStatus(form, locale.success, 'success');
}

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const result = validateForm(form);

    if (!result.valid) {
      setFormStatus(form, result.message, 'error');
      return;
    }

    setFormStatus(form);
    sendToWhatsApp(form, result.data);
  });
});

const revealItems = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

revealItems.forEach((el, index) => {
  const group = el.closest('.stagger-group');
  if (group) {
    const siblings = [...group.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in')];
    const staggerIndex = siblings.indexOf(el);
    el.style.transitionDelay = `${Math.min(staggerIndex * 70, 280)}ms`;
  } else {
    el.style.transitionDelay = `${Math.min(index * 15, 120)}ms`;
  }
  revealObserver.observe(el);
});

const countItems = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.dataset.countAnimated = 'true';
        el.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(step);
    countObserver.unobserve(el);
  });
}, { threshold: 0.55 });

countItems.forEach((item) => countObserver.observe(item));

const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"], .mobile-menu a[href^="#"]')];
const uniqueSections = [...new Set(sectionLinks.map((link) => link.getAttribute('href')).filter(Boolean))]
  .map((href) => document.querySelector(href))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible?.target?.id) return;
  const id = `#${visible.target.id}`;
  sectionLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === id);
  });
}, { threshold: 0.35, rootMargin: '-20% 0px -55% 0px' });

uniqueSections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll('.tilt-card').forEach((card) => {
  if (prefersReducedMotion) return;

  card.addEventListener('mousemove', (event) => {
    if (window.innerWidth < 1024) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 5;
    const rotateX = (0.5 - (y / rect.height)) * 4;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

const hero = document.querySelector('.hero');
if (hero && !prefersReducedMotion) {
  let rafId = null;
  const updateHero = (event) => {
    const rect = hero.getBoundingClientRect();
    const moveX = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const moveY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    hero.style.setProperty('--hero-move-x', `${moveX}px`);
    hero.style.setProperty('--hero-move-y', `${moveY}px`);
    rafId = null;
  };

  hero.addEventListener('mousemove', (event) => {
    if (window.innerWidth < 1024) return;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => updateHero(event));
  });

  hero.addEventListener('mouseleave', () => {
    hero.style.removeProperty('--hero-move-x');
    hero.style.removeProperty('--hero-move-y');
  });
}

setHeaderState();
setProgress();
toggleBackToTop();
updateBurgerLabel(false);

window.addEventListener('scroll', () => {
  setHeaderState();
  setProgress();
  toggleBackToTop();
}, { passive: true });

window.addEventListener('resize', () => {
  if (window.innerWidth > 960) closeMenu();
  setHeaderState();
  setProgress();
}, { passive: true });
