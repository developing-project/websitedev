import React, { useState } from 'react';

const PresentTab = () => {
  const [chartType, setChartType] = useState('calories');

  // Mock data - in real app, this would come from backend
  const currentFoodImage = "https://via.placeholder.com/300x200/e74c3c/ffffff?text=Current+Meal";

  const currentFoodNutrition = {
    name: "Grilled Chicken Salad",
    calories: 420,
    carbs: "25g (8%)",
    proteins: "35g (70%)",
    fats: "22g (34%)",
    fiber: "8g",
    sugar: "6g"
  };

  const foodCategories = [
    "Vegetables & Fruits",
    "Grains & Cereals",
    "Proteins",
    "Dairy Products"
  ];

  const meals = {
    breakfast: ["Oatmeal with fruits", "Greek yogurt", "Whole grain toast"],
    lunch: ["Grilled chicken salad", "Brown rice", "Mixed vegetables"],
    dinner: ["Baked salmon", "Quinoa", "Steamed broccoli"]
  };

  // Pie chart data based on selected type
  const getPieChartData = () => {
    if (chartType === 'calories') {
      return [
        { label: 'Breakfast', value: 35, color: '#ff6b6b' },
        { label: 'Lunch', value: 45, color: '#4ecdc4' },
        { label: 'Dinner', value: 20, color: '#45b7d1' }
      ];
    } else if (chartType === 'macronutrients') {
      return [
        { label: 'Carbs', value: 45, color: '#ff9f40' },
        { label: 'Proteins', value: 30, color: '#ff6b6b' },
        { label: 'Fats', value: 25, color: '#4ecdc4' }
      ];
    } else if (chartType === 'micronutrients') {
      return [
        { label: 'Vitamins', value: 40, color: '#a8e6cf' },
        { label: 'Minerals', value: 35, color: '#ffd3b6' },
        { label: 'Other', value: 25, color: '#dcedc8' }
      ];
    }
  };

  const Card = ({ title, children, bgColor = '#f8f9fa' }) => (
    <div style={{
      backgroundColor: bgColor,
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      border: '1px solid #e9ecef'
    }}>
      <h3 style={{
        margin: '0 0 1rem 0',
        color: '#1a1a1a',
        fontSize: '1.2rem',
        fontWeight: '600'
      }}>
        {title}
      </h3>
      {children}
    </div>
  );

  const PieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercent = 0;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          {/* Main pie chart */}
          <div style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: `conic-gradient(${data.map(item => {
              const startPercent = cumulativePercent;
              cumulativePercent += (item.value / total) * 100;
              return `${item.color} ${startPercent}% ${cumulativePercent}%`;
            }).join(', ')})`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 2px 8px rgba(255,255,255,0.3)',
            animation: 'pulse 3s ease-in-out infinite'
          }}></div>

          {/* Center circle for donut effect */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#495057'
          }}>
            {total}% Total
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', width: '100%', maxWidth: '400px' }}>
          {data.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`,
              border: `2px solid ${item.color}30`,
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: item.color,
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}></div>
                <span style={{ fontSize: '0.9rem', color: '#2c3e50', fontWeight: '500' }}>
                  {item.label}
                </span>
              </div>
              <span style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: item.color,
                background: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '6px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                {item.value}%
              </span>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
        `}</style>
      </div>
    );
  };

  const MealCard = ({ mealType, items }) => (
    <div style={{
      background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 50%, #fd79a8 100%)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '3px solid rgba(255,255,255,0.3)',
      boxShadow: '0 12px 40px rgba(253, 121, 168, 0.3)',
      minHeight: '140px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <h4 style={{
        margin: '0 0 1rem 0',
        color: '#2d3436',
        fontSize: '1.3rem',
        fontWeight: '800',
        textTransform: 'capitalize'
      }}>
        🍳 {mealType}
      </h4>

      {items.length > 0 ? (
        <ul style={{
          margin: 0,
          paddingLeft: '1.5rem',
          color: '#2d3436'
        }}>
          {items.map((item, index) => (
            <li key={index} style={{
              marginBottom: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '500'
            }}>
              <span style={{
                background: 'rgba(255,255,255,0.8)',
                padding: '0.2rem 0.6rem',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'inline-block'
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{
          margin: 0,
          color: '#636e72',
          fontStyle: 'italic',
          fontSize: '0.9rem'
        }}>
          No {mealType} recorded
        </p>
      )}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              🍎
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#2d3748',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                NutritionTracker
              </h1>
              <p style={{
                margin: 0,
                fontSize: '0.875rem',
                color: '#718096'
              }}>
                Your daily nutrition companion
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                borderRadius: '20px',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                <span>🔥</span>
                <span>5 Day Streak</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                borderRadius: '20px',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                <span>🎯</span>
                <span>85% Goal</span>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                window.location.href = '/';
              }}
              style={{
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(197, 48, 48, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(197, 48, 48, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(197, 48, 48, 0.3)';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }}>
        {/* Welcome Section */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: 'fadeInUp 1s ease-out'
        }}>
          <h2 style={{
            margin: '0 0 1rem 0',
            fontSize: '2rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome back! 👋
          </h2>
          <p style={{
            margin: '0 auto',
            fontSize: '1.1rem',
            color: '#4a5568',
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            You're doing great! Keep up the healthy eating habits. Here's your nutrition overview for today.
          </p>
        </section>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Nutrition Overview Card */}
          <section style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'slideInLeft 0.8s ease-out'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#2d3748'
              }}>
                📊 Daily Nutrition Overview
              </h3>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#4a5568',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <option value="calories">🍽️ Calories by Meal</option>
                <option value="macronutrients">💪 Macronutrients</option>
                <option value="micronutrients">🌱 Micronutrients</option>
              </select>
            </div>
            <PieChart data={getPieChartData()} />
          </section>

          {/* Current Food Section */}
          <Card title="Current Meal Details" bgColor="#ffffff">
            <div style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              border: '1px solid rgba(255,255,255,0.8)'
            }}>
              {/* Food Image */}
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <img
                    src={currentFoodImage}
                    alt="Current meal"
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      height: 'auto',
                      borderRadius: '16px',
                      transition: 'filter 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)',
                    borderRadius: '16px',
                    pointerEvents: 'none'
                  }}></div>
                </div>

                {/* Floating badge */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(255,107,107,0.3)',
                  animation: 'bounce 2s ease-in-out infinite'
                }}>
                  🔥 Hot Meal
                </div>
              </div>

              {/* Nutrition Details */}
              <div style={{ flex: 1 }}>
                <h4 style={{
                  margin: '0 0 1.5rem 0',
                  color: '#1a1a1a',
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s ease-in-out infinite'
                }}>
                  {currentFoodNutrition.name}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* Calories - Special highlight */}
                  <div style={{
                    padding: '1.25rem',
                    background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
                    borderRadius: '12px',
                    border: '2px solid #ffd43b',
                    boxShadow: '0 6px 20px rgba(255, 193, 7, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 12px 32px rgba(255, 193, 7, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(255, 193, 7, 0.2)';
                  }}
                  >
                    <div style={{ fontSize: '0.9rem', color: '#856404', fontWeight: '600', marginBottom: '0.5rem' }}>Calories</div>
                    <div style={{
                      width: '100%',
                      height: '24px',
                      background: 'rgba(214, 137, 16, 0.2)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '35%',
                        background: 'linear-gradient(90deg, #d68910 0%, #f39c12 100%)',
                        borderRadius: '12px',
                        animation: 'progressFill 2s ease-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}>
                        420
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '20px',
                      height: '20px',
                      background: '#ffd43b',
                      borderRadius: '0 12px 0 20px'
                    }}></div>
                  </div>

                  {/* Carbs */}
                  <div style={{
                    padding: '1.25rem',
                    background: 'linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%)',
                    borderRadius: '12px',
                    border: '2px solid #17a2b8',
                    boxShadow: '0 6px 20px rgba(23, 162, 184, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 12px 32px rgba(23, 162, 184, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(23, 162, 184, 0.2)';
                  }}
                  >
                    <div style={{ fontSize: '0.9rem', color: '#0c5460', fontWeight: '600', marginBottom: '0.5rem' }}>Carbs</div>
                    <div style={{
                      width: '100%',
                      height: '24px',
                      background: 'rgba(12, 84, 96, 0.2)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '8%',
                        background: 'linear-gradient(90deg, #17a2b8 0%, #20c997 100%)',
                        borderRadius: '12px',
                        animation: 'progressFill 1.5s ease-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}>
                        8%
                      </div>
                    </div>
                  </div>

                  {/* Proteins */}
                  <div style={{
                    padding: '1.25rem',
                    background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
                    borderRadius: '12px',
                    border: '2px solid #dc3545',
                    boxShadow: '0 6px 20px rgba(220, 53, 69, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 12px 32px rgba(220, 53, 69, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.2)';
                  }}
                  >
                    <div style={{ fontSize: '0.9rem', color: '#721c24', fontWeight: '600', marginBottom: '0.5rem' }}>Proteins</div>
                    <div style={{
                      width: '100%',
                      height: '24px',
                      background: 'rgba(114, 28, 36, 0.2)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '70%',
                        background: 'linear-gradient(90deg, #dc3545 0%, #e74c3c 100%)',
                        borderRadius: '12px',
                        animation: 'progressFill 1.5s ease-out 0.2s both',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}>
                        70%
                      </div>
                    </div>
                  </div>

                  {/* Fats */}
                  <div style={{
                    padding: '1.25rem',
                    background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
                    borderRadius: '12px',
                    border: '2px solid #28a745',
                    boxShadow: '0 6px 20px rgba(40, 167, 69, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 12px 32px rgba(40, 167, 69, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.2)';
                  }}
                  >
                    <div style={{ fontSize: '0.9rem', color: '#155724', fontWeight: '600', marginBottom: '0.5rem' }}>Fats</div>
                    <div style={{
                      width: '100%',
                      height: '24px',
                      background: 'rgba(21, 87, 36, 0.2)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '34%',
                        background: 'linear-gradient(90deg, #28a745 0%, #20c997 100%)',
                        borderRadius: '12px',
                        animation: 'progressFill 1.5s ease-out 0.4s both',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}>
                        34%
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, rgba(108, 117, 125, 0.1) 0%, rgba(108, 117, 125, 0.05) 100%)',
                  borderRadius: '8px',
                  border: '1px solid rgba(108, 117, 125, 0.2)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#495057', fontWeight: '600' }}>Fiber:</span>
                    <span style={{ fontSize: '0.9rem', color: '#6c757d', fontWeight: '500' }}>{currentFoodNutrition.fiber}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: '#495057', fontWeight: '600' }}>Sugar:</span>
                    <span style={{ fontSize: '0.9rem', color: '#6c757d', fontWeight: '500' }}>{currentFoodNutrition.sugar}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional CSS animations */}
            <style>{`
              @keyframes bounce {
                0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                40%, 43% { transform: translate3d(0, -8px, 0); }
                70% { transform: translate3d(0, -4px, 0); }
                90% { transform: translate3d(0, -2px, 0); }
              }
              @keyframes shimmer {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
              }
              @keyframes progressFill {
                0% { width: 0%; }
                100% { width: var(--progress-width); }
              }
            `}</style>
          </Card>
        </div>

        {/* Food Categories */}
        <Card title="Food Categories Consumed Today" bgColor="#ffffff">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '1rem'
          }}>
            {foodCategories.map((category, index) => {
              const colors = [
                { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '🥕', shadow: 'rgba(102, 126, 234, 0.3)' },
                { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: '🌾', shadow: 'rgba(240, 147, 251, 0.3)' },
                { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '🥩', shadow: 'rgba(79, 172, 254, 0.3)' },
                { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', icon: '🥛', shadow: 'rgba(67, 233, 123, 0.3)' }
              ];
              const colorScheme = colors[index];

              return (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    background: colorScheme.bg,
                    borderRadius: '16px',
                    padding: '1.5rem 1rem',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: `0 8px 32px ${colorScheme.shadow}`,
                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-8px) scale(1.05)';
                    e.target.style.boxShadow = `0 20px 60px ${colorScheme.shadow}`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = `0 8px 32px ${colorScheme.shadow}`;
                  }}
                >
                  {/* Background pattern */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    transform: 'translate(20px, -20px)'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    transform: 'translate(-15px, 15px)'
                  }}></div>

                  {/* Icon */}
                  <div style={{
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                    animation: `bounce 2s ease-in-out ${index * 0.2 + 0.5}s infinite`
                  }}>
                    {colorScheme.icon}
                  </div>

                  {/* Category name */}
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    animation: `fadeIn 0.8s ease-out ${index * 0.1 + 0.3}s both`
                  }}>
                    {category}
                  </div>

                  {/* Animated particles */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '4px',
                    height: '4px',
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: '50%',
                    animation: `twinkle 1.5s ease-in-out ${index * 0.3}s infinite`
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    width: '3px',
                    height: '3px',
                    background: 'rgba(255,255,255,0.4)',
                    borderRadius: '50%',
                    animation: `twinkle 1.5s ease-in-out ${index * 0.3 + 0.5}s infinite`
                  }}></div>
                </div>
              );
            })}
          </div>

          {/* Additional animations */}
          <style>{`
            @keyframes slideInUp {
              0% {
                opacity: 0;
                transform: translateY(30px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes bounce {
              0%, 20%, 53%, 80%, 100% {
                transform: translate3d(0,0,0);
              }
              40%, 43% {
                transform: translate3d(0, -5px, 0);
              }
              70% {
                transform: translate3d(0, -2px, 0);
              }
              90% {
                transform: translate3d(0, -1px, 0);
              }
            }
            @keyframes fadeIn {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            @keyframes twinkle {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.2); }
            }
          `}</style>
        </Card>

        {/* Meals Section */}
        <Card title="Today's Meals" bgColor="#ffffff">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <MealCard mealType="breakfast" items={meals.breakfast} />
            <MealCard mealType="lunch" items={meals.lunch} />
            <MealCard mealType="dinner" items={meals.dinner} />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default PresentTab;
