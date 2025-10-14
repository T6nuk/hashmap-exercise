const hashMapFactory = () => {
  let capacity = 16;
  let size = 0;
  let buckets = new Array(capacity).fill(null).map(() => []);

  const hash = (key) => {
    let hashCode = 0;
    const primenumber = 31;
    const keyToStr = key.toString();

    for (let i = 0; i < keyToStr.length; i++) {
      hashCode = primenumber * hashCode + keyToStr.charCodeAt(i);
    }
    return Math.abs(hashCode % capacity);
  };
  console.log(hash("a"));

  return {
    set(key, value) {
      data[key] = value;
    },
    get(key) {
      return data[key];
    },
  };
};

console.log(hashMapFactory());
