const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const ApiService = {
  getPosts: async () => fetchData('posts'),
  getUsers: async () => fetchData('users'),
};
