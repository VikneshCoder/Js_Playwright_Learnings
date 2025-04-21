let setMethod = new Set(["New", "set", "Method"])
setMethod.add(23, true, "Adding")  // it will add only first value
console.log(setMethod.has("Adding"))
console.log(setMethod.size)

console.log(setMethod)

a = []
for (let i of setMethod){
    a.push(i)
}
console.log(a)

let valueToAdd = ["Adding",  "Boolean", true, false];
valueToAdd.forEach(value => setMethod.add(value))
console.log(setMethod)

for (let [V,v] of setMethod.entries()){    // It Will return Value and Value
    console.log(V, v)
}

for (let K of setMethod.keys()){    
    console.log(K)
}