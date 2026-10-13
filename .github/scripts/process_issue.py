import os
import re
import subprocess
import requests
from datetime import date
from pathlib import Path

TOKEN = os.environ["GH_TOKEN"]
REPO = os.environ["REPO"]
ISSUE_NUMBER = int(os.environ["ISSUE_NUMBER"])
ISSUE_TITLE = os.environ["ISSUE_TITLE"]
ISSUE_BODY = os.environ.get("ISSUE_BODY", "")

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/vnd.github+json",
}

SUBJECT_MAP = {
    "биохимия": "biochem",
    "физиология": "physio",
    "гистология": "histology",
    "микробиология": "microbio",
    "гигиена": "hygiene",
}


def comment(text):
    requests.post(
        f"https://api.github.com/repos/{REPO}/issues/{ISSUE_NUMBER}/comments",
        headers=HEADERS,
        json={"body": text},
    )


def close_issue():
    requests.patch(
        f"https://api.github.com/repos/{REPO}/issues/{ISSUE_NUMBER}",
        headers=HEADERS,
        json={"state": "closed"},
    )


def fail(msg):
    comment(f"❌ {msg}")
    close_issue()
    raise SystemExit(0)


# --- 1. Заголовок ---
m = re.match(
    r'(?:добавить|доб)\s+([а-яёА-ЯЁ]+)\s+([\d.]+)\s+"(.+?)"\s*$',
    ISSUE_TITLE.strip(),
    re.DOTALL | re.IGNORECASE,
)
if not m:
    fail(
        "Не могу разобрать заголовок.\n\n"
        "Формат:\n```\nдобавить биохимия 2.2 \"Название темы\"\n```\n\n"
        "Доступные предметы: биохимия, физиология, гистология, микробиология, гигиена"
    )

subject_ru, num, topic_title = m.group(1).lower(), m.group(2), m.group(3).strip()

if subject_ru not in SUBJECT_MAP:
    fail(
        f"Не знаю предмет «{subject_ru}».\n\n"
        f"Доступные: {', '.join(SUBJECT_MAP.keys())}"
    )
subject = SUBJECT_MAP[subject_ru]

# --- 2. Шаги ---
steps = ["Прочитать файл", "Выполнить тест"]
steps_match = re.search(r'шаги\s*:\s*(.+?)(?:\n\s*\n|\Z)', ISSUE_BODY, re.DOTALL)
if steps_match:
    raw = steps_match.group(1).strip()
    steps = [s.strip() for s in raw.split("|") if s.strip()]

# --- 3. Вложения ---
attachments = []
for name, url in re.findall(r'\[([^\]]+)\]\((https://[^\)]+)\)', ISSUE_BODY):
    attachments.append((name.strip(), url.strip()))

if not attachments:
    for url in re.findall(r'(https://github\.com/user-attachments/[^\s\)]+)', ISSUE_BODY):
        name = url.split("/")[-1]
        attachments.append((name, url))

if not attachments:
    fail("Не нашёл вложений. Прикрепи PDF-файлы к Issue.")

# --- 4. Клон ---
repo_dir = Path("/tmp/repo")
subprocess.run(
    ["git", "clone", f"https://x-access-token:{TOKEN}@github.com/{REPO}.git", str(repo_dir)],
    check=True,
)

# --- 5. Скачать файлы ---
target_dir = repo_dir / "files" / subject
target_dir.mkdir(parents=True, exist_ok=True)

file_entries = []
for name, url in attachments:
    r = requests.get(url, headers=HEADERS)
    if r.status_code != 200:
        r = requests.get(url)
    if r.status_code != 200:
        fail(f"Не смог скачать файл «{name}» (HTTP {r.status_code})")

    safe_name = name.replace("/", "_")
    (target_dir / safe_name).write_bytes(r.content)
    file_entries.append((safe_name, f"files/{subject}/{safe_name}"))

# --- 6. Патч script.js ---
js_path = repo_dir / "script.js"
js = js_path.read_text(encoding="utf-8")

steps_js = "[" + ", ".join(f'"{s}"' for s in steps) + "]"
files_js = ",\n".join(
    f'          {{ name: "{n}", url: "{u}" }}' for n, u in file_entries
)
today = date.today().isoformat()

new_topic = f'''      {{
        num: "{num}",
        title: "{topic_title}",
        steps: {steps_js},
        date: "{today}",
        files: [
{files_js}
        ]
      }},
'''

pattern = rf'({re.escape(subject)}:\s*\{{\s*num:\s*"[^"]*",\s*title:\s*"[^"]*",\s*topics:\s*\[)'
if not re.search(pattern, js):
    fail(f"Не нашёл раздел «{subject}» в script.js.")

js_new = re.sub(pattern, r'\1\n' + new_topic, js, count=1)
js_path.write_text(js_new, encoding="utf-8")

# --- 7. Коммит ---
subprocess.run(["git", "-C", str(repo_dir), "config", "user.email", "action@github.com"], check=True)
subprocess.run(["git", "-C", str(repo_dir), "config", "user.name", "GitHub Action"], check=True)
subprocess.run(["git", "-C", str(repo_dir), "add", "."], check=True)

commit = subprocess.run(
    ["git", "-C", str(repo_dir), "commit", "-m", f"add {subject} {num}"],
    capture_output=True, text=True,
)
if commit.returncode != 0:
    fail("Нечего коммитить — возможно, эта тема уже добавлена.")

subprocess.run(["git", "-C", str(repo_dir), "push"], check=True)

# --- 8. Отчёт ---
files_list = "\n".join(f"- `{n}`" for n, _ in file_entries)
comment(
    f"✅ Тема **{num}** добавлена в раздел «**{subject_ru}**».\n\n"
    f"**Название:** {topic_title}\n\n"
    f"**Шаги подготовки:**\n" +
    "\n".join(f"{i+1}. {s}" for i, s in enumerate(steps)) +
    f"\n\n**Файлы:**\n{files_list}\n\n"
    f"Сайт обновится через 1–2 минуты."
)
close_issue()
