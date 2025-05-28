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

// Hàm đổi màu flash trên bảng giá
const changeBackground = (id: string, newValue: string | number, oldValue: string | number, compare: 'ref' | 'neutral') => {
  const elemm = document.getElementById(id)
  if (!elemm) return;
  // if (Number.parseInt(newValue) === Number.parseInt(oldValue)) return
  if (compare === 'neutral') {
    if (elemm.classList.contains('bg-neutral')) {
      return
    }
    elemm.classList.add('dark:bg-dark-neutral', 'bg-neutral',)
    setTimeout(() => {
      elemm.classList.remove('dark:bg-dark-neutral', 'bg-neutral',)
    }, 600)
    return;
  }
  if (Number(newValue) < Number(oldValue)) {
    if (elemm.classList.contains('!bg-price-down')) {
      return
    }
    // Remove thẻ up (nếu có)
    elemm.classList.remove('!bg-price-up')
    elemm.classList.add('!text-white', '!bg-price-down')
    setTimeout(() => {
      elemm.classList.remove('!text-white', '!bg-price-down')
    }, 600)
    return
  } else if (Number(newValue) > Number(oldValue)) {
    if (elemm.classList.contains('!bg-price-up')) {
      return
    }
    // Remove thẻ down (nếu có)
    elemm.classList.remove('!bg-price-down')
    elemm.classList.add('!text-white', '!bg-price-up')
    setTimeout(() => {
      elemm.classList.remove('!text-white', '!bg-price-up')
    }, 600)
    return
  }
}

export {
  changeBackground,
  convertMapToObject,
  convertObjectToMap,
  getChangedKeys,
  getNewItemsOnly,
  getOldItemsOnly,
  getLocalStorage,
  setLocalStorage
};

