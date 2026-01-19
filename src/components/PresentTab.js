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

  const MealCard = ({ mealType, items }) => {
    const mealColors = {
      breakfast: { bg: '#f0f9ff', border: '#2563eb', text: '#1e40af', accent: '#3b82f6' },
      lunch: { bg: '#f0fdf4', border: '#16a34a', text: '#166534', accent: '#22c55e' },
      dinner: { bg: '#fefce8', border: '#ca8a04', text: '#92400e', accent: '#eab308' }
    };

    const colorScheme = mealColors[mealType] || mealColors.breakfast;

    return (
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '2rem',
        border: `3px solid ${colorScheme.border}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        minHeight: '180px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        transform: 'translateY(0)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)';
      }}
      >
        {/* Background gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${colorScheme.bg} 0%, rgba(255,255,255,0.95) 50%, ${colorScheme.bg} 100%)`,
          opacity: 0.7,
          zIndex: 1
        }}></div>

        {/* Floating accent elements */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: '40px',
          height: '40px',
          backgroundColor: colorScheme.accent,
          borderRadius: '50%',
          opacity: 0.1,
          animation: 'float 3s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-15px',
          left: '-15px',
          width: '60px',
          height: '60px',
          backgroundColor: colorScheme.accent,
          borderRadius: '50%',
          opacity: 0.05,
          animation: 'float 4s ease-in-out infinite reverse'
        }}></div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{
              margin: 0,
              color: colorScheme.text,
              fontSize: '1.5rem',
              fontWeight: '800',
              textTransform: 'capitalize',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{
                fontSize: '1.8rem',
                animation: 'bounce 2s ease-in-out infinite'
              }}>
                🍳
              </span>
              {mealType}
            </h4>

            {items.length > 0 && (
              <div style={{
                backgroundColor: colorScheme.accent,
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '700',
                boxShadow: `0 4px 12px ${colorScheme.accent}40`,
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                ✓ {items.length} item{items.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {items.length > 0 ? (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              {items.map((item, index) => (
                <span key={index} style={{
                  backgroundColor: colorScheme.bg,
                  color: colorScheme.text,
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  border: `2px solid ${colorScheme.border}30`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                }}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '2rem 1rem',
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                opacity: 0.3
              }}>
                🍽️
              </div>
              <p style={{
                margin: 0,
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                No {mealType} recorded yet
              </p>
              <p style={{
                margin: '0.5rem 0 0 0',
                fontSize: '0.8rem',
                opacity: 0.7
              }}>
                Tap to add your first meal!
              </p>
            </div>
          )}
        </div>

        {/* Shine effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          animation: 'shine 3s ease-in-out infinite'
        }}></div>

        <style>{`
          @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0.5rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
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
              backgroundColor: '#2563eb',
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
                color: '#2563eb'
              }}>
                NutritionTracker
              </h1>
              <p style={{
                margin: 0,
                fontSize: '0.875rem',
                color: '#6b7280'
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
                backgroundColor: '#16a34a',
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
                backgroundColor: '#2563eb',
                borderRadius: '20px',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                <span>🎯</span>
                <span>85% Goal</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem'
      }}>
        {/* Welcome Section */}
        <section style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
          border: '2px solid #e5e7eb',
          animation: 'slideInDownBounce 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) both',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(37, 99, 235, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)';
          e.currentTarget.style.borderColor = '#2563eb';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)';
          e.currentTarget.style.borderColor = '#e5e7eb';
        }}
        >
          {/* Animated background particles */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '8px',
            height: '8px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
            opacity: 0.3,
            animation: 'particleFloat1 6s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '15%',
            width: '6px',
            height: '6px',
            backgroundColor: '#16a34a',
            borderRadius: '50%',
            opacity: 0.4,
            animation: 'particleFloat2 8s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '20%',
            width: '5px',
            height: '5px',
            backgroundColor: '#ca8a04',
            borderRadius: '50%',
            opacity: 0.3,
            animation: 'particleFloat3 7s ease-in-out infinite'
          }}></div>

          {/* Main floating decoration */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #2563eb15 0%, #16a34a15 100%)',
            borderRadius: '50%',
            animation: 'floatComplex 5s ease-in-out infinite',
            border: '2px solid #2563eb20'
          }}></div>

          {/* Emoji with bounce */}
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            animation: 'emojiBounce 2.5s ease-in-out infinite',
            display: 'inline-block'
          }}>
            👋
          </div>

          <h2 style={{
            margin: '0 0 1.5rem 0',
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'textGlow 3s ease-in-out infinite alternate, slideInUpBounce 1s ease-out 0.3s both',
            textShadow: '0 0 30px rgba(37, 99, 235, 0.3)'
          }}>
            Welcome back!
          </h2>

          <p style={{
            margin: '0 auto',
            fontSize: '1.2rem',
            color: '#6b7280',
            maxWidth: '650px',
            lineHeight: '1.7',
            animation: 'fadeInScale 1s ease-out 0.6s both',
            fontWeight: '500'
          }}>
            You're doing <span style={{
              color: '#16a34a',
              fontWeight: '700',
              animation: 'highlightPulse 2s ease-in-out infinite'
            }}>amazing</span>!
            Keep up the healthy eating habits. Here's your nutrition overview for today.
          </p>

          {/* Animated underline */}
          <div style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(90deg, #2563eb 0%, #16a34a 100%)',
            borderRadius: '2px',
            margin: '1.5rem auto 0',
            animation: 'underlineGrow 1.5s ease-out 1s both'
          }}></div>
        </section>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          alignItems: 'stretch'
        }}>
          {/* Nutrition Overview Card */}
          <section style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            animation: 'slideInLeft 0.8s ease-out',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '600px'
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
                color: '#2563eb'
              }}>
                📊 Daily Nutrition Overview
              </h3>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#2563eb';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
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
          <section style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            animation: 'slideInRight 0.8s ease-out',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '600px'
          }}>
            <h3 style={{
              margin: '0 0 1.5rem 0',
              color: '#1a1a1a',
              fontSize: '1.2rem',
              fontWeight: '600'
            }}>
              Current Meal Details
            </h3>
            <div style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'flex-start',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              border: '2px solid #e5e7eb',
              position: 'relative',
              overflow: 'hidden',
              flex: 1
            }}>
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                backgroundColor: '#2563eb',
                borderRadius: '50%',
                opacity: 0.05,
                animation: 'float 4s ease-in-out infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '100px',
                height: '100px',
                backgroundColor: '#16a34a',
                borderRadius: '50%',
                opacity: 0.03,
                animation: 'float 5s ease-in-out infinite reverse'
              }}></div>

              {/* Food Image */}
              <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.03) rotate(1deg)';
                  e.target.style.boxShadow = '0 20px 60px rgba(37, 99, 235, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1) rotate(0deg)';
                  e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                }}
                >
                  <img
                    src={currentFoodImage}
                    alt="Current meal"
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      height: 'auto',
                      borderRadius: '20px',
                      transition: 'filter 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(22, 163, 74, 0.1) 100%)',
                    borderRadius: '20px',
                    pointerEvents: 'none'
                  }}></div>

                  {/* Shine effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                    animation: 'shine 4s ease-in-out infinite',
                    pointerEvents: 'none'
                  }}></div>
                </div>

                {/* Quality indicators */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: '0.5rem',
                  zIndex: 3
                }}>
                </div>
              </div>

              {/* Nutrition Details */}
              <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
                <h4 style={{
                  margin: '0 0 1.5rem 0',
                  color: '#2563eb',
                  fontSize: '1.6rem',
                  fontWeight: '800',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s ease-in-out infinite'
                }}>
                  {currentFoodNutrition.name}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* Calories - Primary highlight */}
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#fefce8',
                    borderRadius: '16px',
                    border: '3px solid #ca8a04',
                    boxShadow: '0 6px 24px rgba(202, 138, 4, 0.15)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-6px) scale(1.02)';
                    e.target.style.boxShadow = '0 12px 36px rgba(202, 138, 4, 0.25)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 6px 24px rgba(202, 138, 4, 0.15)';
                  }}
                  >
                    <div style={{
                      fontSize: '1rem',
                      color: '#92400e',
                      fontWeight: '700',
                      marginBottom: '0.75rem',
                      textAlign: 'center'
                    }}>
                      🔥 Calories
                    </div>
                    <div style={{
                      width: '100%',
                      height: '28px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '35%',
                        background: 'linear-gradient(90deg, #ca8a04 0%, #eab308 100%)',
                        borderRadius: '14px',
                        animation: 'progressFill 2.5s ease-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: '800',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                      }}>
                        420
                      </div>
                    </div>
                    {/* Sparkle effect */}
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#ca8a04',
                      borderRadius: '50%',
                      animation: 'twinkle 1.5s ease-in-out infinite'
                    }}></div>
                  </div>

                  {/* Carbs */}
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '16px',
                    border: '3px solid #2563eb',
                    boxShadow: '0 6px 24px rgba(37, 99, 235, 0.15)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-6px) scale(1.02)';
                    e.target.style.boxShadow = '0 12px 36px rgba(37, 99, 235, 0.25)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 6px 24px rgba(37, 99, 235, 0.15)';
                  }}
                  >
                    <div style={{
                      fontSize: '1rem',
                      color: '#1e40af',
                      fontWeight: '700',
                      marginBottom: '0.75rem',
                      textAlign: 'center'
                    }}>
                      🌾 Carbs
                    </div>
                    <div style={{
                      width: '100%',
                      height: '28px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '14px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '8%',
                        background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
                        borderRadius: '14px',
                        animation: 'progressFill 2s ease-out 0.3s both',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}>
                        8%
                      </div>
                    </div>
                  </div>

                  {/* Proteins */}
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#fef2f2',
                    borderRadius: '16px',
                    border: '3px solid #dc3545',
                    boxShadow: '0 6px 24px rgba(220, 53, 69, 0.15)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-6px) scale(1.02)';
                    e.target.style.boxShadow = '0 12px 36px rgba(220, 53, 69, 0.25)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 6px 24px rgba(220, 53, 69, 0.15)';
                  }}
                  >
                    <div style={{
                      fontSize: '1rem',
                      color: '#991b1b',
                      fontWeight: '700',
                      marginBottom: '0.75rem',
                      textAlign: 'center'
                    }}>
                      💪 Proteins
                    </div>
                    <div style={{
                      width: '100%',
                      height: '28px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '14px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '70%',
                        background: 'linear-gradient(90deg, #dc3545 0%, #e74c3c 100%)',
                        borderRadius: '14px',
                        animation: 'progressFill 2.2s ease-out 0.6s both',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}>
                        70%
                      </div>
                    </div>
                    {/* Achievement star */}
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      fontSize: '1rem',
                      animation: 'bounce 1.8s ease-in-out infinite 0.5s'
                    }}>
                      ⭐
                    </div>
                  </div>

                  {/* Fats */}
                  <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '16px',
                    border: '3px solid #16a34a',
                    boxShadow: '0 6px 24px rgba(22, 163, 74, 0.15)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-6px) scale(1.02)';
                    e.target.style.boxShadow = '0 12px 36px rgba(22, 163, 74, 0.25)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 6px 24px rgba(22, 163, 74, 0.15)';
                  }}
                  >
                    <div style={{
                      fontSize: '1rem',
                      color: '#166534',
                      fontWeight: '700',
                      marginBottom: '0.75rem',
                      textAlign: 'center'
                    }}>
                      🥑 Fats
                    </div>
                    <div style={{
                      width: '100%',
                      height: '28px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '14px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '34%',
                        background: 'linear-gradient(90deg, #16a34a 0%, #22c55e 100%)',
                        borderRadius: '14px',
                        animation: 'progressFill 2s ease-out 0.9s both',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}>
                        34%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional nutrition info */}
                <div style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '16px',
                  border: '2px solid #e5e7eb',
                  position: 'relative'
                }}>
                  <h5 style={{
                    margin: '0 0 1rem 0',
                    color: '#2563eb',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    textAlign: 'center'
                  }}>
                    📊 Additional Nutrients
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{
                      textAlign: 'center',
                      padding: '0.75rem',
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '2px solid #16a34a',
                      boxShadow: '0 2px 8px rgba(22, 163, 74, 0.1)'
                    }}>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '600' }}>Fiber</div>
                      <div style={{ fontSize: '1.2rem', color: '#16a34a', fontWeight: '800' }}>{currentFoodNutrition.fiber}</div>
                    </div>
                    <div style={{
                      textAlign: 'center',
                      padding: '0.75rem',
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '2px solid #ca8a04',
                      boxShadow: '0 2px 8px rgba(202, 138, 4, 0.1)'
                    }}>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '600' }}>Sugar</div>
                      <div style={{ fontSize: '1.2rem', color: '#ca8a04', fontWeight: '800' }}>{currentFoodNutrition.sugar}</div>
                    </div>
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
          </section>
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
                { bg: '#f0f9ff', border: '#2563eb', icon: '🥕', shadow: 'rgba(37, 99, 235, 0.3)' },
                { bg: '#f0fdf4', border: '#16a34a', icon: '🌾', shadow: 'rgba(22, 163, 74, 0.3)' },
                { bg: '#f9fafb', border: '#6b7280', icon: '🥩', shadow: 'rgba(107, 114, 128, 0.3)' },
                { bg: '#fefce8', border: '#ca8a04', icon: '🥛', shadow: 'rgba(202, 138, 4, 0.3)' }
              ];
              const colorScheme = colors[index];

              return (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    backgroundColor: colorScheme.bg,
                    borderRadius: '16px',
                    padding: '1.5rem 1rem',
                    border: `2px solid ${colorScheme.border}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: `0 4px 16px rgba(0,0,0,0.05)`,
                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = `0 8px 24px rgba(0,0,0,0.1)`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = `0 4px 16px rgba(0,0,0,0.05)`;
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                    textAlign: 'center'
                  }}>
                    {colorScheme.icon}
                  </div>

                  {/* Category name */}
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    color: colorScheme.border,
                    animation: `fadeIn 0.8s ease-out ${index * 0.1 + 0.3}s both`
                  }}>
                    {category}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced animations */}
          <style>{`
            @keyframes slideInDownBounce {
              0% {
                opacity: 0;
                transform: translateY(-50px) scale(0.8);
              }
              60% {
                opacity: 1;
                transform: translateY(10px) scale(1.05);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes slideInUpBounce {
              0% {
                opacity: 0;
                transform: translateY(50px) scale(0.8);
              }
              60% {
                opacity: 1;
                transform: translateY(-10px) scale(1.05);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes emojiBounce {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-10px) scale(1.1); }
            }
            @keyframes textGlow {
              0%, 100% {
                text-shadow: 0 0 20px rgba(37, 99, 235, 0.3), 0 0 40px rgba(37, 99, 235, 0.1);
              }
              50% {
                text-shadow: 0 0 30px rgba(37, 99, 235, 0.5), 0 0 60px rgba(37, 99, 235, 0.2);
              }
            }
            @keyframes highlightPulse {
              0%, 100% { color: #16a34a; transform: scale(1); }
              50% { color: #22c55e; transform: scale(1.05); }
            }
            @keyframes underlineGrow {
              0% { width: 0; opacity: 0; }
              100% { width: 100px; opacity: 1; }
            }
            @keyframes fadeInScale {
              0% { opacity: 0; transform: scale(0.9); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes particleFloat1 {
              0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
              50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
            }
            @keyframes particleFloat2 {
              0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
              50% { transform: translateY(-25px) rotate(-180deg); opacity: 0.8; }
            }
            @keyframes particleFloat3 {
              0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
              50% { transform: translateY(-15px) rotate(360deg); opacity: 0.5; }
            }
            @keyframes floatComplex {
              0%, 100% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 0.1;
              }
              25% {
                transform: translateY(-15px) rotate(90deg) scale(1.1);
                opacity: 0.15;
              }
              50% {
                transform: translateY(-25px) rotate(180deg) scale(0.9);
                opacity: 0.2;
              }
              75% {
                transform: translateY(-10px) rotate(270deg) scale(1.05);
                opacity: 0.12;
              }
            }
            @keyframes slideInDown {
              0% {
                opacity: 0;
                transform: translateY(-30px) scale(0.95);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes slideInLeft {
              0% {
                opacity: 0;
                transform: translateX(-50px);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes slideInUp {
              0% {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes bounceIn {
              0% { opacity: 0; transform: scale(0.3); }
              50% { opacity: 1; transform: scale(1.05); }
              70% { transform: scale(0.9); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes bounce {
              0%, 20%, 53%, 80%, 100% {
                transform: translate3d(0,0,0);
              }
              40%, 43% {
                transform: translate3d(0, -8px, 0);
              }
              70% {
                transform: translate3d(0, -4px, 0);
              }
              90% {
                transform: translate3d(0, -2px, 0);
              }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-10px) rotate(1deg); }
              66% { transform: translateY(5px) rotate(-1deg); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.02); }
            }
            @keyframes shimmer {
              0% { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
            @keyframes progressFill {
              0% { width: 0%; }
              100% { width: var(--progress-width); }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 4px 16px rgba(0,0,0,0.05); }
              50% { box-shadow: 0 8px 32px rgba(37, 99, 235, 0.15); }
            }
            @keyframes wiggle {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-1deg); }
              75% { transform: rotate(1deg); }
            }
            @keyframes twinkle {
              0%, 100% { opacity: 0.5; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            @keyframes shine {
              0% { left: -100%; }
              100% { left: 100%; }
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
