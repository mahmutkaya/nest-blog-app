export async function deletePost(id: string,accessToken: any, posts: any) {
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
  removePostFromView(id, posts);
}

const removePostFromView = (id: string, posts: any) => {
    const index = posts.findIndex((post: { _id: string }) => post._id === id);
    posts.splice(index, 1);
  };
