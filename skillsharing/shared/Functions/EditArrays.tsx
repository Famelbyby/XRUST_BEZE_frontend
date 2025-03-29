/**
 * Shuffles given array
 * @param array - Initial array
 * @returns Shuffled copy of array
 */
export function Shuffle<Type>(array: Type[]): Type[] {
    let currentIndex = array.length;
    const newArray: Type[] = array;
  
    while (currentIndex != 0) {
  
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return newArray;
  }