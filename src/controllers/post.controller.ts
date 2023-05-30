import { Context, helpers } from '../deps.ts'
import Post from '../models/post.model.ts'
import User from '../models/user.model.ts'

const getPosts = async (ctx: Context) => {
  const queries = helpers.getQuery(ctx, { mergeParams: true })
  const page: number = Number(queries.page) || 1
  const limit: number = Number(queries.limit) || 20
  const offset: number = (page - 1) * limit

  try {
    const posts = await Post.select().offset(offset).limit(limit).all()
    ctx.response.status = 200
    ctx.response.body = posts
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Error fetching posts',
      error: error.message,
    }
    return
  }
}

const getPost = async (ctx: Context) => {
  const { postId } = helpers.getQuery(ctx, { mergeParams: true })
  try {
    const post = await Post.select(Post.field('id')).where(Post.field('id'), postId)
      .leftJoin(
        User,
        User.field('id'),
        Post.field('author_id'),
      ).first()
    if (!post) {
      ctx.response.status = 404
      return
    }
    ctx.response.status = 200
    ctx.response.body = post
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'An error occurred while retrieving the post',
      error: error.message,
    }
    return
  }
}

const createPost = async (ctx: Context) => {
  const { title, content, published } = await ctx.request.body({ type: 'json' }).value

  try {
    const newPost = await Post.create({
      'title': title,
      'content': content,
      'published': published,
      'authorId': 1,
    })
    ctx.response.status = 201
    ctx.response.body = { 'message': 'Post created', 'postId': newPost.id }
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Error creating post',
      error: error.message,
    }
    return
  }
}

const updatePost = async (ctx: Context) => {
  const { postId } = helpers.getQuery(ctx, { mergeParams: true })
  const { title, content, published } = await ctx.request.body({ type: 'json' }).value

  try {
    const post = await Post.find(postId)
    if (!post) {
      ctx.response.status = 404
      return
    }
    post.title = title
    post.content = content
    post.published = published
    await post.update()

    ctx.response.status = 200
    ctx.response.body = { 'message': 'Post updated' }
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Error updating post',
      error: error.message,
    }
    return
  }
}

const deletePost = async (ctx: Context) => {
  const { postId } = helpers.getQuery(ctx, { mergeParams: true })
  try {
    const post = await Post.find(postId)
    if (!postId) {
      ctx.response.status = 404
      return
    }
    await post.delete()
    ctx.response.status = 204
    return
  } catch (error) {
    console.error(error)
    ctx.response.status = 500
    ctx.response.body = {
      message: 'Error deleting post',
      error: error.message,
    }
    return
  }
}

const postController = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
}

export default postController
