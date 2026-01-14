import React, { useState } from 'react';

const HistoryTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [showTrackRecord, setShowTrackRecord] = useState(false);

  // Mock nutritional data
  const nutritionalData = {
    daily: {
      macronutrients: {
        carbs: "45% (225g)",
        proteins: "25% (125g)",
        fats: "30% (67g)"
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
        carbs: "48% (1680g)",
        proteins: "22% (770g)",
        fats: "30% (1170g)"
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
        carbs: "46% (6900g)",
        proteins: "24% (3600g)",
        fats: "30% (2025g)"
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
        fontWeight: '600'
      }}>
        {title}
      </h3>
      {children}
    </div>
  );

  const NutrientProgress = ({ label, value }) => (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '0.9rem', color: '#666666' }}>{label}</span>
        <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#1a1a1a' }}>{value}</span>
      </div>
      <div style={{
        height: '8px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          backgroundColor: '#007bff',
          borderRadius: '4px',
          width: value
        }}></div>
      </div>
    </div>
  );

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

  const currentData = nutritionalData[selectedPeriod];

  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Nutritional Overview */}
      <Card title={`Nutritional Overview - ${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}`}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#1a1a1a', fontSize: '1rem', fontWeight: '600' }}>Macronutrients</h4>
          <NutrientProgress label="Carbohydrates" value={currentData.macronutrients.carbs} />
          <NutrientProgress label="Proteins" value={currentData.macronutrients.proteins} />
          <NutrientProgress label="Fats" value={currentData.macronutrients.fats} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#1a1a1a', fontSize: '1rem', fontWeight: '600' }}>Key Micronutrients</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666666' }}>Vitamins</h5>
              {currentData.micronutrients.vitamins.map((vitamin, index) => (
                <div key={index} style={{ fontSize: '0.85rem', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                  {vitamin}
                </div>
              ))}
            </div>
            <div>
              <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666666' }}>Minerals</h5>
              {currentData.micronutrients.minerals.map((mineral, index) => (
                <div key={index} style={{ fontSize: '0.85rem', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                  {mineral}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 1rem 0', color: '#1a1a1a', fontSize: '1rem', fontWeight: '600' }}>Health Benefits</h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#666666' }}>
            {currentData.benefits.map((benefit, index) => (
              <li key={index} style={{ marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Track Record Dropdown */}
      <Card title="Meal History" bgColor="#e9ecef">
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a1a1a', fontWeight: '500' }}>
            Select Time Period:
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              backgroundColor: 'white',
              fontSize: '1rem'
            }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <button
          onClick={() => setShowTrackRecord(!showTrackRecord)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          {showTrackRecord ? 'Hide' : 'Show'} Track Record of {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
        </button>

        {showTrackRecord && (
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#1a1a1a', fontSize: '1.1rem', fontWeight: '600' }}>
              {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Meal Records
            </h4>
            {mealHistory[selectedPeriod].map((record, index) => (
              <MealRecord key={index} record={record} type={selectedPeriod} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default HistoryTab;
