const menuList = [
    {
        title: "首页",
        key: '/admin/home'
    },
    {
        title:"文章发布",
        key: "/admin/publish_articles"
    },
    {
        title:"博客管理",
        key: "/admin/manage_blog",
        children:[
            {
                title:"文章管理",
                key:"/admin/manage_articles"
            },
            {
                title:"评论管理",
                key:"/admin/manage_comment"
            },
            {
                title:"分类专栏",
                key:"/admin/manage_column"
            },
            {
                title:"订阅专栏",
                key:"/admin/subscribe_column"
            },
            {
                title:"博客搬家",
                key:"/admin/move_blog"
            },
            {
                title:"博客打赏",
                key:"/admin/reward_blog"
            },
            {
                title:"博客设置",
                key:"/admin/setting_blog"
            },
            {
                title:"博客名片",
                key:"/admin/card"
            }
        ]
    },
    {
        title:"数据统计",
        key:"/admin/statistics"
    },
    {
        title:"下载管理",
        key:"/admin/manage_download"
    },
    {
        title:"创作活动",
        key:"/admin/activities"
    },
    {
        title:"用户中心",
        key:"/admin/user_info"
    },
];

export default menuList;