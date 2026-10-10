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
          { name: "БХ_2.2.pdf", url: "files/БХ_2.2.pdf" },
          { name: "БХ_2.2ТЕСТЫ.pdf", url: "files/БХ_2.2ТЕСТЫ.pdf" }
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
      },
      {
        num: "23",
        title: "Пищеварение в желудке",
        steps: [
          "Прочитать файлик",
          "Выполнить тест"
        ],
        date: "2026-10-16",
        files: [
          { name: "ГИСТА_23.pdf", url: "files/ГИСТА_23.pdf" }
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
//  ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
// ============================================================

(function initTheme() {
  var saved = localStorage.getItem("theme");
  var systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  var theme = saved || (systemLight ? "light" : "dark");
  if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
})();

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", function () {
    var isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
});


// ============================================================
//  ЛОГИКА
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

function buildRecent() {
  var allTopics = [];
  Object.keys(subjects).forEach(function (key) {
    if (key === "recent") return;
    var section = subjects[key];
    if (!section || !Array.isArray(section.topics)) return;
    section.topics.forEach(function (topic) {
      allTopics.push(Object.assign({}, topic, { sectionTitle: section.title, sectionKey: key }));
    });
  });
  allTopics.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  subjects.recent.topics = allTopics.filter(function (t) { return daysSince(t.date) <= 30; });
}
buildRecent();

function fillCards() {
  var cardsContainer = document.querySelector(".cards");
  if (!cardsContainer) return;
  var cards = Array.prototype.slice.call(cardsContainer.querySelectorAll(".card"));
  var cardsWithData = cards.map(function (card) {
    var key = card.dataset.subject;
    var section = subjects[key];
    if (!section || !section.topics.length) return { card: card, key: key, sortKey: "" };
    var lastTopic = section.topics[section.topics.length - 1];
    var lastEl = card.querySelector("[data-last-topic]");
    if (lastEl) lastEl.textContent = lastTopic.title;
    var badge = card.querySelector("[data-badge]");
    if (badge && daysSince(lastTopic.date) < 1) {
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
  regular.concat(special).forEach(function (item) { cardsContainer.appendChild(item.card); });
}
fillCards();


// ============================================================
//  ПЛАВНАЯ ПРОКРУТКА
// ============================================================

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


// ============================================================
//  МОДАЛЬНОЕ ОКНО
// ============================================================

var currentSubject = null;
var currentTopicIndex = 0;

var modal        = document.getElementById("modal");
var modalSection = document.getElementById("modal-section");
var modalNum     = document.getElementById("modal-num");
var modalTitle   = document.getElementById("modal-title");
var modalDate    = document.getElementById("modal-date");
var modalSteps   = document.getElementById("modal-steps");
var modalFiles   = document.getElementById("modal-files");
var modalDots    = document.getElementById("modal-dots");

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

  if (daysSince(topic.date) < 1) {
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

document.querySelectorAll(".card").forEach(function (card) {
  card.addEventListener("click", function (e) {
    e.preventDefault();
    var key = card.dataset.subject;
    if (!subjects[key]) return;
    if (!subjects[key].topics.length) return;

    currentSubject = key;
    var startIndex = (key === "recent") ? 0 : subjects[key].topics.length - 1;

    buildDots();
    showTopic(startIndex);

    modal.classList.add("modal--open");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("modal--open");
  document.body.style.overflow = "";
}

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