import React, { useState } from 'react';

const HistoryTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [showTrackRecord, setShowTrackRecord] = useState(false);

  // Enhanced nutritional data with detailed macro information
  const nutritionalData = {
    daily: {
      macronutrients: {
        carbs: { consumed: 225, target: 250, percentage: 90 },
        proteins: { consumed: 125, target: 150, percentage: 83 },
        fats: { consumed: 67, target: 83, percentage: 81 }
      },
      micronutrients: {
        vitamins: ["Vitamin C: 85%", "Vitamin D: 65%", "Vitamin A: 90%"],
        minerals: ["Iron: 75%", "Calcium: 80%", "Magnesium: 70%"]
      },
      benefits: [
        "Good energy levels throughout the day",
        "Strong immune system support",
        "Improved muscle recovery"
      ]
    },
    weekly: {
      macronutrients: {
        carbs: { consumed: 1680, target: 1750, percentage: 96 },
        proteins: { consumed: 770, target: 1050, percentage: 73 },
        fats: { consumed: 1170, target: 1167, percentage: 100 }
      },
      micronutrients: {
        vitamins: ["Vitamin C: 78%", "Vitamin D: 62%", "Vitamin A: 85%"],
        minerals: ["Iron: 72%", "Calcium: 76%", "Magnesium: 68%"]
      },
      benefits: [
        "Consistent energy levels",
        "Better sleep quality",
        "Improved digestion"
      ]
    },
    monthly: {
      macronutrients: {
        carbs: { consumed: 6900, target: 7500, percentage: 92 },
        proteins: { consumed: 3600, target: 4500, percentage: 80 },
        fats: { consumed: 2025, target: 2500, percentage: 81 }
      },
      micronutrients: {
        vitamins: ["Vitamin C: 82%", "Vitamin D: 68%", "Vitamin A: 88%"],
        minerals: ["Iron: 74%", "Calcium: 78%", "Magnesium: 72%"]
      },
      benefits: [
        "Long-term health improvement",
        "Better body composition",
        "Enhanced overall wellness"
      ]
    }
  };

  // Mock meal history data
  const mealHistory = {
    daily: [
      { date: "Today", meals: { breakfast: ["Oatmeal", "Banana"], lunch: ["Salad", "Grilled chicken"], dinner: [] } },
      { date: "Yesterday", meals: { breakfast: ["Toast", "Eggs"], lunch: ["Pasta", "Tomato soup"], dinner: ["Fish", "Rice"] } }
    ],
    weekly: [
      { week: "This Week", meals: { totalMeals: 18, avgDaily: 2.6 } },
      { week: "Last Week", meals: { totalMeals: 21, avgDaily: 3.0 } }
    ],
    monthly: [
      { month: "This Month", meals: { totalMeals: 75, avgDaily: 2.4 } },
      { month: "Last Month", meals: { totalMeals: 82, avgDaily: 2.6 } }
    ]
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
        fontWeight: '600',
        textAlign: 'center'
      }}>
        {title}
      </h3>
      {children}
    </div>
  );



  const MacroNutrientCard = ({ macro, data, colors, icon }) => {
    const { consumed, target, percentage } = data;
    const isOverTarget = consumed > target;
    const progressColor = isOverTarget ? '#dc3545' : '#28a745';

    return (
      <div style={{
        padding: '1.5rem',
        background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bgLight} 100%)`,
        borderRadius: '12px',
        border: `2px solid ${colors.border}`,
        boxShadow: `0 6px 20px ${colors.shadow}`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 12px 32px ${colors.shadow}`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = `0 6px 20px ${colors.shadow}`;
      }}
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '60px',
          height: '60px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 3s ease-in-out infinite'
        }}></div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{icon}</span>
              <div>
                <h4 style={{
                  margin: 0,
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: colors.text
                }}>
                  {macro}
                </h4>
                <p style={{
                  margin: '0.25rem 0 0 0',
                  fontSize: '0.8rem',
                  color: colors.subtext,
                  fontWeight: '500'
                }}>
                  Target: {target}g
                </p>
              </div>
            </div>
            <div style={{
              textAlign: 'right',
              background: 'white',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: '800',
                color: progressColor
              }}>
                {percentage}%
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#666',
                fontWeight: '600'
              }}>
                {consumed}g
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              height: '12px',
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: '6px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                height: '100%',
                background: `linear-gradient(90deg, ${progressColor} 0%, ${colors.progress} 100%)`,
                borderRadius: '6px',
                width: `${Math.min(percentage, 100)}%`,
                transition: 'width 1s ease-out',
                position: 'relative'
              }}>
                {percentage > 100 && (
                  <div style={{
                    position: 'absolute',
                    right: '-4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '8px',
                    height: '8px',
                    background: '#dc3545',
                    borderRadius: '50%',
                    animation: 'pulse 1s infinite'
                  }}></div>
                )}
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: colors.subtext,
            fontWeight: '600'
          }}>
            <span>Consumed: {consumed}g</span>
            <span>Remaining: {Math.max(0, target - consumed)}g</span>
          </div>
        </div>
      </div>
    );
  };

  const MealRecord = ({ record, type }) => {
    if (type === 'daily') {
      return (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#495057', fontSize: '1rem' }}>{record.date}</h4>
          {Object.entries(record.meals).map(([mealType, items]) => {
            if (items.length === 0) return null;
            return (
              <div key={mealType} style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '500', color: '#666666', textTransform: 'capitalize' }}>{mealType}: </span>
                <span style={{ color: '#1a1a1a' }}>{items.join(', ')}</span>
              </div>
            );
          })}
        </div>
      );
    } else if (type === 'weekly') {
      return (
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#495057', fontSize: '1rem' }}>{record.week}</h4>
          <p style={{ margin: 0, color: '#666666' }}>
            Total meals: {record.meals.totalMeals} | Average per day: {record.meals.avgDaily}
          </p>
        </div>
      );
    } else if (type === 'monthly') {
      return (
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#495057', fontSize: '1rem' }}>{record.month}</h4>
          <p style={{ margin: 0, color: '#666666' }}>
            Total meals: {record.meals.totalMeals} | Average per day: {record.meals.avgDaily}
          </p>
        </div>
      );
    }
    return null;
  };

  const EnhancedMealRecord = ({ record, type, index }) => {
    const mealTypeColors = {
      breakfast: { bg: '#fff3cd', border: '#ffc107', icon: '🌅', text: '#856404' },
      lunch: { bg: '#d1ecf1', border: '#17a2b8', icon: '☀️', text: '#0c5460' },
      dinner: { bg: '#d4edda', border: '#28a745', icon: '🌙', text: '#155724' }
    };

    if (type === 'daily') {
      return (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: '16px',
          padding: '2rem',
          border: '2px solid #e9ecef',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          position: 'relative',
          overflow: 'hidden',
          animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              color: 'white'
            }}>
              <div style={{
                fontSize: '1.8rem',
                animation: 'bounce 2s ease-in-out infinite'
              }}>
                📅
              </div>
              <div>
                <h3 style={{
                  margin: '0 0 0.25rem 0',
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {record.date}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  opacity: 0.9,
                  fontWeight: '300'
                }}>
                  Daily meal tracking
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {Object.entries(record.meals).map(([mealType, items], mealIndex) => {
                if (items.length === 0) {
                  return (
                    <div key={mealType} style={{
                      padding: '1.5rem',
                      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                      borderRadius: '12px',
                      border: '2px solid #dee2e6',
                      textAlign: 'center',
                      opacity: 0.6,
                      animation: `fadeIn 0.5s ease-out ${mealIndex * 0.1 + 0.5}s both`
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍽️</div>
                      <h4 style={{
                        margin: '0 0 0.5rem 0',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#6c757d',
                        textTransform: 'capitalize'
                      }}>
                        {mealType}
                      </h4>
                      <p style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: '#adb5bd',
                        fontStyle: 'italic'
                      }}>
                        No {mealType} recorded
                      </p>
                    </div>
                  );
                }

                const colorScheme = mealTypeColors[mealType] || mealTypeColors.breakfast;

                return (
                  <div key={mealType} style={{
                    padding: '1.5rem',
                    background: `linear-gradient(135deg, ${colorScheme.bg} 0%, rgba(255,255,255,0.9) 100%)`,
                    borderRadius: '12px',
                    border: `2px solid ${colorScheme.border}`,
                    boxShadow: `0 6px 20px rgba(0,0,0,0.08)`,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    animation: `slideInUp 0.5s ease-out ${mealIndex * 0.1 + 0.3}s both`,
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.15)`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.08)`;
                  }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: `linear-gradient(135deg, ${colorScheme.border} 0%, ${colorScheme.border}dd 100%)`,
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.15)'
                      }}>
                        {colorScheme.icon}
                      </div>
                      <div>
                        <h4 style={{
                          margin: '0 0 0.25rem 0',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: colorScheme.text,
                          textTransform: 'capitalize'
                        }}>
                          {mealType}
                        </h4>
                        <p style={{
                          margin: 0,
                          fontSize: '0.8rem',
                          color: '#666',
                          fontWeight: '500'
                        }}>
                          {items.length} item{items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <ul style={{
                      margin: 0,
                      paddingLeft: '1.2rem',
                      listStyle: 'none'
                    }}>
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} style={{
                          marginBottom: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          background: 'rgba(255,255,255,0.7)',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          color: '#495057',
                          borderLeft: `3px solid ${colorScheme.border}`,
                          animation: `fadeInUp 0.4s ease-out ${itemIndex * 0.05 + 0.5}s both`
                        }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else if (type === 'weekly') {
      return (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: '16px',
          padding: '2rem',
          border: '2px solid #e9ecef',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          position: 'relative',
          overflow: 'hidden',
          animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: '0 6px 20px rgba(40, 167, 69, 0.3)',
              animation: 'bounce 2s ease-in-out infinite'
            }}>
              📊
            </div>
            <div>
              <h3 style={{
                margin: '0 0 0.25rem 0',
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#2d3748'
              }}>
                {record.week}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '0.95rem',
                color: '#6c757d',
                fontWeight: '500'
              }}>
                Weekly meal summary
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%)',
              borderRadius: '12px',
              border: '2px solid #2196f3',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#1976d2',
                marginBottom: '0.5rem'
              }}>
                {record.meals.totalMeals}
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1565c0'
              }}>
                Total Meals
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #f3e5f5 0%, #fafafa 100%)',
              borderRadius: '12px',
              border: '2px solid #9c27b0',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(156, 39, 176, 0.2)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#7b1fa2',
                marginBottom: '0.5rem'
              }}>
                {record.meals.avgDaily}
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#6a1b9a'
              }}>
                Daily Average
              </div>
            </div>
          </div>
        </div>
      );
    } else if (type === 'monthly') {
      return (
        <div style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: '16px',
          padding: '2rem',
          border: '2px solid #e9ecef',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          position: 'relative',
          overflow: 'hidden',
          animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: '0 6px 20px rgba(255, 152, 0, 0.3)',
              animation: 'bounce 2s ease-in-out infinite'
            }}>
              📈
            </div>
            <div>
              <h3 style={{
                margin: '0 0 0.25rem 0',
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#2d3748'
              }}>
                {record.month}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '0.95rem',
                color: '#6c757d',
                fontWeight: '500'
              }}>
                Monthly meal overview
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #fff3e0 0%, #fafafa 100%)',
              borderRadius: '12px',
              border: '2px solid #ff9800',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(255, 152, 0, 0.2)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#e65100',
                marginBottom: '0.5rem'
              }}>
                {record.meals.totalMeals}
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#bf360c'
              }}>
                Total Meals
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #fce4ec 0%, #fafafa 100%)',
              borderRadius: '12px',
              border: '2px solid #e91e63',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(233, 30, 99, 0.2)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#c2185b',
                marginBottom: '0.5rem'
              }}>
                {record.meals.avgDaily}
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#ad1457'
              }}>
                Daily Average
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const currentData = nutritionalData[selectedPeriod];

  return (
    <div style={{ Width: '100%' }}>
      {/* Main Heading - Fixed/Non-movable */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        marginBottom: '2rem',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'rotate 20s linear infinite'
        }}></div>

        <h1 style={{
          margin: '0',
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: '800',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: '1',
          letterSpacing: '-0.02em'
        }}>
          Nutritional Overview - {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
        </h1>

        <p style={{
          margin: '1rem 0 0 0',
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.1rem',
          fontWeight: '300',
          position: 'relative',
          zIndex: '1'
        }}>
          Comprehensive analysis of your nutritional intake and health metrics
        </p>

        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: '40px',
          height: '40px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          animation: 'float 3s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '30px',
          height: '30px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite reverse'
        }}></div>
      </div>

      <style>{`
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseBg {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0, -5px, 0); }
          70% { transform: translate3d(0, -2px, 0); }
          90% { transform: translate3d(0, -1px, 0); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: var(--progress-width); }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* Enhanced Macronutrients Section */}
      <Card title="Macronutrient Analysis" bgColor="#ffffff">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <MacroNutrientCard
            macro="Carbohydrates"
            data={currentData.macronutrients.carbs}
            colors={{
              bg: '#e3f2fd',
              bgLight: '#f8f9fa',
              border: '#2196f3',
              shadow: 'rgba(33, 150, 243, 0.2)',
              text: '#1565c0',
              subtext: '#1976d2',
              progress: '#42a5f5'
            }}
            icon="🍞"
          />
          <MacroNutrientCard
            macro="Proteins"
            data={currentData.macronutrients.proteins}
            colors={{
              bg: '#f3e5f5',
              bgLight: '#fafafa',
              border: '#9c27b0',
              shadow: 'rgba(156, 39, 176, 0.2)',
              text: '#6a1b9a',
              subtext: '#8e24aa',
              progress: '#ba68c8'
            }}
            icon="🥩"
          />
          <MacroNutrientCard
            macro="Fats"
            data={currentData.macronutrients.fats}
            colors={{
              bg: '#fff3e0',
              bgLight: '#fafafa',
              border: '#ff9800',
              shadow: 'rgba(255, 152, 0, 0.2)',
              text: '#e65100',
              subtext: '#f57c00',
              progress: '#ffb74d'
            }}
            icon="🧈"
          />
        </div>

        {/* Summary Stats */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '12px',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#495057',
            textAlign: 'center'
          }}>
            📊 Summary Statistics
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#28a745',
                marginBottom: '0.5rem'
              }}>
                {Object.values(currentData.macronutrients).reduce((sum, macro) => sum + macro.percentage, 0) / 3}%
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#6c757d',
                fontWeight: '600'
              }}>
                Average Achievement
              </div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#007bff',
                marginBottom: '0.5rem'
              }}>
                {Object.values(currentData.macronutrients).reduce((sum, macro) => sum + macro.consumed, 0)}g
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#6c757d',
                fontWeight: '600'
              }}>
                Total Consumed
              </div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#dc3545',
                marginBottom: '0.5rem'
              }}>
                {Object.values(currentData.macronutrients).reduce((sum, macro) => sum + (macro.consumed > macro.target ? macro.consumed - macro.target : 0), 0)}g
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#6c757d',
                fontWeight: '600'
              }}>
                Over Target
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Micronutrients Section */}
      <Card title="Key Micronutrients" bgColor="#ffffff">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <h4 style={{
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#2d3748',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                fontSize: '1.2rem',
                color: '#48bb78'
              }}>🌿</span>
              Vitamins
            </h4>
            {currentData.micronutrients.vitamins.map((vitamin, index) => {
              const [name, percentage] = vitamin.split(': ');
              const percentValue = parseInt(percentage);
              return (
                <div key={index} style={{
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
                  borderRadius: '10px',
                  border: '2px solid #9ae6b4',
                  boxShadow: '0 4px 6px rgba(72, 187, 120, 0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(72, 187, 120, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(72, 187, 120, 0.1)';
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>{name}</span>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      color: '#38a169'
                    }}>{percentage}</span>
                  </div>
                  <div style={{
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #48bb78 0%, #38a169 100%)',
                      borderRadius: '3px',
                      width: `${percentValue}%`,
                      transition: 'width 0.8s ease-in-out',
                      animation: `progressFill 1s ease-out ${index * 0.1}s both`
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h4 style={{
              margin: '0 0 1rem 0',
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#2d3748',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                fontSize: '1.2rem',
                color: '#ed8936'
              }}>⛰️</span>
              Minerals
            </h4>
            {currentData.micronutrients.minerals.map((mineral, index) => {
              const [name, percentage] = mineral.split(': ');
              const percentValue = parseInt(percentage);
              return (
                <div key={index} style={{
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #fffaf0 0%, #fed7aa 100%)',
                  borderRadius: '10px',
                  border: '2px solid #fbbf24',
                  boxShadow: '0 4px 6px rgba(237, 137, 54, 0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(237, 137, 54, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(237, 137, 54, 0.1)';
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#2d3748'
                    }}>{name}</span>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      color: '#dd6b20'
                    }}>{percentage}</span>
                  </div>
                  <div style={{
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #ed8936 0%, #dd6b20 100%)',
                      borderRadius: '3px',
                      width: `${percentValue}%`,
                      transition: 'width 0.8s ease-in-out',
                      animation: `progressFill 1s ease-out ${index * 0.1}s both`
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Enhanced Health Benefits Section */}
      <Card title="Health Benefits" bgColor="#ffffff">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          padding: '1rem'
        }}>
          {currentData.benefits.map((benefit, index) => {
            const benefitColors = [
              { bg: '#f0f9ff', border: '#0ea5e9', icon: '⚡', shadow: 'rgba(14, 165, 233, 0.2)' },
              { bg: '#f0fdf4', border: '#22c55e', icon: '💪', shadow: 'rgba(34, 197, 94, 0.2)' },
              { bg: '#fefce8', border: '#eab308', icon: '🛡️', shadow: 'rgba(234, 179, 8, 0.2)' },
              { bg: '#fdf4ff', border: '#a855f7', icon: '🧠', shadow: 'rgba(168, 85, 247, 0.2)' },
              { bg: '#fff7ed', border: '#f97316', icon: '🔥', shadow: 'rgba(249, 115, 22, 0.2)' },
              { bg: '#f0f9ff', border: '#06b6d4', icon: '🌟', shadow: 'rgba(6, 182, 212, 0.2)' }
            ];
            const colorScheme = benefitColors[index % benefitColors.length];

            return (
              <div key={index} style={{
                background: `linear-gradient(135deg, ${colorScheme.bg} 0%, rgba(255,255,255,0.9) 100%)`,
                borderRadius: '16px',
                padding: '1.5rem',
                border: `2px solid ${colorScheme.border}`,
                boxShadow: `0 8px 25px ${colorScheme.shadow}`,
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${colorScheme.shadow}`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 8px 25px ${colorScheme.shadow}`;
              }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  width: '50px',
                  height: '50px',
                  background: `${colorScheme.border}20`,
                  borderRadius: '50%',
                  animation: 'float 4s ease-in-out infinite'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '-10px',
                  width: '35px',
                  height: '35px',
                  background: `${colorScheme.border}15`,
                  borderRadius: '50%',
                  animation: 'float 5s ease-in-out infinite reverse'
                }}></div>

                {/* Icon and content */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: `linear-gradient(135deg, ${colorScheme.border} 0%, ${colorScheme.border}dd 100%)`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      boxShadow: `0 4px 15px ${colorScheme.shadow}`,
                      animation: `bounceIn 0.8s ease-out ${index * 0.1 + 0.2}s both`
                    }}>
                      {colorScheme.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: '#2d3748',
                        lineHeight: '1.3',
                        animation: `fadeIn 0.8s ease-out ${index * 0.1 + 0.4}s both`
                      }}>
                        Benefit #{index + 1}
                      </h4>
                    </div>
                  </div>

                  <p style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    color: '#4a5568',
                    fontWeight: '500',
                    animation: `fadeInUp 0.8s ease-out ${index * 0.1 + 0.6}s both`
                  }}>
                    {benefit}
                  </p>

                  {/* Progress indicator */}
                  <div style={{
                    marginTop: '1rem',
                    height: '3px',
                    background: 'rgba(0,0,0,0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${colorScheme.border} 0%, ${colorScheme.border}aa 100%)`,
                      borderRadius: '2px',
                      width: '100%',
                      animation: `progressFill 1.5s ease-out ${index * 0.1 + 0.8}s both`
                    }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall health score */}
        <div style={{
          marginTop: '2rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'rotate 20s linear infinite'
          }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{
              margin: '0 0 1rem 0',
              fontSize: '1.8rem',
              fontWeight: '800',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              🌟 Overall Health Score
            </h3>
            <div style={{
              fontSize: '3rem',
              fontWeight: '900',
              marginBottom: '0.5rem',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              {Math.round(Object.values(currentData.macronutrients).reduce((sum, macro) => sum + macro.percentage, 0) / 3)}%
            </div>
            <p style={{
              margin: 0,
              fontSize: '1.1rem',
              fontWeight: '300',
              opacity: 0.9
            }}>
              Based on your nutritional achievements
            </p>
          </div>
        </div>
      </Card>

      {/* Enhanced Meal History Section */}
      <Card title="Meal History & Tracking" bgColor="#ffffff">
        {/* Period Selector with enhanced styling */}
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '12px',
          border: '1px solid #dee2e6'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              📅
            </div>
            <div>
              <h4 style={{
                margin: '0 0 0.25rem 0',
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#2d3748'
              }}>
                Time Period Selection
              </h4>
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                color: '#6c757d'
              }}>
                Choose your preferred tracking period
              </p>
            </div>
          </div>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#4a5568',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.15)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <option value="daily">📅 Daily Records</option>
            <option value="weekly">📊 Weekly Summary</option>
            <option value="monthly">📈 Monthly Overview</option>
          </select>
        </div>

        {/* Enhanced Toggle Button */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={() => setShowTrackRecord(!showTrackRecord)}
            style={{
              padding: '1rem 2rem',
              background: showTrackRecord
                ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'
                : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '700',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: showTrackRecord
                ? '0 8px 25px rgba(220, 53, 69, 0.3)'
                : '0 8px 25px rgba(40, 167, 69, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = showTrackRecord
                ? '0 12px 35px rgba(220, 53, 69, 0.4)'
                : '0 12px 35px rgba(40, 167, 69, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = showTrackRecord
                ? '0 8px 25px rgba(220, 53, 69, 0.3)'
                : '0 8px 25px rgba(40, 167, 69, 0.3)';
            }}
          >
            <span style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {showTrackRecord ? '👁️' : '🔍'}
              {showTrackRecord ? 'Hide' : 'Show'} {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Records
            </span>

            {/* Button background animation */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '0',
              height: '0',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              transition: 'width 0.6s, height 0.6s',
              zIndex: 1
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.width = '300px';
              e.currentTarget.style.height = '300px';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.width = '0';
              e.currentTarget.style.height = '0';
            }}
          ></div>
          </button>
        </div>

        {/* Enhanced Records Display */}
        {showTrackRecord && (
          <div style={{
            animation: 'slideInUp 0.8s ease-out both',
            marginTop: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              color: 'white'
            }}>
              <div style={{
                fontSize: '1.5rem',
                animation: 'bounce 2s ease-in-out infinite'
              }}>
                📊
              </div>
              <div>
                <h3 style={{
                  margin: '0 0 0.25rem 0',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Meal Records
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  opacity: 0.9,
                  fontWeight: '300'
                }}>
                  Detailed breakdown of your meal tracking
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {mealHistory[selectedPeriod].map((record, index) => (
                <EnhancedMealRecord
                  key={index}
                  record={record}
                  type={selectedPeriod}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HistoryTab;
