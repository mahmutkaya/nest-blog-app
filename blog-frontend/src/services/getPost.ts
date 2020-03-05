import serverURI from '../environments/serverURI';

const getPost = async (postId: string | undefined, setPost: React.Dispatch<any>): Promise<void> => {
    const response = await fetch(
      `${serverURI}/blog/post/${postId}`
    );
    const json = await response.json();
    setPost(json);
};
  
export default getPost;