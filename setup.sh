#!/bin/bash

# Setup script for AI Student Helper
# Использование: ./setup.sh

echo "🚀 AI Student Helper - Setup скрипт"
echo "===================================="
echo ""

# Проверка Python
echo "Проверяю Python..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 не установлен"
    echo "Установите Python с https://www.python.org/"
    exit 1
fi
echo "✅ Python найден: $(python3 --version)"
echo ""

# Создание виртуального окружения
echo "Создаю виртуальное окружение..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Виртуальное окружение создано"
else
    echo "ℹ️  Виртуальное окружение уже существует"
fi
echo ""

# Активация виртуального окружения
echo "Активирую виртуальное окружение..."
source venv/bin/activate
echo "✅ Виртуальное окружение активировано"
echo ""

# Установка зависимостей
echo "Устанавливаю зависимости..."
pip install --upgrade pip
pip install -r requirements.txt
if [ $? -eq 0 ]; then
    echo "✅ Зависимости установлены успешно"
else
    echo "❌ Ошибка при установке зависимостей"
    exit 1
fi
echo ""

# Создание .env файла
echo "Проверяю .env файл..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ .env файл создан из .env.example"
        echo ""
        echo "⚠️  ВАЖНО: Добавьте ваш Groq API ключ в .env"
        echo "Откройте .env и замените:"
        echo "  GROQ_API_KEY=your_groq_api_key_here"
        echo "на ваш реальный ключ с https://console.groq.com"
    else
        echo "❌ .env.example не найден"
        exit 1
    fi
else
    echo "ℹ️  .env файл уже существует"
fi
echo ""

# Проверка API ключа
echo "Проверяю API ключ..."
if grep -q "your_groq_api_key_here" .env; then
    echo "⚠️  API ключ не установлен!"
    echo "Пожалуйста, откройте .env и добавьте ваш ключ"
elif grep -q "GROQ_API_KEY=" .env; then
    echo "✅ API ключ найден"
else
    echo "⚠️  GROQ_API_KEY не найден в .env"
fi
echo ""

# Завершение
echo "===================================="
echo "✨ Setup завершён!"
echo ""
echo "Для запуска приложения выполните:"
echo "  source venv/bin/activate  # Если окружение не активировано"
echo "  streamlit run app_improved.py"
echo ""
echo "Приложение откроется на http://localhost:8501"
echo ""
