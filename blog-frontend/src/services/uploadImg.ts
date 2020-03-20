import serverURI from '../environments/serverURI'

const uploadImg = async (
    formData:any,
    // accessToken: { __raw: any; }
): Promise<boolean> => {
    try {
        const res = await fetch(
            `${serverURI}/blog/post/upload`,
            {
                method: "post",
                headers: new Headers({
                    "Content-Type": "multipart/form-data",
                    // Accept: "application/json",
                    // authorization: `Bearer ${accessToken.__raw}`
                }),
                // body: JSON.stringify(formData)
            }
        );

        return res.ok;

    } catch (ex) {
        return false;
    }
};

export default uploadImg;