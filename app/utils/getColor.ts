const categoryBackgroundColors = [
    '#ECFAE8',
    '#FEECF0',
    '#E9EFFB',
    '#F5EBC9',
    '#FEFACF',
    '#ECE4FB',
    '#ECFAE8',
    '#FEECF0',
  ];
  
  // Function to get a random color
  export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * categoryBackgroundColors.length);
    return categoryBackgroundColors[randomIndex];
  };
  
   
  
    