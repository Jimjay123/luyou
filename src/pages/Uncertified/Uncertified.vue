<!--
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2019-09-03 09:23:01
 * @LastEditors: pengwanchong
 * @LastEditTime: 2020-03-30 10:45:00
 -->

<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <TopHeader class="clearfix"></TopHeader>

      <!-- 内容 -->
      <el-main clearfix>
        <!-- 内容介绍，课程计划，我的群组 -->
        <div class="main">
          <div class="logo">
            <img :src="listz.avatar || require('../../assets/img/touxiang.svg')" />
          </div>
          <div class="introduce">
            <p>
              <span v-if="(wrz == 0) || (wrz == 4) ? true : false">欢迎来到陆由！</span>
              <span v-if="wrz != 0">{{listz.memberName}}老师，中午好！</span>
            </p>
            <p>{{listz.quotes}}</p>
          </div>
          <div class="aggregate">
            <div class="group" v-on:click="handleClickos1()">
              <p class="p1">{{total1}}</p>
              <span>课程计划</span>
            </div>
            <i></i>
            <div class="group" v-on:click="handleClickos()">
              <p class="p1">{{total2}}</p>
              <span>我的群组</span>
            </div>
            <i></i>
            <div class="group" v-on:click="handleClickthr()">
              <p class="p1">{{total3}}</p>
              <span>资源库</span>
            </div>
          </div>

          <div class="wwk" v-if="wrz == 1 && total2 == 0 ">
            <div class="card" v-if="cardq">
              <div class="Triangle"></div>
              <img src="../../assets/img/Header_light_icon.png" alt />
              <button class="one" v-on:click="handleClickone(cardq)">暂不创建</button>
              <p class="two">欢迎使用“陆由”，一个简单好用的实训教学平台</p>
              <p class="three">您可先创建一个群组，用以发布您的课程计划。</p>
              <el-row>
                <el-button v-on:click="handleClicktwo(cardaz)">
                  <span>去创建</span>
                </el-button>
              </el-row>
            </div>
          </div>
        </div>

        <!-- 课程计划 -->
        <div class="plans" v-if="wrz == 1">
          <div class="ans1">
            <span class="sp1"></span>
            <i>课程计划</i>
          </div>

          <div class="sna1" v-if="wrz == 1">
            <a href="javascript:;" class="sna" @click="EstablishClick">
              <div class="imgs"></div>
            </a>
          </div>

          <div class="nas1" v-for="(item,index) in list5" :key="index">
            <div class="kka" v-if="wrz == 1">
              <div class="whole" v-if="list5.length >= 3">
                <a href="javascript:;" @click="CourseplanClick(groupId)">
                  <span>查看全部</span>
                  <img class="imgs" src="../../assets/img/arrow-right.svg" alt />
                </a>
              </div>
              <a
                href="javascript:;"
                class="nas"
                @click.stop="xueclick(item.coursePlanId,item.coursePlanType,item.stateName,item.groupId)"
              >
                <div class="he">
                  <img :src="item.popularizeImageUrl" alt class="imgs1" />
                  <div class="corner" v-if="item.coursePlanType === 23 ? true:false">频道</div>
                  <div class="sandchannel" v-if="item.coursePlanType === 24 ? true:false">沙盘频道</div>
                  <div
                    class="sandstandard"
                    v-if="(item.coursePlanType === 25 || item.coursePlanType === 26) ? true:false"
                  >沙盘</div>
                  <img
                    src="../../assets/img/yulan.svg"
                    alt
                    class="imgs2"
                    v-if="item.stateName === '未发布'"
                    @click.stop="xueclick1(item.coursePlanId,item.coursePlanType,item.stateName)"
                  />
                  <img
                    src="../../assets/img/delete.svg"
                    class="imgs3"
                    v-if="item.stateName === '未发布'"
                    @click.stop="deleteplan(item.coursePlanId,item.groupIds)"
                  />
                  <img
                    src="../../assets/img/delete.svg"
                    class="imgs4"
                    v-if="item.stateName === '已发布'"
                    @click.stop="deleteplan(item.coursePlanId,item.groupIds)"
                  />
                  <div class="counts"></div>
                  <div class="count" v-if="item.stateName === '未发布' ? false:true">
                    已完成
                    <span class="oo1">{{item.finishStudentCount}}</span>
                    <span class="oo2">/</span>
                    <span class="oo3">{{item.totalStudentCount}}</span>
                    人
                  </div>
                </div>
                <div class="chang">
                  <div
                    class="progress"
                    :style="{width:(item.finishStudentCount*100/item.totalStudentCount || 0)+'%'}"
                  ></div>
                  <div
                    class="progres"
                    :style="{width:(item.finishPercent||0)+'%'}"
                    v-if="item.finishPercent == 100"
                  ></div>
                </div>
                <div class="statistics">
                  <h3>{{item.coursePlanName}}</h3>
                  <div class="ri">
                    <p class="two">截止日</p>
                    <span>：</span>
                    <span>{{item.beginDate||'未设置'}}</span> -
                    <span>{{item.endDate||'未设置'}}</span>
                  </div>

                  <div class="qun">
                    <p class="two">群组</p>
                    <span>：</span>
                    <span class="twoos">{{item.groupName||'未设置'}}</span>
                  </div>

                  <div class="zh">
                    <p class="two">状态</p>
                    <span>：</span>
                    <span :class="item.stateName === '未发布' ? spw: spy">{{item.stateName||'未设置'}}</span>
                  </div>
                  <el-row>
                    <el-button
                      v-if="item.stateName == '未发布'"
                      @click.stop="fbclick(item.coursePlanType,item.coursePlanId)"
                    >
                      <span>去编辑</span>
                    </el-button>
                  </el-row>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- 创建群组弹框 -->
        <div class="cards1" v-if="cardaz">
          <div class="h">
            <h3>创建群</h3>
            <span>用以发布您的课程计划</span>
          </div>
          <!-- <input type="text" placeholder="群名称，不超过30字符，如：社工-19届-3班" v-model="name" /> -->
          <el-input v-model="name" placeholder="群名称，不超过30字符，如：社工-19届-3班" label-width="80px"></el-input>
          <CheckBox
            style="margin-left:32px;"
            :value="checkVal"
            :list="checkList"
            :input="checkChange"
          ></CheckBox>

          <el-row>
            <el-button v-on:click="handleClickss1(cardaz)">
              <span>取消</span>
            </el-button>
            <el-button>
              <span @click="AddInfo">确定</span>
            </el-button>
          </el-row>
        </div>

        <!-- swiper轮播图 -->
        <img src="../../assets/img/banner.png" alt class="ims" />

        <!-- 课程推荐 -->
        <div class="plana">
          <div class="ans1">
            <span></span>
            <i>课程推荐</i>
            <span>基于陆由Starry core 大数据统计</span>
          </div>
        </div>

        <!-- 热门课程 -->
        <div class="curriculum">
          <p class="hots">热门课程</p>
        </div>

        <div class="swiper-father">
          <div class="swiper-container" id="swiper1">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in list" :key="index">
                <div
                  class="card1"
                  :class="(item.keyType == 11 || item.keyType == 12) ? cardone:cardtwo"
                >
                  <div class="casd" @click="StandarddetailsClick(item.keyType,item.keyId)">
                    <img :src="item.popularizeImageUrl" alt class="imgsr1" />
                    <img
                      :src="item.popularizeImageUrl"
                      alt
                      class="imgsr2"
                      v-if="item.keyType == 11 || item.keyType == 12"
                    />
                    <img
                      :src="item.popularizeImageUrl"
                      alt
                      class="imgsr3"
                      v-if="item.keyType == 11 || item.keyType == 12"
                    />
                    <div class="corner" v-if="item.keyType === 11 ? true:false">频道</div>
                    <div class="sandchannel" v-if="item.keyType === 12 ? true:false">沙盘频道</div>
                    <div
                      class="sandstandard"
                      v-if="(item.keyType === 3 || item.keyType === 4) ? true:false"
                    >沙盘</div>
                    <div class="counts">
                      <img src="../../assets/img/duration.svg" alt class="imgr" />
                      <span class="duration">{{item.duration}}分钟</span>
                    </div>
                  </div>
                  <div class="tj">
                    <p class="pp1">{{item.keyName}}</p>
                    <div class="cas">
                      <img
                        src="../../assets/img/red.svg"
                        alt
                        class="imr"
                        v-if="item.officialFlag == true"
                      />
                      <div
                        class="cards clearfix"
                        v-for="(items,index) in item.tagNameList"
                        :key="index"
                      >
                        <span>{{items}}</span>
                      </div>
                    </div>
                    <div class="names">
                      <img :src="item.avatar" alt class="im1" />
                      <span class="sp1">{{item.ownerName}}</span>
                      <img
                        src="../../assets/img/v1.svg"
                        alt
                        class="im2"
                        v-if="item.ownerLevel == 1"
                      />
                      <span class="sp2">/{{item.orgName}}</span>
                    </div>
                    <div class="white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev prev1"></div>
          <div class="swiper-button-next next1"></div>
        </div>

        <!-- 最新课程 -->
        <div class="curriculum">
          <p class="hots">最新课程</p>
        </div>

        <div class="swiper-father">
          <div class="swiper-container" id="swiper2">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in list1" :key="item.id">
                <div
                  class="card1"
                  :class="item.keyType == 11 || item.keyType == 12 ? cardone:cardtwo"
                >
                  <div class="casd" @click="StandarddetailsClick(item.keyType,item.keyId)">
                    <img :src="item.popularizeImageUrl" alt class="imgsr1" />
                    <img
                      :src="item.popularizeImageUrl"
                      alt
                      class="imgsr2"
                      v-if="item.keyType == 11 || item.keyType == 12"
                    />
                    <img
                      :src="item.popularizeImageUrl"
                      alt
                      class="imgsr3"
                      v-if="item.keyType == 11 || item.keyType == 12"
                    />
                    <div class="corner" v-if="item.keyType === 11 ? true:false">频道</div>
                    <div class="sandchannel" v-if="item.keyType === 12 ? true:false">沙盘频道</div>
                    <div
                      class="sandstandard"
                      v-if="(item.keyType === 3 || item.keyType === 4) ? true:false"
                    >沙盘</div>
                    <div class="counts">
                      <img src="../../assets/img/duration.svg" alt class="imgr" />
                      <span class="duration">{{item.duration}}分钟</span>
                    </div>
                  </div>
                  <div class="tj">
                    <p class="pp1">{{item.keyName}}</p>
                    <div class="cas">
                      <img
                        src="../../assets/img/red.svg"
                        alt
                        class="imr"
                        v-if="item.officialFlag == true"
                      />
                      <div
                        class="cards clearfix"
                        v-for="(items,index) in item.tagNameList"
                        :key="index"
                      >
                        <span>{{items}}</span>
                      </div>
                    </div>
                    <div class="names">
                      <img :src="item.avatar" alt class="im1" />
                      <span class="sp1">{{item.ownerName}}</span>
                      <img
                        src="../../assets/img/v1.svg"
                        alt
                        class="im2"
                        v-if="item.ownerLevel == 1"
                      />
                      <span class="sp2">/{{item.orgName}}</span>
                    </div>
                    <div class="white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev prev2"></div>
          <div class="swiper-button-next next2"></div>
        </div>

        <!-- 同行在教 -->
        <div class="curriculum" v-if="wrz == 1? true: false">
          <p class="hots">同行在教</p>
        </div>

        <div class="swiper-father" v-if="wrz == 1? true: false">
          <div class="swiper-container" id="swiper3">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in list2" :key="index">
                <div
                  class="card1"
                  :class="(item.keyType == 11 || item.keyType == 12) ? cardone:cardtwo"
                >
                  <div class="casd" @click="StandarddetailsClick(item.keyType,item.keyId)">
                    <img :src="item.popularizeImageUrl" alt class="imgsr1" />
                    <img
                      :src="item.popularizeImageUrl"
                      alt
                      class="imgsr2"
                      v-if="item.keyType == 11 || item.keyType == 12"
                    />
                    <img
                      :src="item.popularizeImageUrl"
                      alt
                      class="imgsr3"
                      v-if="item.keyType == 11 || item.keyType == 12"
                    />
                    <div class="corner" v-if="item.keyType === 11 ? true:false">频道</div>
                    <div class="sandchannel" v-if="item.keyType === 12 ? true:false">沙盘频道</div>
                    <div
                      class="sandstandard"
                      v-if="(item.keyType === 3 || item.keyType === 4) ? true:false"
                    >沙盘</div>
                    <div class="counts">
                      <img src="../../assets/img/duration.svg" alt class="imgr" />
                      <span class="duration">{{item.duration}}分钟</span>
                    </div>
                  </div>
                  <div class="tj">
                    <p class="pp1">{{item.keyName}}</p>
                    <div class="cas">
                      <img
                        src="../../assets/img/red.svg"
                        alt
                        class="imr"
                        v-if="item.officialFlag == true"
                      />
                      <div
                        class="cards clearfix"
                        v-for="(items,index) in item.tagNameList"
                        :key="index"
                      >
                        <span>{{items}}</span>
                      </div>
                    </div>
                    <div class="names">
                      <img :src="item.avatar" alt class="im1" />
                      <span class="sp1">{{item.ownerName}}</span>
                      <img
                        src="../../assets/img/v1.svg"
                        alt
                        class="im2"
                        v-if="item.ownerLevel == 1"
                      />
                      <span class="sp2">/{{item.orgName}}</span>
                    </div>
                    <div class="white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev prev3"></div>
          <div class="swiper-button-next next3"></div>
        </div>

        <!-- 同专业在学 -->
        <div class="curriculum" v-if="wrz != 1? true: false">
          <p class="hots">同专业在学</p>
        </div>

        <div class="swiper-father" v-if="wrz != 1? true: false">
          <div class="swiper-container" id="swiper3">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in list3" :key="index">
                <div
                  class="card1"
                  :class="(item.keyType == 11 || item.keyType == 12) ? cardone:cardtwo"
                >
                  <div class="casd" @click="StandarddetailsClick(item.keyType,item.keyId)">
                    <img :src="item.popularizeImageUrl" alt class="imgsr1" />
                    <img
                      :src="item.popularizeImageUrl"
                      alt
                      class="imgsr2"
                      v-if="item.keyType == 11 || item.keyType == 12"
                    />
                    <img
                      :src="item.popularizeImageUrl"
                      alt
                      class="imgsr3"
                      v-if="item.keyType == 11 || item.keyType == 12"
                    />
                    <div class="corner" v-if="item.keyType === 11 ? true:false">频道</div>
                    <div class="sandchannel" v-if="item.keyType === 12 ? true:false">沙盘频道</div>
                    <div
                      class="sandstandard"
                      v-if="(item.keyType === 3 || item.keyType === 4) ? true:false"
                    >沙盘</div>
                    <div class="counts">
                      <img src="../../assets/img/duration.svg" alt class="imgr" />
                      <span class="duration">{{item.duration}}分钟</span>
                    </div>
                  </div>
                  <div class="tj">
                    <p class="pp1">{{item.keyName}}</p>
                    <div class="cas">
                      <img
                        src="../../assets/img/red.svg"
                        alt
                        class="imr"
                        v-if="item.officialFlag == true"
                      />
                      <div
                        class="cards clearfix"
                        v-for="(items,index) in item.tagNameList"
                        :key="index"
                      >
                        <span>{{items}}</span>
                      </div>
                    </div>
                    <div class="names">
                      <img :src="item.avatar" alt class="im1" />
                      <span class="sp1">{{item.ownerName}}</span>
                      <img
                        src="../../assets/img/v1.svg"
                        alt
                        class="im2"
                        v-if="item.ownerLevel == 1"
                      />
                      <span class="sp2">/{{item.orgName}}</span>
                    </div>
                    <div class="white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev prev3"></div>
          <div class="swiper-button-next next3"></div>
        </div>

        <!-- 可能喜欢 -->
        <div class="curriculum">
          <p class="hots">可能喜欢</p>
        </div>

        <div class="swiper-father">
          <div class="swiper-container" id="swiper4">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in list6" :key="index">
                <div
                  class="card1"
                  :class="(item.keyType == 11 || item.keyType == 12) ? cardone:cardtwo"
                >
                  <div class="casd" @click="StandarddetailsClick(item.keyType,item.keyId)">
                    <img :src="item.popularizeImageUrl" alt class="imgsr1" />
                    <img
                      :src="item.popularizeImageUrl"
                      alt
                      class="imgsr2"
                      v-if="item.keyType == 11 || item.keyType == 12"
                    />
                    <img
                      :src="item.popularizeImageUrl"
                      alt
                      class="imgsr3"
                      v-if="item.keyType == 11 || item.keyType == 12"
                    />
                    <div class="corner" v-if="item.keyType === 11 ? true:false">频道</div>
                    <div class="sandchannel" v-if="item.keyType === 12 ? true:false">沙盘频道</div>
                    <div
                      class="sandstandard"
                      v-if="(item.keyType === 3 || item.keyType === 4) ? true:false"
                    >沙盘</div>
                    <div class="counts">
                      <img src="../../assets/img/duration.svg" alt class="imgr" />
                      <span class="duration">{{item.duration}}分钟</span>
                    </div>
                  </div>
                  <div class="tj">
                    <p class="pp1">{{item.keyName}}</p>
                    <div class="cas">
                      <img
                        src="../../assets/img/red.svg"
                        alt
                        class="imr"
                        v-if="item.officialFlag == true"
                      />
                      <div
                        class="cards clearfix"
                        v-for="(items,index) in item.tagNameList"
                        :key="index"
                      >
                        <span>{{items}}</span>
                      </div>
                    </div>
                    <div class="names">
                      <img :src="item.avatar" alt class="im1" />
                      <span class="sp1">{{item.ownerName}}</span>
                      <img
                        src="../../assets/img/v1.svg"
                        alt
                        class="im2"
                        v-if="item.ownerLevel == 1"
                      />
                      <span class="sp2">/{{item.orgName}}</span>
                    </div>
                    <div class="white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev prev4"></div>
          <div class="swiper-button-next next4"></div>
        </div>

        <!-- 推荐的课程计划 -->
        <div class="planb">
          <div class="ans1">
            <span></span>
            <i>推荐的课程计划</i>
            <span>基于陆由Starry core 大数据统计</span>
          </div>
        </div>

        <div class="art" v-for="(item,index) in list4" :key="index">
          <div
            class="cards"
            :class="(item.keyType == 23 || item.keyType == 24) ? cardos:cardts"
            @click="StandarddetailsClick1(item.keyType,item.keyId)"
          >
            <img :src="item.popularizeImageUrl" alt class="im1" />

            <img
              :src="item.popularizeImageUrl"
              alt
              class="im2"
              v-if="item.keyType == 23 || item.keyType == 24"
            />

            <img
              :src="item.popularizeImageUrl"
              alt
              class="im3"
              v-if="item.keyType == 23 || item.keyType == 24"
            />
            <div class="corner" v-if="item.keyType === 23 ? true:false">频道</div>
            <div class="sandchannel" v-if="item.keyType === 24 ? true:false">沙盘频道</div>
            <div
              class="sandstandard"
              v-if="(item.keyType === 25 || item.keyType === 26) ? true:false"
            >沙盘</div>
            <h3 class="hb">{{item.keyName}}</h3>
            <div class="bq">
              <p class="guan" v-if="item.officialFlag == true">官方</p>
              <div class="texts" v-for="items in item.tagNameList" :key="items">
                <span class="bqs">{{items}}</span>
              </div>
            </div>
            <div class="names">
              <img :src="item.avatar" alt class="im11" />
              <span>{{item.ownerName}}</span>
              <img src="../../assets/img/v1.svg" alt class="im22" />
            </div>
          </div>
          <div class="words">
            <h3>{{item.keyName}}</h3>
            <p class="words1">
              <span>{{item.duration}}分钟</span>
              <span v-show="item.keyType == 23 || item.keyType == 24">·</span>
              <span v-show="item.keyType == 23 || item.keyType == 24">{{item.totalBundle}}章</span>
              <span>{{item.modifyDatetime}} 更新了</span>
            </p>
            <p class="words2">{{item.summary}}</p>
            <el-row>
              <el-button round @click="StandarddetailsClick1(item.keyType,item.keyId)">去预览</el-button>
            </el-row>
          </div>
        </div>
        <!-- 删除弹框 -->
        <div class="modal" v-if="sout" @click="out"></div>
        <div class="signout" v-if="sout" v-Clickoutside="()=>{out()}">
          <div class="tc">
            <div class="header">确认删除</div>
            <div class="main">
              删除后，
              <span>所有数据都将不可恢复，请谨慎操作！</span>
            </div>
            <div class="footer">
              <el-button @click="out">取消</el-button>
              <el-button @click="deleteout">确认</el-button>
            </div>
          </div>
        </div>
      </el-main>

      <!-- 尾部 -->
      <el-footer class="clearfix" style="height:auto">
        <Foot />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Swiper from "swiper";
import Notices from "../notice/Recent";
import TopHeader from "../Header/header";
import Clickoutside from "element-ui/src/utils/clickoutside";
import Foot from "@/pages/index/footer";
import CheckBox from "../group/checkBox";
import "swiper/dist/css/swiper.css";
import {
  couAppNewestCourses,
  courseRecommendList,
  // memberidentifyRoleType,
  courseCoursePlanTotal,
  groupownGroupTotal,
  courseCoursePlanList,
  memberheaderMemberInfo,
  groupInfoAdd,
  universityceCount,
  coursedeleteCoursePlan
} from "../../service/groupApi";
export default {
  created() {
    // 身份识别
    this.wrz = sessionStorage.getItem("loginRoleStatus");
    courseCoursePlanTotal({})
      .then(res => {
        if (res.code == "0") {
          this.total1 = res.total;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 群组数量
    groupownGroupTotal({})
      .then(res => {
        if (res.code == "0") {
          this.total2 = res.total;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    //资源库数量
    universityceCount({})
      .then(res => {
        if (res.code == "0") {
          this.total3 = res.data;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 我的课程计划
    courseCoursePlanList({})
      .then(res => {
        if (res.code == "0") {
          this.list5 = res.list;
          let list5 = res.list;
          list5.map(item => {
            this.groupId = item.groupId;
          });
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });

    // memberidentifyRoleType({})
    //   .then(res => {
    //     if (res.code == "0") {
    //       this.wrz = res.identifiedRoleType;
    //       if (this.wrz === 1) {
    //         //课程计划数量
    //       }
    //     } else {
    //       tipsFail(res.msg);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // 个人信息介绍
    memberheaderMemberInfo({})
      .then(res => {
        if (res.code == "0") {
          this.listz = res.data;
          console.log(this.listz);
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 热门课程
    courseRecommendList({ limit: "50", page: "1", position: "1" })
      .then(res => {
        if (res.code == "0") {
          this.list = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 最新课程
    courseRecommendList({ limit: "50", page: "1", position: "6" })
      .then(res => {
        if (res.code == "0") {
          this.list1 = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 同行在教
    courseRecommendList({ limit: "50", page: "1", position: "2" })
      .then(res => {
        if (res.code == "0") {
          this.list2 = res.page.list;
          // console.log(res);
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 同专业在学
    courseRecommendList({ limit: "50", page: "1", position: "5" })
      .then(res => {
        if (res.code == "0") {
          this.list3 = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 可能喜欢
    courseRecommendList({ limit: "50", page: "1", position: "3" })
      .then(res => {
        if (res.code == "0") {
          this.list6 = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // 推荐课程计划
    courseRecommendList({ limit: "41", page: "1", position: "4" })
      .then(res => {
        if (res.code == "0") {
          this.list4 = res.page.list;
        } else {
          tipsFail(res.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    // // 头像调取接口
    // memberheaderMemberInfo({})
    //   .then(res => {
    //     if (res.code == "0") {
    //       this.avatar = res.data.avatar;
    //     } else {
    //       tipsFail(res.msg);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  directives: {
    Clickoutside
  },
  data() {
    return {
      checkVal: {
        val: true,
        label: "入群需审批"
      }, //单选框选中的值

      //单选框可选择值
      checkList: [
        {
          val: true,
          label: "入群需审批"
        },
        {
          val: false,
          label: "入群不审批"
        }
      ],
      groupIds: "",
      sout: false,
      avatar: "",
      groupId: "",
      cardos: "cardos",
      cardts: "cardts",
      cardone: "cardone",
      cardtwo: "cardtwo",
      spw: "spw",
      spy: "spy",
      groupName: "",
      name: "",
      cardow: false,
      inputVal: "",
      search: "",
      none: false,
      total1: "0",
      total2: "0",
      total3: "0",
      input: "",
      radio: "1",
      cardq: true,
      cardaz: false,
      card: true,
      cards1: false,
      msg: "课程计划",
      progreess: 30,
      activeIndex: "1",
      listz: [],
      wrz: [],
      list: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      lists: [
        {
          title: require("../../assets/img/LOGO.svg"),
          type: "img", //img 图片 text 文字内容
          list: [
            {
              content:
                "陆由（Luyouor）是上海积途信息科技有限公司旗下专业的面向高校教育的新型在线教育品牌。积途科技是中国领先的教育科技互联网公司，致力于持续提升高等教育实训和实践教学的效率。",
              url: "" //跳转路径 为空不跳转
            }
          ]
        },
        {
          title: "关于",
          type: "text", //img 图片 text 文字内容
          list: [
            {
              content: "关于我们",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "加入我们",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "应用实例",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "新闻动态",
              url: "" //跳转路径 为空不跳转
            }
          ]
        },
        {
          title: "市场",
          type: "text", //img 图片 text 文字内容
          list: [
            {
              content: "产学研项目",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "出版物",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "案例大赛",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "社工年会",
              url: "" //跳转路径 为空不跳转
            }
          ]
        },
        {
          title: "方案",
          type: "text", //img 图片 text 文字内容
          list: [
            {
              content: "标准化实验室",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "虚拟仿真实验室",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "教研一体化实验室",
              url: "" //跳转路径 为空不跳转
            }
          ]
        },
        {
          title: "联系",
          type: "text", //img 图片 text 文字内容
          list: [
            {
              content: "上海市宝山区长逸路188号711室",
              url: "" //跳转路径 为空不跳转
            },
            {
              content: "18918310003@163.com",
              url: "" //跳转路径 为空不跳转
            }
          ]
        }
      ],

      listintroduce: [
        {
          id: 1,
          title: "Marry，中午好！",
          title1: "知识越多越令人陶醉。"
        }
      ],

      listswiper: [
        {
          id: 1,
          src: require("../../assets/img/banner.png")
        },
        {
          id: 2,
          src: require("../../assets/img/banner.png")
        },
        {
          id: 3,
          src: require("../../assets/img/banner.png")
        }
      ]
    };
  },
  methods: {
    // 关闭删除弹框
    out() {
      this.sout = false;
    },
    // 显示删除弹框
    deleteplan(val, groupIds) {
      this.sout = true;
      this.coursePlanId = val;
      this.groupIds = groupIds;
    },
    // 删除后更新数据
    deleteout() {
      let groupIds = this.groupIds;
      if (groupIds == null) {
        coursedeleteCoursePlan({
          coursePlanId: this.coursePlanId
        })
          .then(res => {
            if (res.code == "0") {
              this.sout = false;
              courseCoursePlanList({})
                .then(res => {
                  if (res.code == "0") {
                    this.list5 = res.list;
                  } else {
                    tipsFail(res.msg);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              tipsFail(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        coursedeleteCoursePlan({
          coursePlanId: this.coursePlanId,
          groupIds: this.groupIds
        })
          .then(res => {
            if (res.code == "0") {
              this.sout = false;
              courseCoursePlanList({})
                .then(res => {
                  if (res.code == "0") {
                    this.list5 = res.list;
                  } else {
                    tipsFail(res.msg);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              tipsFail(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 创建群组成功后跳转页面
    AddInfo() {
      groupInfoAdd({ name: this.name, approveJoinFlag: this.checkVal.val })
        .then(res => {
          if (res.code == "0") {
            this.$router.push({
              path: "/group/list"
            });
          } else {
            tipsFail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 创建群组获取数据
    checkChange(item) {
      this.checkVal = item;
    },
    // 未发布跳转个人设置页面
    fbclick(val, cour) {
      if (val === 2) {
        this.$router.push({
          path: "/teachers/editCouPlans",
          query: {
            coursePlanId: cour,
            addCourseType: "editChannel"
          }
        });
      } else {
        this.$router.push({
          path: "/teachers/editCourseBase",
          query: {
            coursePlanId: cour,
            addCourseType: "editCourse"
          }
        });
      }
    },
    // 发布跳转个人中心/未发布跳转编辑页/
    xueclick(cour, type, val, group) {
      if (val == "已发布") {
        this.$router.push({
          path: "/groupStaAnalysis",
          query: {
            coursePlanId: cour,
            coursePlanType: type,
            groupId: group
          }
        });
      }
      if (val == "未发布") {
        if (type == 23 || type == 24) {
          this.$router.push({
            path: "teachers/editCouPlans",
            query: {
              coursePlanId: cour,
              coursePlanType: type
            }
          });
        } else {
          this.$router.push({
            path: "teachers/editCourseBase",
            query: {
              coursePlanId: cour,
              coursePlanType: type
            }
          });
        }
      }
    },
    // 预览跳转详情页
    xueclick1(cour, type, val) {
      if (type == 23 || type == 24) {
        this.$router.push({
          path: "/Coursechanne",
          query: {
            coursePlanId: cour,
            coursePlanType: type
          }
        });
      } else {
        this.$router.push({
          path: "/Standarddetails",
          query: {
            coursePlanId: cour,
            coursePlanType: type
          }
        });
      }
    },
    // 创建课程计划,跳转创建课程页面
    EstablishClick() {
      this.$router.push({
        path: "/Establish"
      });
    },
    // 查看所有,跳转课程计划页面
    CourseplanClick(groupId) {
      this.$router.push({
        path: "/Courseplan",
        query: {
          groupId: groupId
        }
      });
    },
    menu() {
      window.scrollTo(0, 0);
    },
    // 跳转详情页
    StandarddetailsClick(val, key) {
      let address = this.$route.fullPath;
      console.log(address);
      if (val == 11 || val == 12) {
        this.$router.push({
          path: "/prechannel",
          query: {
            courseChannelId: key
          }
        });
      } else {
        this.$router.push({
          path: "/Recstandard",
          query: {
            courseId: key,
            address
          }
        });
      }
    },
    // 跳转推荐课程详情页
    StandarddetailsClick1(val, key) {
      if (val == 23 || val == 24) {
        this.$router.push({
          path: "/palnchannel",
          query: {
            coursePlanId: key
          }
        });
      } else {
        this.$router.push({
          path: "/planstandard",
          query: {
            coursePlanId: key
          }
        });
      }
    },
    // 跳转我的群组
    handleClickos() {
      if (this.total2 != 0) {
        this.$router.push({
          path: "/group/list"
        });
      } else {
        this.cardq = !this.cardq;
      }
    },
    // 跳转课程计划
    handleClickos1() {
      if (this.total1 != 0) {
        this.$router.push({
          path: "/Courseplan"
        });
      } else {
        this.cardq = !this.cardq;
      }
    },
    // 跳转资源库
    handleClickthr() {
      if (this.total3 != 0) {
        this.$router.push({
          path: "/library"
        });
      } else {
        this.cardq = !this.cardq;
      }
    },
    // 隐藏创建群组弹框
    handleClickone() {
      this.cardq = false;
    },
    // 显示创建群组弹框
    handleClicktwo(cardaz) {
      this.cardaz = true;

      this.cards1 = !this.cards1;
    },
    // 隐藏创建群组弹框
    handleClickss1(cardaz) {
      this.cardaz = !this.cardaz;
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    this.menu();
    setTimeout(() => {
      var mySwiper = new Swiper("#swiper1", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        loop: false, // 循环模式选项
        autoplay: false,
        slidesPerView: 4,
        spaceBetween: 80 / 3,
        navigation: {
          nextEl: ".next1",
          prevEl: ".prev1"
        }
      });
    }, 500);
    setTimeout(() => {
      var mySwiper = new Swiper("#swiper2", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        loop: false, // 循环模式选项
        autoplay: false,
        slidesPerView: 4,
        spaceBetween: 80 / 3,
        navigation: {
          nextEl: ".next2",
          prevEl: ".prev2"
        }
      });
    }, 500);
    setTimeout(() => {
      var mySwiper = new Swiper("#swiper3", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        loop: false, // 循环模式选项
        autoplay: false,
        slidesPerView: 4,
        spaceBetween: 80 / 3,
        navigation: {
          nextEl: ".next3",
          prevEl: ".prev3"
        }
      });
    }, 500);
    setTimeout(() => {
      var mySwiper = new Swiper("#swiper4", {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        loop: false, // 循环模式选项
        autoplay: false,
        slidesPerView: 4,
        spaceBetween: 80 / 3,
        navigation: {
          nextEl: ".next4",
          prevEl: ".prev4"
        }
      });
    }, 500);
  },
  components: {
    Notices,
    Foot,
    TopHeader: TopHeader, //注册该组件
    CheckBox
  }
};
</script>

<style lang="less" scoped>
.el-container {
  position: relative;
  width: 100%;
}
.el-main {
  overflow: visible;
  position: relative;
  width: 1220px;
  margin: 0 auto;
  padding: 0;
  .main {
    margin-left: 10px;
    height: 119px;
    margin-right: 10px;
    .logo {
      float: left;
      margin-top: 32px;
      margin-right: 28px;
      img {
        width: 52px;
        height: 52px;
        border-radius: 50%;
      }
    }
    .introduce {
      float: left;
      color: #333333;
      p {
        margin: 0;
        margin-top: 32px;
        font-size: 20px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 1px;
      }
      p:last-child {
        margin-top: 4px;
        font-size: 14px;
        line-height: 20px;
        color: rgba(102, 102, 102, 1);
        font-weight: 400;
      }
    }
    .aggregate {
      float: right;
      width: 297px;
      height: 97px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.06);
      border-radius: 0px 0px 10px 10px;
      padding: 28px 6px 13px 6px;
      text-align: center;
      .group {
        cursor: pointer;
        float: left;
        width: 94px;
        height: 56px;
        .p1 {
          margin-top: 5px;
          margin-bottom: 5px;
          font-size: 18px;
          font-family: Bebas;
          color: rgba(254, 120, 101, 1);
          line-height: 22px;
          font-weight: 600;
        }
        span {
          width: 51px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(179, 179, 179, 1);
          line-height: 17px;
        }
      }
      .group:hover {
        span {
          color: rgba(51, 51, 51, 1);
        }
      }
      i {
        display: block;
        float: left;
        width: 1px;
        height: 31px;
        background-color: #edeff2;
      }
    }
  }
  .plans {
    overflow: hidden;
    margin-bottom: 30px;
    padding-left: 10px;
    padding-right: 10px;
    .ans1 {
      height: 24px;
      line-height: 24px;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 6px;
        height: 24px;
        background: rgba(254, 120, 101, 1);
        border-radius: 4px;
      }
      i {
        text-align: center;
        width: 100px;
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 24px;
        letter-spacing: 1px;
        margin-left: 10px;
      }
    }
    .sna1 {
      float: left;
      margin-bottom: 20px;
      .sna {
        position: relative;
        margin-top: 27px;
        float: left;
        .imgs {
          width: 281px;
          height: 348px;
          background: url(../../assets/img/Normal.svg) no-repeat;
        }
        .imgs:hover {
          box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 6px 0px;
          border-radius: 13px;
        }
      }
    }
    .nas1 {
      float: left;
      margin-top: 27px;
      margin-left: 26px;
      margin-bottom: 20px;
      border-radius: 13px;
      box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.27);
      .kka {
        .whole {
          position: absolute;
          top: 119px;
          right: 10px;
          line-height: 34px;
          a {
            width: 100px;
            height: 20px;
            border-radius: 16px;
            span {
              width: 60px;
              height: 20px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 20px;
            }
            .imgs {
              margin-bottom: 4px;
            }
          }
        }
        .nas {
          position: relative;
          display: inline-block;
          width: 280px;
          height: 348px;
          .he {
            height: 146px;
            .imgs1 {
              width: 280px;
              height: 146px;
              border-radius: 13px 13px 0px 0px;
            }
            .corner {
              width: 54px;
              height: 30px;
              background: rgba(254, 120, 101, 1);
              border-radius: 12px 0px 12px 0px;
              position: absolute;
              left: 0;
              top: 0;
              padding-left: 10px;
              padding-top: 3px;
              font-size: 16px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 22px;
              letter-spacing: 1px;
            }
            .sandchannel {
              width: 88px;
              height: 30px;
              background: rgba(104, 193, 254, 1);
              border-radius: 12px 0px 12px 0px;
              position: absolute;
              left: 0;
              top: 0;
              padding-left: 10px;
              padding-top: 3px;
              font-size: 16px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 22px;
              letter-spacing: 1px;
            }
            .sandstandard {
              width: 54px;
              height: 30px;
              background: rgba(104, 193, 254, 1);
              border-radius: 12px 0px 12px 0px;
              position: absolute;
              left: 0;
              top: 0;
              padding-left: 10px;
              padding-top: 3px;
              font-size: 16px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 22px;
              letter-spacing: 1px;
            }
            .imgs2 {
              display: none;
              position: absolute;
              left: 10px;
              top: 10px;
              width: 28px;
              height: 28px;
              z-index: 91;
            }
            .imgs3 {
              display: none;
              // margin-top: 38px;
              position: absolute;
              right: 10px;
              top: 10px;
              width: 28px;
              height: 28px;
              z-index: 92;
            }
            .imgs4 {
              display: none;
              position: absolute;
              right: 10px;
              top: 10px;
              width: 28px;
              height: 28px;
              z-index: 91;
            }

            .counts {
              position: absolute;
              top: 102px;
              width: 280px;
              height: 44px;
              background: rgba(0, 0, 0, 0.5);
              border-radius: 10px 10px 0px 0px;
            }
            .count {
              position: absolute;
              right: 10px;
              top: 110px;
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.8);
              line-height: 20px;

              .oo1 {
                font-size: 26px;
                font-family: Bebas;
                color: rgba(254, 120, 101, 1);
                line-height: 35px;
                letter-spacing: 1px;
              }
              .oo2,
              .oo3 {
                font-size: 18px;
                font-family: Bebas;
                color: rgba(254, 120, 101, 1);
                line-height: 24px;
              }
            }
          }
          .chang {
            width: 100%;
            height: 6px;
            background: rgba(153, 153, 153, 0.35);
            div.progress {
              background: linear-gradient(90deg, #ffb09e 0%, #fe7865 100%);
              border-radius: 0px 3px 3px 0px;
              height: 6px;
              line-height: 6px;
            }
            div.progres {
              background: linear-gradient(90deg, #ffb09e 0%, #fe7865 100%);
              height: 6px;
              line-height: 6px;
            }
          }
          .statistics {
            position: relative;
            overflow: hidden;
            h3 {
              width: 248px;
              height: 50px;
              font-size: 18px;
              font-family: PingFangSC;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              line-height: 25px;
              padding-left: 16px;
              margin-top: 18px;
              margin-bottom: 22px;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .ri {
              margin-left: 16px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 20px;
              margin-bottom: 12px;
              .two {
                width: 45px;
                float: left;
                letter-spacing: 1px !important;
              }
            }
            .qun {
              margin-left: 16px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 20px;
              margin-bottom: 12px;
              overflow: hidden;
              height: 20px;
              .two {
                width: 45px;
                float: left;
                text-justify: distribute;
                text-align: justify;
                text-align-last: justify;
              }
              // .twoo {
              //   float: left;
              // }
              // .twoos {
              //   float: left;
              //   width: 181px;
              //   overflow: hidden;
              //   text-overflow: ellipsis;
              //   display: -webkit-box;
              //   -webkit-box-orient: vertical;
              //   -webkit-line-clamp: 1;
              // }
            }
            .zh {
              margin-left: 16px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 20px;
              padding-bottom: 15px;
              .two {
                width: 45px;
                float: left;
                text-justify: distribute;
                text-align: justify;
                text-align-last: justify;
              }
              .spw {
                font-size: 14px;
                font-family: PingFangSC;
                font-weight: 500;
                color: rgba(254, 98, 76, 1);
                line-height: 20px;
              }
            }
            .el-button {
              position: absolute;
              bottom: 12px;
              right: 16px;
              width: 63px;
              height: 26px;
              background: rgba(255, 255, 255, 1);
              border-radius: 13px;
              border: 1px solid rgba(254, 120, 101, 0.4);
              text-align: center;
              float: right;
              z-index: 19;
              span {
                position: absolute;
                top: 25%;
                left: 20%;
                font-size: 12px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(254, 120, 101, 1);
                line-height: 13px;
              }
            }
            .el-button:active {
              color: #fff;
              border-color: #fff;
            }
          }
        }
        .nas:hover {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 4px 10px 0px rgba(153, 153, 153, 0.5);
          border-radius: 13px;
          .imgs2 {
            display: block;
          }
          .imgs3 {
            display: block;
          }
          .imgs4 {
            display: block;
          }
        }
      }
    }
  }
  .card {
    position: absolute;
    right: 0px;
    top: 100px;
    margin-top: 10px;
    border-radius: 10px;
    width: 484px;
    height: 184px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
    z-index: 998;
    .Triangle {
      position: absolute;
      top: -20px;
      right: 45px;
      z-index: 999;
      width: 10px;
      height: 10px;
      border-top: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid rgba(255, 255, 255, 1);
      border-left: 10px solid transparent;
    }
    .one {
      position: relative;
      z-index: 999;
      margin-top: 26px;
      margin-right: 28px;
      float: right;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
      border: 0px solid transparent;
      background-color: #fff;
    }
    .two {
      margin-top: 26px;
      margin-left: 22px;
      float: left;
      width: 352px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 22px;
    }
    .three {
      margin-top: 26px;
      margin-left: 22px;
      float: left;
      width: 338px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 22px;
    }
    .el-button {
      position: absolute;
      top: 48px;
      right: 28px;
      margin-top: 19px;
      width: 98px;
      height: 36px;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 18px;
      text-align: center;
      float: right;
      z-index: 999;
      border: none;
      span {
        position: absolute;
        top: 25%;
        left: 20%;
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #fff;
        line-height: 18px;
      }
    }
    img {
      margin-top: 26px;
      margin-left: 22px;
      width: 84px;
      height: 30px;
    }
  }
  .cards1 {
    position: absolute;
    left: 24%;
    top: 180px;
    margin-top: 10px;
    border-radius: 10px;
    z-index: 999;
    width: 551px;
    height: 253px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 30px 0px rgba(84, 40, 33, 0.12);
    border-radius: 13px;
    .h {
      vertical-align: middle;
      align-items: center;
      margin-top: 22px;
      margin-left: 32px;
      height: 30px;
      line-height: 30px;
      h3 {
        float: left;
        font-size: 22px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
      }
      span {
        margin-left: 8px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(153, 153, 153, 1);
        line-height: 19px;
        letter-spacing: 1px;
      }
    }
    .el-button:first-child {
      position: absolute;
      top: 30px;
      right: 166px;
      width: 98px;
      height: 36px;
      border: 2px solid #fe7865;
      border-radius: 18px;
      text-align: center;
      float: right;
      z-index: 9999;
      span {
        position: absolute;
        top: 25%;
        left: 35%;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(254, 120, 101, 1);
        line-height: 16px;
      }
    }
    .el-button:first-child:hover {
      background-color: #fff;
      border-color: #fe7865 !important;
    }
    .el-button:last-child {
      position: absolute;
      top: 30px;
      right: 32px;
      width: 98px;
      height: 36px;
      background: linear-gradient(
        90deg,
        rgba(255, 176, 158, 1) 0%,
        rgba(254, 120, 101, 1) 100%
      );
      border-radius: 18px;
      text-align: center;
      float: right;
      z-index: 999;
      border: none;
      span {
        position: absolute;
        top: 25%;
        left: 35%;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
    }
  }
  .cards1 /deep/ .el-input {
    margin-top: 34px;
    margin-left: 32px;
    width: 487px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    margin-bottom: 20px;
    &hover {
      border-color: #fff;
    }
    .el-input__inner:hover {
      border-color: rgba(254, 120, 101, 0.2);
    }
    .el-input__inner:focus {
      border-color: rgba(255, 163, 158, 1);
      box-shadow: 0px 0px 0px 2px rgba(254, 120, 101, 0.2);
    }
  }
  .ims {
    width: 1200px;
    height: 294px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .plana {
    margin-top: 59px;
    margin-left: 10px;
    margin-right: 10px;
    .ans1 {
      height: 24px;
      // line-height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      span:first-child {
        display: inline-block;
        width: 6px;
        height: 24px;
        background: rgba(254, 120, 101, 1);
        border-radius: 4px;
      }
      i {
        text-align: center;
        font-style: normal;
        margin-left: 10px;
        width: 100px;
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 24px;
        letter-spacing: 1px;
      }
      span:last-child {
        margin-top: 7px;
        margin-left: 4px;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(60, 60, 67, 0.6);
        line-height: 20px;
      }
    }
  }
  .curriculum {
    overflow: hidden;
    padding-left: 10px;
    padding-right: 10px;
    .hots {
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
  }
  #swiper1 {
    width: 1200px;
    padding-bottom: 32px;
    padding-top: 20px;
  }
  #swiper2 {
    width: 1200px;
    padding-bottom: 32px;
    padding-top: 20px;
  }
  #swiper3 {
    width: 1200px;
    padding-bottom: 32px;
    padding-top: 20px;
  }
  #swiper4 {
    width: 1200px;
    padding-bottom: 32px;
    padding-top: 20px;
  }
  .cardone {
    height: 324px;
    width: 280px;
    position: relative;
    .casd {
      position: relative;
      height: 170px;
      width: 280px;
      .imgsr1 {
        position: absolute;
        top: 0;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 12px;
        transition: 0.2s;
        opacity: 1;
        z-index: 9;
        cursor: pointer;
      }
      .imgsr2 {
        position: absolute;
        top: 6px;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 8px;
        transition: 0.2s;
        opacity: 0.5;
        transform: scaleX(0.97);
        z-index: 8;
      }
      .imgsr3 {
        position: absolute;
        top: 12px;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 8px;
        transition: 0.2s;
        opacity: 0.189;
        transform: scaleX(0.95);
        z-index: 7;
      }
      .corner {
        position: absolute;
        top: 0;
        width: 54px;
        height: 30px;
        background: rgba(254, 120, 101, 1);
        border-radius: 8px 0px 8px 0px;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        // z-index: 91;
        transition: 0.2s;
        z-index: 9;
      }
      .sandchannel {
        width: 88px;
        height: 30px;
        background: rgba(104, 193, 254, 1);
        border-radius: 8px 0px 8px 0px;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        transition: 0.2s;
        z-index: 9;
      }
      .sandstandard {
        width: 54px;
        height: 30px;
        background: rgba(104, 193, 254, 1);
        border-radius: 8px 0px 8px 0px;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        transition: 0.2s;
        z-index: 9;
      }
      .counts {
        position: absolute;
        bottom: 0;
        width: 280px;
        height: 36px;
        z-index: 13;
        background-color: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        border-radius: 0px 0px 12px 12px;
        transition: 0.2s;
        .imgr {
          position: absolute;
          bottom: 9px;
          right: 76px;
          transition: 0.2s;
          z-index: 9;
        }
        .duration {
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          position: absolute;
          bottom: 9px;
          left: 213px;
          transition: 0.2s;
          z-index: 9;
        }
      }
    }
    .casd:hover {
      position: relative;
      height: 170px;
      width: 280px;
      .imgsr1 {
        position: absolute;
        top: -6px;
      }
      .imgsr2 {
        position: absolute;
        top: 3px;
      }
      .corner {
        position: absolute;
        top: -6px;
      }
      .sandchannel {
        position: absolute;
        top: -6px;
      }
      .sandstandard {
        position: absolute;
        top: -6px;
      }
      .counts {
        position: absolute;
        bottom: 6px;
      }
    }
    .tj {
      position: absolute;
      top: 170px;
      margin-left: 10px;
      margin-top: 18px;
      .pp1 {
        width: 248px;
        height: 50px;
        font-size: 18px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 11px;
        line-height: 25px;
        letter-spacing: 1px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .cas {
        width: 290px;
        height: 20px;
        overflow: hidden;
        .imr {
          float: left;
        }
        .cards {
          float: left;
          height: 20px;
          line-height: 14px;
          background: rgba(250, 250, 250, 1);
          border-radius: 3px;
          border: 1px solid rgba(238, 238, 238, 1);
          margin-left: 14px;
          padding: 0px 5px 4px 5px;
          span {
            font-size: 12px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        .cards:nth-child(1) {
          margin-left: 0;
        }
      }
      .names {
        height: 20px;
        margin-top: 10px;
        line-height: 20px;
        .im1 {
          float: left;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .sp1 {
          float: left;
          display: block;
          height: 20px;
          font-size: 12px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          margin-left: 9px;
        }
        .im2 {
          float: left;
          width: 13px;
          height: 9px;
          border-radius: 1px;
          margin-left: 6px;
          margin-top: 6px;
        }
        .sp2 {
          float: left;
          display: block;
          width: 171px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(194, 194, 194, 1);
          margin-left: 3px;
        }
      }
      .white {
        width: 20px;
        height: 20px;
        background: linear-gradient(
          270deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0.9) 60%,
          rgba(255, 255, 255, 0) 100%
        );
        position: absolute;
        right: 0px;
        top: 61px;
      }
    }
  }
  .cardtwo {
    height: 324px;
    width: 280px;
    position: relative;
    .casd {
      position: relative;
      height: 170px;
      width: 280px;
      .imgsr1 {
        position: absolute;
        top: 0;
        height: 170px;
        width: 280px;
        text-align: center;
        border-radius: 12px;
        transition: 0.2s;
        opacity: 1;
        z-index: 9;
        cursor: pointer;
      }
      .corner {
        position: absolute;
        top: 0;
        width: 54px;
        height: 30px;
        background: rgba(254, 120, 101, 1);
        border-radius: 8px 0px 8px 0px;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        z-index: 91;
        transition: 0.2s;
      }
      .sandchannel {
        width: 88px;
        height: 30px;
        background: rgba(104, 193, 254, 1);
        border-radius: 8px 0px 8px 0px;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        transition: 0.2s;
        z-index: 9;
      }
      .sandstandard {
        width: 54px;
        height: 30px;
        background: rgba(104, 193, 254, 1);
        border-radius: 8px 0px 8px 0px;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        transition: 0.2s;
        z-index: 9;
      }
      .counts {
        position: absolute;
        bottom: 0;
        width: 280px;
        height: 36px;
        z-index: 13;
        background-color: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        border-radius: 0px 0px 12px 12px;
        transition: 0.2s;
        .imgr {
          position: absolute;
          bottom: 9px;
          right: 76px;
          transition: 0.2s;
          z-index: 9;
        }
        .duration {
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          position: absolute;
          bottom: 9px;
          left: 213px;
          transition: 0.2s;
          z-index: 9;
        }
      }
    }
    .casd:hover {
      position: relative;
      height: 170px;
      width: 280px;
      .imgsr1 {
        position: absolute;
        top: -6px;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );

        box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
      }
      .imgsr2 {
        position: absolute;
        top: 3px;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
      }
      .corner {
        position: absolute;
        top: -6px;
      }
      .sandchannel {
        position: absolute;
        top: -6px;
      }
      .sandstandard {
        position: absolute;
        top: -6px;
      }
      .counts {
        position: absolute;
        bottom: 6px;
      }
    }
    .tj {
      position: absolute;
      top: 170px;
      margin-left: 10px;
      margin-top: 18px;
      .pp1 {
        width: 248px;
        height: 50px;
        font-size: 18px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 11px;
        line-height: 25px;
        letter-spacing: 1px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .cas {
        width: 290px;
        height: 20px;
        overflow: hidden;
        .imr {
          float: left;
        }
        .cards {
          float: left;
          height: 20px;
          line-height: 14px;
          background: rgba(250, 250, 250, 1);
          border-radius: 3px;
          border: 1px solid rgba(238, 238, 238, 1);
          margin-left: 14px;
          padding: 0px 5px 4px 5px;
          span {
            font-size: 12px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        .cards:nth-child(1) {
          margin-left: 0;
        }
      }
      .names {
        height: 20px;
        margin-top: 10px;
        line-height: 20px;
        .im1 {
          float: left;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .sp1 {
          float: left;
          display: block;
          height: 20px;
          font-size: 12px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          margin-left: 9px;
        }
        .im2 {
          float: left;
          width: 13px;
          height: 9px;
          border-radius: 1px;
          margin-left: 6px;
          margin-top: 6px;
        }
        .sp2 {
          float: left;
          display: block;
          width: 171px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(194, 194, 194, 1);
          margin-left: 3px;
        }
      }
      .white {
        width: 20px;
        height: 20px;
        background: linear-gradient(
          270deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(255, 255, 255, 0.9) 60%,
          rgba(255, 255, 255, 0) 100%
        );
        position: absolute;
        right: 0px;
        top: 61px;
      }
    }
  }
  .planb {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 22px;
    .ans1 {
      height: 24px;
      // line-height: 40px;
      display: flex;
      align-items: center;
      span:first-child {
        display: inline-block;
        width: 6px;
        height: 24px;
        background: rgba(254, 120, 101, 1);
        border-radius: 4px;
      }
      i {
        text-align: center;
        font-style: normal;
        margin-left: 10px;
        width: 175px;
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 24px;
        letter-spacing: 1px;
      }
      span:last-child {
        margin-top: 7px;
        margin-left: 4px;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(60, 60, 67, 0.6);
        line-height: 20px;
      }
    }
  }
  .art {
    height: 283px;
    margin-bottom: 60px;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;
    .cardos {
      position: relative;
      width: 447px;
      height: 283px;
      float: left;
      .im1 {
        width: 447px;
        height: 271px;
        position: absolute;
        top: 0px;
        opacity: 1;
        z-index: 9;
        width: 447px;
        height: 271px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        border-radius: 12px;
        transition: 0.2s;
        cursor: pointer;
      }
      .im2 {
        width: 447px;
        height: 271px;
        position: absolute;
        top: 6px;
        opacity: 0.5;
        transform: scaleX(0.97);
        z-index: 8;
        border-radius: 12px;
        transition: 0.2s;
      }
      .im3 {
        width: 447px;
        height: 271px;
        position: absolute;
        top: 12px;
        opacity: 0.189;
        transform: scaleX(0.95);
        // left: 12px;
        border-radius: 12px;
        z-index: 7;
        transition: 0.2s;
      }
      .corner {
        width: 54px;
        height: 30px;
        background: rgba(254, 120, 101, 1);
        border-radius: 12px 0px 12px 0px;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        z-index: 91;
        transition: 0.2s;
      }
      .sandchannel {
        width: 88px;
        height: 30px;
        background: rgba(104, 193, 254, 1);
        border-radius: 12px 0px 12px 0px;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        z-index: 91;
        transition: 0.2s;
      }
      .sandstandard {
        width: 54px;
        height: 30px;
        background: rgba(104, 193, 254, 1);
        border-radius: 8px 0px 8px 0px;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        transition: 0.2s;
        z-index: 9;
      }
      .hb {
        position: absolute;
        bottom: 63px;
        left: 20px;
        z-index: 9;
        width: 356px;
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 33px;
        letter-spacing: 1px;
        transition: 0.2s;
      }
      .bq {
        position: absolute;
        bottom: 32px;
        left: 20px;
        z-index: 91;
        transition: 0.2s;
        .guan {
          width: 34px;
          height: 20px;
          background: rgba(254, 120, 101, 1);
          border-radius: 3px;
          border: 1px solid rgba(254, 120, 101, 1);
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 16px;
          float: left;
          margin-right: 14px;
          text-align: center;
        }
        .texts {
          z-index: 91;
          float: left;
          margin-right: 14px;
          transition: 0.2s;
          .bqs {
            display: block;
            height: 20px;
            padding: 0px 5px 0px 5px;
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 17px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            border: 1px solid rgba(238, 238, 238, 1);
          }
        }
      }
      .names {
        position: absolute;
        right: 0;
        bottom: 29px;
        height: 28px;
        width: 140px;
        z-index: 91;
        line-height: 28px;
        transition: 0.2s;
        .im11 {
          float: left;
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
        span {
          float: left;
          display: block;
          margin-left: 11px;
          max-width: 68px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 28px;
        }
        .im22 {
          margin-left: 5px;
          float: left;
          width: 24px;
          height: 17px;
          line-height: 28px;
          margin-top: 6px;
        }
      }
    }
    .cardos:hover {
      .im1 {
        position: absolute;
        top: -4px;
        opacity: 1;
        z-index: 9;
        width: 447px;
        height: 271px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        border-radius: 12px;
      }
      .im2 {
        position: absolute;
        top: 4px;
        opacity: 0.5;
        transform: scaleX(0.97);
        z-index: 8;
      }
      .im3 {
        position: absolute;
        top: 12px;
        opacity: 0.189;
        transform: scaleX(0.95);
        z-index: 7;
      }
      .corner {
        position: absolute;
        top: -4px;
      }
      .sandchannel {
        position: absolute;
        top: -4px;
      }
      .sandstandard {
        position: absolute;
        top: -4px;
      }
      .hb {
        position: absolute;
        bottom: 67px;
      }
      .bq {
        position: absolute;
        bottom: 36px;
        left: 20px;
        z-index: 91;
      }
      .names {
        position: absolute;
        bottom: 35px;
      }
    }
    .cardts {
      position: relative;
      width: 447px;
      height: 283px;
      float: left;
      .im1 {
        width: 447px;
        height: 271px;
        position: absolute;
        top: 0px;
        opacity: 1;
        z-index: 9;
        width: 447px;
        height: 271px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        border-radius: 12px;
        transition: 0.2s;
        cursor: pointer;
      }
      .im2 {
        width: 447px;
        height: 271px;
        position: absolute;
        top: 6px;
        opacity: 0.5;
        transform: scaleX(0.97);
        z-index: 8;
        border-radius: 12px;
        transition: 0.2s;
      }
      .im3 {
        width: 447px;
        height: 271px;
        position: absolute;
        top: 12px;
        opacity: 0.189;
        transform: scaleX(0.95);
        // left: 12px;
        border-radius: 12px;
        z-index: 7;
        transition: 0.2s;
      }
      .corner {
        width: 54px;
        height: 30px;
        background: rgba(254, 120, 101, 1);
        border-radius: 12px 0px 12px 0px;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        z-index: 91;
        transition: 0.2s;
      }
      .sandchannel {
        width: 88px;
        height: 30px;
        background: rgba(104, 193, 254, 1);
        border-radius: 12px 0px 12px 0px;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        z-index: 91;
        transition: 0.2s;
      }
      .sandstandard {
        width: 54px;
        height: 30px;
        background: rgba(104, 193, 254, 1);
        border-radius: 8px 0px 8px 0px;
        position: absolute;
        left: 0;
        top: 0;
        padding-left: 10px;
        padding-top: 3px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 22px;
        letter-spacing: 1px;
        transition: 0.2s;
        z-index: 9;
      }
      .hb {
        position: absolute;
        bottom: 63px;
        left: 20px;
        z-index: 9;
        width: 356px;
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 33px;
        letter-spacing: 1px;
        transition: 0.2s;
      }
      .bq {
        position: absolute;
        bottom: 32px;
        left: 20px;
        z-index: 91;
        transition: 0.2s;
        .guan {
          width: 34px;
          height: 20px;
          background: rgba(254, 120, 101, 1);
          border-radius: 3px;
          border: 1px solid rgba(254, 120, 101, 1);
          font-size: 12px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 16px;
          float: left;
          margin-right: 14px;
          text-align: center;
        }
        .texts {
          z-index: 91;
          float: left;
          margin-right: 14px;
          transition: 0.2s;
          .bqs {
            display: block;
            height: 20px;
            padding: 0px 5px 0px 5px;
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: 17px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            border: 1px solid rgba(238, 238, 238, 1);
          }
        }
      }
      .names {
        position: absolute;
        right: 0;
        bottom: 29px;
        height: 28px;
        width: 140px;
        z-index: 91;
        line-height: 28px;
        transition: 0.2s;
        .im11 {
          float: left;
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
        span {
          float: left;
          display: block;
          margin-left: 11px;
          max-width: 68px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 28px;
        }
        .im22 {
          margin-left: 5px;
          float: left;
          width: 24px;
          height: 17px;
          line-height: 28px;
          margin-top: 6px;
        }
      }
    }
    .cardts:hover {
      .im1 {
        position: absolute;
        top: -4px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
        border-radius: 12px;
      }
      .corner {
        position: absolute;
        top: -4px;
      }
      .sandchannel {
        position: absolute;
        top: -4px;
      }
      .sandstandard {
        position: absolute;
        top: -4px;
      }
      .hb {
        position: absolute;
        bottom: 67px;
      }
      .bq {
        position: absolute;
        bottom: 36px;
        left: 20px;
        z-index: 91;
      }
      .names {
        position: absolute;
        bottom: 35px;
      }
    }
    .words {
      float: left;
      width: 623px;
      margin-left: 56px;
      border-bottom: 1px solid #eeeeee;
      h3 {
        width: 623px;
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 33px;
        margin-top: 8px;
      }
      .words1 {
        margin-top: 14px;
        span:nth-child(1),
        span:nth-child(3) {
          width: 101px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 600;
          color: rgba(74, 74, 74, 1);
          line-height: 22px;
        }
        span:nth-child(4) {
          margin-left: 24px;
          width: 144px;
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 22px;
        }
      }
      .words2 {
        width: 623px;
        height: 112px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
        text-align: justify;
        text-justify: distribute;
        margin-top: 23px;
        overflow: hidden;

        text-overflow: ellipsis;

        display: -webkit-box;

        -webkit-box-orient: vertical;

        -webkit-line-clamp: 4;
      }
      .el-row {
        margin-top: 11px;
        margin-bottom: 39px;
        .el-button {
          width: 99px;
          height: 40px;
          background: rgba(255, 255, 255, 0.4);
          box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 0.4);
          border-radius: 18px;
          border: 1px solid rgba(254, 120, 101, 0.4);
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(254, 120, 101, 1);
          span {
            width: 48px;
            height: 16px;
            font-size: 16px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(254, 120, 101, 1);
          }
        }
        .is-round {
          padding: 11px 15px 11px 15px;
        }
      }
      .el-button:hover {
        opacity: 0.8;
        border: 1px solid rgba(254, 120, 101, 0.8) !important;
        span {
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(254, 120, 101, 1);
        }
      }
    }
  }
  .art:last-child {
    .words {
      border: none;
    }
  }
  .signout {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 2020;
    .tc {
      width: 410px;
      height: 200px;
      background: rgba(255, 255, 255, 1);
      border-radius: 13px;
      padding: 26px 32px 20px 32px;
      .header {
        position: absolute;
        left: 32px;
        width: 100px;
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
      }
      .main {
        margin-top: 43px;
        margin-bottom: 15px;
        margin-left: 0;
        margin-right: 0;
        height: 60px;
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 400;
        color: #999999;
        span {
          color: #fe7865;
        }
      }
      .footer {
        position: absolute;
        right: 32px;
        .el-button:first-child {
          width: 109px;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 0px 1px rgba(254, 120, 101, 0.4);
          border-radius: 18px;
          border: 1px solid rgba(254, 120, 101, 0.4);
          line-height: 11px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(254, 120, 101, 1);
          &:hover {
            color: rgba(254, 120, 101, 1);
          }
          &:focus {
            color: rgba(254, 120, 101, 1);
          }
        }

        .el-button:last-child {
          width: 110px;
          height: 36px;
          background: linear-gradient(
            90deg,
            rgba(255, 176, 158, 1) 0%,
            rgba(254, 120, 101, 1) 100%
          );
          border-radius: 18px;
          line-height: 11px;
          font-size: 16px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          border: none;
          &:hover {
            color: rgba(255, 255, 255, 1);
            border: none;
          }
          &:focus {
            color: rgba(255, 255, 255, 1);
            border: none;
          }
        }
      }
    }
  }
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2019;
  }
}
.el-footer {
  overflow: hidden;
  width: 100%;
  /*height: 520px !important;*/
  // margin: 0 auto;
  background: url("../../assets/img/bg.png");
  background-size: 100% 100%;
  // line-height: 300px;
  text-align: center;
  font-size: 1.5rem;
  /*padding-top: 69px;*/
  box-sizing: border-box;
  /*padding-bottom: 36px;*/
  .link-box {
    width: 1200px;
    height: 349px;
    margin: 0 auto;
    padding-bottom: 104px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    // display: flex;
    // justify-content: center; /* 水平居中 */
    padding-left: 0;
  }
  ul {
    float: left;
    width: 140px;
    line-height: 28px;
    margin-right: 77px;
    li {
      text-align: left;
    }
    li:first-child {
      padding-bottom: 12px;
      a {
        font-size: 18px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
    a {
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
    }
    a:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
  ul:first-child {
    width: 183px;
    float: left;
    margin-right: 112px;
    li:last-child {
      a {
        font-size: 14px;
      }
    }
  }
  ul:last-child {
    margin-right: 0;
    // float: right;
    width: 240px;
  }
  p {
    width: 100%;
    height: 102px;
    font-size: 18px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    padding-top: 36px;
    padding-bottom: 36px;
    line-height: 30px;
    // background-color: pink;
  }
}
.swiper-slide {
  width: 280px !important;
}
.swiper-father {
  position: relative;
}
.swiper-button-prev {
  opacity: 0.35;
  width: 48px;
  height: 48px;
  position: absolute;
  left: -18px;
  top: 36%;
  background: url(../../assets/img/zuojiantou.svg);
  transform: translateY(-50%);
  outline: none;
}
.swiper-button-next {
  opacity: 0.35;
  width: 48px;
  height: 48px;
  position: absolute;
  right: -16px;
  top: 36%;
  transform: translateY(-50%);
  background: url(../../assets/img/youjiantou.svg);
  outline: none;
}
.swiper-button-prev:hover {
  opacity: 1;
}
.swiper-button-next:hover {
  opacity: 1;
}
</style>
