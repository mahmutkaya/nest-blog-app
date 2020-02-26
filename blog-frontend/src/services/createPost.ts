const createPost = async (formData: { title?: any; description?: any; body?: any; author?: string; }, accessToken: { __raw: any; }): Promise<boolean> => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/blog/post`,
            {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: `Bearer ${accessToken.__raw}`
                }),
                body: JSON.stringify(formData)
            }
        );

        return response.ok;

    } catch (ex) {
        return false;
    }
};

export default createPost;