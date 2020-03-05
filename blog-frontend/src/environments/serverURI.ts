const prodURI = process.env.REACT_APP_SERVER_BASE_URL;

const devURI = 'http://localhost:5200';

const serverURI = process.env.NODE_ENV === 'development' ? devURI : prodURI;

export default serverURI;