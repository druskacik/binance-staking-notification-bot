// handle redirects

export default function (req, res, next) {
    if (req.url === '/why-the-bot-is-not-for-free-anymore') {
        res.writeHead(301, {
            location: '/blog/why-the-bot-is-not-for-free-anymore',
        });
        res.end();
    } else {
        next();
    }
}
  