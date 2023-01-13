  export const getKeyCodeFromChar = (char) => {
    switch (char) {
      case 'ArrowLeft':
        return 37;
      case 'ArrowUp':
        return 38;
      case 'ArrowRight':
        return 39;
      case 'ArrowDown':
        return 40;
      default:
        return 0;
    }
  };