export const USER_KEY = "utilisateur";

export const getLocalUser = () => {
    return JSON.parse(localStorage.getItem(USER_KEY));
};

export const setLocalUser = (user) => {
    console.log(user);
    console.log( JSON.stringify(user));
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const isConnected = () => {
    const user = getLocalUser();
    console.log(user, !!user);
    return !!user;
}