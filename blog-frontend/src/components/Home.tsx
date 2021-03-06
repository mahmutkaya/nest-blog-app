import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "../contexts/auth0-context";
import styled from "styled-components";
import deletePost from "../services/deletePost";
import getAllPosts from "../services/getAllPosts";

const BlogArea = styled.section`
  padding: 70px 0 40px;

  @media only screen and (max-width: 767px) {
    padding: 40px 0 10px;
  }
`;
const PostWrapper = styled.article``;
const PostTitle = styled.h1`
  display: block;
  width: 100%;
  text-align: left;
  &:first-child {
    color: green;
  }
`;

function Home(): JSX.Element {
  // let history = useHistory();
  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();
  const [posts, setPosts] = useState();

  const _deletePost = async (id: React.ReactNode) => {
    const accessToken = await getIdTokenClaims();
    await deletePost(id, accessToken);

    /** todo: do I need to use history.push('/') to go home page? */

    //get new post list
    await getAllPosts(setPosts);
  };

  // retrieve all the created posts from the database and update the state of the application with it.
  useEffect(() => {
    getAllPosts(setPosts);
  }, []);

  return (
    <BlogArea className="container-fluid">
      {/* <div className="row"> */}
      {/* <PostWrapper> */}
      {/* {posts &&
        posts.map(
          (
            post: {
              title: React.ReactNode;
              _id: React.ReactNode;
              author: React.ReactNode;
              description: React.ReactNode;
              image: any;
            },
            index: number
          ) => (
            <div key={index} className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-sm btn-outline-secondary"
                >
                  View Post{" "}
                </Link>
                {isAuthenticated && user.name === post.author && (
                  <>
                    <Link
                      to={`/edit/${post._id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit Post{" "}
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => _deletePost(post._id)}
                    >
                      Delete Post
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        )} */}
      {/* </PostWrapper> */}
      {/* </div> */}
<div className="container">
        <div className="row">
          {posts &&
            posts.map(
              (
                post: {
                  title: React.ReactNode;
                  _id: React.ReactNode;
                  author: React.ReactNode;
                },
                index: number
              ) => (
                <div className="col-lg-4 col-md-6" key={index}>
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
