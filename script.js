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
        steps: ["Прочитать основной файлик", "Прочитать файлик тестов", "Решить тест"],
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
        steps: ["Прочитать файлик", "Выполнить тест"],
        date: "2026-10-04",
        files: [
          { name: "ФИЗА_КОЛЛОК.pdf", url: "files/physio/ФИЗА_КОЛЛОК.pdf" }
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
        steps: ["Прочитать файлик (совмещён с краткими ответами)", "Посмотреть препараты", "Выполнить тест"],
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
        steps: ["Прочитать файлик «МИКРА_6.pdf»", "Выполнить тест"],
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
        steps: ["Материалы появятся позже", "Следите за обновлениями"],
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
//  НАСТРОЙКИ
// ============================================================

// 👇 Общий объём в байтах (можно завысить). 13000000 ≈ 12.4 МБ
var MANUAL_SIZE_BYTES = 13000000;

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
  var el = document.getElementById("time-counter");
  if (el) {
    el.textContent = "Вы на этом устройстве: " + formatDuration(getTotalTime());
  }

  var deviceEl = document.getElementById("stat-device");
  if (deviceEl) {
    deviceEl.textContent = formatDuration(getCurrentTime());
  }

  setInterval(function () {
    var current = getCurrentTime();

    if (el) {
      el.textContent = "Вы на этом устройстве: " + formatDuration(current);
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
  for (var i = 0; i < target; i++) {
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
  Array.prototype.slice.call(modal.classList).forEach(function (cls) {
    if (cls.indexOf("modal--") === 0 && cls !== "modal--open") {
      modal.classList.remove(cls);
    }
  });
  modal.classList.add("modal--" + colorKey);
}

function buildDots() {
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

  modalSteps.innerHTML = "";
  topic.steps.forEach(function (step) {
    var li = document.createElement("li");
    li.textContent = step;
    modalSteps.appendChild(li);
  });

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

  var dots = modalDots.querySelectorAll(".modal__dot");
  dots.forEach(function (dot, i) {
    dot.classList.toggle("modal__dot--active", i === index);
  });
}

function openModal(key) {
  if (!subjects[key] || !subjects[key].topics.length) return;

  currentSubject = key;
  var startIndex = (key === "recent") ? 0 : subjects[key].topics.length - 1;

  buildDots();
  showTopic(startIndex);

  modal.classList.add("modal--open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("modal--open");
  document.body.style.overflow = "";
}

function initModal() {
  cacheModalElements();

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
});