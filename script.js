// ============================================================
//   ДАННЫЕ ДЛЯ ГАЙДА
// ============================================================
const symptoms = [
    {
        id: 1,
        title: 'Терминологический коллапс',
        emoji: '📖',
        recipe: 'Скачай мой чек-лист из 50 самых частых латинских корней. Выучи их — и 70% терминов станут понятны интуитивно. Ссылка в описании основного сайта!'
    },
    {
        id: 2,
        title: 'Бездонный объем',
        emoji: '📚',
        recipe: 'Используй метод "3+1": за день разбери 3 сложные темы по 20 минут + 1 легкую для закрепления. Так ты пройдешь весь курс без выгорания.'
    },
    {
        id: 3,
        title: 'Страх анатомички',
        emoji: '🦴',
        recipe: 'Начни с атласа Неттера в формате "посмотри-закрой-воспроизведи". 5 минут в день на один муляж — и через неделю страх сменится интересом.'
    },
    {
        id: 4,
        title: 'Потеря времени',
        emoji: '⏰',
        recipe: 'На Uroboros я собрал ТОП-20 проверенных источников по каждому предмету. Забудь про гугление — всё уже в одном месте.'
    },
    {
        id: 5,
        title: 'Социальная изоляция',
        emoji: '🤝',
        recipe: 'Присоединяйся к нашему Telegram-чату для первокурсников. Там мы делимся конспектами, поддерживаем друг друга и находим друзей.'
    }
];

// ============================================================
//   ДАННЫЕ ДЛЯ ЧЕК-ЛИСТА
// ============================================================
const checklistData = [
    { icon: '🏛️', text: 'Найти корпуса и аудитории' },
    { icon: '📅', text: 'Скачать расписание занятий' },
    { icon: '📚', text: 'Взять учебники в библиотеке' },
    { icon: '🗂️', text: 'Создать папки по предметам' },
    { icon: '💬', text: 'Вступить в чат группы' },
    { icon: '🩺', text: 'Купить халат, хирургичку, шапочку, кроксы' },
    { icon: '😊', text: 'Запомнить: преподаватели не кусаются' },
    { icon: '🔑', text: 'Узнать логин и пароль от Moodle' },
    { icon: '📱', text: 'Установить нужные приложения' },
    { icon: '☕', text: 'Найти свою кофейню' }
];

// ============================================================
//   ЖДЁМ ЗАГРУЗКИ СТРАНИЦЫ
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

    console.log('✅ Страница загружена, начинаем...');

    // ============================================================
    //   1. ГАЙД (диагностика страхов)
    // ============================================================
    const guideList = document.getElementById('guideList');
    if (guideList) {
        symptoms.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'symptom-card fade-in';
            card.innerHTML = `
                <div class="symptom-card__header">
                    <span class="symptom-card__title">${item.emoji} ${item.title}</span>
                    <span class="symptom-card__icon">+</span>
                </div>
            `;
            card.addEventListener('click', () => {
                openModal(item);
            });
            guideList.appendChild(card);
        });
        console.log('✅ Гайд отрисован');
    } else {
        console.error('❌ guideList не найден');
    }

    // ============================================================
    //   2. ЧЕК-ЛИСТ
    // ============================================================
    const checklistList = document.getElementById('checklistList');
    window.completedCount = 0;
    window.totalChecklist = checklistData.length;

    if (checklistList) {
        checklistData.forEach((item) => {
            const el = document.createElement('div');
            el.className = 'checklist-item fade-in';
            el.innerHTML = `
                <span class="checklist-item__icon">${item.icon}</span>
                <span class="checklist-item__text">${item.text}</span>
                <span class="checklist-item__check">✓</span>
            `;
            
            el.addEventListener('click', function() {
                const isDone = this.classList.toggle('done');
                completedCount += isDone ? 1 : -1;
                updateProgress();
                
                if (isDone) {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 200);
                }
            });
            
            checklistList.appendChild(el);
        });
        console.log('✅ Чек-лист отрисован, пунктов: ' + checklistData.length);
    } else {
        console.error('❌ checklistList не найден!');
    }

    // ============================================================
    //   3. КАРУСЕЛЬ
    // ============================================================
    const slides = document.querySelectorAll('.carousel__slide');
    const dots = document.querySelectorAll('.carousel__dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;
    let autoplayInterval;

    if (slides.length > 0) {
        const captions = [
            '🚀 Максимальный комфорт — всё под рукой',
            '📖 Полная база по всем основным дисциплинам',
            '💎 Эксклюзивные материалы — от шпаргалок до глубоких руководств',
            '🎯 Никакого хаоса — только нужное в одном клике',
            '⚡ Огромный архив полезных файлов для быстрого старта'
        ];

        function goToSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
            
            const captionEl = document.getElementById('carouselCaption');
            if (captionEl) {
                captionEl.textContent = captions[index] || '';
            }
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        function prevSlide() {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        if (prevBtn) prevBtn.addEventListener('click', function() { prevSlide(); resetAutoplay(); });
        if (nextBtn) nextBtn.addEventListener('click', function() { nextSlide(); resetAutoplay(); });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goToSlide(index);
                resetAutoplay();
            });
        });

        function startAutoplay() {
            if (autoplayInterval) clearInterval(autoplayInterval);
            autoplayInterval = setInterval(nextSlide, 4000);
        }

        function resetAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
            startAutoplay();
        }

        startAutoplay();

        const carousel = document.getElementById('carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', function() {
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    autoplayInterval = null;
                }
            });
            carousel.addEventListener('mouseleave', function() {
                if (!autoplayInterval) startAutoplay();
            });
        }

        console.log('✅ Карусель запущена, слайдов: ' + slides.length);
    } else {
        console.error('❌ Слайды карусели не найдены');
    }

    // ============================================================
    //   4. АНИМАЦИЯ ПОЯВЛЕНИЯ
    // ============================================================
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(function(el) {
        observer.observe(el);
    });

    // ============================================================
    //   5. КНОПКИ ПЕРЕХОДА
    // ============================================================
    const mainSiteUrl = '#'; // ВСТАВЬ СВОЮ ССЫЛКУ

    const mainBtn = document.getElementById('mainSiteBtn');
    if (mainBtn) {
        mainBtn.addEventListener('click', function(e) {
            if (mainSiteUrl === '#') {
                e.preventDefault();
                alert('🔄 Вставь ссылку на Uroboros в переменную mainSiteUrl');
            } else {
                window.location.href = mainSiteUrl;
            }
        });
    }

    const ctaBtn = document.getElementById('ctaBtn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            if (mainSiteUrl === '#') {
                e.preventDefault();
                alert('🔄 Вставь ссылку на Uroboros в переменную mainSiteUrl');
            } else {
                window.location.href = mainSiteUrl;
            }
        });
    }

    // ============================================================
    //   6. ПЛАВНЫЙ СКРОЛЛ
    // ============================================================
    const scrollLink = document.querySelector('.hero__scroll');
    if (scrollLink) {
        scrollLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('guide').scrollIntoView({ behavior: 'smooth' });
        });
    }

    console.log('🐍 Uroboros полностью загружен!');

}); // КОНЕЦ DOMContentLoaded

// ============================================================
//   7. МОДАЛКА (вне DOMContentLoaded, чтобы была доступна глобально)
// ============================================================
const modalOverlay = document.getElementById('modalOverlay');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalBtn = document.getElementById('modalBtn');

let openedCount = 0;
const totalSymptoms = symptoms.length;

function openModal(item) {
    if (modalIcon) modalIcon.textContent = item.emoji;
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalBody) modalBody.innerHTML = '<p>' + item.recipe + '</p>';
    if (modalOverlay) modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (!item.opened) {
        item.opened = true;
        openedCount++;
        updateScore();
    }
}

function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBtn) modalBtn.addEventListener('click', closeModal);

if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

function updateScore() {
    const percent = Math.min(Math.round((openedCount / totalSymptoms) * 100), 100);
    const fill = document.getElementById('scoreFill');
    const text = document.getElementById('scorePercent');
    
    if (fill) fill.style.width = percent + '%';
    
    let emoji = '😰';
    if (percent >= 100) emoji = '🧘‍♂️';
    else if (percent >= 60) emoji = '😌';
    else if (percent >= 30) emoji = '🙂';
    
    if (text) text.textContent = percent + '% ' + emoji;
}

function updateProgress() {
    const percent = Math.min(Math.round((completedCount / totalChecklist) * 100), 100);
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressPercent');
    
    if (fill) fill.style.width = percent + '%';
    
    let emoji = '😅';
    if (percent >= 100) emoji = '🎉';
    else if (percent >= 70) emoji = '🔥';
    else if (percent >= 40) emoji = '💪';
    else if (percent >= 20) emoji = '📌';
    
    if (text) text.textContent = percent + '% ' + emoji;
}

// ============================================================
//   БОСС-ФАЙТ СО СТРАХАМИ (МОДАЛЬНОЕ ОКНО)
// ============================================================
const bossesData = [
    {
        id: 1,
        icon: '😣',
        name: 'Неуверенность в себе',
        maxHp: 10,
        recipe: 'Если ты здесь — значит, заслужил. Твой мозг пытается убедить тебя в обратном. Просто скажи ему: "Я справлюсь!"'
    },
    {
        id: 2,
        icon: '📚',
        name: 'Бездонный объём',
        maxHp: 9,
        recipe: 'Объём пугает, пока ты не привыкнешь. В начале — бери больше, чтобы войти в ритм. Выходные — не для отдыха от учёбы, а для закрепления пройденного. Так ты не догоняешь, а идёшь на шаг впереди.'
    },
    {
        id: 3,
        icon: '🤝',
        name: 'Стеснение перед новыми людьми',
        maxHp: 6,
        recipe: 'Ты думаешь, они круче? Они так же боятся выглядеть глупо. Заговори первым — и через пару дней у тебя уже будет своя компания для обедов и обсуждения преподов.'
    },
    {
        id: 4,
        icon: '⏰',
        name: 'Потеря времени',
        maxHp: 7,
        recipe: 'Учить так, как тебе удобно. На uroboros ты можешь поискать нужные тебе материалы. Не бойся пользоваться MedUniver и учебниками других ВУЗов.'
    },
    {
        id: 5,
        icon: '🎯',
        name: 'Перфекционизм',
        maxHp: 5,
        recipe: 'Ты не робот. 5 — это круто, но 4 — тоже отлично. Расслабься: в медицине главное — понимать суть, а не гнаться за идеалом.'
    }
];

// Элементы модалки
const bossModal = document.getElementById('bossModal');
const bossModalOverlay = document.getElementById('bossModalOverlay');
const bossModalClose = document.getElementById('bossModalClose');
const bossModalIcon = document.getElementById('bossModalIcon');
const bossModalName = document.getElementById('bossModalName');
const bossModalHpText = document.getElementById('bossModalHpText');
const bossModalHpFill = document.getElementById('bossModalHpFill');
const bossModalStatus = document.getElementById('bossModalStatus');
const bossModalRecipe = document.getElementById('bossModalRecipe');
const bossModalRecipeText = document.getElementById('bossModalRecipeText');
const bossModalAttack = document.getElementById('bossModalAttack');
const bossModalDefeat = document.getElementById('bossModalDefeat');

let currentBoss = null;
let currentHp = 0;
let currentMaxHp = 0;
let defeatedBosses = 0;
const totalBosses = bossesData.length;

// Функции
function updateFearProgress() {
    const percent = Math.min(Math.round((defeatedBosses / totalBosses) * 100), 100);
    const fill = document.getElementById('fearProgressFill');
    const text = document.getElementById('fearProgress');
    
    if (fill) fill.style.width = percent + '%';
    if (text) text.textContent = defeatedBosses + ' / ' + totalBosses;
    
    const victoryEl = document.getElementById('fearsVictory');
    if (victoryEl) {
        victoryEl.hidden = defeatedBosses < totalBosses;
    }
}

function openBossModal(boss) {
    currentBoss = boss;
    currentHp = boss.maxHp;
    currentMaxHp = boss.maxHp;
    
    bossModalIcon.textContent = boss.icon;
    bossModalName.textContent = boss.name;
    bossModalHpText.textContent = '❤️ ' + currentHp + '/' + currentMaxHp;
    bossModalHpFill.style.width = '100%';
    bossModalHpFill.className = 'boss-modal__hp-fill';
    bossModalStatus.textContent = 'Нажми "Атаковать", чтобы нанести удар! ⚔️';
    bossModalStatus.className = 'boss-modal__status';
    
    // СБРАСЫВАЕМ РЕЦЕПТ
    bossModalRecipe.classList.remove('show');
    bossModalRecipeText.textContent = '';
    
    bossModalAttack.disabled = false;
    bossModalAttack.innerHTML = '⚔️';  // ← ИЗМЕНЕНО С textContent НА innerHTML
    bossModalAttack.style.fontSize = '32px';
    bossModalDefeat.hidden = true;
    
    bossModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBossModal() {
    bossModal.classList.remove('active');
    document.body.style.overflow = '';
}

function attackBoss() {
    if (currentHp <= 0) return;
    
    const damage = Math.floor(Math.random() * 3) + 1;
    currentHp = Math.max(0, currentHp - damage);
    
    // Обновляем HP
    const percent = (currentHp / currentMaxHp) * 100;
    bossModalHpFill.style.width = percent + '%';
    bossModalHpText.textContent = '❤️ ' + currentHp + '/' + currentMaxHp;
    
    // Статус удара
    let statusMsg = '💥 Нанесён урон ' + damage + '!';
    let statusClass = 'success';
    
if (currentHp === 0) {
    statusMsg = '🎉 Босс повержен! Вот твой рецепт:';
    statusClass = 'defeated';
    bossModalAttack.disabled = true;
    bossModalAttack.innerHTML = '✅';  // ← МЕНЯЕМ НА ГАЛОЧКУ
    bossModalAttack.style.fontSize = '32px';
    bossModalDefeat.hidden = false;
    
    // ПОКАЗЫВАЕМ РЕЦЕПТ
    bossModalRecipeText.textContent = currentBoss.recipe;
    bossModalRecipe.classList.add('show');
    
    // Отмечаем босса побеждённым
    defeatedBosses++;
    updateFearProgress();
    updateBossCard(currentBoss.id);
    } else if (damage === 1) {
        statusMsg = '💥 Слабый удар! Нанесён урон ' + damage + '!';
        statusClass = 'fail';
    } else if (damage === 2) {
        statusMsg = '⚡ Хороший удар! Нанесён урон ' + damage + '!';
        statusClass = 'success';
    } else {
        statusMsg = '🔥 Критический удар! Нанесён урон ' + damage + '!';
        statusClass = 'success';
    }
    
    bossModalStatus.textContent = statusMsg;
    bossModalStatus.className = 'boss-modal__status ' + statusClass;
}

function updateBossCard(bossId) {
    const cards = document.querySelectorAll('.boss-card');
    cards.forEach(card => {
        if (parseInt(card.dataset.bossId) === bossId) {
            card.classList.remove('alive');
            card.classList.add('defeated');
            const icon = card.querySelector('.boss-card__icon');
            if (icon) icon.textContent = '✅';
        }
    });
}

function renderBosses() {
    const container = document.getElementById('fearsBosses');
    if (!container) return;
    
    container.innerHTML = '';
    
    bossesData.forEach((boss) => {
        const card = document.createElement('div');
        card.className = 'boss-card alive';
        card.dataset.bossId = boss.id;
        card.dataset.hp = boss.maxHp;
        card.dataset.maxHp = boss.maxHp;
        
        card.innerHTML = `
            <div class="boss-card__icon">${boss.icon}</div>
            <div class="boss-card__name">${boss.name}</div>
            <div class="boss-card__hp">❤️ ${boss.maxHp}/${boss.maxHp}</div>
            <div class="boss-card__hp-bar">
                <div class="boss-card__hp-fill" style="width: 100%;"></div>
            </div>
        `;
        
        card.addEventListener('click', function() {
            if (this.classList.contains('defeated')) return;
            const bossId = parseInt(this.dataset.bossId);
            const boss = bossesData.find(b => b.id === bossId);
            if (boss) openBossModal(boss);
        });
        
        container.appendChild(card);
    });
    
    updateFearProgress();
}

// Обработчики событий
bossModalAttack.addEventListener('click', attackBoss);

bossModalDefeat.addEventListener('click', closeBossModal);
bossModalClose.addEventListener('click', closeBossModal);
bossModalOverlay.addEventListener('click', closeBossModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && bossModal.classList.contains('active')) {
        closeBossModal();
    }
});

// Запуск
renderBosses();

// ============================================================
//   МИНИ-ИГРА: ПОИСК УЧЕБНИКОВ
// ============================================================
const TOTAL_CELLS = 16;
const BOOKS_TO_FIND = 4;

const dialogData = [
    // ===== ХОРОШИЕ С УЧЕБНИКОМ (4 шт) =====
    { 
        type: 'good', hasBook: true, icon: '📖', title: 'Старый конспект',
        text: 'Ты нашёл старый конспект старшекурсника с пометками на полях!',
        success: 'Ты переписал все схемы и пометки. Теперь ты понимаешь эту тему лучше всех в группе!',
        fail: 'Ты пролистал и выбросил, решив что там ерунда. А на экзамене попался вопрос именно оттуда...'
    },
    { 
        type: 'good', hasBook: true, icon: '📚', title: 'Сосед забыл учебник',
        text: 'Сосед по парте забыл учебник, а у тебя есть электронная версия.',
        success: 'Ты поделился файлом и объяснил сложные термины. Сосед сказал: "Ты лучший!"',
        fail: 'Ты сказал, что у тебя тоже нет. Сосед не выучил тему, а на зачёте ты тоже не смог ответить на вопрос.'
    },
    { 
        type: 'good', hasBook: true, icon: '📕', title: 'Забытый учебник',
        text: 'В читальном зале нашли забытый учебник по анатомии.',
        success: 'Ты сдал учебник на кафедру. А через пару дней та самая девушка с соседнего потока улыбнулась тебе.',
        fail: 'Ты оставил учебник себе. Но он оказался старым изданием с устаревшими данными. И совесть мучает.'
    },
    { 
        type: 'good', hasBook: true, icon: '📋', title: 'Методичка на кафедре',
        text: 'Преподаватель случайно оставил методичку на кафедре.',
        success: 'Ты сфотографировал самое важное и вернул на место. Препод заметил твою честность и запомнил.',
        fail: 'Ты забрал методичку. Но она оказалась черновиком с кучей ошибок. Учился по ней — и всё перепутал.'
    },

    // ===== ХОРОШИЕ БЕЗ УЧЕБНИКА (6 шт) =====
    { 
        type: 'good', hasBook: false, icon: '✅', title: 'Зачёт по латыни',
        text: 'Ты сдал зачёт по латыни! Преподаватель похвалил твой акцент.',
        success: 'Ты произнёс все термины идеально. Препод сказал: "Ты будешь отличным врачом". Ты запомнил это навсегда.',
        fail: 'Ты сдал, но с трудом. Препод сказал: "Учите язык, коллеги". Обидно, но это урок.'
    },
    { 
        type: 'good', hasBook: false, icon: '🌟', title: 'Похвала преподавателя',
        text: 'Тебя похвалили на лекции за правильный ответ.',
        success: 'Ты почувствовал уверенность и весь день ловил себя на мысли: "Я знаю больше, чем думал".',
        fail: 'Ты смутился и сказал: "Мне просто повезло". Препод пожал плечами и поставил в пример другого.'
    },
    { 
        type: 'good', hasBook: false, icon: '📚', title: 'Свободное место',
        text: 'В библиотеке нашлось свободное место в тихом зале.',
        success: 'Ты выучил за 2 часа больше, чем за неделю дома. Это теперь твоё место силы.',
        fail: 'Ты сел, но залип в телефоне. Время пролетело, а ты ничего не запомнил. Место заняли другие.'
    },
    { 
        type: 'good', hasBook: false, icon: '📄', title: 'Шпаргалки от друга',
        text: 'Друг поделился шпаргалками перед экзаменом.',
        success: 'Ты переделал шпаргалки в свои конспекты и сдал экзамен на отлично. Друг попросил у тебя списать.',
        fail: 'Ты решил, что шпаргалки — это спасение. Но забыл их дома. Пришлось надеяться на свою память.'
    },
    { 
        type: 'good', hasBook: false, icon: '💻', title: 'Ответы в интернете',
        text: 'Ты случайно нашёл ответы на предстоящий тест.',
        success: 'Ты закрыл вкладку и подготовился сам. На тесте ты ответил на все вопросы без единой ошибки.',
        fail: 'Ты скачал ответы. Но тест в последний момент изменили. Ты растерялся и провалил его.'
    },
    { 
        type: 'good', hasBook: false, icon: '🍲', title: 'Двойная порция',
        text: 'В столовой тебе наложили двойную порцию за ту же цену.',
        success: 'Ты поел и пошёл на пару с чувством сытости. День удался, энергия била ключом.',
        fail: 'Ты съел всё и застрял в столовой на час. Опоздал на пару, но зато был сыт.'
    },

    // ===== ПЛОХИЕ (6 шт) =====
    { 
        type: 'bad', hasBook: false, icon: '😰', title: 'Проспал лекцию',
        text: 'Ты проспал важную лекцию по анатомии.',
        success: 'Ты нашёл запись лекции в интернете и наверстал всё за вечер. Всё обошлось.',
        fail: 'Ты так и не узнал тему. На экзамене попался вопрос именно с этой лекции. Кошмар.'
    },
    { 
        type: 'bad', hasBook: false, icon: '😨', title: 'Вызвали к доске',
        text: 'Преподаватель вызвал тебя к доске, а ты не готов.',
        success: 'Ты честно сказал: "Я не готов, но хочу исправиться". Препод оценил честность и дал доп. вопрос.',
        fail: 'Ты начал что-то выдумывать. Препод понял всё и поставил двойку. Вся группа видела твой позор.'
    },
    { 
        type: 'bad', hasBook: false, icon: '💾', title: 'Потеря флешки',
        text: 'У тебя потерялась флешка с курсовой работой.',
        success: 'Ты нашёл её в компьютерном классе. Скажи спасибо тому, кто не забрал чужое.',
        fail: 'Ты переделывал всё с нуля до утра. Сдал с кучей ошибок и красными глазами.'
    },
    { 
        type: 'bad', hasBook: false, icon: '😤', title: 'Ссора с одногруппником',
        text: 'Ты поссорился с одногруппником из-за старых конспектов.',
        success: 'Ты подошёл и извинился. Вы помирились за кофе и обменялись полезными материалами.',
        fail: 'Ты не стал говорить первым. Теперь вы не разговариваете и делите группу на два лагеря.'
    },
    { 
        type: 'bad', hasBook: false, icon: '🩺', title: 'Забыл форму на практику',
        text: 'Ты забыл хирургичку на практику. Преподаватель уже ждёт.',
        success: 'Ты быстро съездил домой и вернулся как раз к началу. Препод ничего не заметил.',
        fail: 'Ты решил не ездить. Пришлось заниматься в чужой форме, которая была велика на два размера.'
    },
    { 
        type: 'bad', hasBook: false, icon: '🗑️', title: 'Удалил важный файл',
        text: 'Ты случайно удалил важный файл с докладом.',
        success: 'Ты нашёл программу для восстановления файлов. Доклад спасён за 10 минут!',
        fail: 'Ты попытался переделать всё за 2 часа. Получилась каша, препод был в шоке.'
    }
];

const gameState = {
    hp: 100,
    maxHp: 100,
    moves: 0,
    booksFound: 0,
    totalBooks: BOOKS_TO_FIND,
    visitedCells: new Set(),
    selectedCell: -1,
    bookPositions: [],
    cellEvents: [],
    cellResults: {},
    gameOver: false,
    victory: false,
    isDialogOpen: false,
    isProcessing: false
};

function initGame() {
    const shuffled = [...dialogData].sort(() => Math.random() - 0.5);
    gameState.cellEvents = shuffled.slice(0, TOTAL_CELLS);
    
    const availableGoodCells = [];
    for (let i = 0; i < TOTAL_CELLS; i++) {
        if (gameState.cellEvents[i] && gameState.cellEvents[i].hasBook) {
            availableGoodCells.push(i);
        }
    }
    const shuffledBooks = availableGoodCells.sort(() => Math.random() - 0.5);
    gameState.bookPositions = shuffledBooks.slice(0, BOOKS_TO_FIND);
    
    gameState.hp = gameState.maxHp;
    gameState.moves = 0;
    gameState.booksFound = 0;
    gameState.visitedCells = new Set();
    gameState.selectedCell = -1;
    gameState.cellResults = {};
    gameState.gameOver = false;
    gameState.victory = false;
    gameState.isDialogOpen = false;
    gameState.isProcessing = false;
    
    renderMap();
    updateStats();
    updateEventDisplay('📚', 'Найди учебники!', 'Выбери клетку на карте', '');
    document.getElementById('gameStatus').textContent = 'Выбери клетку';
}

function renderMap() {
    const map = document.getElementById('gameMap');
    if (!map) return;
    map.innerHTML = '';
    const icons = ['❓', '❓', '❓', '❓', '❓', '❓', '❓', '❓', '❓', '❓', '❓', '❓', '❓', '❓', '❓', '❓'];
    
    for (let i = 0; i < TOTAL_CELLS; i++) {
        const cell = document.createElement('div');
        cell.className = 'game__cell';
        cell.dataset.index = i;
        const isVisited = gameState.visitedCells.has(i);
        const isBookFound = gameState.bookPositions.includes(i) && gameState.visitedCells.has(i);
        const result = gameState.cellResults[i];
        
        if (isVisited) cell.classList.add('visited');
        if (isBookFound) cell.classList.add('book-found');
        if (result && isVisited) cell.classList.add('flip');
        
        let backContent = '';
        if (result) {
            if (result === 'book') backContent = `<span class="back-icon">📚</span><span class="back-label">Учебник!</span>`;
            else if (result === 'found') backContent = `<span class="back-icon">✅</span><span class="back-label">Найден!</span>`;
            else if (result === 'success') backContent = `<span class="back-icon">😊</span><span class="back-label">Успех!</span>`;
            else backContent = `<span class="back-icon">😢</span><span class="back-label">Провал...</span>`;
        } else {
            backContent = `<span class="back-icon">❓</span><span class="back-label">Клетка ${i+1}</span>`;
        }
        
        let backClass = '';
        if (result === 'success') backClass = 'success-bg';
        else if (result === 'fail') backClass = 'fail-bg';
        else if (result === 'book') backClass = 'book-bg';
        else if (result === 'found') backClass = 'found-bg';
        
        cell.innerHTML = `
            <div class="cell-inner">
                <div class="cell-front">
                    <span>${icons[i % icons.length]}</span>
                    <span class="cell-label">${i+1}</span>
                </div>
                <div class="cell-back ${backClass}">
                    ${backContent}
                </div>
            </div>
        `;
        
        cell.addEventListener('click', function() {
            if (gameState.gameOver) return;
            if (gameState.isDialogOpen) return;
            if (gameState.isProcessing) return;
            const index = parseInt(this.dataset.index);
            if (gameState.visitedCells.has(index)) {
                updateEventDisplay('♻️', 'Уже были здесь', 'Выбери другую клетку', '');
                return;
            }
            gameState.selectedCell = index;
            openDialog(index);
        });
        map.appendChild(cell);
    }
}

function updateEventDisplay(icon, title, text, type) {
    document.getElementById('eventIcon').textContent = icon;
    document.getElementById('eventTitle').textContent = title;
    document.getElementById('eventText').textContent = text;
    const display = document.getElementById('gameEventDisplay');
    display.className = 'game__event-display';
    if (type) display.classList.add(type);
}

function openDialog(cellIndex) {
    const dialog = gameState.cellEvents[cellIndex % gameState.cellEvents.length];
    gameState.isDialogOpen = true;
    
    document.getElementById('dialogIcon').textContent = dialog.icon;
    document.getElementById('dialogTitle').textContent = dialog.title;
    document.getElementById('dialogText').textContent = dialog.text;
    
    document.getElementById('dialogResult').hidden = true;
    document.getElementById('dialogContinue').hidden = true;
    document.getElementById('dialogDiceArea').style.display = 'flex';
    document.getElementById('rollBtn').disabled = false;
    
    document.getElementById('dialogModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    document.getElementById('rollBtn').onclick = function() {
        if (this.disabled) return;
        processRoll(cellIndex);
    };
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function processRoll(cellIndex) {
    gameState.isProcessing = true;
    document.getElementById('rollBtn').disabled = true;
    
    const dice = document.getElementById('diceModal');
    const diceValue = rollDice();
    
    dice.classList.remove('rolling');
    void dice.offsetWidth;
    dice.classList.add('rolling');
    
    setTimeout(() => {
        dice.dataset.value = diceValue;
        dice.classList.remove('rolling');
        
        const dialog = gameState.cellEvents[cellIndex % gameState.cellEvents.length];
        const hasBook = gameState.bookPositions.includes(cellIndex);
        const isVisited = gameState.visitedCells.has(cellIndex);
        const isGoodType = dialog.type === 'good';
        const isSuccess = diceValue >= 3;
        
        let resultIcon = '';
        let resultTitle = '';
        let resultText = '';
        let resultType = '';
        let resultStatus = '';
        let bookText = '';
        let hpChange = 0;
        
        if (isGoodType) {
            if (isSuccess) {
                hpChange = 5;
                resultStatus = 'success';
                resultIcon = '✅';
                resultTitle = 'УСПЕХ!';
                resultText = dialog.success;
                resultType = 'success';
            } else {
                hpChange = 0;
                resultStatus = 'fail';
                resultIcon = '😅';
                resultTitle = 'НЕ ПОВЕЗЛО...';
                resultText = dialog.fail;
                resultType = 'fail';
            }
        } else {
            if (isSuccess) {
                hpChange = -15;
                resultStatus = 'fail';
                resultIcon = '😬';
                resultTitle = 'ВЫКРУТИЛСЯ!';
                resultText = dialog.success;
                resultType = 'fail';
            } else {
                hpChange = -25;
                resultStatus = 'fail';
                resultIcon = '💀';
                resultTitle = 'ПРОВАЛ!';
                resultText = dialog.fail;
                resultType = 'fail';
            }
        }
        
        // Проверка учебника
        if (hasBook && !isVisited && isGoodType && isSuccess) {
            gameState.booksFound++;
            gameState.cellResults[cellIndex] = 'found';
            bookText = ' 📚 Ты нашёл учебник! (' + gameState.booksFound + '/' + gameState.totalBooks + ')';
            
            if (gameState.booksFound >= gameState.totalBooks) {
                gameState.victory = true;
                gameState.gameOver = true;
                resultIcon = '🏆';
                resultTitle = 'ПОБЕДА!';
                resultText = 'Ты нашёл все 4 учебника! Ты — настоящий студент-медик! 🎉';
                resultType = 'finish';
                showResult(resultIcon, resultTitle, resultText, hpChange, resultType);
                gameState.isDialogOpen = false;
                gameState.isProcessing = false;
                updateStats();
                renderMap();
                return;
            }
        } else if (hasBook && !isVisited) {
            // Учебник убегает
            const available = [];
            for (let i = 0; i < TOTAL_CELLS; i++) {
                if (!gameState.bookPositions.includes(i) && !gameState.visitedCells.has(i)) {
                    available.push(i);
                }
            }
            if (available.length > 0) {
                const newPos = available[Math.floor(Math.random() * available.length)];
                const idx = gameState.bookPositions.indexOf(cellIndex);
                if (idx !== -1) gameState.bookPositions[idx] = newPos;
            }
            gameState.cellResults[cellIndex] = 'book';
            bookText = ' 💨 Учебник убежал в другую клетку!';
        }
        
        // Применяем HP
        gameState.hp = Math.min(Math.max(0, gameState.hp + hpChange), gameState.maxHp);
        gameState.visitedCells.add(cellIndex);
        if (resultStatus) gameState.cellResults[cellIndex] = resultStatus;
        gameState.moves++;
        
        updateStats();
        renderMap();
        
        // Проверка смерти
        if (gameState.hp <= 0) {
            gameState.hp = 0;
            gameState.gameOver = true;
            resultIcon = '💀';
            resultTitle = 'ТЫ ПРОИГРАЛ!';
            resultText = 'Ты потерял все HP. Попробуй снова!';
            resultType = 'fail';
            showResult(resultIcon, resultTitle, resultText + ' ' + bookText, hpChange, resultType);
            gameState.isDialogOpen = false;
            gameState.isProcessing = false;
            return;
        }
        
        // Показываем результат
        showResult(resultIcon, resultTitle, resultText + (bookText ? ' ' + bookText : ''), hpChange, resultType);
        gameState.isDialogOpen = false;
        gameState.isProcessing = false;
        
    }, 1000);
}

function showResult(icon, title, text, hpChange, type) {
    document.getElementById('dialogDiceArea').style.display = 'none';
    const resultEl = document.getElementById('dialogResult');
    resultEl.hidden = false;
    resultEl.className = 'dialog-modal__result ' + type;
    document.getElementById('resultIcon').textContent = icon;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultText').textContent = text;
    
    const hpText = document.getElementById('resultHp');
    if (hpChange > 0) {
        hpText.textContent = '❤️ +' + hpChange + ' HP (теперь ' + gameState.hp + ')';
        hpText.style.color = '#1A7A3A';
    } else if (hpChange < 0) {
        hpText.textContent = '❤️ ' + hpChange + ' HP (теперь ' + gameState.hp + ')';
        hpText.style.color = '#B03A2E';
    } else {
        hpText.textContent = '❤️ HP: ' + gameState.hp + ' (без изменений)';
        hpText.style.color = '#555';
    }
    
    document.getElementById('dialogContinue').hidden = false;
    document.getElementById('dialogContinue').textContent = gameState.gameOver ? '🔄 Заново' : 'Продолжить →';
}

function closeDialog() {
    document.getElementById('dialogModal').classList.remove('active');
    document.body.style.overflow = '';
    gameState.isDialogOpen = false;
    if (!gameState.gameOver) {
        renderMap();
        updateStats();
    }
}

function updateStats() {
    const hpEl = document.getElementById('gameHp');
    hpEl.textContent = gameState.hp;
    if (gameState.hp <= 30) {
        hpEl.classList.add('low-hp');
    } else {
        hpEl.classList.remove('low-hp');
    }
    document.getElementById('gameBooks').textContent = gameState.booksFound + ' / ' + gameState.totalBooks;
    document.getElementById('gameMoves').textContent = gameState.moves;
}

// ===== ОБРАБОТЧИКИ =====
document.getElementById('dialogContinue').addEventListener('click', function() {
    if (gameState.gameOver) {
        if (gameState.hp <= 0) {
            document.getElementById('particlesContainer').innerHTML = '';
            initGame();
            closeDialog();
            return;
        }
        closeDialog();
        if (gameState.victory) {
            updateEventDisplay('🏆', 'ПОБЕДА!', 'Ты нашёл все учебники!', 'finish');
        }
        return;
    }
    closeDialog();
});

document.getElementById('dialogClose').addEventListener('click', function() {
    if (gameState.isProcessing) return;
    closeDialog();
});

document.getElementById('dialogOverlay').addEventListener('click', function() {
    if (gameState.isProcessing) return;
    closeDialog();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('dialogModal').classList.contains('active')) {
        if (gameState.isProcessing) return;
        closeDialog();
    }
});

document.getElementById('resetGameBtn').addEventListener('click', function() {
    document.getElementById('particlesContainer').innerHTML = '';
    initGame();
});

initGame();