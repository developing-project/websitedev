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
        <div style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `conic-gradient(${data.map(item => {
            const startPercent = cumulativePercent;
            cumulativePercent += (item.value / total) * 100;
            return `${item.color} ${startPercent}% ${cumulativePercent}%`;
          }).join(', ')})`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          {data.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: item.color,
                borderRadius: '2px'
              }}></div>
              <span style={{ fontSize: '0.9rem', color: '#666666' }}>
                {item.label}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MealCard = ({ mealType, items }) => (
    <div style={{
      flex: 1,
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '1rem',
      border: '1px solid #e9ecef',
      minHeight: '120px'
    }}>
      <h4 style={{
        margin: '0 0 0.75rem 0',
        color: '#495057',
        fontSize: '1rem',
        fontWeight: '600',
        textTransform: 'capitalize',
        borderBottom: '2px solid #007bff',
        paddingBottom: '0.5rem'
      }}>
        {mealType}
      </h4>
      {items.length > 0 ? (
        <ul style={{
          margin: 0,
          paddingLeft: '1.2rem',
          color: '#666666'
        }}>
          {items.map((item, index) => (
            <li key={index} style={{
              marginBottom: '0.25rem',
              fontSize: '0.9rem'
            }}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{
          margin: 0,
          color: '#999999',
          fontStyle: 'italic',
          fontSize: '0.9rem'
        }}>
          No {mealType} recorded
        </p>
      )}
    </div>
  );

  return (
    <div style={{ Width: '100%' }}>
      {/* Pie Chart Section */}
      <Card title="Daily Nutrition Overview" bgColor="#ffffff">
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#1a1a1a', fontWeight: '500' }}>
            Select Chart Type:
          </label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              backgroundColor: 'white',
              fontSize: '1rem'
            }}
          >
            <option value="calories">Calories by Meal</option>
            <option value="macronutrients">Macronutrients</option>
            <option value="micronutrients">Micronutrients</option>
          </select>
        </div>
        <PieChart data={getPieChartData()} />
      </Card>

      {/* Current Food Section */}
      <Card title="Current Meal Details" bgColor="#ffffff">
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Food Image */}
          <div style={{ flex: 1 }}>
            <img
              src={currentFoodImage}
              alt="Current meal"
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          {/* Nutrition Details */}
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#1a1a1a', fontSize: '1.1rem' }}>
              {currentFoodNutrition.name}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#fff3cd', borderRadius: '6px', border: '1px solid #ffeaa7' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d68910' }}>
                  {currentFoodNutrition.calories}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#856404' }}>Calories</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#d1ecf1', borderRadius: '6px', border: '1px solid #bee5eb' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0c5460' }}>
                  {currentFoodNutrition.carbs}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#0c5460' }}>Carbs</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8d7da', borderRadius: '6px', border: '1px solid #f5c6cb' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#721c24' }}>
                  {currentFoodNutrition.proteins}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#721c24' }}>Proteins</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#d4edda', borderRadius: '6px', border: '1px solid #c3e6cb' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#155724' }}>
                  {currentFoodNutrition.fats}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#155724' }}>Fats</div>
              </div>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666666' }}>
              <div>Fiber: {currentFoodNutrition.fiber}</div>
              <div>Sugar: {currentFoodNutrition.sugar}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Food Categories */}
      <Card title="Food Categories Consumed Today">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {foodCategories.map((category, index) => (
            <span key={index} style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '500'
            }}>
              {category}
            </span>
          ))}
        </div>
      </Card>

      {/* Meals Section */}
      <Card title="Today's Meals" bgColor="#ffffff">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <MealCard mealType="breakfast" items={meals.breakfast} />
          <MealCard mealType="lunch" items={meals.lunch} />
          <MealCard mealType="dinner" items={meals.dinner} />
        </div>
      </Card>
    </div>
  );
};

export default PresentTab;
