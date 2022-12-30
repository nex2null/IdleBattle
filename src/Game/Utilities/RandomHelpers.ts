class RandomHelpers {

  // Get a random number between min and max
  static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Get a random element from an array
  static getRandomElementFromArray<T>(array: Array<T>): T | null {

    if (array.length == 0) {
      return null;
    }

    return array[Math.floor(Math.random() * array.length)];
  }
}

export default RandomHelpers;