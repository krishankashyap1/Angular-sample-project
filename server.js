/* app.get('*', (req, res) => {
    res.sendFile(`dist/index.html`); // load the single view file (angular will handle the page changes on the front-end)
}); */

app.use(express.static(’./dist/kelton’));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/<name-on-package.json>/'}
);
});

app.listen(process.env.PORT || 8080);