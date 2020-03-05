import serverURI from '../environments/serverURI'

const deletePost = async (id: React.ReactNode, accessToken: any): Promise<void> => {
  await fetch(
    `${serverURI}/blog/delete?postID=${id}`,
    {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${accessToken.__raw}`
      })
    }
  );
}

export default deletePost;