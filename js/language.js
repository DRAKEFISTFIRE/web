let translations = {};
let currentLang = 'en';

async function initLanguage() {
  try {
    const res = await fetch('/js/cv.json');
    translations = await res.json();
    const saved = localStorage.getItem('portfolio-lang') || 'en';
    applyLanguage(saved, false);
    const sel = document.getElementById('languageSelect');
    if (sel) sel.value = saved;
  } catch (e) {
    console.error('Could not load translations:', e);
  }
}

function t(section, key) {
  return translations[currentLang]?.[section]?.[key]
      || translations['en']?.[section]?.[key]
      || '';
}

function applyLanguage(lang, animate = true) {
  currentLang = lang;
  localStorage.setItem('portfolio-lang', lang);
  document.documentElement.lang = lang;

  if (animate) {
    document.body.style.transition = 'opacity .25s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      updateDOM();
      document.body.style.opacity = '1';
    }, 250);
  } else {
    updateDOM();
  }
}

function updateDOM() {
  /* ── NAV ── */
  setText('[data-i18n="nav.about"]',       t('nav','about'));
  setText('[data-i18n="nav.skills"]',      t('nav','skills'));
  setText('[data-i18n="nav.services"]',    t('nav','services'));
  setText('[data-i18n="nav.craft"]',       t('nav','craft'));
  setText('[data-i18n="nav.experience"]',  t('nav','experience'));
  setText('[data-i18n="nav.projects"]',    t('nav','projects'));
  setText('[data-i18n="nav.contact"]',     t('nav','contact'));

  /* ── MOBILE NAV ── */
  setText('[data-i18n="mnav.about"]',      t('mobile_nav','about'));
  setText('[data-i18n="mnav.skills"]',     t('mobile_nav','skills'));
  setText('[data-i18n="mnav.services"]',   t('mobile_nav','services'));
  setText('[data-i18n="mnav.craft"]',      t('mobile_nav','craft'));
  setText('[data-i18n="mnav.experience"]', t('mobile_nav','experience'));
  setText('[data-i18n="mnav.projects"]',   t('mobile_nav','projects'));
  setText('[data-i18n="mnav.contact"]',    t('mobile_nav','contact'));

  /* ── HERO ── */
  setText('[data-i18n="hero.tag"]',         t('hero','tag'));
  setText('[data-i18n="hero.cta_primary"]', t('hero','cta_primary'));
  setText('[data-i18n="hero.cta_ghost"]',   t('hero','cta_ghost'));
  setText('[data-i18n="hero.scroll"]',      t('hero','scroll'));
  const roleEl = document.querySelector('[data-i18n="hero.role"]');
  if (roleEl) {
    const em = roleEl.querySelector('em');
    roleEl.childNodes[0].textContent = 'Full Stack Developer — ';
    if (em) em.textContent = t('hero','role_em');
  }

  /* ── ABOUT ── */
  setText('[data-i18n="about.tag"]',         t('about','tag'));
  setText('[data-i18n="about.title_1"]',     t('about','title_1'));
  setText('[data-i18n="about.title_2"]',     t('about','title_2'));
  setText('[data-i18n="about.tagline"]',     t('about','tagline'));
  setText('[data-i18n="about.heading_1"]',   t('about','heading_1'));
  setText('[data-i18n="about.heading_2"]',   t('about','heading_2'));
  setText('[data-i18n="about.p1"]',          t('about','p1'));
  setText('[data-i18n="about.p2"]',          t('about','p2'));
  setText('[data-i18n="about.p3"]',          t('about','p3'));
  setText('[data-i18n="about.p4"]',          t('about','p4'));
  setText('[data-i18n="about.lang_en"]',     t('about','lang_en'));
  setText('[data-i18n="about.lang_es"]',     t('about','lang_es'));
  setText('[data-i18n="about.lang_ca"]',     t('about','lang_ca'));
  setAll('[data-i18n="about.stat_years"]',   t('about','stat_years'));
  setText('[data-i18n="about.stat_tech"]',   t('about','stat_tech'));
  setText('[data-i18n="about.stat_projects"]',t('about','stat_projects'));
  setText('[data-i18n="about.float_label"]', t('about','float_label'));

  /* ── SKILLS ── */
  setText('[data-i18n="skills.tag"]',            t('skills','tag'));
  setText('[data-i18n="skills.title_1"]',        t('skills','title_1'));
  setText('[data-i18n="skills.title_2"]',        t('skills','title_2'));
  setText('[data-i18n="skills.tab_languages"]',  t('skills','tab_languages'));
  setText('[data-i18n="skills.tab_frameworks"]', t('skills','tab_frameworks'));
  setText('[data-i18n="skills.tab_tools"]',      t('skills','tab_tools'));

  /* ── SERVICES ── */
  setText('[data-i18n="services.tag"]',    t('services','tag'));
  setText('[data-i18n="services.title_1"]',t('services','title_1'));
  setText('[data-i18n="services.title_2"]',t('services','title_2'));
  for (let i = 1; i <= 6; i++) {
    setText(`[data-i18n="services.s${i}_name"]`, t('services',`s${i}_name`));
    setText(`[data-i18n="services.s${i}_desc"]`, t('services',`s${i}_desc`));
    setAll(`[data-i18n="services.s${i}_cta"]`,   t('services',`s${i}_cta`));
  }

  /* ── CRAFT ── */
  setText('[data-i18n="craft.tag"]',          t('craft','tag'));
  setText('[data-i18n="craft.title_1"]',      t('craft','title_1'));
  setText('[data-i18n="craft.title_2"]',      t('craft','title_2'));
  setText('[data-i18n="craft.statement_1"]',  t('craft','statement_1'));
  setText('[data-i18n="craft.statement_em"]', t('craft','statement_em'));
  setText('[data-i18n="craft.statement_2"]',  t('craft','statement_2'));
  setText('[data-i18n="craft.intro"]',        t('craft','intro'));
  for (let i = 1; i <= 7; i++) {
    setText(`[data-i18n="craft.p${i}_name"]`, t('craft',`p${i}_name`));
    setText(`[data-i18n="craft.p${i}_desc"]`, t('craft',`p${i}_desc`));
  }
  setText('[data-i18n="craft.bc1_eyebrow"]', t('craft','bc1_eyebrow'));
  setText('[data-i18n="craft.bc1_text"]',    t('craft','bc1_text'));
  setText('[data-i18n="craft.bc2_eyebrow"]', t('craft','bc2_eyebrow'));
  setText('[data-i18n="craft.bc2_text"]',    t('craft','bc2_text'));
  setText('[data-i18n="craft.bc3_eyebrow"]', t('craft','bc3_eyebrow'));
  setText('[data-i18n="craft.bc3_text"]',    t('craft','bc3_text'));
  setText('[data-i18n="craft.bc4_eyebrow"]', t('craft','bc4_eyebrow'));
  setText('[data-i18n="craft.bc5_eyebrow"]', t('craft','bc5_eyebrow'));
  setText('[data-i18n="craft.bc5_text"]',    t('craft','bc5_text'));

  /* ── EXPERIENCE ── */
  setText('[data-i18n="experience.tag"]',    t('experience','tag'));
  setText('[data-i18n="experience.title_1"]',t('experience','title_1'));
  setText('[data-i18n="experience.title_2"]',t('experience','title_2'));
  for (let i = 1; i <= 3; i++) {
    setText(`[data-i18n="experience.j${i}_role"]`, t('experience',`j${i}_role`));
    setText(`[data-i18n="experience.j${i}_desc"]`, t('experience',`j${i}_desc`));
  }

  /* ── PROJECTS ── */
  setText('[data-i18n="projects.tag"]',    t('projects','tag'));
  setText('[data-i18n="projects.title_1"]',t('projects','title_1'));
  setText('[data-i18n="projects.title_2"]',t('projects','title_2'));
  for (let i = 1; i <= 6; i++) {
    setAll(`[data-i18n="projects.p${i}_title"]`,  t('projects',`p${i}_title`));
    setAll(`[data-i18n="projects.p${i}_desc"]`,   t('projects',`p${i}_desc`));
    setAll(`[data-i18n="projects.p${i}_detail"]`, t('projects',`p${i}_detail`));
  }

  /* ── REAL PROJECTS ── */
  setText('[data-i18n="real_projects.tag"]',    t('real_projects','tag'));
  setText('[data-i18n="real_projects.title_1"]',t('real_projects','title_1'));
  setText('[data-i18n="real_projects.title_2"]',t('real_projects','title_2'));
  setAll('[data-i18n="real_projects.p1_title"]', t('real_projects','p1_title'));
  setAll('[data-i18n="real_projects.p1_desc"]',  t('real_projects','p1_desc'));
  setAll('[data-i18n="real_projects.p1_detail"]',t('real_projects','p1_detail'));
  setText('[data-i18n="real_projects.p1_link"]', t('real_projects','p1_link'));

  /* ── EDUCATION ── */
  setText('[data-i18n="education.tag"]',         t('education','tag'));
  setText('[data-i18n="education.title_1"]',     t('education','title_1'));
  setText('[data-i18n="education.title_2"]',     t('education','title_2'));
  setText('[data-i18n="education.formal_title"]',t('education','formal_title'));
  setText('[data-i18n="education.self_title"]',  t('education','self_title'));
  for (let i = 1; i <= 3; i++) {
    setText(`[data-i18n="education.e${i}_period"]`, t('education',`e${i}_period`));
    setText(`[data-i18n="education.e${i}_name"]`,   t('education',`e${i}_name`));
    setText(`[data-i18n="education.e${i}_inst"]`,   t('education',`e${i}_inst`));
  }
  for (let i = 1; i <= 5; i++) {
    setText(`[data-i18n="education.c${i}_name"]`, t('education',`c${i}_name`));
  }
  setAll('[data-i18n="education.done"]', t('education','done'));
  setAll('[data-i18n="education.wip"]',  t('education','wip'));

  /* ── SOFT SKILLS ── */
  setText('[data-i18n="softskills.tag"]',    t('softskills','tag'));
  setText('[data-i18n="softskills.title_1"]',t('softskills','title_1'));
  setText('[data-i18n="softskills.title_2"]',t('softskills','title_2'));
  for (let i = 1; i <= 7; i++) {
    setText(`[data-i18n="softskills.s${i}_name"]`, t('softskills',`s${i}_name`));
    setText(`[data-i18n="softskills.s${i}_desc"]`, t('softskills',`s${i}_desc`));
  }
  setText('[data-i18n="softskills.testimonial"]',      t('softskills','testimonial'));
  setText('[data-i18n="softskills.testimonial_role"]', t('softskills','testimonial_role'));

  /* ── CONTACT ── */
  setText('[data-i18n="contact.tag"]',     t('contact','tag'));
  setText('[data-i18n="contact.title_1"]', t('contact','title_1'));
  setText('[data-i18n="contact.title_2"]', t('contact','title_2'));
  const t3 = t('contact','title_3');
  const t3el = document.querySelector('[data-i18n="contact.title_3"]');
  if (t3el) t3el.style.display = t3 ? '' : 'none';
  if (t3el && t3) t3el.textContent = t3;
  setText('[data-i18n="contact.subtitle"]',t('contact','subtitle'));
  setText('[data-i18n="contact.loc"]',     t('contact','loc'));

  /* ── FOOTER ── */
  setText('[data-i18n="footer.copy"]', t('footer','copy'));
  setText('[data-i18n="footer.ig"]',   t('footer','ig'));
  setText('[data-i18n="footer.gh"]',   t('footer','gh'));
  setText('[data-i18n="footer.gh2"]',  t('footer','gh2'));
  setText('[data-i18n="footer.li"]',   t('footer','li'));
}

/* ── HELPERS ── */
function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el && value) el.textContent = value;
}

function setAll(selector, value) {
  const els = document.querySelectorAll(selector);
  els.forEach(el => { if (value) el.textContent = value; });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  const sel = document.getElementById('languageSelect');
  if (sel) {
    sel.addEventListener('change', (e) => applyLanguage(e.target.value));
  }
});