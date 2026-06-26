# 🤖 AI-помощник студента

Современное веб-приложение для помощи студентам в учёбе, используя AI модели от Groq.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.8%2B-blue)

## ✨ Возможности

- 💬 **Интерактивный чат** с историей сообщений
- 🧠 **Несколько AI моделей** на выбор (Llama 3.3, Mixtral, Llama 2)
- 🎨 **Красивый интерфейс** с современным дизайном
- ⚡ **Быстрые ответы** на вопросы студентов
- 🔧 **Регулируемые параметры** (модель, температура, контекст)
- 📱 **Адаптивный дизайн** для всех устройств
- 🛡️ **Безопасное хранение** API ключей

## 🚀 Быстрый старт

### Требования
- Python 3.8+
- Node.js 14+ (для React версии)

### Установка

1. **Клонируйте репозиторий**
```bash
git clone https://github.com/ваше-имя/ai-student-helper.git
cd ai-student-helper
```

2. **Создайте `.env` файл**
```bash
cp .env.example .env
# Добавьте ваш Groq API ключ в .env файл
```

3. **Установите зависимости**
```bash
pip install -r requirements.txt
```

4. **Запустите приложение**
```bash
streamlit run app_improved.py
```

Приложение откроется на `http://localhost:8501`

## 📚 Документация

- **[QUICK_START.md](QUICK_START.md)** - Быстрый старт за 5 минут
- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Полная документация по интеграции и кастомизации

## 🏗️ Структура проекта

```
ai-student-helper/
├── app_improved.py              # Основное Streamlit приложение
├── StudentChatApp.jsx           # React компонент
├── requirements.txt             # Зависимости Python
├── .env.example                 # Пример переменных окружения
├── .gitignore                   # Git ignore файл
├── README.md                    # Этот файл
├── QUICK_START.md              # Быстрый старт
└── INTEGRATION_GUIDE.md        # Полная документация
```

## 🎯 Использование

### Streamlit версия (рекомендуется)

```bash
streamlit run app_improved.py
```

**Возможности:**
- История сообщений в одном сеансе
- Выбор модели в боковой панели
- Регулировка креативности ответов
- Очистка истории
- Красивый интерфейс

### React версия

Скопируйте `StudentChatApp.jsx` в ваш React проект:

```jsx
import StudentChatApp from './components/StudentChatApp';

export default function App() {
  return <StudentChatApp />;
}
```

## 🔑 Получение API ключа

1. Перейдите на [console.groq.com](https://console.groq.com)
2. Зарегистрируйтесь (бесплатно)
3. Создайте API ключ
4. Добавьте его в `.env` файл:
```
GROQ_API_KEY=ваш_ключ_здесь
```

## 📊 Поддерживаемые модели

| Модель | Скорость | Качество | Лучше для |
|--------|----------|----------|----------|
| `llama-3.3-70b-versatile` | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | Универсальное использование |
| `mixtral-8x7b-32768` | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Скорость важнее качества |
| `llama2-70b-4096` | ⚡⚡⚡ | ⭐⭐⭐⭐ | Альтернативная модель |

## ⚙️ Конфигурация

### Переменные окружения

Создайте `.env` файл (используйте `.env.example` как шаблон):

```env
GROQ_API_KEY=your_api_key_here
```

Для Streamlit добавьте в `.streamlit/secrets.toml`:

```toml
groq_api_key = "your_api_key_here"
```

### Персонализация приложения

Отредактируйте `app_improved.py`:

```python
# Измените заголовок
st.markdown('<h1>🤖 Ваше название</h1>', unsafe_allow_html=True)

# Измените поведение AI
system_content = """Ваш новый промпт здесь..."""
```

## 🌐 Развёртывание

### На Streamlit Cloud (бесплатно)

1. Загрузите проект на GitHub
2. Перейдите на [streamlit.io/cloud](https://streamlit.io/cloud)
3. Нажмите "New app" и выберите ваш репозиторий
4. В настройках добавьте `GROQ_API_KEY` в Secrets
5. Готово! 🎉

### На других платформах

- **Heroku** - используйте `Procfile` и `runtime.txt`
- **Docker** - создайте `Dockerfile`
- **AWS/DigitalOcean** - используйте gunicorn

## 🐛 Решение проблем

### Проблема: "ModuleNotFoundError: No module named 'streamlit'"

**Решение:**
```bash
pip install -r requirements.txt
```

### Проблема: "API key is invalid"

**Решение:**
1. Проверьте, что ключ скопирован полностью
2. Убедитесь, что файл `.env` находится в корне проекта
3. Перезагрузите приложение

### Проблема: Медленный ответ

**Решение:**
- Используйте более быструю модель (mixtral)
- Ограничьте контекст до 10-20 сообщений
- Проверьте интернет-соединение

Подробнее см. [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md#-решение-проблем)

## 💡 Идеи для расширения

- [ ] Сохранение истории в базу данных
- [ ] Загрузка и обработка документов
- [ ] Экспорт беседы в PDF
- [ ] Интеграция с Google Drive
- [ ] Голосовой ввод/вывод
- [ ] Поддержка нескольких языков
- [ ] Статистика и аналитика
- [ ] Telegram бот

## 🤝 Вклад

Приветствуются pull requests! Для больших изменений сначала откройте issue для обсуждения.

## 📄 Лицензия

Этот проект лицензирован под лицензией MIT - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Контакты

- GitHub Issues для багов и предложений
- Email для личных вопросов

## 🙏 Благодарности

- Спасибо [Groq](https://groq.com/) за отличный API
- Спасибо [Streamlit](https://streamlit.io/) за удивительный фреймворк
- Спасибо всем контрибьютерам!

## 📈 Статистика

- ⭐ Звёзды приветствуются!
- 🔄 Форки и улучшения
- 🐛 Баги и проблемы
- 💬 Дискуссии и вопросы

---

**Создано с ❤️ для студентов**

Если этот проект вам помогает - оставьте звёзду ⭐

[⬆ Наверх](#-ai-помощник-студента)
