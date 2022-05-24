export const getRandomAnimal = () => {
  const animals = [
    {
      emoji: '🐕',
      sound: 'woof'
    },
    {
      emoji: '🐈',
      sound: 'meow'
    },
    { emoji: '🐍', sound: 'shhhhh' },
    {
      emoji: '🐄',
      sound: 'moo'
    },
    {
      emoji: '🦄',
      sound: 'magic'
    },
    {
      emoji: '🐸',
      sound: 'kwa kwa'
    },
    {
      emoji: '🦖',
      sound: 'arrrr'
    }
  ];

  return animals[Math.floor(Math.random() * animals.length)];
};
