let mapMethod = new Map();
mapMethod.set("Javascript", "learning");
mapMethod.set(24, "number");
mapMethod.set(true,"boolean");

console.log(mapMethod)
console.log(mapMethod.get(24))
console.log(mapMethod.has(true))
console.log(mapMethod.size)

a = [];
for (let i of mapMethod.keys()){
    a.push(i)
}
console.log(a)

keyValuePairs = []
for (let [k,v] of mapMethod.entries()){
    keyValuePairs.push(k,v)
}
console.log(keyValuePairs)
