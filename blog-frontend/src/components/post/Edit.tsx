import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import getPost from '../../services/getPost'
import editPost from "../../services/editPost";

export interface IValues {
  [key: string]: any;
}

function Edit(): JSX.Element {
  const { getIdTokenClaims } = useAuth0();
  let history = useHistory();

  // To retrieve the contents of the post that needs to be edited,
  // obtaine the postId from the URL using the useParams() React hook:
  let { postId } = useParams();

  // state variables:
  const [post, setPost] = useState(),
    [values, setValues] = useState<IValues>([]),
    [submitSuccess, setSubmitSuccess] = useState<boolean>(false),
    [loading, setLoading] = useState(false);

  useEffect(() => {
    getPost(postId, setPost);
  }, [postId]);

  //@todo: make generic 'handle' methods for create and edit components
  const handleFormSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const submitSuccess: boolean = await submitForm();

    setSubmitSuccess(submitSuccess);
    setLoading(false);

    setTimeout(() => {
      history.push("/");
    }, 1500);
  };
  
  const submitForm = async (): Promise<boolean> => {
    const accessToken = await getIdTokenClaims();
    return await editPost(postId, accessToken, values)
  }

  const setFormValues = (formValues: IValues) => {
    setValues({ ...values, ...formValues });
  };

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValues({ [e.currentTarget.id]: e.currentTarget.value });
  };

  return (
    <div className={"page-wrapper"}>
      {post && (
        <div className={"col-md-12 form-wrapper"}>
          <h2> Edit Post </h2>
          {submitSuccess && (
            <div className="alert alert-info" role="alert">
              The post has been edited successfully!
            </div>
          )}
          <form
            id={"create-post-form"}
            onSubmit={handleFormSubmission}
            noValidate={true}
          >
            <div className="form-group col-md-12">
              <label htmlFor="title"> Title </label>
              <input
                type="text"
                id="title"
                defaultValue={post.title}
                onChange={e => handleInputChanges(e)}
                name="title"
                className="form-control"
                placeholder="Enter title"
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="description"> Description </label>
              <input
                type="text"
                id="description"
                defaultValue={post.description}
                onChange={e => handleInputChanges(e)}
                name="description"
                className="form-control"
                placeholder="Enter Description"
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="body"> Write Content </label>
              <input
                type="text"
                id="body"
                defaultValue={post.body}
                onChange={e => handleInputChanges(e)}
                name="body"
                className="form-control"
                placeholder="Enter content"
              />
            </div>
            <div className="form-group col-md-4 pull-right">
              <button className="btn btn-success" type="submit">
                Edit Post
              </button>
              {loading && <span className="fa fa-circle-o-notch fa-spin" />}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Edit;
