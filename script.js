// ============================================================
//  ДАННЫЕ САЙТА
// ============================================================

const subjects = {
  biochem: {
    num: "01",
    title: "Биохимия",
    topics: [
      {
        num: "2.2",
        title: "Транскрипция, трансляция. ДНК технологии в медицине. Экспрессия генов",
        steps: [
          "Прочитать файлик",
          "Прочитать тесты",
          "Выполнить тест"
        ],
        date: "2026-10-10",
        files: [
          { name: "БХ_2.2.pdf", url: "files/БХ_2.2.pdf" }
        ]
      }
    ]
  },
  physio: {
    num: "02",
    title: "Физиология",
    topics: [
      {
        title: "Раздел в разработке",
        steps: [
          "Материалы появятся позже",
          "Следите за обновлениями"
        ],
        date: "2026-09-01",
        files: [
          { name: "Пока пусто", url: "#" }
        ]
      }
    ]
  },
  histology: {
    num: "03",
    title: "Гистология",
    topics: [
      {
        title: "Раздел в разработке",
        steps: [
          "Материалы появятся позже",
          "Следите за обновлениями"
        ],
        date: "2026-09-01",
        files: [
          { name: "Пока пусто", url: "#" }
        ]
      }
    ]
  },
  microbio: {
    num: "04",
    title: "Микробиология",
    topics: [
      {
        title: "Инфекция, инфекционный процесс. Факторы патогенности бактерий.",
        steps: [
          "Прочитать файлик «МИКРА_6.pdf»",
          "Выполнить тест",
          "Посмотреть видеоразбор по теме"
        ],
        date: "2026-10-10",
        files: [
          { name: "МИКРА_6.pdf", url: "files/МИКРА_6.pdf" }
        ]
      }
    ]
  },
  hygiene: {
    num: "05",
    title: "Гигиена",
    topics: [
      {
        title: "Раздел в разработке",
        steps: [
          "Материалы появятся позже",
          "Следите за обновлениями"
        ],
        date: "2026-09-01",
        files: [
          { name: "Пока пусто", url: "#" }
        ]
      }
    ]
  },
  recent: {
    num: "∞",
    title: "Недавно обновлённые",
    topics: []
  }
};

// ============================================================
//  ГЛОБАЛЬНАЯ МАКСИМАЛЬНАЯ ДАТА (для определения "нового")
// ============================================================

let globalMaxDate = null;

function calcGlobalMaxDate() {
  let maxTime = 0;

  Object.keys(subjects).forEach(key => {
    if (key === 'recent') return;
    const section = subjects[key];
    section.topics.forEach(topic => {
      const t = new Date(topic.date).getTime();
      if (!isNaN(t) && t > maxTime) maxTime = t;
    });
  });

  globalMaxDate = maxTime > 0 ? maxTime : null;
}

function isTopicFresh(topic) {
  if (!globalMaxDate) return false;

  const t = new Date(topic.date).getTime();
  if (isNaN(t)) return false;

  const DAY = 1000 * 60 * 60 * 24;
  return (globalMaxDate - t) < DAY;
}

// ============================================================
//  ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
// ============================================================

(function initTheme() {
  const saved = localStorage.getItem('theme');
  const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  const theme = saved || (systemLight ? 'light' : 'dark');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
});

// ============================================================
//  ЛОГИКА
// ============================================================

function formatDate(dateInput) {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return dateInput;
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function findLatestTopicIndex(topics) {
  if (!topics.length) return 0;

  let maxTime = -Infinity;
  let maxIdx = 0;

  topics.forEach((topic, i) => {
    const t = new Date(topic.date).getTime();
    if (!isNaN(t) && t >= maxTime) {
      maxTime = t;
      maxIdx = i;
    }
  });

  return maxIdx;
}

function buildRecent() {
  const allTopics = [];

  Object.keys(subjects).forEach(key => {
    if (key === 'recent') return;
    const section = subjects[key];
    section.topics.forEach(topic => {
      allTopics.push({
        ...topic,
        sectionTitle: section.title,
        sectionKey: key
      });
    });
  });

  allTopics.sort((a, b) => new Date(b.date) - new Date(a.date));

  subjects.recent.topics = allTopics;
}
buildRecent();

function fillCards() {
  const cardsContainer = document.querySelector('.cards');
  if (!cardsContainer) return;

  const cards = Array.from(cardsContainer.querySelectorAll('.card'));

  const cardsWithData = cards.map(card => {
    const key = card.dataset.subject;
    const section = subjects[key];
    if (!section || !section.topics.length) return { card, key, sortKey: '' };

    const latestIdx = findLatestTopicIndex(section.topics);
    const lastTopic = section.topics[latestIdx];
    const isPlaceholder = lastTopic.title === 'Раздел в разработке';

    const lastEl = card.querySelector('[data-last-topic]');
    if (lastEl) lastEl.textContent = lastTopic.title;

    const badge = card.querySelector('[data-badge]');
    if (badge
        && key !== 'recent'
        && !isPlaceholder
        && isTopicFresh(lastTopic)) {
      badge.textContent = 'NEW';
      badge.classList.add('card__badge--show');
    }

    return { card, key, sortKey: section.title };
  });

  const regular = cardsWithData.filter(c => c.key !== 'recent');
  const special = cardsWithData.filter(c => c.key === 'recent');

  regular.sort((a, b) => a.sortKey.localeCompare(b.sortKey, 'ru'));

  regular.forEach((item, i) => {
    const numEl = item.card.querySelector('.card__num');
    if (numEl) numEl.textContent = String(i + 1).padStart(2, '0');
  });

  special.forEach(item => {
    const numEl = item.card.querySelector('.card__num');
    if (numEl) numEl.textContent = '∞';
  });

  const ordered = [...regular, ...special];
  ordered.forEach(({ card }) => cardsContainer.appendChild(card));
}

calcGlobalMaxDate();
fillCards();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

let currentSubject = null;
let currentTopicIndex = 0;

const modal = document.getElementById('modal');
const modalSection = document.getElementById('modal-section');
const modalNum = document.getElementById('modal-num');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalSteps = document.getElementById('modal-steps');
const modalFiles = document.getElementById('modal-files');
const modalDots = document.getElementById('modal-dots');

function applyAccentTheme(colorKey) {
  [...modal.classList].forEach(c => {
    if (c.startsWith('modal--') && c !== 'modal--open') {
      modal.classList.remove(c);
    }
  });
  modal.classList.add('modal--' + colorKey);
}

function buildDots() {
  modalDots.innerHTML = '';
  const topics = subjects[currentSubject].topics;
  topics.forEach((topic, i) => {
    const btn = document.createElement('button');
    btn.className = 'modal__dot';
    btn.textContent = topic.num || String(i + 1).padStart(2, '0');
    btn.addEventListener('click', () => showTopic(i));
    modalDots.appendChild(btn);
  });
}

function showTopic(index) {
  const topics = subjects[currentSubject].topics;

  if (index < 0) index = topics.length - 1;
  if (index >= topics.length) index = 0;

  currentTopicIndex = index;
  const topic = topics[index];

  const colorKey = (currentSubject === 'recent' && topic.sectionKey)
    ? topic.sectionKey
    : currentSubject;
  applyAccentTheme(colorKey);

  modalSection.textContent = subjects[currentSubject].title;
  modalNum.textContent = topic.num || String(index + 1).padStart(2, '0');
  modalTitle.textContent = topic.title;

  modalDate.innerHTML = '';
  const dateText = document.createElement('span');
  dateText.textContent = 'Добавлено ' + formatDate(topic.date);
  modalDate.appendChild(dateText);

  const isPlaceholder = topic.title === 'Раздел в разработке';
  if (currentSubject !== 'recent' && !isPlaceholder && isTopicFresh(topic)) {
    const tag = document.createElement('span');
    tag.className = 'modal__date-tag';
    tag.textContent = 'NEW';
    modalDate.appendChild(tag);
  }

  modalSteps.innerHTML = '';
  topic.steps.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    modalSteps.appendChild(li);
  });

  modalFiles.innerHTML = '';
  topic.files.forEach(file => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = file.url;
    a.textContent = file.name;
    a.target = '_blank';
    a.rel = 'noopener';
    li.appendChild(a);
    modalFiles.appendChild(li);
  });

  const dots = modalDots.querySelectorAll('.modal__dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('modal__dot--active', i === index);
  });
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const key = card.dataset.subject;
    if (!subjects[key]) return;
    if (!subjects[key].topics.length) return;

    currentSubject = key;

    let startIndex;
    if (key === 'recent') {
      startIndex = 0;
    } else {
      startIndex = findLatestTopicIndex(subjects[key].topics);
    }

    buildDots();
    showTopic(startIndex);

    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', () => {
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
  });
});

document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('modal--open')) return;

  if (e.key === 'Escape') {
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
  }
  if (e.key === 'ArrowLeft') showTopic(currentTopicIndex - 1);
  if (e.key === 'ArrowRight') showTopic(currentTopicIndex + 1);
});