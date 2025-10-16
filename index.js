const hashMapFactory = () => {
  let capacity = 16;
  let loadFactor = 0.75;
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

  const set = (key, value) => {
    const index = hash(key);
    const bucket = buckets[index];

    //if key exists
    const existing = bucket.find((item) => item[0] === key);
    if (existing) {
      existing[1] = value;
    } else {
      bucket.push([key, value]);
      size++;
    }
    console.log("size is: " + size);

    //add check if resizing needed
  };
  const get = (key) => {
    const index = hash(key);
    const bucket = buckets[index];
    const found = bucket.find((item) => item[0] === key);

    return found ? found[1] : undefined;
  };

  const remove = (key) => {
    const index = hash(key);
    const bucket = buckets[index];

    const pos = bucket.findIndex(([k]) => k === key);
    console.log(pos);
    if (pos === -1) return false;

    bucket.splice(pos, 1);
    size--;
    console.log("size is: " + size);
    return true;
  };

  const length = () => {
    console.log(buckets.length);
    let numOfKeys = 0;
    for (let i = 0; i < buckets.length; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        console.log(buckets[i][j]);
        numOfKeys++;
      }
    }
    return numOfKeys;
  };

  return {
    set,
    get,
    remove,
    length,
  };
};

const map = hashMapFactory();

map.set("a", 6);
map.set("b", 5);
map.set("c", 3);
map.set("q", 1);
map.set("s", 12);
console.log(map.length());
