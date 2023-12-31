import { Axios } from '../Axios';

export const AxiosEditPost = async ({ isbn, id, postTitle, content, boardCategory, imageUrl }) => {
  try {
    const response = await Axios.put(
      `/books/${isbn}/boards/details/${id}`,
      {
        title: postTitle,
        content,
        boardCategory,
        imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
    alert(response.data.message);
  } catch (error) {
    return alert(error);
  }
};
