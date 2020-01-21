import {Login, Register} from './auth';
import {AuthorBlog, AuthorAbstract, ArticleEdit, ArticlePage} from './blog/author-page';

const Blog = () => import('./blog/blog.vue');
const UsersAbstract = () => import('./blog/abstract/abstract.vue');

export default [
    {
        path: '/blog',
        component: Blog,
        children: [
            {
                path: '',
                name: 'blog',
                component: UsersAbstract,
                meta: {
                    title: '博客'
                }
            },
            {
                path: 'author/:userId',
                component: AuthorBlog,

                children: [
                    {
                        path: '',
                        name: 'author',
                        component: AuthorAbstract,
                        meta: {
                            title: '主页'
                        }
                    },
                    {
                        path: 'article',
                        name: 'article',
                        component: ArticlePage
                    },
                    {
                        path: 'edit',
                        name: 'edit',
                        component: ArticleEdit,
                        meta: {
                            action: ['needLogin', 'checkUser']
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            action: ['needUnLogin']
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            action: ['needUnLogin']
        }
    },
    {path: '**', redirect: '/blog'}
];
