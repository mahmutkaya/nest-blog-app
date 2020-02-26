const deletePost = async (id: React.ReactNode, accessToken: any): Promise<void> => {
  await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/blog/delete?postID=${id}`,
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