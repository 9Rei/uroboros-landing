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
          "Решить тест",
        ],
        date: "2026-10-10",
        files: [
          { name: "БХ_2.2", url: "files/БХ_2.2.pdf" },
          { name: "БХ_2.2ТЕСТЫ", url: "files/БХ_2.2ТЕСТЫ.pdf" },
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
          "Следите за обновлениями",
        ],
        date: "2026-09-01",
        files: [
          { name: "Пока пусто", url: "#" },
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
          "Следите за обновлениями",
        ],
        date: "2026-09-01",
        files: [
          { name: "Пока пусто", url: "#" },
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
          "Посмотреть видеоразбор по теме",
        ],
        date: "2026-10-10",
        files: [
          { name: "МИКРА_6.pdf", url: "files/МИКРА_6.pdf" },
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
          "Следите за обновлениями",
        ],
        date: "2026-09-01",
        files: [
          { name: "Пока пусто", url: "#" },
        ]
      }
    ]
  },
  recent: {
    num: "∞",
    title: "Недавно обновлённые",
    topics: [
    ]
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
