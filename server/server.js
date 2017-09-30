import app from './app';
import serverConfig from './config';

// start app
app.listen(serverConfig.port, error => {
  if (!error) {
    // eslint-disable-next-line no-console
    console.log(
      `MERN is running on port: ${serverConfig.port}! Build something amazing!`
    );
  }
});

export default app;
