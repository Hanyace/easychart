export const localSave = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const localRead = (key: string):any => {
    let value = localStorage.getItem(key);
    if (value !== null) {
        value = JSON.parse(value);
        return value;
    }
}

export const localRemove = (key: string) => {
    localStorage.removeItem(key);
}