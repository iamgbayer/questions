export const getDifficultyBadgeColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500 hover:bg-green-500'
    case 'Medium':
      return 'bg-yellow-500 hover:bg-yellow-500'
    case 'Hard':
      return 'bg-red-500 hover:bg-red-500'
  }
}