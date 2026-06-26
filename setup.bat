@echo off
REM Setup script for AI Student Helper - Windows version
REM Usage: setup.bat

echo.
echo 🚀 AI Student Helper - Setup скрипт (Windows)
echo =============================================
echo.

REM Check Python
echo Проверяю Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python не установлен
    echo Установите Python с https://www.python.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo ✅ Python найден: %PYTHON_VERSION%
echo.

REM Create virtual environment
echo Создаю виртуальное окружение...
if not exist "venv" (
    python -m venv venv
    echo ✅ Виртуальное окружение создано
) else (
    echo ℹ️  Виртуальное окружение уже существует
)
echo.

REM Activate virtual environment
echo Активирую виртуальное окружение...
call venv\Scripts\activate.bat
echo ✅ Виртуальное окружение активировано
echo.

REM Install dependencies
echo Устанавливаю зависимости...
python -m pip install --upgrade pip
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Ошибка при установке зависимостей
    pause
    exit /b 1
)
echo ✅ Зависимости установлены успешно
echo.

REM Create .env file
echo Проверяю .env файл...
if not exist ".env" (
    if exist ".env.example" (
        copy .env.example .env
        echo ✅ .env файл создан из .env.example
        echo.
        echo ⚠️  ВАЖНО: Добавьте ваш Groq API ключ в .env
        echo Откройте .env и замените:
        echo   GROQ_API_KEY=your_groq_api_key_here
        echo на ваш реальный ключ с https://console.groq.com
    ) else (
        echo ❌ .env.example не найден
        pause
        exit /b 1
    )
) else (
    echo ℹ️  .env файл уже существует
)
echo.

REM Check API key
echo Проверяю API ключ...
findstr /M "your_groq_api_key_here" .env >nul
if %errorlevel% equ 0 (
    echo ⚠️  API ключ не установлен!
    echo Пожалуйста, откройте .env и добавьте ваш ключ
) else (
    findstr /M "GROQ_API_KEY=" .env >nul
    if %errorlevel% equ 0 (
        echo ✅ API ключ найден
    ) else (
        echo ⚠️  GROQ_API_KEY не найден в .env
    )
)
echo.

REM Completion
echo =============================================
echo ✨ Setup завершён!
echo.
echo Для запуска приложения выполните:
echo   streamlit run app_improved.py
echo.
echo Приложение откроется на http://localhost:8501
echo.
pause
