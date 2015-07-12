export default class KanaTable {
  constructor(rawTable) {
    this.rawTable = rawTable;
    this.formattedTable = this.format();
  }

  format() {
    let convertedRawTable = this.convertToArray(this.rawTable);
    let extractedTable = this.extractValues(convertedRawTable).reverse();
    let sortedTable = extractedTable.map(row => this.convertToArray(row));
    return this.transpose(sortedTable);
  }

  compareKanas(a, b, array) {
    let ai = array.indexOf(a);
    let bi = array.indexOf(b);
    if (ai < bi) return -1;
    if (ai > bi) return 1;
    return 0;
  }

  convertToArray(object) {
    let keys = [];
    for (let key in object) keys.push(key);
    this.sort(keys);

    return keys.map((key) => { return {[key]: object[key]}; });
  }

  extractValues(array) {
    let extractedArray = [];
    for (let object of array)
      for (let key in object) extractedArray.push(object[key]);
    return extractedArray;
  }

  getMaxLength(array) {
    let maxLength = 0;
    for(let childArray of array)
      if (childArray.length > maxLength) maxLength = childArray.length;
    return maxLength;
  }

  sort(kanas) {
    if (kanas.indexOf("わ") >= 0) {
      return kanas.sort((a, b) => {
        return this.compareKanas(a, b, ["わ", "ゐ", "う", "ゑ", "を"]);
      });
    }
    else if (kanas.indexOf("や") >= 0 ) {
      return kanas.sort((a, b) => {
        return this.compareKanas(a, b, ["や", "い", "ゆ", "え", "よ"]);
      });
    }
    else return kanas.sort();
  }

  transpose(array) {
    let maxLength = this.getMaxLength(array);
    let transposedArray = [];
    for (let i = 0; i < maxLength; i++) transposedArray.push([]);
    for (let childArray of array)
      for (let i = 0; i < maxLength; i++) transposedArray[i].push(childArray[i]);
    
    return transposedArray;
  }
}
