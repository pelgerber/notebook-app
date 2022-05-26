export const splitArray = (array, columns) => {
    const tempArray = array.slice();
    const out = [];
    while (tempArray.length) out.push(tempArray.splice(0, columns));
    return out;
};