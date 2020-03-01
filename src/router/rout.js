import overview from "@/view/index/overview/overview.vue"
import user from "@/view/index/user/user.vue"
import Question from "@/view/index/Question/Question.vue"
import Companies from "@/view/index/Companies/Companies.vue"
import Subject from "@/view/index/Subject/Subject.vue"

export default [
    {
        path: 'overview', component: overview, meta: { title: "数据概览", role: ['超级管理员', '管理员', '老师'], icon: 'el-icon-pie-chart      ' },
    },
    {
        path: 'user', component: user, meta: {
            title: "用户列表", role: ['超级管理员', '管理员'], icon: 'el-icon-user '
        },
    },
    {
        path: 'Question', component: Question, meta: { title: "题库列表", role: ['超级管理员', '管理员', '老师', '学生'], icon: 'el-icon-edit-outline        ' },
    },
    {
        path: 'Companies', component: Companies, meta: { title: "企业列表", role: ['超级管理员', '管理员', '老师'], icon: 'el-icon-office-building        ' },
    },
    {
        path: 'Subject', component: Subject, meta: { title: "学科列表", role: ['超级管理员', '管理员', '老师', '学生'], icon: 'el-icon-notebook-2        ' },
    },
]