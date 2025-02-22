import { clearDatabase, closeTest, initializeTestSetup, testApp } from '../../../test-setup';
import { PostsTestManagers } from '../../testManagers/postsTestManagers';
import { HttpStatus } from '@nestjs/common';
import { UpdatePostInputModel } from '../../../src/features/posts/api/model/input/updatePost.input.model';
import { PostViewModel } from '../../../src/features/posts/api/model/output/postViewModel';
import { AuthTestManager } from '../../testManagers/authTestManager';
import { ReturnViewModel } from '../../../src/features/1_commonTypes/returnViewModel';
import { BlogsTestManagers } from '../../testManagers/blogsTestManagers';
import { BlogViewModel } from '../../../src/features/blogs/api/model/output/createdBlog.output.model';


describe('test for PUT posts', () => {
  let postsTestManagers: PostsTestManagers;
  let authTestManagers: AuthTestManager;
  let blogTestManagers: BlogsTestManagers;
  let blog: BlogViewModel;
  beforeAll(async () => {
    await initializeTestSetup();
    postsTestManagers = new PostsTestManagers(testApp);
    authTestManagers = new AuthTestManager(testApp);
    blogTestManagers = new BlogsTestManagers(testApp);
    blog = await blogTestManagers.createTestBlog();

  });
  beforeEach(async () => {
    await clearDatabase();
    blog = await blogTestManagers.createTestBlog();

  });

  afterAll(async () => {
    await closeTest();
  });

  it('should be update post', async () => {
    const post: PostViewModel[] = await postsTestManagers.createTestPost();
    const updateData: UpdatePostInputModel = {
      title: 'new post',
      content: 'new',
      shortDescription: 'newline short',
      blogId: blog.id
    };

    await postsTestManagers.updatePost(post[0].id, updateData);
    const getPost = await postsTestManagers.getPostById(post[0].id);
    expect(getPost).toEqual({
      id: post[0].id,
      title: updateData.title,
      shortDescription: updateData.shortDescription,
      content: updateData.content,
      blogId: post[0].blogId,
      blogName: post[0].blogName,
      createdAt: expect.any(String),
      extendedLikesInfo: {
        likesCount: 0, dislikesCount: 0, myStatus: 'None',
        newestLikes: expect.any(Array)
      }
    });
  });

  it('shouldn`t be update post, incorrect id', async () => {
    const post: PostViewModel[] = await postsTestManagers.createTestPost();
    const updateData: UpdatePostInputModel = {
      title: 'new post',
      content: 'new',
      shortDescription: 'newline short',
      blogId: ''
    };

    await postsTestManagers.updatePost('post.id', updateData, HttpStatus.BAD_REQUEST);

  });

  it('shouldn`t update post auth incorrect', async () => {
    const post: PostViewModel[] = await postsTestManagers.createTestPost();
    const updateData: UpdatePostInputModel = {
      title: '123',
      content: 'no cont',
      shortDescription: 'qwerty',
      blogId: blog.id
    };

    await postsTestManagers.updatePost(post[0].id, updateData, HttpStatus.UNAUTHORIZED, 'qwe', 'password');
  });

  it('shouldn`t update post wrong data', async () => {
    const post: PostViewModel[] = await postsTestManagers.createTestPost();
    const updateData = {
      title: ' ',
      content: true,
      shortDescription: '',
      blogId: 'sasaas'
    };

    const res = await postsTestManagers.updatePost(post[0].id, updateData, HttpStatus.BAD_REQUEST);
    expect(res).toEqual({
      errorsMessages: [
        {
          message: 'title length should be  min 1, max 15 symbols',
          field: 'title'
        },
        {
          message: 'shortDescription length should be  min 1, max 100 symbols',
          field: 'shortDescription'
        },
        {
          message: 'content length should be  min 1, max 1000 symbols',
          field: 'content'
        },
        {
          field: 'blogId',
          message: `Блог с id ${updateData.blogId} не найден`
        }
      ]
    });

  });

  it('should be like status for post', async () => {
    const users = await authTestManagers.registrationTestUser(5);

    const post: PostViewModel[] = await postsTestManagers.createTestPost();
    //user-1 поставил лайк
    await postsTestManagers.updateLikeStatusPost(users[0].accessToken, post[0].id, 'Like');
    //
    // // //user-2 поставил дизлайк
    await postsTestManagers.updateLikeStatusPost(users[1].accessToken, post[0].id, 'Like');
    // //
    await postsTestManagers.updateLikeStatusPost(users[2].accessToken, post[0].id, 'Dislike');
    //

    const postUser1: PostViewModel = await postsTestManagers.getPostById(post[0].id, users[0].accessToken);
    const postUser3: PostViewModel = await postsTestManagers.getPostById(post[0].id, users[2].accessToken);
    const postUser4: PostViewModel = await postsTestManagers.getPostById(post[0].id, users[3].accessToken);
    const postNoUser: PostViewModel = await postsTestManagers.getPostById(post[0].id);
    // //
    expect(postUser1.extendedLikesInfo.likesCount).toBe(2);
    expect(postUser1.extendedLikesInfo.dislikesCount).toBe(1);
    expect(postUser1.extendedLikesInfo.myStatus).toBe('Like');
    expect(postUser3.extendedLikesInfo.myStatus).toBe('Dislike');
    expect(postUser4.extendedLikesInfo.myStatus).toBe('None');
    expect(postNoUser.extendedLikesInfo.myStatus).toBe('None');

    await postsTestManagers.updateLikeStatusPost(users[0].accessToken, post[0].id, 'None');
    const postUser1_1: PostViewModel = await postsTestManagers.getPostById(post[0].id, users[0].accessToken);
    expect(postUser1_1.extendedLikesInfo.likesCount).toBe(1);
    expect(postUser1_1.extendedLikesInfo.dislikesCount).toBe(1);
    expect(postUser1_1.extendedLikesInfo.myStatus).toBe('None');


  });

  it('shouldn`t add like twice one user ', async () => {
    const users = await authTestManagers.registrationTestUser(5);
    const post: PostViewModel[] = await postsTestManagers.createTestPost();
    await postsTestManagers.updateLikeStatusPost(users[0].accessToken, post[0].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[0].accessToken, post[0].id, 'Like');
    const res: PostViewModel = await postsTestManagers.getPostById(post[0].id, users[0].accessToken);
    expect(res.extendedLikesInfo.myStatus).toBe('Like');
    expect(res.extendedLikesInfo.likesCount).toBe(1);
  });
  it('should get post with likes for different users ', async () => {
    const users = await authTestManagers.registrationTestUser(5);
    const post: PostViewModel[] = await postsTestManagers.createTestPost(6);

    await postsTestManagers.updateLikeStatusPost(users[0].accessToken, post[0].id, 'Like');
    const resPost1: PostViewModel = await postsTestManagers.getPostById(post[0].id, users[0].accessToken);
    expect(resPost1.extendedLikesInfo.myStatus).toBe('Like');
    await postsTestManagers.updateLikeStatusPost(users[1].accessToken, post[1].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[2].accessToken, post[1].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[0].accessToken, post[2].id, 'Dislike');
    await postsTestManagers.updateLikeStatusPost(users[0].accessToken, post[3].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[1].accessToken, post[3].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[2].accessToken, post[3].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[3].accessToken, post[3].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[1].accessToken, post[4].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[2].accessToken, post[4].id, 'Dislike');
    await postsTestManagers.updateLikeStatusPost(users[0].accessToken, post[5].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[1].accessToken, post[5].id, 'Dislike');

    const res1: ReturnViewModel<PostViewModel[]> = await postsTestManagers.getAllPosts(users[0].accessToken, {});
  });
  it('should get my like status for post', async () => {
    const users = await authTestManagers.registrationTestUser(3);
    const posts: PostViewModel[] = await postsTestManagers.createTestPost(3);
    await postsTestManagers.updateLikeStatusPost(users[0].accessToken, posts[0].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[1].accessToken, posts[2].id, 'Like');

    const res: ReturnViewModel<PostViewModel[]> = await postsTestManagers.getAllPosts(users[0].accessToken, {});
    expect(res.items![2].extendedLikesInfo.myStatus).toBe('Like');
    expect(res.items![1].extendedLikesInfo.myStatus).toBe('None');
    expect(res.items![0].extendedLikesInfo.myStatus).toBe('None');

    const res2: ReturnViewModel<PostViewModel[]> = await postsTestManagers.getAllPosts(users[1].accessToken, {});
    expect(res2.items![0].extendedLikesInfo.myStatus).toBe('Like');

    const res3: ReturnViewModel<PostViewModel[]> = await postsTestManagers.getAllPosts(users[2].accessToken, {});
    expect(res3.items![0].extendedLikesInfo.myStatus).toBe('None');

  });

  it('should get 3 last users like post', async () => {
    const users = await authTestManagers.registrationTestUser(5);

    const post: PostViewModel[] = await postsTestManagers.createTestPost();
    //user-1 поставил лайк
    await postsTestManagers.updateLikeStatusPost(users[0].accessToken, post[0].id, 'Like');

    // //user-2 поставил дизлайк
    await postsTestManagers.updateLikeStatusPost(users[1].accessToken, post[0].id, 'Like');
    //
    await postsTestManagers.updateLikeStatusPost(users[2].accessToken, post[0].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[3].accessToken, post[0].id, 'Like');
    await postsTestManagers.updateLikeStatusPost(users[4].accessToken, post[0].id, 'Like');


    const postUser1: PostViewModel = await postsTestManagers.getPostById(post[0].id, users[0].accessToken);


    expect(postUser1.extendedLikesInfo.likesCount).toBe(5);
    expect(postUser1.extendedLikesInfo.dislikesCount).toBe(0);
    expect(postUser1.extendedLikesInfo.myStatus).toBe('Like');
    expect(postUser1.extendedLikesInfo.newestLikes.length).toBe(3);
    expect(postUser1.extendedLikesInfo.newestLikes).toEqual([
      {
        addedAt: expect.any(String),
        userId: users[4].userId,
        login: users[4].login
      },
      {
        addedAt: expect.any(String),
        userId: users[3].userId,
        login: users[3].login
      },
      {
        addedAt: expect.any(String),
        userId: users[2].userId,
        login: users[2].login
      }
    ]);
  });

  it('shouldn`t be like status for post, invalid status', async () => {
    const user = await authTestManagers.registrationTestUser();

    const post: PostViewModel[] = await postsTestManagers.createTestPost();

    const res1 = await postsTestManagers.updateLikeStatusPost(user[0].accessToken, post[0].id, 'Lik', HttpStatus.BAD_REQUEST);

    expect(res1).toEqual({
      errorsMessages: [
        {
          message: 'Invalid status',
          field: 'likeStatus'
        }
      ]
    });
  });
  it('shouldn`t be like status for post, post not found', async () => {
    const user = await authTestManagers.registrationTestUser();
    await postsTestManagers.updateLikeStatusPost(user[0].accessToken, '63189b06003380064c4193be', 'Like', HttpStatus.NOT_FOUND);
  });
  it('shouldn`t be like status for post,unauthorized', async () => {
    const post: PostViewModel[] = await postsTestManagers.createTestPost();
    await postsTestManagers.updateLikeStatusPost('user[0].accessToken', post[0].id, 'Like', HttpStatus.UNAUTHORIZED);
  });

  it('should return error if passed body is incorrect', async () => {
    const data = {
      title: 'valid',
      content: 'valid',
      blogId: '67a8e4d43a0f1ad93997',
      shortDescription: 'length_101-DnasassaasasasvDnasassaasasasvDnasassaasasasvDnasassaasasasvDnasassaasasasvDnasassaasasasv wtsv'
    };
    const update = await postsTestManagers.updatePost('67assdsdsdssd', data, HttpStatus.BAD_REQUEST);
    expect(update).toEqual({
      errorsMessages: [
        {
          message: 'shortDescription length should be  min 1, max 100 symbols',
          field: 'shortDescription'
        } ,
        {
          message: expect.any(String),
          field: 'blogId'
        }
      ]
    });
  });


});