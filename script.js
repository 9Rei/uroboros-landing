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
          "Прочитать основной файлик",
          "Прочитать файлик тестов",
          "Решить тест"
        ],
        date: "2026-10-10",
        files: [
          { name: "БХ_2.2.pdf", url: "files/biochem/БХ_2.2.pdf" },
          { name: "БХ_2.2ТЕСТЫ.pdf", url: "files/biochem/БХ_2.2ТЕСТЫ.pdf" }
        ]
      }
    ]
  },

  physio: {
    num: "02",
    title: "Физиология",
    topics: [
      {
        num: "1.5",
        title: "КОЛЛОКВИУМ по разделу «Общая физиология»",
        steps: [
          "Прочитать файлик",
          "Выполнить тест"
        ],
        date: "2026-10-04",
        files: [
          { name: "ФИЗА_КОЛЛОК.pdf", url: "files/physio/ФИЗА_КОЛЛОК.pdf" }
        ]
      },
      {
        num: "2.1",
        title: "Общие принципы регуляции. Рефлекторная деятельность ЦНС. Особенности распространения возбуждения и торможения в ЦНС. Клинико-физиологическая оценка рефлекторной деятельности.",
        steps: [
          "Сделать конспект по ДЗ (либо по лекции)",
          "Прочитать файл тестов",
          "Выполнить тест"
        ],
        date: "2026-10-11",
        files: [
          { name: "ФИЗА_2.1ТЕСТЫ.pdf", url: "files/physio/ФИЗА_2.1ТЕСТЫ.pdf" }
        ]
      }
    ]
  },

  histology: {
    num: "03",
    title: "Гистология",
    topics: [
      {
        num: "23",
        title: "Пищеварительная система. Морфологическая характеристика переднего отдела пищеварительной системы: органы ротовой полости, пищевод",
        steps: [
          "Прочитать файлик (совмещён с краткими ответами)",
          "Посмотреть препараты",
          "Выполнить тест"
        ],
        date: "2026-10-07",
        files: [
          { name: "ГИСТА_23.pdf", url: "files/histology/ГИСТА_23.pdf" },
          { name: "ГИСТА_23ПРЕПАРАТЫ.pdf", url: "files/histology/ГИСТА_23ПРЕПАРАТЫ.pdf" }
        ]
      }
    ]
  },

  microbio: {
    num: "04",
    title: "Микробиология",
    topics: [
      {
        num: "06",
        title: "Инфекция, инфекционный процесс. Факторы патогенности бактерий",
        steps: [
          "Прочитать файлик «МИКРА_6.pdf»",
          "Выполнить тест"
        ],
        date: "2026-10-10",
        files: [
          { name: "МИКРА_6.pdf", url: "files/microbio/МИКРА_6.pdf" }
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
//  РАСПИСАНИЕ
// ============================================================

const schedule = {
  "ПН": [
    {
      time: "8:00–10:25",
      title: "Микробио",
      room: "239 каб.",
      teacher: "Тимонов Андрей Викторович",
      place: "Папанинцев, 126"
    },
    {
      time: "10:40–13:05",
      title: "Биохимия",
      room: "305 каб.",
      teacher: "Волобой Нина Леонидовна",
      place: "Папанинцев, 126"
    }
  ],

  "ВТ": [
    {
      time: "8:00–9:30",
      title: "ОМиПК",
      subgroups: [
        { label: "А", room: "48 каб.", teacher: "Старчикова Маргарита Валерьевна" },
        { label: "Б", room: "43 каб.", teacher: "Кленова Анна Фёдоровна" }
      ],
      place: "Комсомольский, 82"
    },
    {
      time: "9:40–11:10",
      title: "Биоэтика",
      subgroups: [
        { label: "А", room: "53 каб.", teacher: "Кочетова Юлия Юрьевна" },
        { label: "Б", room: "55 каб.", teacher: "Вольферц Марина Валерьевна" }
      ],
      place: "Комсомольский, 82"
    },
    {
      time: "13:00–14:30",
      title: "ЛЕКЦИЯ",
      subtitle: "Бх \\ мира \\ этика",
      isLecture: true
    },
    {
      time: "14:40–16:10",
      title: "ЛЕКЦИЯ",
      subtitle: "Гг \\ бжд \\ истмед",
      isLecture: true
    }
  ],

  "СР": [
    {
      time: "8:00–10:25",
      title: "БЖД",
      room: "220 каб.",
      teacher: "Асманова Мария Андреевна",
      place: "Некрасова, 65"
    },
    {
      time: "10:40–13:05",
      title: "Гигиена",
      room: "133 каб.",
      teacher: "Ушаков Александр Анатольевич",
      place: "Некрасова, 65"
    },
    {
      time: "14:40–16:10",
      title: "ЛЕКЦИЯ",
      subtitle: "н.физ \\ гист \\ омипк",
      isLecture: true
    }
  ],

  "ЧТ": [
    {
      time: "8:00–10:25",
      title: "Норм физа",
      room: "409 каб.",
      teacher: "Шахматов Игорь Ильич",
      place: "Папанинцев, 126"
    },
    {
      time: "10:35–12:05",
      title: "Истмед (1 нед.)",
      room: "326 каб.",
      teacher: "Кулипанова Наталья Викторовна",
      place: "Папанинцев, 126"
    }
  ],

  "ПТ": [
    {
      time: "10:30–12:00",
      title: "Физра",
      room: "4 каб.",
      teacher: "Воронцов Павел Геннадьевич",
      place: "Некрасова, 65"
    },
    {
      time: "13:30–15:55",
      title: "Гиста",
      room: "433 каб.",
      teacher: "Грибанова Ольга Геннадьевна",
      place: "Папанинцев, 126"
    }
  ],

  "СБ": [
    {
      time: "9:40–11:10",
      title: "ЛЕКЦИЯ",
      subtitle: "истмед",
      isLecture: true
    }
  ]
};

// ============================================================
//  ДАТЫ ЛЕКЦИЙ
// ============================================================

// Год, для которого указаны даты (можно менять)
var LECTURE_YEAR = 2026;

// Время лекций по предмету (если разное — уточняйте)
var LECTURE_TIME = "13:00";

// Даты лекций — формат "ДД.ММ"
var lectureDates = {
  "Биохимия": ["01.09", "22.09", "13.10", "03.11", "17.11", "01.12", "15.12", "22.12"],
  "Микра":    ["08.09", "29.09", "20.10", "10.11"],
  "Биоэтика": ["15.09", "06.10", "27.10"],
  "Гигиена":  ["01.09", "22.09", "13.10", "27.10", "10.11", "24.11", "08.12", "22.12"],
  "БЖД":      ["08.09", "29.09", "20.10", "03.11", "17.11", "01.12", "15.12"],
  "Истмед":   ["12.09", "15.09", "26.09", "06.10", "10.10", "24.10", "07.11", "21.11", "29.12"],
  "Н. физ":   ["02.09", "16.09", "30.09", "14.10", "28.10", "18.11", "02.12", "16.12", "30.12"],
  "Гиста":    ["09.09", "07.10", "11.11", "09.12", "13.01"],
  "ОМиПК":    ["23.09", "21.10", "25.11", "23.12"]
};

// ============================================================
//  НАСТРОЙКИ
// ============================================================

// 👇 Общий объём в байтах (можно завысить). 4400000 ≈ 4.2 МБ
var MANUAL_SIZE_BYTES = 4400000;

// 👇 Сколько дней держать метку NEW
var NEW_DAYS = 2;

// ============================================================
//  ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================

function daysSince(dateInput) {
  var then = new Date(dateInput).getTime();
  if (isNaN(then)) return 999;
  return Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));
}

function formatDate(dateInput) {
  var d = new Date(dateInput);
  if (isNaN(d.getTime())) return dateInput;
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

function plural(n, one, few, many) {
  var mod10 = n % 10;
  var mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

function formatSize(bytes) {
  if (bytes < 1024) return { value: bytes, unit: "Б" };
  if (bytes < 1024 * 1024) return { value: Math.round(bytes / 1024), unit: "КБ" };
  if (bytes < 1024 * 1024 * 1024) return { value: (bytes / 1024 / 1024).toFixed(1), unit: "МБ" };
  return { value: (bytes / 1024 / 1024 / 1024).toFixed(2), unit: "ГБ" };
}

// ============================================================
//  HERO — ПРИВЕТСТВИЕ
// ============================================================

function initGreeting() {
  var el = document.getElementById("greeting");
  if (!el) return;

  var h = new Date().getHours();
  var first, second;

  if (h >= 5 && h < 12)      { first = "Доброе утро!"; second = "Готовы к учёбе?"; }
  else if (h >= 12 && h < 18){ first = "Добрый день!"; second = "Загляните в материалы."; }
  else if (h >= 18 && h < 23){ first = "Добрый вечер!"; second = "Повторим пройденное?"; }
  else                       { first = "Не спится?";   second = "Конспекты ждут."; }

  el.innerHTML = first + '<br><span class="accent">' + second + "</span>";
}

// ============================================================
//  HERO — ДАТА В БЕЙДЖЕ
// ============================================================

function initTodayBadge() {
  var el = document.getElementById("today-badge");
  if (!el) return;

  var text = new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  el.textContent = text.charAt(0).toUpperCase() + text.slice(1);
}

// ============================================================
//  СЧЁТЧИК ВРЕМЕНИ НА УСТРОЙСТВЕ
// ============================================================

var TIME_STORAGE_KEY = "uroboros_time_total_seconds";
var SESSION_START = Date.now();

function formatDuration(totalSeconds) {
  var h = Math.floor(totalSeconds / 3600);
  var m = Math.floor((totalSeconds % 3600) / 60);

  if (h > 0) return h + " ч " + m + " мин";
  if (m > 0) return m + " мин";
  return "< 1 мин";
}

function saveSessionTime() {
  var elapsed = Math.round((Date.now() - SESSION_START) / 1000);
  if (elapsed < 1) return;

  var total = parseInt(localStorage.getItem(TIME_STORAGE_KEY) || "0", 10);
  localStorage.setItem(TIME_STORAGE_KEY, total + elapsed);

  SESSION_START = Date.now();
}

function getTotalTime() {
  return parseInt(localStorage.getItem(TIME_STORAGE_KEY) || "0", 10);
}

function getCurrentTime() {
  return getTotalTime() + Math.round((Date.now() - SESSION_START) / 1000);
}

function initTimeCounter() {
  var footerEl = document.getElementById("time-counter");
  var deviceEl = document.getElementById("stat-device");

  if (footerEl) {
    footerEl.textContent = "Вы на этом устройстве: " + formatDuration(getTotalTime());
  }

  setInterval(function () {
    var current = getCurrentTime();

    if (footerEl) {
      footerEl.textContent = "Вы на этом устройстве: " + formatDuration(current);
    }
    if (deviceEl) {
      deviceEl.textContent = formatDuration(current);
    }
  }, 30000);

  window.addEventListener("beforeunload", saveSessionTime);

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") saveSessionTime();
  });
}

// ============================================================
//  HERO — СТАТИСТИКА
// ============================================================

function computeTopicsCount() {
  var total = 0;
  Object.keys(subjects).forEach(function (key) {
    if (key === "recent") return;
    var section = subjects[key];
    if (!section || !Array.isArray(section.topics)) return;
    section.topics.forEach(function (topic) {
      if (topic.title === "Раздел в разработке") return;
      total++;
    });
  });
  return total;
}

function animateNumber(el, target, decimals) {
  var duration = 1200;
  var start = performance.now();
  var numericTarget = parseFloat(target);

  function step(now) {
    var p = Math.min((now - start) / duration, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    var current = numericTarget * eased;

    el.textContent = decimals > 0 ? current.toFixed(decimals) : Math.round(current);

    if (p < 1) requestAnimationFrame(step);
    else el.textContent = decimals > 0 ? numericTarget.toFixed(decimals) : numericTarget;
  }
  requestAnimationFrame(step);
}

function animateDuration(el, targetSeconds) {
  var duration = 1200;
  var start = performance.now();
  var targetMinutes = Math.floor(targetSeconds / 60);

  if (targetMinutes === 0) {
    el.textContent = "< 1 мин";
    return;
  }

  function step(now) {
    var p = Math.min((now - start) / duration, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    var currentMinutes = Math.round(targetMinutes * eased);

    if (currentMinutes === 0) {
      el.textContent = "< 1 мин";
    } else {
      var h = Math.floor(currentMinutes / 60);
      var m = currentMinutes % 60;
      el.textContent = h > 0 ? (h + " ч " + m + " мин") : (m + " мин");
    }

    if (p < 1) requestAnimationFrame(step);
    else el.textContent = formatDuration(targetSeconds);
  }
  requestAnimationFrame(step);
}

function animateTopicsMerge(target) {
  var dotsContainer = document.getElementById("stat-topics-dots");
  var numberEl = document.getElementById("stat-topics");
  if (!dotsContainer || !numberEl) return;

  dotsContainer.innerHTML = "";
  dotsContainer.classList.remove("stat__dots--merge");
  numberEl.classList.remove("stat__number--visible");
  numberEl.textContent = "";

  var dotDelay = 500;
  var mergeDelay = 700;

  var dots = [];
  var totalDots = 5;
  for (var i = 0; i < totalDots; i++) {
    var dot = document.createElement("span");
    dot.className = "stat__dot";
    dotsContainer.appendChild(dot);
    dots.push(dot);
  }

  dots.forEach(function (dot, i) {
    setTimeout(function () {
      dot.classList.add("stat__dot--visible");
    }, 200 + i * dotDelay);
  });

  var mergeTime = 200 + target * dotDelay + mergeDelay;

  setTimeout(function () {
    dotsContainer.classList.add("stat__dots--merge");
    setTimeout(function () {
      numberEl.textContent = target;
      numberEl.classList.add("stat__number--visible");
    }, 200);
  }, mergeTime);
}

function initHeroStats() {
  var container = document.getElementById("hero-stats");
  if (!container) return;

  var sizeData = formatSize(MANUAL_SIZE_BYTES);
  var topicsCount = computeTopicsCount();

  var run = function () {
    var sizeEl   = document.getElementById("stat-size");
    var deviceEl = document.getElementById("stat-device");
    var topicsEl = document.getElementById("stat-topics");

    if (sizeEl) {
      var decimals = (sizeData.unit === "МБ" || sizeData.unit === "ГБ") ? 1 : 0;
      animateNumber(sizeEl, sizeData.value, decimals);

      var unitSpan = sizeEl.parentElement.querySelector(".stat__unit");
      if (!unitSpan) {
        unitSpan = document.createElement("span");
        unitSpan.className = "stat__unit";
        sizeEl.parentElement.appendChild(unitSpan);
      }
      unitSpan.textContent = sizeData.unit;
    }

    if (deviceEl) {
      animateDuration(deviceEl, getCurrentTime());
    }

    if (topicsEl) animateTopicsMerge(topicsCount);
  };

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        run();
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  obs.observe(container);
}

// ============================================================
//  «НЕДАВНО ОБНОВЛЁННЫЕ»
// ============================================================

function buildRecent() {
  var allTopics = [];
  Object.keys(subjects).forEach(function (key) {
    if (key === "recent") return;
    var section = subjects[key];
    if (!section || !Array.isArray(section.topics)) return;
    section.topics.forEach(function (topic) {
      allTopics.push(Object.assign({}, topic, {
        sectionTitle: section.title,
        sectionKey: key
      }));
    });
  });
  allTopics.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  subjects.recent.topics = allTopics.filter(function (t) {
    return daysSince(t.date) <= 30;
  });
}

// ============================================================
//  ЗАПОЛНЕНИЕ КАРТОЧЕК
// ============================================================

function fillCards() {
  var container = document.querySelector(".cards");
  if (!container) return;

  var cards = Array.prototype.slice.call(container.querySelectorAll(".card"));

  var cardsWithData = cards.map(function (card) {
    var key = card.dataset.subject;
    var section = subjects[key];
    if (!section || !section.topics.length) return { card: card, key: key, sortKey: "" };

    var lastTopic = section.topics[section.topics.length - 1];

    var lastEl = card.querySelector("[data-last-topic]");
    if (lastEl) lastEl.textContent = lastTopic.title;

    var badge = card.querySelector("[data-badge]");
    if (badge && daysSince(lastTopic.date) < NEW_DAYS) {
      badge.textContent = "NEW";
      badge.classList.add("card__badge--show");
    }

    return { card: card, key: key, sortKey: section.title || "" };
  });

  var regular = cardsWithData.filter(function (c) { return c.key !== "recent"; });
  var special = cardsWithData.filter(function (c) { return c.key === "recent"; });

  regular.sort(function (a, b) { return a.sortKey.localeCompare(b.sortKey, "ru"); });

  regular.forEach(function (item, i) {
    var numEl = item.card.querySelector(".card__num");
    if (numEl) numEl.textContent = String(i + 1).padStart(2, "0");
  });

  special.forEach(function (item) {
    var numEl = item.card.querySelector(".card__num");
    if (numEl) numEl.textContent = "∞";
  });

  regular.concat(special).forEach(function (item) {
    container.appendChild(item.card);
  });
}

// ============================================================
//  ПЛАВНАЯ ПРОКРУТКА
// ============================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
}

// ============================================================
//  МОДАЛЬНОЕ ОКНО
// ============================================================

var currentSubject = null;
var currentTopicIndex = 0;

var modal, modalSection, modalNum, modalTitle, modalDate, modalSteps, modalFiles, modalDots;

function cacheModalElements() {
  modal        = document.getElementById("modal");
  modalSection = document.getElementById("modal-section");
  modalNum     = document.getElementById("modal-num");
  modalTitle   = document.getElementById("modal-title");
  modalDate    = document.getElementById("modal-date");
  modalSteps   = document.getElementById("modal-steps");
  modalFiles   = document.getElementById("modal-files");
  modalDots    = document.getElementById("modal-dots");
}

function applyAccentTheme(colorKey) {
  if (!modal) return;
  Array.prototype.slice.call(modal.classList).forEach(function (cls) {
    if (cls.indexOf("modal--") === 0 && cls !== "modal--open") {
      modal.classList.remove(cls);
    }
  });
  modal.classList.add("modal--" + colorKey);
}

function buildDots() {
  if (!modalDots) return;
  modalDots.innerHTML = "";
  var topics = subjects[currentSubject].topics;
  topics.forEach(function (topic, i) {
    var btn = document.createElement("button");
    btn.className = "modal__dot";
    btn.textContent = topic.num || String(i + 1).padStart(2, "0");
    btn.addEventListener("click", function () { showTopic(i); });
    modalDots.appendChild(btn);
  });
}

function showTopic(index) {
  if (!modalTitle || !modalSection || !modalNum) return;

  var topics = subjects[currentSubject].topics;
  if (index < 0) index = topics.length - 1;
  if (index >= topics.length) index = 0;

  currentTopicIndex = index;
  var topic = topics[index];

  var colorKey = (currentSubject === "recent" && topic.sectionKey)
    ? topic.sectionKey
    : currentSubject;
  applyAccentTheme(colorKey);

  modalSection.textContent = subjects[currentSubject].title;
  modalNum.textContent = topic.num || String(index + 1).padStart(2, "0");

  modalTitle.textContent = topic.title;
  modalTitle.classList.remove("modal__title--open");
  modalTitle.classList.remove("modal__title--clamped");

  requestAnimationFrame(function () {
    var isClamped = modalTitle.scrollHeight > modalTitle.clientHeight + 2;
    modalTitle.classList.toggle("modal__title--clamped", isClamped);
  });

  if (modalDate) {
    modalDate.innerHTML = "";
    var dateText = document.createElement("span");
    dateText.textContent = "Добавлено " + formatDate(topic.date);
    modalDate.appendChild(dateText);

    if (daysSince(topic.date) < NEW_DAYS) {
      var tag = document.createElement("span");
      tag.className = "modal__date-tag";
      tag.textContent = "NEW";
      modalDate.appendChild(tag);
    }
  }

  if (modalSteps) {
    modalSteps.innerHTML = "";
    topic.steps.forEach(function (step) {
      var li = document.createElement("li");
      li.textContent = step;
      modalSteps.appendChild(li);
    });
  }

  if (modalFiles) {
    modalFiles.innerHTML = "";
    topic.files.forEach(function (file) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = file.url;
      a.textContent = file.name;
      a.target = "_blank";
      a.rel = "noopener";
      li.appendChild(a);
      modalFiles.appendChild(li);
    });
  }

  if (modalDots) {
    var dots = modalDots.querySelectorAll(".modal__dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("modal__dot--active", i === index);
    });
  }
}

function openModal(key) {
  if (!subjects[key] || !subjects[key].topics.length) return;
  if (!modal) return;

  currentSubject = key;
  var startIndex = (key === "recent") ? 0 : subjects[key].topics.length - 1;

  buildDots();
  showTopic(startIndex);

  modal.classList.add("modal--open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("modal--open");
  document.body.style.overflow = "";
  if (modalTitle) {
    modalTitle.classList.remove("modal__title--open");
    modalTitle.classList.remove("modal__title--clamped");
  }
}

function initModal() {
  cacheModalElements();

  // Защита: если на странице нет модалки (например, hub.html) — выходим
  if (!modal) return;

  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(card.dataset.subject);
    });
  });

  document.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
    el.addEventListener("touchend", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("modal--open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") showTopic(currentTopicIndex - 1);
    if (e.key === "ArrowRight") showTopic(currentTopicIndex + 1);
  });

  if (modalTitle) {
    modalTitle.addEventListener("click", function () {
      if (!modalTitle.classList.contains("modal__title--clamped") &&
          !modalTitle.classList.contains("modal__title--open")) {
        return;
      }
      modalTitle.classList.toggle("modal__title--open");
    });
  }
}

// ============================================================
//  ГРАФИК НАКОПИТЕЛЬНОГО РОСТА
// ============================================================

function collectTopicsByDate() {
  var topics = [];
  Object.keys(subjects).forEach(function (key) {
    if (key === "recent") return;
    var section = subjects[key];
    if (!section || !Array.isArray(section.topics)) return;
    section.topics.forEach(function (topic) {
      if (topic.title === "Раздел в разработке") return;
      topics.push({
        title: topic.title,
        date: new Date(topic.date),
        sectionTitle: section.title
      });
    });
  });
  topics.sort(function (a, b) { return a.date - b.date; });
  return topics;
}

function initGrowthChart() {
  var svg = document.getElementById("growth-svg");
  var axis = document.getElementById("growth-axis");
  if (!svg || !axis) return;

  var topics = collectTopicsByDate();

  var totalEl = document.getElementById("growth-total");
  var weekEl  = document.getElementById("growth-week");
  var lastEl  = document.getElementById("growth-last");

  if (totalEl) totalEl.textContent = topics.length;

  if (weekEl) {
    var weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    var weekCount = topics.filter(function (t) { return t.date >= weekAgo; }).length;
    weekEl.textContent = weekCount;
  }

  if (lastEl && topics.length) {
    var last = topics[topics.length - 1];
    lastEl.textContent = last.sectionTitle;
  }

  if (!topics.length) { axis.innerHTML = ""; return; }

  var startDate = topics[0].date;
  var endDate = new Date();
  var dayMs = 1000 * 60 * 60 * 24;
  var totalDays = Math.max(1, Math.ceil((endDate - startDate) / dayMs));

  var points = [];
  var count = 0;
  var idx = 0;

  for (var i = 0; i <= totalDays; i++) {
    var day = new Date(startDate.getTime() + i * dayMs);
    while (idx < topics.length && topics[idx].date <= day) {
      count++;
      idx++;
    }
    points.push({ x: i / totalDays, y: count });
  }

  var W = 600, H = 200, PAD = 20;
  var maxY = Math.max(1, points[points.length - 1].y);

  function toX(p) { return PAD + p.x * (W - PAD * 2); }
  function toY(p) { return H - PAD - (p.y / maxY) * (H - PAD * 2); }

  var linePath = "M " + points.map(function (p) {
    return toX(p).toFixed(1) + " " + toY(p).toFixed(1);
  }).join(" L ");

  var areaPath = linePath +
    " L " + toX(points[points.length - 1]).toFixed(1) + " " + (H - PAD) +
    " L " + toX(points[0]).toFixed(1) + " " + (H - PAD) + " Z";

  svg.innerHTML =
    '<defs>' +
      '<linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#a3e635" stop-opacity="0.35"/>' +
        '<stop offset="100%" stop-color="#a3e635" stop-opacity="0"/>' +
      '</linearGradient>' +
    '</defs>' +
    '<path class="growth__area" d="' + areaPath + '" />' +
    '<path class="growth__line" d="' + linePath + '" />';

  var shownY = -1;
  points.forEach(function (p, i) {
    var isChange = p.y !== shownY;
    var isEdge = (i === 0 || i === points.length - 1);

    if (!isChange && !isEdge) return;
    shownY = p.y;

    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", toX(p));
    circle.setAttribute("cy", toY(p));
    circle.setAttribute("r", "4");
    circle.setAttribute("class", "growth__point");
    circle.style.animationDelay = (1 + i * 0.02) + "s";
    svg.appendChild(circle);
  });

  var months = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  var labels = [];
  var labelCount = Math.min(5, totalDays);

  for (var j = 0; j <= labelCount; j++) {
    var d = new Date(startDate.getTime() + (totalDays * j / labelCount) * dayMs);
    labels.push(d.getDate() + " " + months[d.getMonth()]);
  }

  axis.innerHTML = labels.map(function (l) { return "<span>" + l + "</span>"; }).join("");
}

// ============================================================
//  ЦЕНТР — РАСПИСАНИЕ (мини → полное)
// ============================================================

function initSchedule() {
  var container = document.getElementById("hub-schedule");
  if (!container) return;

  var days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  var dayNames = {
    "ПН": "Понедельник",
    "ВТ": "Вторник",
    "СР": "Среда",
    "ЧТ": "Четверг",
    "ПТ": "Пятница",
    "СБ": "Суббота"
  };

  var jsDay = new Date().getDay();
  var todayKey = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"][jsDay];

  var now = new Date();
  var nowMinutes = now.getHours() * 60 + now.getMinutes();

  function parseTime(str) {
    if (!str) return null;
    var parts = str.split(/[–—-]/).map(function (s) { return s.trim(); });
    if (parts.length !== 2) return null;

    function toMin(t) {
      var m = t.match(/(\d{1,2}):(\d{2})/);
      if (!m) return null;
      return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
    }

    var start = toMin(parts[0]);
    var end = toMin(parts[1]);
    if (start === null || end === null) return null;
    return { start: start, end: end };
  }

  function isLessonNow(lesson) {
    var t = parseTime(lesson.time);
    if (!t) return false;
    return nowMinutes >= t.start && nowMinutes <= t.end;
  }

  container.innerHTML = "";

  days.forEach(function (day) {
    var lessons = schedule[day] || [];

    var col = document.createElement("div");
    col.className = "sched-day";
    col.dataset.day = day;
    if (day === todayKey) col.classList.add("is-today");

    // Заголовок
    var head = document.createElement("div");
    head.className = "sched-day__head";
    head.innerHTML =
      '<span class="sched-day__short">' + day + '</span>' +
      '<span class="sched-day__full">' + dayNames[day] + '</span>';
    col.appendChild(head);

    // Список пар
    var list = document.createElement("div");
    list.className = "sched-day__list";

    if (!lessons.length) {
      var empty = document.createElement("div");
      empty.className = "sched-day__empty";
      empty.textContent = "Пар нет";
      list.appendChild(empty);
    } else {
      lessons.forEach(function (lesson) {
        var item = document.createElement("div");
        item.className = "sched-item";
        if (lesson.isLecture) item.classList.add("sched-item--lecture");
        if (day === todayKey && isLessonNow(lesson)) {
          item.classList.add("sched-item--now");
        }

        // Компактная строка — всегда видна
        var compact = document.createElement("div");
        compact.className = "sched-item__compact";
        compact.innerHTML =
          '<span class="sched-item__time">' + lesson.time + '</span>' +
          '<span class="sched-item__title">' + lesson.title + '</span>';
        item.appendChild(compact);

        // Полные детали — появляются при раскрытии дня
        var details = document.createElement("div");
        details.className = "sched-item__details";

        if (lesson.subtitle) {
          var sub = document.createElement("div");
          sub.className = "sched-item__subtitle";
          sub.textContent = lesson.subtitle;
          details.appendChild(sub);
        }

        // Обычная пара
        if (lesson.room || lesson.teacher || lesson.place) {
          var info = document.createElement("div");
          info.className = "sched-item__info";
          if (lesson.room) info.innerHTML += "<span>" + lesson.room + "</span>";
          if (lesson.teacher) info.innerHTML += "<span>" + lesson.teacher + "</span>";
          if (lesson.place) info.innerHTML += "<span>" + lesson.place + "</span>";
          details.appendChild(info);
        }

        // Подгруппы
        if (lesson.subgroups) {
          var subs = document.createElement("div");
          subs.className = "sched-item__subs";
          lesson.subgroups.forEach(function (s) {
            var subEl = document.createElement("div");
            subEl.className = "sched-item__sub";
            subEl.innerHTML =
              '<span class="sched-item__sub-label">' + s.label + '</span>' +
              '<span class="sched-item__sub-room">' + s.room + '</span>' +
              '<span class="sched-item__sub-teacher">' + s.teacher + '</span>';
            subs.appendChild(subEl);
          });
          details.appendChild(subs);

          if (lesson.place) {
            var place = document.createElement("div");
            place.className = "sched-item__info";
            place.innerHTML = "<span>" + lesson.place + "</span>";
            details.appendChild(place);
          }
        }

        item.appendChild(details);
        list.appendChild(item);
      });
    }

    col.appendChild(list);
    container.appendChild(col);
  });

  // Клик по дню — раскрыть / свернуть
  container.querySelectorAll(".sched-day").forEach(function (col) {
    col.addEventListener("click", function (e) {
      // Игнорируем клики внутри пунктов (например, по ссылке-файлу)
      var wasActive = col.classList.contains("is-open");

      container.querySelectorAll(".sched-day").forEach(function (c) {
        c.classList.remove("is-open");
      });

      if (!wasActive) col.classList.add("is-open");
    });
  });
}

// ============================================================
//  ЦЕНТР — ТАБЫ И ПОИСК
// ============================================================

function initHub() {
  var tabs = document.querySelectorAll(".hub__tab");
  var panels = document.querySelectorAll(".hub__panel");
  if (!tabs.length || !panels.length) return;

  // 1. Переключение вкладок
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.dataset.tab;

      tabs.forEach(function (t) { t.classList.remove("is-active"); });
      panels.forEach(function (p) { p.classList.remove("is-active"); });

      tab.classList.add("is-active");
      var panel = document.querySelector('[data-panel="' + target + '"]');
      if (panel) panel.classList.add("is-active");

      if (target === "search") renderSearch("");
    });
  });

  // 2. Поиск
  var input = document.getElementById("hub-search-input");
  if (input) {
    input.addEventListener("input", function () {
      renderSearch(input.value.trim());
    });
  }

  // 3. Если поиск открыт сразу — рендерим пустой список
  renderSearch("");

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Подсвечивает совпадающие буквы зелёным
  function highlight(text, query) {
    if (!query) return escapeHtml(text);

    var safeText = escapeHtml(text);
    var safeQuery = escapeHtml(query);

    var lowerText = safeText.toLowerCase();
    var lowerQuery = safeQuery.toLowerCase();

    var out = "";
    var pos = 0;
    var idx = lowerText.indexOf(lowerQuery, pos);

    while (idx !== -1) {
      out += safeText.slice(pos, idx);
      out += '<mark class="hub__hl">' + safeText.slice(idx, idx + safeQuery.length) + '</mark>';
      pos = idx + safeQuery.length;
      idx = lowerText.indexOf(lowerQuery, pos);
    }
    out += safeText.slice(pos);
    return out;
  }

  function renderSearch(query) {
    var container = document.getElementById("hub-search-results");
    if (!container) return;

    container.innerHTML = "";

    var q = query.toLowerCase();
    var results = [];

    Object.keys(subjects).forEach(function (key) {
      if (key === "recent") return;
      var section = subjects[key];
      if (!section || !Array.isArray(section.topics)) return;

      section.topics.forEach(function (topic) {
        if (topic.title === "Раздел в разработке") return;

        var haystack = (topic.title + " " + section.title + " " + (topic.num || "")).toLowerCase();

        // При пустом запросе — показываем всё (прозрачно)
        if (q === "" || haystack.indexOf(q) !== -1) {
          results.push({
            key: key,
            sectionTitle: section.title,
            topic: topic
          });
        }
      });
    });

    // Сортируем: при пустом запросе — по дате (свежие сверху), иначе — по релевантности
    if (q === "") {
      results.sort(function (a, b) {
        return new Date(b.topic.date) - new Date(a.topic.date);
      });
    } else {
      results.sort(function (a, b) {
        var aTitle = a.topic.title.toLowerCase();
        var bTitle = b.topic.title.toLowerCase();
        var aStarts = aTitle.indexOf(q) === 0 ? 0 : 1;
        var bStarts = bTitle.indexOf(q) === 0 ? 0 : 1;
        return aStarts - bStarts;
      });
    }

    results = results.slice(0, 50);

    if (!results.length) {
      container.innerHTML = '<div class="hub__empty">Ничего не найдено</div>';
      return;
    }

    // Если пустой запрос — показываем счётчик и подсказку
    if (q === "") {
      var hint = document.createElement("div");
      hint.className = "hub__search-hint";
      hint.textContent = "Все материалы · " + results.length + " " +
        plural(results.length, "тема", "темы", "тем");
      container.appendChild(hint);
    }

    results.forEach(function (r) {
      var div = document.createElement("a");
      div.href = "#";
      div.className = "hub__result" + (q === "" ? " hub__result--dim" : "");

      div.innerHTML =
        '<div class="hub__result-title">' +
          highlight(r.topic.title, query) +
        '</div>' +
        '<div class="hub__result-meta">' +
          highlight(r.sectionTitle, query) +
          (r.topic.num ? ' · ' + highlight(r.topic.num, query) : '') +
          (r.topic.date ? ' · ' + formatDate(r.topic.date) : '') +
        '</div>';

      div.addEventListener("click", function (e) {
        e.preventDefault();
        openModal(r.key);
        setTimeout(function () {
          var topics = subjects[r.key].topics;
          var idx = topics.indexOf(r.topic);
          if (idx !== -1) showTopic(idx);
        }, 50);
      });

      container.appendChild(div);
    });
  }
}

// ============================================================
//  БЛИЖАЙШАЯ ЛЕКЦИЯ
// ============================================================

function getNextLecture() {
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var next = null;

  Object.keys(lectureDates).forEach(function (subject) {
    lectureDates[subject].forEach(function (dateStr) {
      var parts = dateStr.split(".");
      if (parts.length !== 2) return;

      var day = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10) - 1; // JS: месяцы с 0

      var d = new Date(LECTURE_YEAR, month, day);
      d.setHours(0, 0, 0, 0);

      if (d >= today) {
        if (!next || d < next.date) {
          next = { date: d, subject: subject, dateStr: dateStr };
        }
      }
    });
  });

  return next;
}

function initNextLecture() {
  var el = document.getElementById("next-lecture");
  if (!el) return;

  var next = getNextLecture();

  // Все лекции прошли
  if (!next) {
    el.innerHTML =
      '<div class="next-lecture__label">Ближайшая лекция</div>' +
      '<div class="next-lecture__text">Все лекции этого семестра прошли</div>';
    return;
  }

  // Есть следующая лекция
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var diffDays = Math.round((next.date - today) / (1000 * 60 * 60 * 24));

  var whenText;
  if (diffDays === 0)      whenText = "сегодня";
  else if (diffDays === 1) whenText = "завтра";
  else if (diffDays === 2) whenText = "послезавтра";
  else                     whenText = "через " + diffDays + " " + plural(diffDays, "день", "дня", "дней");

  var dayName = next.date.toLocaleDateString("ru-RU", { weekday: "long" });
  dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

  var dateFormatted = next.date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

  el.innerHTML =
    '<div class="next-lecture__label">Ближайшая лекция</div>' +
    '<div class="next-lecture__text">' +
      '<strong>' + next.subject + '</strong>' +
      ' · ' + dayName.toLowerCase() + ', ' + dateFormatted +
      ', ' + LECTURE_TIME +
      ' · ' + whenText +
    '</div>';
}

// ============================================================
//  ИНИЦИАЛИЗАЦИЯ
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  initGreeting();
  initTodayBadge();
  initTimeCounter();
  initHeroStats();
  buildRecent();
  fillCards();
  initSmoothScroll();
  initModal();
  initGrowthChart();
  initHub();
  initSchedule();
  initNextLecture();
});