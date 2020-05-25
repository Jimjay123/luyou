import Vuex from 'vuex'
import vue from 'vue'
import userinfo from './userinfo/index.js'
import group from './group/index.js'
import creCouPlans from './creCouPlans/index.js'
import teachers from './teachers/index.js'
import student from './student/index.js'
import editCouPlans from './editCouPlans/index.js'
import creator from './creator/index.js'
import creatorBaseInfo from './creator/creatorBaseInfo.js'
import creatorCourseInfo from './creator/creatorCourseInfo.js'
import edit from './edit/index.js'
import sandTable from './sandTable/index.js'
import sandTablestandard from './sandTablestandard/index.js'

vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userinfo,
    group,
    creCouPlans,
    teachers,
    student,
    editCouPlans,
    creator,
    creatorBaseInfo,
    creatorCourseInfo,
    edit,
    sandTable,
    sandTablestandard
  }
})
