import React from 'react';

const PresentTab = () => {
  // Mock data - in real app, this would come from backend
  const foodImage = "https://via.placeholder.com/400x300/007bff/ffffff?text=Food+Photo";

  const foodCategories = [
    "Vegetables & Fruits",
    "Grains & Cereals",
    "Proteins",
    "Dairy Products"
  ];

  const meals = {
    breakfast: ["Oatmeal with fruits", "Greek yogurt", "Whole grain toast"],
    lunch: ["Grilled chicken salad", "Brown rice", "Mixed vegetables"],
    dinner: [] // Empty array means no dinner recorded
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

  const MealItem = ({ mealType, items }) => {
    if (items.length === 0) return null; // Don't show if no items

    return (
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{
          margin: '0 0 0.5rem 0',
          color: '#495057',
          fontSize: '1rem',
          fontWeight: '500',
          textTransform: 'capitalize'
        }}>
          {mealType}
        </h4>
        <ul style={{
          margin: 0,
          paddingLeft: '1.2rem',
          color: '#666666'
        }}>
          {items.map((item, index) => (
            <li key={index} style={{
              marginBottom: '0.25rem',
              fontSize: '0.95rem'
            }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Food Image Section */}
      <Card title="Today's Meal Photo" bgColor="#ffffff">
        <div style={{
          textAlign: 'center',
          padding: '1rem',
          border: '2px dashed #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa'
        }}>
          <img
            src={foodImage}
            alt="Today's meal"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          <p style={{
            margin: '1rem 0 0 0',
            color: '#6c757d',
            fontSize: '0.9rem'
          }}>
            Photo captured from your meal
          </p>
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

      {/* Meals Breakdown */}
      <Card title="Today's Meals">
        <MealItem mealType="breakfast" items={meals.breakfast} />
        <MealItem mealType="lunch" items={meals.lunch} />
        <MealItem mealType="dinner" items={meals.dinner} />
        {meals.breakfast.length === 0 && meals.lunch.length === 0 && meals.dinner.length === 0 && (
          <p style={{
            margin: 0,
            color: '#6c757d',
            fontStyle: 'italic'
          }}>
            No meals recorded for today
          </p>
        )}
      </Card>
    </div>
  );
};

export default PresentTab;
