const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiService = {
    fetchUsers: async () => {
        try {
            const response = await fetch(`${BASE_URL}/users`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            throw new Error('Failed to fetch users: ' + error.message);
        }
    },

    fetchPosts: async () => {
        try {
            const response = await fetch(`${BASE_URL}/posts`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            throw new Error('Failed to fetch posts: ' + error.message);
        }
    },

    createUser: async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            return await response.json();
        } catch (error) {
            throw new Error('Failed to create user: ' + error.message);
        }
    },
};