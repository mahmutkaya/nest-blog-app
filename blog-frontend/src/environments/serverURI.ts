const prodURI = 'https://nest-blog-server.herokuapp.com/';

const devURI = 'http://localhost:5200';

const serverURI = process.env.NODE_ENV === 'production' ? prodURI : devURI;

export default serverURI;