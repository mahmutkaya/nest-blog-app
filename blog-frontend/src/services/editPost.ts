import serverURI from '../environments/serverURI';
import { IValues } from "../components/post/Edit";

const editPost = async (postId: string | undefined, accessToken: any, values: IValues): Promise<boolean> => {
    try {
      const response = await fetch(
        `${serverURI}/blog/edit?postID=${postId}`,
        {
          method: "put",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: `Bearer ${accessToken.__raw}`
          }),
          body: JSON.stringify(values)
        }
      );
      return response.ok;
    } catch {
      return false;
    }
};
  
export default editPost;