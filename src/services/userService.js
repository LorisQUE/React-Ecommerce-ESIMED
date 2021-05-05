export const USER_KEY = "utilisateur";

export const getLocalUser = () => {
    return JSON.parse(localStorage.getItem(USER_KEY));
};

export const setLocalUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const isConnected = () => {
    const user = getLocalUser();
    return !!user;
}

export const removeLocalUser = () => {
    localStorage.removeItem(USER_KEY);
}