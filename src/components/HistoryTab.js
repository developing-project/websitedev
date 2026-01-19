import React, { useState, useEffect, useRef } from 'react';

const HistoryTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [showTrackRecord, setShowTrackRecord] = useState(false);
  const [activeSection, setActiveSection] = useState('header');
  const sectionRefs = useRef({});

  // Scroll-triggered highlighting effect
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          // Add highlight effect
          entry.target.style.transform = 'scale(1.02)';
          entry.target.style.boxShadow = '0 12px 40px rgba(37, 99, 235, 0.15)';
          entry.target.style.borderColor = '#2563eb';
        } else {
          // Remove highlight effect
          entry.target.style.transform = 'scale(1)';
          entry.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
          entry.target.style.borderColor = '#e5e7eb';
        }
      });
    }, observerOptions);

    // Observe all major sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

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



  const MacroNutrientCard = ({ macro, data, icon, index }) => {
    const { consumed, target, percentage } = data;
    const isOverTarget = consumed > target;
    const progressColor = isOverTarget ? '#dc3545' : '#16a34a';

    return (
      <div style={{
        padding: '0.25rem',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        animation: `slideInUpBounce 0.6s ease-out ${index * 0.2}s both`
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(37, 99, 235, 0.2), inset 0 1px 0 rgba(255,255,255,0.9)';
        e.currentTarget.style.borderColor = '#2563eb';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}
      >


        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: progressColor,
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: `0 6px 20px ${progressColor}40`,
              animation: `iconBounce 2s ease-in-out infinite ${index * 0.3}s`,
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.1) rotate(5deg)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1) rotate(0deg)';
            }}
            >
              {icon}
            </div>
            <div>
              <h4 style={{
                margin: 0,
                fontSize: '1.4rem',
                fontWeight: '800',
                color: '#1f2937',
                animation: `textSlideIn 0.8s ease-out ${index * 0.2 + 0.3}s both`
              }}>
                {macro}
              </h4>
              <p style={{
                margin: '0.5rem 0 0 0',
                fontSize: '0.9rem',
                color: '#6b7280',
                fontWeight: '600',
                animation: `fadeInUp 0.6s ease-out ${index * 0.2 + 0.5}s both`
              }}>
                Target: <span style={{
                  color: '#2563eb',
                  fontWeight: '700'
                }}>{target}g</span>
              </p>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            padding: '1rem 1.5rem',
            borderRadius: '16px',
            border: '2px solid #e5e7eb',
            animation: `cardFlipIn 0.8s ease-out ${index * 0.2 + 0.7}s both`
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: '900',
              color: progressColor,
              animation: `counterPulse 2s ease-in-out infinite ${index * 0.4}s`
            }}>
              {percentage}%
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#6b7280',
              fontWeight: '700',
              marginTop: '0.25rem'
            }}>
              {consumed}g
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            height: '16px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            animation: `barSlideIn 0.6s ease-out ${index * 0.2 + 0.9}s both`
          }}>
            <div style={{
              height: '100%',
              background: `linear-gradient(90deg, ${progressColor} 0%, ${progressColor}dd 100%)`,
              borderRadius: '8px',
              width: '0%',
              animation: `progressFill 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.2 + 1.2}s both`,
              position: 'relative',
              boxShadow: `0 0 20px ${progressColor}60`
            }}
            onAnimationEnd={(e) => {
              e.target.style.width = `${Math.min(percentage, 100)}%`;
            }}
            >
              {/* Animated shine on progress bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '0%',
                width: '30%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                animation: `progressShine 1.5s ease-in-out infinite 1.5s`,
                borderRadius: '8px'
              }}></div>
            </div>

            {percentage > 100 && (
              <div style={{
                position: 'absolute',
                right: '-6px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '12px',
                height: '12px',
                backgroundColor: '#dc3545',
                borderRadius: '50%',
                boxShadow: '0 0 12px #dc3545',
                animation: `warningPulse 1s ease-in-out infinite ${index * 0.2 + 2}s`
              }}></div>
            )}
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.9rem',
          color: '#6b7280',
          fontWeight: '600',
          animation: `statsSlideUp 0.6s ease-out ${index * 0.2 + 1.5}s both`
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#16a34a',
              borderRadius: '50%',
              animation: 'pulse 2s ease-in-out infinite'
            }}></span>
            Consumed: {consumed}g
          </span>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: target - consumed > 0 ? '#2563eb' : '#dc3545'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              backgroundColor: target - consumed > 0 ? '#2563eb' : '#dc3545',
              borderRadius: '50%',
              animation: target - consumed > 0 ? 'pulse 2s ease-in-out infinite 0.5s' : 'warningPulse 1s ease-in-out infinite'
            }}></span>
            Remaining: {Math.max(0, target - consumed)}g
          </span>
        </div>
      </div>
    );
  };



  const EnhancedMealRecord = ({ record, type, index }) => {
    if (type === 'daily') {
      return (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '2px solid #e5e7eb',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            padding: '1rem',
            backgroundColor: '#2563eb',
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
                fontWeight: '700'
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
              const isBreakfast = mealType === 'breakfast';

              if (items.length === 0) {
                return (
                  <div key={mealType} style={{
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    textAlign: 'center',
                    opacity: 0.6,
                    animation: `fadeIn 0.5s ease-out ${mealIndex * 0.1 + 0.5}s both`
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍽️</div>
                    <h4 style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#6b7280',
                      textTransform: 'capitalize'
                    }}>
                      {mealType}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      color: '#9ca3af',
                      fontStyle: 'italic'
                    }}>
                      No {mealType} recorded
                    </p>
                  </div>
                );
              }

              return (
                <div key={mealType} style={{
                  padding: '1.5rem',
                  backgroundColor: isBreakfast ? '#f0f9ff' : '#f9fafb',
                  borderRadius: '12px',
                  border: `2px solid ${isBreakfast ? '#2563eb' : '#e5e7eb'}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  animation: `slideInUp 0.5s ease-out ${mealIndex * 0.1 + 0.3}s both`,
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
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
                      backgroundColor: isBreakfast ? '#2563eb' : '#6b7280',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      {isBreakfast ? '🌅' : mealType === 'lunch' ? '☀️' : '🌙'}
                    </div>
                    <div>
                      <h4 style={{
                        margin: '0 0 0.25rem 0',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: isBreakfast ? '#1e40af' : '#374151',
                        textTransform: 'capitalize'
                      }}>
                        {mealType}
                      </h4>
                      <p style={{
                        margin: 0,
                        fontSize: '0.8rem',
                        color: '#6b7280',
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
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        color: '#374151',
                        borderLeft: `3px solid ${isBreakfast ? '#2563eb' : '#6b7280'}`,
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
      {/* Main Heading - Enhanced Animation */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
        padding: '1rem',
        marginBottom: '1rem',
        borderRadius: '12px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: 'slideInDownBounce 1s ease-out both',
        boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        border: '2px solid rgba(255,255,255,0.1)'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-25px',
          left: '-25px',
          width: '60px',
          height: '60px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
          animation: 'float 7s ease-in-out infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '20%',
          width: '4px',
          height: '4px',
          backgroundColor: 'rgba(255,255,255,0.6)',
          borderRadius: '50%',
          animation: 'particleFloat1 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '25%',
          width: '6px',
          height: '6px',
          backgroundColor: 'rgba(255,255,255,0.4)',
          borderRadius: '50%',
          animation: 'particleFloat2 9s ease-in-out infinite'
        }}></div>

        {/* Shine effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          animation: 'shine 4s ease-in-out infinite 1s',
          pointerEvents: 'none'
        }}></div>

        <h1 style={{
          margin: '0',
          color: 'white',
          fontSize: '2.2rem',
          fontWeight: '800',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          animation: 'textGlow 1.5s ease-out 0.3s both',
          position: 'relative',
          zIndex: 2,
          letterSpacing: '1px'
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Nutritional Overview
          </span>
          <br />
          <span style={{
            fontSize: '1.4rem',
            fontWeight: '600',
            opacity: 0.9,
            animation: 'fadeInScale 0.8s ease-out 0.8s both'
          }}>
            {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Period
          </span>
        </h1>

        <p style={{
          margin: '1rem 0 0 0',
          color: 'rgba(255,255,255,0.95)',
          fontSize: '1.1rem',
          fontWeight: '400',
          animation: 'slideInUp 0.8s ease-out 1s both',
          position: 'relative',
          zIndex: 2,
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}>
          📊 Comprehensive analysis of your nutritional intake and health metrics
        </p>

        {/* Animated border */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0%',
          height: '3px',
          background: 'linear-gradient(90deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
          borderRadius: '2px',
          animation: 'borderExpand 1.5s ease-out 1.2s both'
        }}></div>
      </div>

      <style>{`
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
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
        @keyframes slideInUpBounce {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes iconBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes textSlideIn {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes cardFlipIn {
          0% {
            opacity: 0;
            transform: rotateY(90deg) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: rotateY(0deg) scale(1);
          }
        }
        @keyframes barSlideIn {
          0% {
            opacity: 0;
            transform: scaleY(0);
          }
          100% {
            opacity: 1;
            transform: scaleY(1);
          }
        }
        @keyframes progressShine {
          0% { left: '0%'; }
          50% { left: '70%'; }
          100% { left: '0%'; }
        }
        @keyframes warningPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 12px #dc3545;
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 20px #dc3545, 0 0 30px #dc3545;
          }
        }
        @keyframes statsSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes particleFloat1 {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-15px) rotate(180deg); opacity: 0.7; }
        }
        @keyframes particleFloat2 {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(-180deg); opacity: 0.6; }
        }
        @keyframes particleFloat3 {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.25; }
          50% { transform: translateY(-15px) rotate(360deg); opacity: 0.5; }
        }
        @keyframes spin {
          0% { transform: translateX(-50%) rotate(0deg); }
          100% { transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes alertBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes counterPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      {/* Enhanced Macronutrients Section */}
      <div
        id="macronutrients"
        ref={(el) => sectionRefs.current.macronutrients = el}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '0.75rem',
          marginBottom: '0.75rem',
          border: '1px solid #e9ecef',
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <h3 style={{
          margin: '0 0 0.75rem 0',
          color: '#1a1a1a',
          fontSize: '1.1rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Macronutrient Analysis
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <MacroNutrientCard
            macro="Carbohydrates"
            data={currentData.macronutrients.carbs}
            icon="🍞"
            index={0}
          />
          <MacroNutrientCard
            macro="Proteins"
            data={currentData.macronutrients.proteins}
            icon="🥩"
            index={1}
          />
          <MacroNutrientCard
            macro="Fats"
            data={currentData.macronutrients.fats}
            icon="🧈"
            index={2}
          />
        </div>

        {/* Summary Stats */}
        <div style={{
          marginTop: '0.75rem',
          padding: '0.75rem',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '10px',
          border: '1px solid #dee2e6',
          animation: 'slideInUp 0.5s ease-out 0.3s both',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column'
        }}>


          <h4 style={{
            margin: '0 0 1.5rem 0',
            fontSize: '1.3rem',
            fontWeight: '800',
            color: '#2563eb',
            textAlign: 'center',
            animation: 'fadeInScale 0.8s ease-out 0.8s both',
            position: 'relative',
            zIndex: 2
          }}>
            📊 Summary Statistics
          </h4>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '3px solid #16a34a',
              boxShadow: '0 4px 16px rgba(22, 163, 74, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              animation: 'cardFlipIn 0.8s ease-out 1s both'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(22, 163, 74, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(22, 163, 74, 0.15)';
            }}
            >
              {/* Success indicator */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '20px',
                height: '20px',
                backgroundColor: '#16a34a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                animation: 'bounceIn 0.6s ease-out 1.3s both'
              }}>
                ✓
              </div>

              <div style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                color: '#16a34a',
                marginBottom: '0.75rem',
                animation: 'counterPulse 2s ease-in-out infinite 1.5s',
                textShadow: '0 2px 4px rgba(22, 163, 74, 0.2)'
              }}>
                {Math.round((Object.values(currentData.macronutrients).reduce((sum, macro) => sum + macro.percentage, 0) / 3) * 10) / 10}%
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#6b7280',
                fontWeight: '700',
                animation: 'fadeInUp 0.6s ease-out 1.7s both'
              }}>
                Average Achievement
              </div>


            </div>

            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '3px solid #2563eb',
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              animation: 'cardFlipIn 0.8s ease-out 1.2s both'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.15)';
            }}
            >
              {/* Consumption indicator */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '20px',
                height: '20px',
                backgroundColor: '#2563eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                animation: 'bounceIn 0.6s ease-out 1.5s both'
              }}>
                📊
              </div>

              <div style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                color: '#2563eb',
                marginBottom: '0.75rem',
                animation: 'counterPulse 2s ease-in-out infinite 1.7s',
                textShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
              }}>
                {Object.values(currentData.macronutrients).reduce((sum, macro) => sum + macro.consumed, 0)}g
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#6b7280',
                fontWeight: '700',
                animation: 'fadeInUp 0.6s ease-out 1.9s both'
              }}>
                Total Consumed
              </div>

              {/* Floating particles */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '15px',
                width: '6px',
                height: '6px',
                backgroundColor: '#2563eb',
                borderRadius: '50%',
                opacity: 0.4,
                animation: 'float 3s ease-in-out infinite 2.2s'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '20px',
                width: '4px',
                height: '4px',
                backgroundColor: '#2563eb',
                borderRadius: '50%',
                opacity: 0.3,
                animation: 'float 4s ease-in-out infinite 2.4s'
              }}></div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1.5rem',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '3px solid #dc3545',
              boxShadow: '0 4px 16px rgba(220, 53, 69, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer',
              animation: 'cardFlipIn 0.8s ease-out 1.4s both'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(220, 53, 69, 0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(220, 53, 69, 0.15)';
            }}
            >
              {/* Warning indicator */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '20px',
                height: '20px',
                backgroundColor: '#dc3545',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                animation: 'warningPulse 1.5s ease-in-out infinite 1.7s'
              }}>
                ⚠️
              </div>

              <div style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                color: '#dc3545',
                marginBottom: '0.75rem',
                animation: 'counterPulse 2s ease-in-out infinite 1.9s',
                textShadow: '0 2px 4px rgba(220, 53, 69, 0.2)'
              }}>
                {Object.values(currentData.macronutrients).reduce((sum, macro) => sum + (macro.consumed > macro.target ? macro.consumed - macro.target : 0), 0)}g
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#6b7280',
                fontWeight: '700',
                animation: 'fadeInUp 0.6s ease-out 2.1s both'
              }}>
                Over Target
              </div>

              {/* Alert animation */}
              {Object.values(currentData.macronutrients).some(macro => macro.consumed > macro.target) && (
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '30px',
                  height: '4px',
                  backgroundColor: '#dc3545',
                  borderRadius: '2px',
                  animation: 'alertBlink 1s ease-in-out infinite 2.3s'
                }}></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Micronutrients Section */}
      <Card title="Key Micronutrients" bgColor="#ffffff">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          animation: 'fadeInScale 0.8s ease-out both',
          padding: '1rem'
        }}>
          <div style={{
            animation: 'slideInLeft 0.8s ease-out 0.2s both'
          }}>
            <h4 style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.3rem',
              fontWeight: '800',
              color: '#2563eb',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              animation: 'bounceIn 0.8s ease-out 0.4s both'
            }}>
              <span style={{
                fontSize: '1.5rem',
                animation: 'emojiBounce 2s ease-in-out infinite'
              }}>🌿</span>
              <span style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Vitamins</span>
            </h4>
            {currentData.micronutrients.vitamins.map((vitamin, index) => {
              const [name, percentage] = vitamin.split(': ');
              const percentValue = parseInt(percentage);
              return (
                <div key={index} style={{
                  marginBottom: '1.25rem',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                  borderRadius: '12px',
                  border: '2px solid #86efac',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `cardFlipIn 0.6s ease-out ${0.6 + index * 0.15}s both`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(34, 197, 94, 0.25)';
                  e.currentTarget.style.borderColor = '#16a34a';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.15)';
                  e.currentTarget.style.borderColor = '#86efac';
                }}
                >
                  {/* Floating particle */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#16a34a',
                    borderRadius: '50%',
                    opacity: 0.4,
                    animation: `particleFloat1 4s ease-in-out infinite ${0.8 + index * 0.2}s`
                  }}></div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#166534',
                      animation: `textSlideIn 0.5s ease-out ${0.8 + index * 0.15 + 0.2}s both`
                    }}>{name}</span>
                    <div style={{
                      backgroundColor: '#16a34a',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '800',
                      animation: `bounceIn 0.5s ease-out ${0.8 + index * 0.15 + 0.4}s both`
                    }}>
                      {percentage}
                    </div>
                  </div>
                  <div style={{
                    height: '8px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                    animation: `barSlideIn 0.5s ease-out ${0.8 + index * 0.15 + 0.6}s both`
                  }}>
                    <div style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #16a34a 0%, #22c55e 50%, #4ade80 100%)',
                      borderRadius: '4px',
                      width: '0%',
                      animation: `progressFill 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${0.8 + index * 0.15 + 0.8}s both`,
                      position: 'relative',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                    }}
                    onAnimationEnd={(e) => {
                      e.target.style.width = `${Math.min(percentValue, 100)}%`;
                    }}
                    >
                      {/* Shine effect */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '0%',
                        width: '25%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                        animation: `progressShine 2s ease-in-out infinite ${1 + index * 0.3}s`,
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            animation: 'slideInRight 0.8s ease-out 0.2s both'
          }}>
            <h4 style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.3rem',
              fontWeight: '800',
              color: '#2563eb',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              animation: 'bounceIn 0.8s ease-out 0.4s both'
            }}>
              <span style={{
                fontSize: '1.5rem',
                animation: 'emojiBounce 2.2s ease-in-out infinite'
              }}>⛰️</span>
              <span style={{
                background: 'linear-gradient(135deg, #ca8a04 0%, #eab308 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Minerals</span>
            </h4>
            {currentData.micronutrients.minerals.map((mineral, index) => {
              const [name, percentage] = mineral.split(': ');
              const percentValue = parseInt(percentage);
              return (
                <div key={index} style={{
                  marginBottom: '1.25rem',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 50%, #fde68a 100%)',
                  borderRadius: '12px',
                  border: '2px solid #fcd34d',
                  boxShadow: '0 4px 12px rgba(202, 138, 4, 0.15)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `cardFlipIn 0.6s ease-out ${0.6 + index * 0.15}s both`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(202, 138, 4, 0.25)';
                  e.currentTarget.style.borderColor = '#ca8a04';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(202, 138, 4, 0.15)';
                  e.currentTarget.style.borderColor = '#fcd34d';
                }}
                >
                  {/* Floating particle */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '8px',
                    width: '5px',
                    height: '5px',
                    backgroundColor: '#ca8a04',
                    borderRadius: '50%',
                    opacity: 0.5,
                    animation: `particleFloat2 5s ease-in-out infinite ${0.9 + index * 0.25}s`
                  }}></div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#92400e',
                      animation: `textSlideIn 0.5s ease-out ${0.8 + index * 0.15 + 0.2}s both`
                    }}>{name}</span>
                    <div style={{
                      backgroundColor: '#ca8a04',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: '800',
                      animation: `bounceIn 0.5s ease-out ${0.8 + index * 0.15 + 0.4}s both`
                    }}>
                      {percentage}
                    </div>
                  </div>
                  <div style={{
                    height: '8px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                    animation: `barSlideIn 0.5s ease-out ${0.8 + index * 0.15 + 0.6}s both`
                  }}>
                    <div style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #ca8a04 0%, #eab308 50%, #f59e0b 100%)',
                      borderRadius: '4px',
                      width: '0%',
                      animation: `progressFill 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${0.8 + index * 0.15 + 0.8}s both`,
                      position: 'relative',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                    }}
                    onAnimationEnd={(e) => {
                      e.target.style.width = `${Math.min(percentValue, 100)}%`;
                    }}
                    >
                      {/* Shine effect */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '0%',
                        width: '25%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
                        animation: `progressShine 2.2s ease-in-out infinite ${1.2 + index * 0.3}s`,
                        borderRadius: '4px'
                      }}></div>
                    </div>
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
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          padding: '1rem',
          animation: 'fadeInScale 0.8s ease-out both'
        }}>
          {currentData.benefits.map((benefit, index) => {
            // Enhanced Ocean Blue color variations
            const benefitColors = [
              {
                bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
                border: '#2563eb',
                accent: '#1d4ed8',
                icon: '⚡',
                shadow: 'rgba(37, 99, 235, 0.25)',
                particleColor: '#3b82f6'
              },
              {
                bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                border: '#16a34a',
                accent: '#15803d',
                icon: '💪',
                shadow: 'rgba(22, 163, 74, 0.25)',
                particleColor: '#22c55e'
              },
              {
                bg: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)',
                border: '#6b7280',
                accent: '#4b5563',
                icon: '🛡️',
                shadow: 'rgba(107, 114, 128, 0.25)',
                particleColor: '#64748b'
              }
            ];
            const colorScheme = benefitColors[index % benefitColors.length];

            return (
              <div key={index} style={{
                background: colorScheme.bg,
                borderRadius: '20px',
                padding: '2rem',
                border: `3px solid ${colorScheme.border}`,
                boxShadow: `0 12px 32px ${colorScheme.shadow}, inset 0 1px 0 rgba(255,255,255,0.8)`,
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                animation: `slideInUpBounce 0.8s ease-out ${index * 0.15}s both`
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.03) rotate(1deg)';
                e.currentTarget.style.boxShadow = `0 24px 48px ${colorScheme.shadow}, inset 0 1px 0 rgba(255,255,255,0.9)`;
                e.currentTarget.style.borderColor = colorScheme.accent;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = `0 12px 32px ${colorScheme.shadow}, inset 0 1px 0 rgba(255,255,255,0.8)`;
                e.currentTarget.style.borderColor = colorScheme.border;
              }}
              >
                {/* Animated floating particles */}
                <div style={{
                  position: 'absolute',
                  top: '15%',
                  left: '15%',
                  width: '8px',
                  height: '8px',
                  backgroundColor: colorScheme.particleColor,
                  borderRadius: '50%',
                  opacity: 0.4,
                  animation: `particleFloat1 5s ease-in-out infinite ${index * 0.3}s`
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '25%',
                  right: '20%',
                  width: '6px',
                  height: '6px',
                  backgroundColor: colorScheme.accent,
                  borderRadius: '50%',
                  opacity: 0.3,
                  animation: `particleFloat2 6s ease-in-out infinite ${index * 0.4}s`
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '20%',
                  left: '25%',
                  width: '5px',
                  height: '5px',
                  backgroundColor: colorScheme.particleColor,
                  borderRadius: '50%',
                  opacity: 0.5,
                  animation: `particleFloat3 7s ease-in-out infinite ${index * 0.5}s`
                }}></div>

                {/* Main floating decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '60px',
                  height: '60px',
                  background: `${colorScheme.border}15`,
                  borderRadius: '50%',
                  animation: `floatComplex 4s ease-in-out infinite ${index * 0.2}s`,
                  border: `2px solid ${colorScheme.border}30`
                }}></div>

                {/* Shine effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: `shine 5s ease-in-out infinite ${index * 0.6}s`,
                  pointerEvents: 'none'
                }}></div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: `linear-gradient(135deg, ${colorScheme.border} 0%, ${colorScheme.accent} 100%)`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      boxShadow: `0 6px 20px ${colorScheme.shadow}`,
                      animation: `iconBounce 2.5s ease-in-out infinite ${index * 0.2}s`,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.15) rotate(5deg)';
                      e.target.style.boxShadow = `0 8px 25px ${colorScheme.shadow}`;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1) rotate(0deg)';
                      e.target.style.boxShadow = `0 6px 20px ${colorScheme.shadow}`;
                    }}
                    >
                      {colorScheme.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: '1.3rem',
                        fontWeight: '800',
                        color: colorScheme.accent,
                        lineHeight: '1.3',
                        animation: `textSlideIn 0.8s ease-out ${index * 0.15 + 0.3}s both`,
                        textShadow: `0 1px 2px ${colorScheme.border}30`
                      }}>
                        Benefit #{index + 1}
                      </h4>
                      <div style={{
                        width: '40px',
                        height: '3px',
                        background: `linear-gradient(90deg, ${colorScheme.border} 0%, ${colorScheme.accent} 100%)`,
                        borderRadius: '2px',
                        marginTop: '0.5rem',
                        animation: `underlineGrow 0.8s ease-out ${index * 0.15 + 0.5}s both`
                      }}></div>
                    </div>
                  </div>

                  <p style={{
                    margin: 0,
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: '#374151',
                    fontWeight: '500',
                    animation: `fadeInScale 0.8s ease-out ${index * 0.15 + 0.7}s both`
                  }}>
                    {benefit}
                  </p>

                  {/* Enhanced progress indicator */}
                  <div style={{
                    marginTop: '1.5rem',
                    height: '6px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                    animation: `barSlideIn 0.6s ease-out ${index * 0.15 + 0.9}s both`
                  }}>
                    <div style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${colorScheme.border} 0%, ${colorScheme.accent} 50%, ${colorScheme.border} 100%)`,
                      borderRadius: '3px',
                      width: '0%',
                      animation: `progressFill 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15 + 1.1}s both`,
                      position: 'relative',
                      boxShadow: `0 0 15px ${colorScheme.border}50`
                    }}
                    onAnimationEnd={(e) => {
                      e.target.style.width = '100%';
                    }}
                    >
                      {/* Animated shine */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '0%',
                        width: '30%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                        animation: `progressShine 2s ease-in-out infinite ${index * 0.3 + 1.5}s`,
                        borderRadius: '3px'
                      }}></div>
                    </div>
                  </div>

                  {/* Achievement badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '15px',
                    width: '30px',
                    height: '30px',
                    background: `linear-gradient(135deg, ${colorScheme.accent} 0%, ${colorScheme.border} 100%)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    color: 'white',
                    boxShadow: `0 3px 10px ${colorScheme.shadow}`,
                    animation: `bounceIn 0.8s ease-out ${index * 0.15 + 1.3}s both`
                  }}>
                    ✓
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
          backgroundColor: '#2563eb',
          borderRadius: '16px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3)'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.8rem',
            fontWeight: '800'
          }}>
            🌟 Overall Health Score
          </h3>
          <div style={{
            fontSize: '3rem',
            fontWeight: '900',
            marginBottom: '0.5rem',
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
