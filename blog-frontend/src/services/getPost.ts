const getPost = async (postId: string | undefined, setPost: React.Dispatch<any>): Promise<void> => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/blog/post/${postId}`
    );
    const json = await response.json();
    setPost(json);
};
  
export default getPost;