const hashMapFactory = () => {
  const data = {};

  return {
    set(key, value) {
      data[key] = value;
    },
    get(key) {
      return data[key];
    },
  };
};
