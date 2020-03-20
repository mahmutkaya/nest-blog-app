const prodURI = process.env.REACT_APP_SERVER_BASE_URI;

const devURI = process.env.REACT_APP_DEV_SERVER_URI;

const serverURI = process.env.NODE_ENV === 'production' ? prodURI : devURI;

export default serverURI;