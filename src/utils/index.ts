const getLocalStorage = (name: string) => {
  return localStorage.getItem(name);
}

const setLocalStorage = (name: string, value: any) => {
  return localStorage.setItem(name, value);
}

// Nhận vào 2 cặp object và trả ra object chứa các cặp key-value khác nhau giữa 2 object đầu vào
function getChangedKeys(
  oldObj: Record<string, string>,
  newObj: Record<string, string>
): string[] {
  const changedKeys: string[] = [];

  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  for (const key of allKeys) {
    if (oldObj[key] !== newObj[key]) {
      changedKeys.push(key);
    }
  }

  return changedKeys;
}

const getNewItemsOnly = (oldArr: string[], newArr: string[]): string[] => {
  const oldSet = new Set(oldArr);
  return newArr.filter(item => !oldSet.has(item));
}
const getOldItemsOnly = (oldArr: string[], newArr: string[]): string[] => {
  const newSet = new Set(newArr);
  return oldArr.filter(item => !newSet.has(item));
}

// Chuyển đổi đối tượng Map thành Object thường
function convertMapToObject(map: Map<string, any>): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const [key, value] of map.entries()) {
    obj[key] = value;
  }
  return obj;
}

// Chuyển đổi đối tượng Object thành Map
function convertObjectToMap(obj: Record<string, any>): Map<string, any> {
  return new Map(Object.entries(obj));
}

export {
  convertMapToObject,
  convertObjectToMap,
  getChangedKeys,
  getNewItemsOnly,
  getOldItemsOnly,
  getLocalStorage,
  setLocalStorage
};

