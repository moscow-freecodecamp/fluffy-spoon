import { Router } from 'express';
import usersRoute from './users.routes';
import postsRoute from './post.routes';

const api = new Router();

api.use('/users', usersRoute);
api.use('/posts', postsRoute);

export default api;
