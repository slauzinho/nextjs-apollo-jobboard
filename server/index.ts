import express from 'express';
import cookieParser from 'cookie-parser';
import next from 'next';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  server.get('/register', (req, res) => {
    if (req.cookies.token) {
      res.redirect('/');
    } else {
      return app.render(req, res, '/register', req.query);
    }
  });

  server.get('/login', (req, res) => {
    if (req.cookies.token) {
      res.redirect('/');
    } else {
      return app.render(req, res, '/login', req.query);
    }
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port} 🚀`);
  });
});
