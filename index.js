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

  const resize = () => {
    console.log("resizing...");

    capacity *= 2;
    const newBuckets = new Array(capacity).fill(null).map(() => []);

    for (let bucket of buckets) {
      for (let [key, value] of bucket) {
        const index = hash(key) % capacity;
        newBuckets[index].push([key, value]);
      }
    }

    buckets = newBuckets;
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

    if (size / capacity >= loadFactor) {
      resize();
    }
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

  const clear = () => {
    buckets = new Array(capacity).fill(null).map(() => []);
    size = 0;
    return buckets;
  };

  const keys = () => {
    let arr = [];
    for (let i = 0; i < buckets.length; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        arr.push(buckets[i][j][0]);
      }
    }
    return arr;
  };

  const values = () => {
    let arr = [];
    for (let i = 0; i < buckets.length; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        arr.push(buckets[i][j][1]);
      }
    }
    return arr;
  };

  return {
    set,
    get,
    remove,
    length,
    clear,
    keys,
    values,
  };
};

const map = hashMapFactory();

map.set("a", 6);
map.set("b", 5);
map.set("c", 3);
map.set("d", 1);
map.set("e", 4);
map.set("f", 5);
map.set("g", 4);
map.set("h", 3);
map.set("i", 6);
map.set("j", 32);
map.set("k", 66);
map.set("l", 3);
console.log(map.length());
console.log(map.keys());
map.clear();
console.log(map.length());
