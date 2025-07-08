import React from "react";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AsyncProtectedRoute from "./components/AsyncProtectedRoute";

const Counter = React.lazy(() => import('./features/counter/Counter'))
const PostsList = React.lazy(() => import('./features/posts/PostsList'))
const AddPostForm = React.lazy(() => import('./features/posts/AddPostForm'))
const SinglePostPage = React.lazy(() => import('./features/posts/SinglePostPage'))
const EditPostForm = React.lazy(() => import('./features/posts/EditPostForm'))
const LoginPage = React.lazy(() => import('./features/auth/LoginPage'))
const AsyncPostsList = React.lazy(() => import('./features/posts/AsyncPostsList'))
const AsyncAddPostForm = React.lazy(() => import('./features/posts/AsyncAddPostForm'))
const AsyncUsersList = React.lazy(() => import('./features/users/AsyncUsersList'))
const AsyncUserPage = React.lazy(() => import('./features/users/AsyncUserPage'))
const AsyncLoginPage = React.lazy(() => import('./features/auth/AsyncLoginPage'))
const NotificationsList = React.lazy(() => import('./features/notifications/NotificationsList'))


// 数据
const data = [
  {
    path: '/',
    title: 'Redux',
    element: <Home></Home>,
    showHome: false
  },
  {
    path: '/counter',
    title: '计数器示例',
    element: <Counter></Counter>,
    showHome: true
  },
  {
    path: '/login',
    title: '登录示例',
    element: <LoginPage></LoginPage>,
    showHome: false
  },
  {
    path: '/postsList',
    title: '帖子列表示例',
    element: <ProtectedRoute>
        <AddPostForm></AddPostForm>
        <PostsList></PostsList>
    </ProtectedRoute>,
    showHome: true
  },
  {
    path: '/posts/:postId',
    title: '帖子详情示例',
    element: <ProtectedRoute><SinglePostPage></SinglePostPage></ProtectedRoute>,
    showHome: false
  },
  {
    path: '/editPost/:postId',
    title: '编辑帖子示例',
    element: <ProtectedRoute><EditPostForm></EditPostForm></ProtectedRoute>,
    showHome: false
  },
  {
    path: '/async/login',
    title: '异步登录示例',
    element: <AsyncLoginPage></AsyncLoginPage>,
    showHome: false
  },
  {
    path: '/async/postsList',
    title: '异步数据帖子列表示例',
    element: (<AsyncProtectedRoute>
        <AsyncAddPostForm></AsyncAddPostForm>
        <AsyncPostsList></AsyncPostsList>
    </AsyncProtectedRoute>),
    showHome: true
  },
  {
    path: '/async/users',
    title: '用户列表示例',
    element: <AsyncProtectedRoute><AsyncUsersList></AsyncUsersList></AsyncProtectedRoute>,
    showHome: false
  },
  {
    path: '/async/users/:userId',
    title: '用户详情示例',
    element: <AsyncProtectedRoute><AsyncUserPage></AsyncUserPage></AsyncProtectedRoute>,
    showHome: false
  },
  {
    path: '/async/notifications',
    title: '通知示例',
    element: <AsyncProtectedRoute><NotificationsList></NotificationsList></AsyncProtectedRoute>,
    showHome: false
  }
]

// 路由数据
export const routesData = data.map((item) => {
  return {path: item.path, element: item.element}
})

// 首页数据
export const homeData = data.filter(item => item.showHome).map((item) => {
  return {path: item.path, title: item.title}
})

// 根据路由路径获取帖子id
function postIdFromPath(path) {
  const units = path.split('/')
  return units.pop()
}

// 路由路径是否指向 单个帖子页面
export function isSiglePost(path) {
  const postId = postIdFromPath(path)
  return `/posts/${postId}` === path
}

// 路由路径是否指向 编辑帖子页面
function isEditPost(path) {
  const postId = postIdFromPath(path)
  return `/editPost/${postId}` === path
}

// 路由路径是否指向 帖子示例中的页面
export function isPosts(path) {
  if (path === '/postsList' || isEditPost(path) || isSiglePost(path)) {
      return true
  }
  return false
}

// 根据路由路径获取用户id
function userIdFromPath(path) {
  const units = path.split('/')
  return units.pop()
}

// 路由路径是否指向 异步登录页面
export function isAsyncLogin(path) {
  return '/async/login' === path
}

// 路由路径是否指向 异步帖子列表页面
export function isAsyncPostsList(path) {
  return '/async/postsList' === path
}

// 路由路径是否指向 异步单个帖子页面
export function isAsyncSiglePost(path) {
  const postId = postIdFromPath(path)
  return `/async/posts/${postId}` === path
}

// 路由路径是否指向 异步单个用户页面
function isAsyncUser(path) {
  const userId = userIdFromPath(path)
  return `/async/users/${userId}` === path
}

// 路由路径是否指向 异步帖子示例中的页面
export function isAsyncPosts(path) {
  return path.startsWith('/async/')
}

// 路由路径是否指向 通知页面
export function isNotifications(path) {
  console.log('isNotifications: ', path);
  
  return '/async/notifications' === path
}

// 获取标题
export function getTitle(path) {
  const item = data.find((item) => {
      if (item.path === '/async/users/:userId') {
          return isAsyncUser(path)
      } else if (item.path === '/editPost/:postId') {
          return isEditPost(path)
      } else if (item.path === '/posts/:postId') {
          return isSiglePost(path)
      } else {
          return item.path === path
      }
  })

  return item ? item.title : ''
}

// 异步逻辑状态
// export const asyncStatus = {
//     idle: 'idle',
//     pending: 'pending',
//     succeeded: 'succeeded',
//     failed: 'failed'
// }