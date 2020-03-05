import serverURI from '../environments/serverURI';

const getAllPosts = async (setPosts: React.Dispatch<any>): Promise<void> => {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV, serverURI)

  const response = await fetch(
    `${serverURI}/blog/posts`
  );
  const json: any = await response.json();
  //reverse post array to display latest post first:
  await json.reverse()
  //set state with database post list
  setPosts(json);
  console.log('jjj', json)
};

export default getAllPosts;