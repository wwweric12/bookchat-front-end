import { Axios } from './Axios';

export const AxiosSearchBook = async ({ searchQuery, text, page }) => {
  try {
    const response = await Axios.get('/books', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        query: searchQuery,
        searchField: text,
        page,
      },
    });
    return response.data;
  } catch (error) {
    return alert(error);
  }
};
