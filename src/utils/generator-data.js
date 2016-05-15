
// Generator a list of random data
export function listData(min, max, length) {
  var data = [];
  let range = max - min;
  for (let i = 0; i < length; i ++) {
    let random = min + Math.random() * range;
    data.push(random.toFixed(2));
  }
  return data;
}

console.log(listData(0, 100, 10));
