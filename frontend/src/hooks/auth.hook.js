import { useCallback, useEffect, useState } from 'react';

export function useAuth() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const login = useCallback((jwtToken, id, name, avatar) => {
        setToken(jwtToken);
        setUserId(id);
        setName(name);
        setAvatar(avatar)
        localStorage.setItem('myOwnBank_isLogin', JSON.stringify({
            userId: id, token: jwtToken, name: name, avatar
        }))
    }, [])

    const logout = () => {
        setToken(null);
        setUserId(null);
        setName(null);
        setAvatar(null);
        localStorage.removeItem('myOwnBank_isLogin');
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('myOwnBank_isLogin'));

        if (data && data.token) {
            login(data.token, data.userId, data.name, data.avatar);
        }

        setIsReady(true);
    }, [login])

    return { login, logout, token, userId, isReady, name, avatar };
}