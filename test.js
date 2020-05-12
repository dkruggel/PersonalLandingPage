const chunk = (arr, size) => {
    if (size === undefined) {
      size = 1;
    }
    const numChunks = Math.floor(arr.length / size);
    let tempArr = [];
    for (let i = 0; i < numChunks; i++) {
      tempArr.push(arr.slice(i * size, size + i * size));
    }
    return tempArr;
  }

console.log(chunk([1, 2, 3, 4], 2));