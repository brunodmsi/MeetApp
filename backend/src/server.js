import server from './app';

const port = process.env.PORT || 8080;

server.listen(8080, () => console.log(`Ouvindo na porta ${port}`));
