import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "../contexts/auth0-context";
import styled from "styled-components";
import {deletePost} from '../services/deletePost'

const BlogArea = styled.section`
  padding: 70px 0 40px;

  @media only screen and (max-width: 767px) {
    padding: 40px 0 10px;
  }
`;

function Home(): JSX.Element {
  let history = useHistory();
  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();
  const [posts, setPosts] = useState();

  const _deletePost = async (id: string) => {
    const accessToken = await getIdTokenClaims();
    await deletePost(id,accessToken, posts)
    history.push("/");
  }

  // retrieve all the created posts from the database and update the state of the application with it.
  useEffect(() => {
    const fetchPosts = async (): Promise<any> => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blog/posts`
      );
      const json = await response.json();
      setPosts(json);
    };
    fetchPosts();
  }, []);

  return (
    <BlogArea className="blog-area section">
      <div className="container">
        <div className="row">
          {posts &&
            posts.map(
              (post: { title: React.ReactNode; _id: any; author: any }) => (
                <div className="col-lg-4 col-md-6" key={post._id}>
                  <div className="card h-100">
                    <div className="single-post post-style-1">
                      <div className="blog-image">
                        <img
                          src="https://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1563149789/blog-image_psvipq.jpg"
                          alt="Blog"
                        />
                      </div>
                      <span className="avatar">
                        <img
                          src="http://res.cloudinary.com/yemiwebby-com-ng/image/upload/v1513770253/WEB_FREAK_50PX-01_yaqxg7.png"
                          alt="Profile"
                        />
                      </span>
                      <div className="blog-info">
                        <h4 className="title">
                          <span>
                            <b>{post.title}</b>
                          </span>
                        </h4>
                      </div>
                    </div>
                    <ul className="post-footer">
                      <li>
                        <Link
                          to={`/post/${post._id}`}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View Post{" "}
                        </Link>
                      </li>
                      <li>
                        {isAuthenticated && user.name === post.author && (
                          <Link
                            to={`/edit/${post._id}`}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Edit Post{" "}
                          </Link>
                        )}
                      </li>
                      <li>
                        {isAuthenticated && user.name === post.author && (
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => _deletePost(post._id)}
                          >
                            Delete Post
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </BlogArea>
  );
}

export default Home;
