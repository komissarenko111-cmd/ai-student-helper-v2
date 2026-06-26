import streamlit as st
from groq import Groq
from datetime import datetime
import os
from dotenv import load_dotenv

# Загружаем переменные окружения
load_dotenv()

# Получаем API ключ из переменных окружения
api_key = os.getenv("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")

# Инициализация Groq клиента
client = Groq(api_key=api_key)

# Page configuration
st.set_page_config(
    page_title="AI-помощник студента",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS для красивого интерфейса
st.markdown("""
<style>
    /* Main layout */
    .main {
        display: flex;
        flex-direction: column;
        padding: 0;
        height: 100vh;
    }
    
    /* Chat container */
    .chat-container {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        border-radius: 10px;
        background-color: #f8f9fa;
        border: 1px solid #e0e0e0;
        margin-bottom: 10px;
    }
    
    /* Message styling */
    .user-message {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 12px;
    }
    
    .assistant-message {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 12px;
    }
    
    .message-content {
        padding: 12px 16px;
        border-radius: 12px;
        max-width: 70%;
        word-wrap: break-word;
        line-height: 1.5;
    }
    
    .user-content {
        background-color: #0066cc;
        color: white;
        border-radius: 18px 4px 18px 18px;
    }
    
    .assistant-content {
        background-color: white;
        color: #333;
        border: 1px solid #e0e0e0;
        border-radius: 4px 18px 18px 4px;
    }
    
    /* Header styling */
    .header-container {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 30px 20px;
        border-radius: 10px;
        color: white;
        margin-bottom: 20px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .header-container h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
    }
    
    .header-container p {
        margin: 8px 0 0 0;
        font-size: 14px;
        opacity: 0.9;
    }
    
    /* Input area */
    .input-container {
        display: flex;
        gap: 10px;
        align-items: flex-end;
        flex-shrink: 0;
    }
    
    /* Sidebar styling */
    .sidebar-header {
        color: #667eea;
        font-weight: 700;
        margin-bottom: 15px;
    }
</style>
""", unsafe_allow_html=True)

# Инициализация session state
if "messages" not in st.session_state:
    st.session_state.messages = []
if "clear_input" not in st.session_state:
    st.session_state.clear_input = False
if "message_count" not in st.session_state:
    st.session_state.message_count = 0

# Header
st.markdown("""
<div class="header-container">
    <h1>🤖 AI-помощник студента</h1>
    <p>Быстрые ответы на вопросы о учёбе и домашних заданиях</p>
</div>
""", unsafe_allow_html=True)

# Sidebar с информацией и инструментами
with st.sidebar:
    st.markdown('<div class="sidebar-header">⚙️ Настройки</div>', unsafe_allow_html=True)
    
    model_choice = st.selectbox(
        "Выберите модель:",
        ["llama-3.3-70b-versatile", "mixtral-8x7b-32768", "llama2-70b-4096"],
        help="Выберите AI модель для обработки запросов"
    )
    
    temperature = st.slider(
        "Креативность (температура):",
        min_value=0.0,
        max_value=2.0,
        value=0.7,
        step=0.1,
        help="0.0 = точные ответы, 2.0 = творческие ответы"
    )
    
    max_tokens = st.slider(
        "Максимум токенов:",
        min_value=256,
        max_value=2048,
        value=1024,
        step=256,
        help="Ограничение длины ответа"
    )
    
    st.divider()
    
    # Статистика
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Вопросов", len([m for m in st.session_state.messages if m["role"] == "user"]))
    with col2:
        st.metric("Ответов", len([m for m in st.session_state.messages if m["role"] == "assistant"]))
    
    st.divider()
    
    if st.button("🗑️ Очистить историю", key="clear_history", use_container_width=True):
        st.session_state.messages = []
        st.session_state.message_count = 0
        st.rerun()
    
    st.divider()
    
    st.markdown("""
    <div style="font-size: 12px; color: #999;">
    <b>💡 Совет:</b> Спрашивайте конкретно и подробно для лучших результатов.
    
    <b>🔗 Ссылки:</b>
    - [Groq API](https://groq.com/)
    - [Streamlit](https://streamlit.io/)
    - [GitHub репо](https://github.com/ваше-имя/ai-student-helper)
    </div>
    """, unsafe_allow_html=True)

# Main chat area
chat_container = st.container()

with chat_container:
    if not st.session_state.messages:
        st.info("📝 Напишите вопрос, чтобы начать беседу!")
    else:
        for message in st.session_state.messages:
            if message["role"] == "user":
                with st.chat_message("user", avatar="👤"):
                    st.write(message["content"])
            else:
                with st.chat_message("assistant", avatar="🤖"):
                    st.write(message["content"])

# Input area
col1, col2 = st.columns([4, 1])

with col1:
    user_input = st.text_area(
        "Введите ваш вопрос",
        placeholder="Например: Объясните мне закон Ома...",
        label_visibility="collapsed",
        height=80,
        value="" if st.session_state.clear_input else ""
    )

with col2:
    submit_button = st.button(
        "📤 Отправить",
        key="submit",
        use_container_width=True,
        type="primary",
        help="Нажмите для отправки вопроса (или Ctrl+Enter)"
    )

# Обработка отправки сообщения
if submit_button and user_input.strip():
    # Добавляем сообщение пользователя в историю
    st.session_state.messages.append({
        "role": "user",
        "content": user_input.strip()
    })
    st.session_state.message_count += 1
    
    # Получаем ответ от Groq API
    with st.spinner("🤔 Думаю..."):
        try:
            # Готовим сообщения для API
            messages_for_api = [
                {
                    "role": "system",
                    "content": "Ты помощник студента колледжа. Объясняй сложные концепции просто и понятно. Давай практические примеры. Будь вежлив и готов помочь."
                }
            ]
            
            # Добавляем историю (последние 20 сообщений для контекста)
            for msg in st.session_state.messages[-20:]:
                messages_for_api.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })
            
            # Вызов API
            response = client.chat.completions.create(
                model=model_choice,
                messages=messages_for_api,
                temperature=temperature,
                max_tokens=max_tokens
            )
            
            assistant_message = response.choices[0].message.content
            
            # Добавляем ответ в историю
            st.session_state.messages.append({
                "role": "assistant",
                "content": assistant_message
            })
            
            # Перезагружаем страницу
            st.rerun()
        
        except Exception as e:
            st.error(f"❌ Ошибка при получении ответа: {str(e)}")
            # Удаляем последнее сообщение пользователя если произошла ошибка
            if st.session_state.messages and st.session_state.messages[-1]["role"] == "user":
                st.session_state.messages.pop()

# Footer
st.divider()
st.markdown(f"""
<div style="text-align: center; font-size: 12px; color: #999; padding: 20px 0;">
    <p>🔒 Ваши вопросы обрабатываются конфиденциально | Powered by Groq API</p>
    <p>Всего сообщений: {st.session_state.message_count}</p>
</div>
""", unsafe_allow_html=True)
