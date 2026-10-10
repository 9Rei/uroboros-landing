// ============================================================
//  ДАННЫЕ САЙТА
// ============================================================
//
//  КАК ДОБАВИТЬ ТЕМУ:
//  1. Найди нужный раздел.
//  2. Скопируй блок { ... } в конец topics.
//  3. Заполни поля: num, title, steps, date, files.
//
//  ПРО date:
//    Формат: 'ГГГГ-ММ-ДД'  (например '2026-10-10')
//    Просто вписывай дату вручную.
//
// ============================================================

const subjects = {
  biochem: {
    num: '01',
    title: 'Биохимия',
    topics: [
      {
        num: '01',
        title: 'Раздел в разработке',
        steps: [
          'Материалы появятся позже',
          'Следите за обновлениями'
        ],
        date: '2025-08-30',
        files: [
          { name: 'Пока пусто', url: '#' }
        ]
      }
    ]
  },
  physio: {
    num: '02',
    title: 'Физиология',
    topics: [
      {
        num: '01',
        title: 'Раздел в разработке',
        steps: [
          'Материалы появятся позже',
          'Следите за обновлениями'
        ],
        date: '2025-08-30',
        files: [
          { name: 'Пока пусто', url: '#' }
        ]
      }
    ]
  },
  histology: {
    num: '03',
    title: 'Гистология',
    topics: [
      {
        num: '01',
        title: 'Раздел в разработке',
        steps: [
          'Материалы появятся позже',
          'Следите за обновлениями'
        ],
        date: '2025-08-30',
        files: [
          { name: 'Пока пусто', url: '#' }
        ]
      }
    ]
  },
  microbio: {
    num: '04',
    title: 'Микробиология',
    topics: [
      {
        num: '06',
        title: 'Инфекция, инфекционный процесс. Факторы патогенности бактерий.',
        steps: [
          'Прочитать файлик «МИКРА_6.pdf»',
          'Выполнить тест',
          'Посмотреть видеоразбор по теме',
          'P.s. Вот так вот'
        ],
        date: '2026-10-10',
        files: [
          { name: 'МИКРА_6.pdf', url: 'files/МИКРА_6.pdf' }
        ]
      }
    ]
  },
  hygiene: {
    num: '05',
    title: 'Гигиена',
    topics: [
      {
        num: '01',
        title: 'Раздел в разработке',
        steps: [
          'Материалы появятся позже',
          'Следите за обновлениями'
        ],
        date: '2025-08-30',
        files: [
          { name: 'Пока пусто', url: '#' }
        ]
      }
    ]
  },
  recent: {
    num: '∞',
    title: 'Недавно обновлённые',
    topics: []
  }
};

// ============================================================
//  ЛОГИКА
// ============================================================

function daysSince(dateInput) {
  const then = new Date(dateInput).getTime();
  if (isNaN(then)) return 999; // защита от неправильной даты
  const now = Date.now();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

function formatDate(dateInput) {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return dateInput; // если дата битая — показываем как есть
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function buildRecent() {
  const allTopics = [];

  Object.keys(subjects).forEach(key => {
    if (key === 'recent') return;
    const section = subjects[key];
    section.topics.forEach(topic => {
      allTopics.push({
        ...topic,
        sectionTitle: section.title
      });
    });
  });

  allTopics.sort((a, b) => new Date(b.date) - new Date(a.date));

  subjects.recent.topics = allTopics.filter(t => daysSince(t.date) <= 30);
}
buildRecent();

function fillCards() {
  document.querySelectorAll('.card').forEach(card => {
    const key = card.dataset.subject;
    const section = subjects[key];
    if (!section || !section.topics.length) return;

    const lastTopic = section.topics[section.topics.length - 1];

    const lastEl = card.querySelector('[data-last-topic]');
    if (lastEl) lastEl.textContent = lastTopic.title;

    const badge = card.querySelector('[data-badge]');
    if (badge && daysSince(lastTopic.date) < 1) {
      badge.textContent = 'NEW';
      badge.classList.add('card__badge--show');
    }
  });
}
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
const prevBtn = document.getElementById('modal-prev');
const nextBtn = document.getElementById('modal-next');

function buildDots() {
  modalDots.innerHTML = '';
  const topics = subjects[currentSubject].topics;
  topics.forEach((topic, i) => {
    const btn = document.createElement('button');
    btn.className = 'modal__dot';
    btn.textContent = topic.num;
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

  modalSection.textContent = subjects[currentSubject].title;
  modalNum.textContent = topic.num;
  modalTitle.textContent = topic.title;

  modalDate.innerHTML = '';
  const dateText = document.createElement('span');
  dateText.textContent = 'Добавлено ' + formatDate(topic.date);
  modalDate.appendChild(dateText);

  if (daysSince(topic.date) < 1) {
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

    const startIndex = (key === 'recent')
      ? 0
      : subjects[key].topics.length - 1;

    buildDots();
    showTopic(startIndex);

    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  });
});

prevBtn.addEventListener('click', () => showTopic(currentTopicIndex - 1));
nextBtn.addEventListener('click', () => showTopic(currentTopicIndex + 1));

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