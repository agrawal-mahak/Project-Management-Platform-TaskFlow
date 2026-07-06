import axiosInstance from "./axiosInstance";

export interface AuthResponse {
    token: string,
    user: {
        _id: string,
        name: string,
        email: string,
        role: string,
    }
}
// ---------google authentication-----------
export const googleLogin = async (credential: string): Promise<AuthResponse> => {
    try {
        const res = await axiosInstance.post<AuthResponse>('/auth/google', { credential });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data;
    } catch (error) {
        console.error("Google login error", error);
        throw error;
    }
}

// ----------Register user------------
export const registerUser = async (name: string,
    email: string,
    password: string): Promise<AuthResponse> => {
    const res = await axiosInstance.post<AuthResponse>('/auth/register', { name, email, password });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;

};


// -----------------login user---------
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    const res = await axiosInstance.post<AuthResponse>('/auth/login',
        { email, password });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;

}

// logout user-----
export const logoutUser = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

// get stored user (set this after login/register)
export const getUserFromStorage = (): { _id: string; name: string; email: string; role: string } | null => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
}

// fetch all users
export const fetchUsers = async (): Promise<{ _id: string; name: string; email: string; role?: string }[]> => {
    const res = await axiosInstance.get('/auth/users');
    return res.data;
}

// change user role
export const updateUserRole = async (userId: string, role: string): Promise<void> => {
    await axiosInstance.put(`/auth/users/${userId}/role`, { role });
}