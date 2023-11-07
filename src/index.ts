import '../env';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { UserModel } from './db/models/User';
import { initalize } from './services';
import { initalizeRoutes } from './routes';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = Number(process.env.PORT);
async function main() {
  try {
    const { userService, authService } = initalize(UserModel);
    const router = initalizeRoutes(userService, authService);
    app.use(router);

    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    process.on('SIGTERM', () => {
      // Handle process termination for redeployment
      server.close();
    });
  } catch (error) {
    console.error('Error during server startup:', error);
  }
}
main();
