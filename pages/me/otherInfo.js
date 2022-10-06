const prf = 't-';
module.exports = {
    getStudentList() {
        return [{
                icon: 'iconfont icon-jiludanzilishijilu ',
                name: '我的班级'
            }, {
                icon: 'iconfont icon-jiludanzilishijilu ',
                name: '考试记录'
            },
            {
                icon: 'iconfont icon-jiludanzilishijilu ',
                name: '我的留言'
            },
            {
                icon: 'iconfont icon-jiludanzilishijilu ',
                name: '备忘录',

            }
        ]
    },

    getTeacherList() {
        return [{
                icon: 'iconfont icon-jiludanzilishijilu ',
                name: '我的班级'
            }, {
                icon: 'iconfont icon-jiludanzilishijilu ',
                name: '创建班级'
            },
            {
                icon: 'iconfont icon-jiludanzilishijilu ',
                name: '我的试题'
            },
            {
                icon: 'iconfont icon-jiludanzilishijilu ',
                name: '我的留言',

            }
        ]
    },
    getNavList() {
        return [{
                icon: prf + ' t-icon-gerenxinxi1',
                name: '个人信息'
            },
            {
                icon: prf + 'icon-guanyuwomen-01-01',
                name: '关于拾穗'
            },
            {
                icon: prf + 'icon-fenxiangweiyin1',
                name: '分享拾穗',
                open_type: 'share'
            },
            {
                icon: prf + 'icon-tuichuzhanghao1',
                name: '清除缓存'
            }
        ]
    },
}
