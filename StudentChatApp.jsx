import React, { useState, useRef, useEffect } from 'react';

export default function StudentChatApp() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Привет! 👋 Я твой AI-помощник студента. Готов помочь с:',
      timestamp: new Date(),
      suggestions: [
        'Объяснением сложных тем',
        'Помощью с домашним заданием',
        'Подготовкой к экзаменам',
        'Разбором примеров'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('llama-3.3-70b-versatile');
  const [temperature, setTemperature] = useState(0.7);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Here you would call your Groq API
      // This is a demo - replace with actual API call
      const response = await simulateAPICall(text);
      
      const assistantMessage = {
        id: updatedMessages.length + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: updatedMessages.length + 1,
        role: 'assistant',
        content: '❌ Ошибка при получении ответа. Пожалуйста, попробуйте позже.',
        timestamp: new Date()
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAPICall = (question) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = {
          'интеграл': 'Интеграл — это обратная операция дифференцирования. Представьте площадь под кривой, которую мы вычисляем путём суммирования бесконечно малых прямоугольников. Определённый интеграл вычисляется между двумя границами, неопределённый — общее семейство функций.',
          'производная': 'Производная показывает скорость изменения функции в каждой точке. Геометрически это тангенс угла наклона касательной к графику. Используется для нахождения максимумов, минимумов и анализа поведения функций.',
          'физика': 'Физика изучает законы природы. Основные разделы: механика, электромагнетизм, термодинамика, оптика. Все явления подчиняются закону сохранения энергии и импульса.',
          'химия': 'Химия — наука о веществах и их превращениях. Основные концепции: атомная структура, химические связи, реакции, молярность. Всё построено на периодической таблице Менделеева.',
          'история': 'История изучает прошлое человечества. Ключевые периоды: древность, средневековье, новое время, новейшее время. История помогает понять современный мир и избежать ошибок прошлого.'
        };

        let response = responses[question.toLowerCase().split(' ')[0]];
        if (!response) {
          response = 'Это интересный вопрос! Позвольте рассказать подробнее. ' +
            'Во-первых, это многогранная тема, которая требует понимания основных принципов. ' +
            'Во-вторых, важно практиковать применение этих знаний на примерах. ' +
            'Хотели бы вы, чтобы я объяснил конкретный аспект более подробно?';
        }

        resolve(response);
      }, 1000);
    });
  };

  const handleSuggestion = (suggestion) => {
    sendMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'Привет! 👋 Я твой AI-помощник студента. Готов помочь с:',
        timestamp: new Date(),
        suggestions: [
          'Объяснением сложных тем',
          'Помощью с домашним заданием',
          'Подготовкой к экзаменам',
          'Разбором примеров'
        ]
      }
    ]);
  };

  const messageCount = messages.filter(m => m.role === 'user').length;

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'var(--surface-0)',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        background: 'var(--surface-1)',
        borderRight: '0.5px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '0.5px solid var(--border)'
        }}>
          <button
            onClick={clearChat}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 'var(--radius)',
              border: '0.5px solid var(--border)',
              background: 'var(--bg-accent)',
              color: 'var(--text-accent)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '1rem'
            }}
          >
            ✨ Новый чат
          </button>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px'
          }}>
            <div style={{
              background: 'var(--surface-2)',
              padding: '12px',
              borderRadius: 'var(--radius)',
              border: '0.5px solid var(--border)'
            }}>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginBottom: '4px'
              }}>
                Вопросов
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                {messageCount}
              </div>
            </div>
            <div style={{
              background: 'var(--surface-2)',
              padding: '12px',
              borderRadius: 'var(--radius)',
              border: '0.5px solid var(--border)'
            }}>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginBottom: '4px'
              }}>
                Ответов
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                {messageCount}
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '0.5px solid var(--border)',
          flex: '0 0 auto'
        }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '500',
            marginBottom: '8px',
            color: 'var(--text-secondary)'
          }}>
            Модель
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: 'var(--radius)',
              border: '0.5px solid var(--border)',
              background: 'var(--surface-2)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              marginBottom: '1rem'
            }}
          >
            <option>llama-3.3-70b-versatile</option>
            <option>mixtral-8x7b-32768</option>
            <option>llama2-70b-4096</option>
          </select>

          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: '500',
            marginBottom: '8px',
            color: 'var(--text-secondary)'
          }}>
            Креативность: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            style={{
              width: '100%'
            }}
          />
        </div>

        {/* Info */}
        <div style={{
          padding: '1.5rem',
          fontSize: '12px',
          color: 'var(--text-muted)',
          flex: 1,
          overflow: 'hidden'
        }}>
          <p style={{ marginTop: 0 }}>
            <strong>💡 Совет:</strong> Спрашивайте конкретно и подробно для лучших результатов.
          </p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '0.5px solid var(--border)',
          background: 'var(--surface-1)'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '500',
            color: 'var(--text-primary)'
          }}>
            🤖 AI-помощник студента
          </h1>
          <p style={{
            margin: '4px 0 0 0',
            fontSize: '13px',
            color: 'var(--text-muted)'
          }}>
            Версия 1.0 • Powered by Groq
          </p>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {messages.map((msg) => (
            <div key={msg.id}>
              <div style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '60%',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  background: msg.role === 'user' ? 'var(--bg-accent)' : 'var(--surface-1)',
                  color: msg.role === 'user' ? 'var(--text-accent)' : 'var(--text-primary)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  border: msg.role === 'user' ? 'none' : '0.5px solid var(--border)',
                  wordWrap: 'break-word'
                }}>
                  {msg.content}
                </div>
              </div>
              
              {msg.suggestions && msg.role === 'assistant' && (
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginTop: '8px',
                  marginLeft: '0'
                }}>
                  {msg.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestion(suggestion)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius)',
                        border: '0.5px solid var(--border)',
                        background: 'var(--surface-2)',
                        color: 'var(--text-secondary)',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'var(--surface-1)';
                        e.target.style.borderColor = 'var(--border-strong)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'var(--surface-2)';
                        e.target.style.borderColor = 'var(--border)';
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start'
            }}>
              <div style={{
                padding: '12px 16px',
                borderRadius: '4px 16px 16px 16px',
                background: 'var(--surface-1)',
                border: '0.5px solid var(--border)',
                display: 'flex',
                gap: '6px',
                alignItems: 'center'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--text-muted)',
                  animation: 'pulse 1.4s infinite'
                }} />
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--text-muted)',
                  animation: 'pulse 1.4s infinite 0.2s'
                }} />
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--text-muted)',
                  animation: 'pulse 1.4s infinite 0.4s'
                }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '1.5rem',
          borderTop: '0.5px solid var(--border)',
          background: 'var(--surface-1)'
        }}>
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Задайте вопрос..."
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 'var(--radius)',
                border: '0.5px solid var(--border)',
                background: 'var(--surface-2)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontFamily: 'var(--font-sans)',
                resize: 'none',
                maxHeight: '120px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--border-strong)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
              }}
              rows="3"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius)',
                border: '0.5px solid var(--border)',
                background: input.trim() && !isLoading ? 'var(--fill-accent)' : 'var(--fill-disabled)',
                color: input.trim() && !isLoading ? 'white' : 'var(--text-muted)',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                fontSize: '16px',
                height: '100%',
                minHeight: '80px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (input.trim() && !isLoading) {
                  e.target.style.background = 'var(--fill-accent)';
                  e.target.style.opacity = '0.9';
                }
              }}
              onMouseLeave={(e) => {
                if (input.trim() && !isLoading) {
                  e.target.style.opacity = '1';
                }
              }}
            >
              <i className="ti ti-send" style={{ fontSize: '18px' }} aria-hidden="true" />
            </button>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
