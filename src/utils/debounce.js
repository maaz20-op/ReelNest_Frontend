export const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    console.log(timer);

    console.log("timer start");
    timer = setTimeout(() => func(...args), delay);
  };
};
