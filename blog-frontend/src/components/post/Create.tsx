import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import createPost from "../../services/createPost";

function Create(): JSX.Element {
  let history = useHistory();
  const { user, getIdTokenClaims } = useAuth0();

  interface IValues {
    [key: string]: any;
  }
  interface IObj {
    name: string;
    label?: string;
    type?: string;
    defaultValue?: string;
  }

  // state variables:
  const [author, setAuthor] = useState<string>(""),
    [values, setValues] = useState<IValues>([]),
    [submitSuccess, setSubmitSuccess] = useState<boolean>(false),
    [loading, setLoading] = useState<boolean>(false);

  const formData = {
    title: values.title,
    description: values.description,
    body: values.body,
    author
  };

  // set the author name as retrieved using the
  // user object from the created Auth0Context.
  useEffect(() => {
    if (user) {
      setAuthor(user.name);
    }
  }, [user]);

  // receive and process the values from the input fields
  // before posting the information to the server:
  const handleFormSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setLoading(true);

    const submitSuccess: boolean = await submitForm();

    setSubmitSuccess(submitSuccess);
    setValues({ ...values, formData });
    setLoading(false);

    setTimeout(() => {
      history.push("/");
    }, 1500);
  };

  const submitForm = async (): Promise<boolean> => {
    const accessToken = await getIdTokenClaims();
    return await createPost(formData, accessToken);
  };

  const setFormValues = (formValues: IValues) => {
    setValues({ ...values, ...formValues });
  };

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  const inputField = (obj: IObj) => (
    <div className="form-group col-md-12">
      <label htmlFor={obj.name}> {obj.label || obj.name}</label>
      <input
        type={obj.type || "text"}
        id={obj.name}
        onChange={e => handleInputChanges(e)}
        name={obj.name}
        defaultValue={obj.defaultValue}
        className="form-control"
        placeholder={`enter ${obj.name}`}
      />
    </div>
  );

  return (
    <div>
      <div className={"col-md-12 form-wrapper"}>
        <h2> Create Post </h2>
        {!submitSuccess && (
          <div className="alert alert-info" role="alert">
            Fill the form below to create a new post.
          </div>
        )}
        {submitSuccess && (
          <div className="alert alert-info" role="alert">
            The form was successfully submitted!
          </div>
        )}
        <form
          id={"create-post-form"}
          onSubmit={handleFormSubmission}
          noValidate={true}
          // encType="multipart/form-data"
        >
         {/* {inputField({ name: "click to upload img", type: "file" })} */}
          {inputField({ name: "title" })}
          {inputField({ name: "description" })}
          {inputField({ label: "Write Content", name: "body" })}
          {inputField({ name: "author", defaultValue: author })}

          <div className="form-group col-md-4 pull-right">
            <button className="btn btn-success" type="submit">
              Create Post
            </button>
            {loading && <span className="fa fa-circle-o-notch fa-spin" />}
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Create);
