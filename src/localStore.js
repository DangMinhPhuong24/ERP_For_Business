const store = {};

export function localSet(key, val) {
  store[key] = val;
  localStorage.setItem(key, JSON.stringify(val));
}

export function localGet(key, cache = false) {
  try {
    if (!cache || !Object.hasOwn(store, key)) {
      store[key] = JSON.parse(localStorage.getItem(key));
    }
    return store[key];
  } catch (e) {
    return null;
  }
}

export function localDelete(key) {
  store[key] = null;
  localStorage.removeItem(key);
}
