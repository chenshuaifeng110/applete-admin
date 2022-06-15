// 快蜗云内存管理
const prefix = "K-"

const setStorage = (key, value, storageType) => {
    if(typeof value === 'object')  value =  JSON.stringify(value)
    if(storageType === 'session') sessionStorage.setItem(prefix+key, value)
    else localStorage.setItem(prefix+key, value)
}
const getStorage = (key, storageType) => {
    if(storageType === 'session'){
       let value = sessionStorage.getItem(prefix+key)
       if(typeof value === 'object')  return JSON.parse(value)
       else return value
    } else {
        let value = localStorage.getItem(prefix+key)
        return JSON.parse(value || '{}')
    }
}
const removeStorage = (key,storageType) => {
    if(storageType === 'session'){
        sessionStorage.removeItem(prefix+key)
     } else {
        localStorage.removeItem(prefix+key)
     }
}
const removeAllStorage = (keys,storageType) => {
    keys.forEach(key => {
        removeStorage(key, storageType)
    });
}
const setAllStorage = (keys,storageType) => {
    keys.forEach(item => {
        for (const key in item) {
            setStorage(key, item[key], storageType);
        }
    });
}

export {
    setStorage,
    getStorage,
    removeStorage,
    removeAllStorage,
    setAllStorage,
}