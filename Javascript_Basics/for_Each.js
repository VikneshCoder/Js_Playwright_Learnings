lists = [2, 4, 5, 6, 6]

sum = 0;
add = (a)=> sum += a;  // Arrow Function
lists.forEach(add)   // Pass iterables in function.
console.log(sum)
