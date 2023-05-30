import { Router } from '../deps.ts'

import postController from '../controllers/post.controller.ts'

const router = new Router()

router
  .get('/posts', postController.getPosts)
  .get('/posts/:postId', postController.getPost)
  .post('/posts', postController.createPost)
  .put('/posts/:postId', postController.updatePost)
  .delete('/posts/:postId', postController.deletePost)

export default router
