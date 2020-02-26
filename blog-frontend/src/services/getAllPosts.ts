const getAllPosts = async (setPosts: React.Dispatch<any>): Promise<void> => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/blog/posts`
    );
    const json = await response.json();

    //set state with database post list
    setPosts(json);
};
  
export default getAllPosts;