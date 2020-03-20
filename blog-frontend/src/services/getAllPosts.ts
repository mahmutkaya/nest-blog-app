import serverURI from '../environments/serverURI';

const getAllPosts = async (setPosts: React.Dispatch<any>): Promise<void> => {
  console.log('mode', process.env.NODE_ENV)

  const response = await fetch(
    `${serverURI}/blog/posts`
  );
  const json: any = await response.json();
  //reverse post array to display latest post first:
  await json.reverse()
  //set state with database post list
  setPosts(json);
};

export default getAllPosts;