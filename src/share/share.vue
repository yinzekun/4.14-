<template>
  <div v-if="data != null" class="share">
    <shareGuide ref="mychild"></shareGuide>

    <div class="share-nav">
      <van-cell-group>
        <van-row class="share-header">
          <van-col span="12">
            <img
              src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/launch/logo.png"
              alt
            />
          </van-col>
          <van-col span="12">
            <div class="share-header-btn" @click="linkLaunch">我也要筹款</div>
          </van-col>
        </van-row>
      </van-cell-group>
      <van-row class="share-notice" v-if="corporationDonationsList != null">
        <van-col span="24">
          <van-notice-bar color="#FF5A5A" background="#fff">
            <span v-for="(item,index) in corporationDonationsList">
              <img
                src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/心.png"
                alt
              />
              &nbsp;{{item.enterprise}}捐助{{item.money}}元&nbsp;累计已帮助{{item.helpNum}}个家庭&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </van-notice-bar>
        </van-col>
      </van-row>
    </div>

    <div class="share-clear"></div>

    <van-row class="share-hide">
      <van-col span="18">
        <van-image round width="50px" height="50px" :src="data.headUrl" />
        <span
          class="share-hide-name"
          v-if="data.nickname.length > 4"
        >{{data.nickname.slice(0,4)}}****</span>
        <span class="share-hide-name" v-else>{{data.nickname}}</span>
      </van-col>
      <van-col span="6" class="share-hide-btn">
        <span>个人求助</span>
      </van-col>
    </van-row>

    <p class="share-title">{{data.fundraisingTitle}}</p>
    <van-row class="share-helpS-tabs">
      <van-col span="8" class="share-helpS-tabs-li">
        <p>{{data.raiseMoney}}</p>
        <p>已经筹到（元）</p>
      </van-col>
      <van-col span="8" class="share-helpS-tabs-li">
        <p>{{data.fundraisingMoney}}</p>
        <p>急需筹款（元）</p>
      </van-col>
      <van-col span="8" class="share-helpS-tabs-li share-helpS-tabs-last">
        <p>{{data.helpNum}}</p>
        <p>帮助数量（次）</p>
      </van-col>
    </van-row>
    <div class="share-tips" @click="showRemind = true">筹到多少钱打款给求助人多少钱，医群筹不收取任何手续费用</div>
    <div class="share-clear"></div>

    <p class="share-title">求助人情况说明</p>
    <div
      class="share-explain"
      v-html="data.helpNote.replace(/\n/g,'<br>').replace(/\ /g,'&nbsp;')"
      :style="{ height: height }"
    >
      <!-- {{data.helpNote}} -->
    </div>
    <div v-if="moreShow" class="share-more" @click="height = 'auto',moreShow = false">
      <span>
        展开更多
        <img
          src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/箭头-下.png"
          alt
        />
      </span>
    </div>
    <div v-else class="share-more" @click="height = '105px',moreShow = true">
      <span>
        收起
        <img
          src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/箭头-上.png"
          alt
        />
      </span>
    </div>
    <div class="share-clear"></div>

    <p class="share-title">
      照片证明
      <span class="share-title-right" @click="showReport = true">举报</span>
    </p>
    <van-row class="share-phone">
      <van-col
        span="6"
        v-for="(item,index) in data.seekHelpImage"
        @click="imgpreviewFun(data.seekHelpImage,index)"
        :key="index"
      >
        <van-image class="share-phone-img" fit="cover" :src="item.url">
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-col>
    </van-row>

    <div class="share-contact">
      <van-row>
        <div>
          <van-col span="6">
            <img
              class="share-contact-logo"
              src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/logo.png"
              alt
            />
          </van-col>
          <van-col span="12">
            <div>
              <b class="share-contact-title">官方客服</b>
              <span class="share-contact-btn">筹款顾问</span>
            </div>
            <div class="share-contact-text">大病筹款、病历推荐、筹款指导</div>
          </van-col>
          <van-col span="6">
            <img
              @click="linkCode"
              class="share-contact-eCode"
              src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/eCode.png"
              alt
            />
          </van-col>
        </div>
        <div>
          <van-col span="12" @click="linkPhone">
            <div class="share-contact-icon share-contact-iconLeft">
              <img
                src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/电话.png"
                alt
              />
              <span>电话咨询</span>
            </div>
          </van-col>
          <van-col span="12" @click="linkCustomer">
            <div class="share-contact-icon">
              <img
                src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/微信.png"
                alt
              />
              <span>微信咨询</span>
            </div>
          </van-col>
        </div>
        <div style="clear: both;height: 1px;width: 100vw;"></div>
      </van-row>
    </div>

    <p class="share-title">
      证明材料
      <span class="share-title-right" @click="showLove = !showLove">爱心保障</span>
    </p>
    <div class="share-text">求助人发起项目基本诊断信息已通过前置审核，相关医疗凭证正在提交中。</div>
    <div class="share-material">
      <div class="share-material-nav">
        <van-cell-group class="share-material-list" v-if="data.credentialModel.identityAudit == 0">
          <van-row>
            <van-col span="8">
              <b>患者姓名</b>
            </van-col>
            <van-col span="16">
              <span class="share-material-name">{{data.credentialModel.name}}</span>
              <div class="share-material-li">
                <img
                  src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/椭圆.png"
                  alt
                />
                <span>身份证明核实通过</span>
              </div>
            </van-col>
          </van-row>
        </van-cell-group>
        <van-cell-group class="share-material-list" v-if="data.credentialModel.diseaseAudit == 0">
          <van-row>
            <van-col span="8">
              <b>所患疾病</b>
            </van-col>
            <van-col span="16">
              <span class="share-material-name">{{data.credentialModel.disease}}</span>
              <div class="share-material-li">
                <img
                  src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/椭圆.png"
                  alt
                />
                <span>身份证明核实通过</span>
              </div>
            </van-col>
          </van-row>
        </van-cell-group>
        <van-cell-group class="share-material-list" v-if="data.credentialModel.payeeAudit == 0">
          <van-row>
            <van-col span="8">
              <b>收款方</b>
            </van-col>
            <van-col span="16">
              <span
                v-if="data.credentialModel.relation == 1"
                class="share-material-name"
              >{{data.credentialModel.payee}}(患者本人)</span>
              <span
                v-else-if="data.credentialModel.relation == 2"
                class="share-material-name"
              >{{data.credentialModel.payee}}(患者配偶)</span>
              <span
                v-else-if="data.credentialModel.relation == 3"
                class="share-material-name"
              >{{data.credentialModel.payee}}(直系亲属)</span>
              <span
                v-else-if="data.credentialModel.relation == 4"
                class="share-material-name"
              >{{data.credentialModel.payee}}(医院账户)</span>
              <span
                v-else="data.credentialModel.relation == 5"
                class="share-material-name"
              >{{data.credentialModel.payee}}(公益组织)</span>
              <div class="share-material-li">
                <img
                  src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/椭圆.png"
                  alt
                />
                <span>身份证明核实通过</span>
              </div>
              <div class="share-material-li">
                <img
                  src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/椭圆.png"
                  alt
                />
                <span>身份证明核实通过</span>
              </div>
            </van-col>
          </van-row>
        </van-cell-group>
        <van-cell-group class="share-material-list" v-if="moreMaterialShow">
          <van-row v-if="data.credentialModel.isSubmit == 0">
            <van-col span="8">
              <b>征信证明</b>
            </van-col>
            <van-col span="16" class="share-material-text">
              <div v-if="data.credentialModel.housingSituation == 0">
                <div>房产数量：{{data.credentialModel.houseNum}}</div>
                <div>房产价值：{{data.credentialModel.houseValue}}</div>
                <div v-if="data.credentialModel.houseStatus == 1">房产状态：已变卖</div>
                <div v-else-if="data.credentialModel.houseStatus == 2">房产状态：变卖中</div>
                <div v-else="data.credentialModel.houseStatus == 3">房产状态：未变卖</div>
              </div>
              <div v-if="data.credentialModel.housingSituation != 0">
                <div>无房产</div>
              </div>
              <div class="share-material-clear"></div>
              <div v-if="data.credentialModel.vehicleSituation == 0">
                <div>汽车数量：{{data.credentialModel.vehicleNum}}</div>
                <div>汽车价值：{{data.credentialModel.vehicleValue}}</div>
                <div v-if="data.credentialModel.vehicleStatus == 1">汽车状态：已变卖</div>
                <div v-else-if="data.credentialModel.vehicleStatus == 2">汽车状态：变卖中</div>
                <div v-else="data.credentialModel.vehicleStatus == 3">汽车状态：未变卖</div>
              </div>
              <div v-if="data.credentialModel.vehicleSituation != 0">
                <div>无汽车</div>
              </div>

              <div class="share-material-clear"></div>
              <div v-if="data.credentialModel.medicalInsurance == 0">有医保</div>
              <div v-else="data.credentialModel.medicalInsurance != 0">无医保</div>

              <div v-if="data.credentialModel.sicknessInsurance == 0">有重大疾病保险</div>
              <div v-else="data.credentialModel.sicknessInsurance != 0">无重大疾病保险</div>

              <div v-if="data.credentialModel.subsistenceAllowances == 0">有低保</div>
              <div v-else="data.credentialModel.subsistenceAllowances != 0">无低保</div>

              <div v-if="data.credentialModel.bailout == 0">有政府救助</div>
              <div v-else="data.credentialModel.bailout != 0">无政府救助</div>

              <div
                v-if="data.credentialModel.income != null"
              >患者家庭年收入：{{data.credentialModel.income}}</div>
              <div
                v-else="data.credentialModel.financialAssets != null"
              >患者家庭金融资产：{{data.credentialModel.financialAssets}}</div>
            </van-col>
          </van-row>
        </van-cell-group>
      </div>
      <div
        v-if="materialShow"
        class="share-more"
        @click="moreMaterialShow = true,materialShow = false"
      >
        <span>
          查看更多信息
          <img
            src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/箭头-下.png"
            alt
          />
        </span>
      </div>
      <div v-else class="share-more" @click="moreMaterialShow = false,materialShow = true">
        <span>
          收起
          <img
            src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/箭头-上.png"
            alt
          />
        </span>
      </div>
    </div>
    <div
      class="share-dynamic"
      v-if="data.promiseDynamicModel.bloodDonationStatus != 1 || data.promiseDynamicModel.volunteerStatus != 1"
    >
      <p class="share-dynamic-title">承诺履行动态</p>
      <van-row>
        <van-col span="5">
          <span class="share-dynamic-label">{{timeData(data.promiseDynamicModel.createTime)}}</span>
        </van-col>
        <van-col span="13">
          <div class="share-dynamic-name">{{data.nickname}}</div>
          <div v-if="data.promiseDynamicModel.bloodDonationStatus != 1">
            <div class="share-dynamic-text">献血地址：{{data.promiseDynamicModel.bloodDonationAddress}}</div>
            <div class="share-dynamic-text">献血时间：{{data.promiseDynamicModel.bloodDonationTime}}</div>
            <div class="share-dynamic-text">献血量：{{data.promiseDynamicModel.bloodDonationNum}}cc</div>
            <van-image
              v-if="data.promiseDynamicModel.bloodDonationImg != ''"
              class="share-phone-img"
              fit="cover"
              :src="data.promiseDynamicModel.bloodDonationImg"
            >
              <template v-slot:error>
                <van-image
                  fit="cover"
                  src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
                ></van-image>
              </template>
            </van-image>
          </div>
          <div v-if="data.promiseDynamicModel.volunteerStatus != 1">
            <div class="share-dynamic-text">参加义工时间：{{data.promiseDynamicModel.volunteerTime}}</div>
            <div class="share-dynamic-text">参加义工内容：{{data.promiseDynamicModel.volunteerContent}}</div>
            <div class="share-dynamic-text">参加义工地址：{{data.promiseDynamicModel.volunteerAddress}}</div>
            <van-image
              v-if="data.promiseDynamicModel.volunteerImg != ''"
              class="share-phone-img"
              fit="cover"
              :src="data.promiseDynamicModel.volunteerImg"
            >
              <template v-slot:error>
                <van-image
                  fit="cover"
                  src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
                ></van-image>
              </template>
            </van-image>
          </div>
        </van-col>
        <van-col span="6">
          <span class="share-dynamic-right">发布最新动态</span>
        </van-col>
      </van-row>
    </div>
    <!-- 目前无人证明 -->
    <van-row class="share-proveNo">
      <van-col
        span="17"
        v-if="proveSize == 0"
      >此时还未有任何人帮助实名认证，请您帮助{{data.nickname}}证明情况真实，帮助患者得到更多爱心的帮助！</van-col>
      <van-col span="17" v-else>此时已有{{proveSize}}人帮助实名认证，请您帮助{{data.nickname}}证明情况真实，帮助患者得到更多爱心的帮助！</van-col>
      <van-col span="7">
        <span class="share-proveNo-btn" @click="linkProve">我也来证明</span>
      </van-col>
    </van-row>

    <div class="share-dynamic" v-if="data.fundraisingTrendsModel.length != 0">
      <p class="share-dynamic-title">筹款动态</p>
      <van-row>
        <div v-for="(item,index) in data.fundraisingTrendsModel">
          <van-col span="5">
            <span class="share-dynamic-label">{{timeData(item.createTime)}}之前</span>
          </van-col>
          <van-col span="13">
            <div class="share-dynamic-name">{{data.nickname}}</div>
            <div class="share-dynamic-text">最新治疗情况：{{item.situation}}</div>
            <van-image
              v-if="item.medicalImg != ''"
              class="share-phone-img"
              fit="cover"
              :src="item.medicalImg"
            >
              <template v-slot:error>
                <van-image
                  fit="cover"
                  src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
                ></van-image>
              </template>
            </van-image>
          </van-col>
          <van-col span="6">
            <span v-if="index == 0" class="share-dynamic-right">发布最新动态</span>
          </van-col>
          <div style="height: 5px;clear: both;"></div>
        </div>
      </van-row>
    </div>

    <!-- 求助人承诺 -->
    <div
      class="share-title"
      v-if="data.lovePromiseModel.isVolunteer != 1 || data.lovePromiseModel.isBloodDonation != 1"
      style="padding: 10px 15px;"
    >求助人承诺</div>
    <div style="padding-bottom: 15px;">
      <div class="share-title-splic" v-if="data.lovePromiseModel.isBloodDonation == 0">向社会承诺无偿献血</div>
      <div class="share-title-splic" v-if="data.lovePromiseModel.isVolunteer == 0">向社会承诺参加志愿者义工团体活动</div>
    </div>

    <!-- 有人证明 -->
    <van-row class="share-proveYes-people" v-if="moreProveData != null">
      <van-col span="18">
        已有
        <span class="share-proveYes-people-red">{{proveSize}}</span>
        人证明情况属实
      </van-col>
      <van-col span="6">
        <span class="share-proveYes-people-btn" @click="linkProve">我也来证明</span>
      </van-col>
      <van-col span="24" class="share-proveYes-people-listW">
        <van-col span="4" v-if="moreProveData.length > 0">
          <van-image round width="60px" height="60px" :src="moreProveData[0].head_url" />
        </van-col>
        <van-col span="1" v-if="moreProveData.length > 0"></van-col>
        <van-col span="4" v-if="moreProveData.length > 1">
          <van-image round width="60px" height="60px" :src="moreProveData[1].head_url" />
        </van-col>
        <van-col span="1" v-if="moreProveData.length > 1"></van-col>
        <van-col span="4" v-if="moreProveData.length > 2">
          <van-image round width="60px" height="60px" :src="moreProveData[2].head_url" />
        </van-col>
        <van-col span="1" v-if="moreProveData.length > 2"></van-col>
        <van-col span="4" v-if="moreProveData.length > 3">
          <van-image round width="60px" height="60px" :src="moreProveData[3].head_url" />
        </van-col>
        <van-col span="1" v-if="moreProveData.length > 3"></van-col>
        <van-col span="4" v-if="moreProveData.length > 4">
          <van-image round width="60px" height="60px" :src="moreProveData[4].head_url" />
        </van-col>
      </van-col>
      <van-col span="24">
        <div class="share-more" @click="linkMoreProof">
          <span>查看更多</span>
        </div>
      </van-col>
    </van-row>
    <div class="share-clear"></div>
    <van-cell-group
      v-if="moreProveData != null"
      class="share-proveYes-people-listH"
      v-for="(item,index) in moreProveData"
      :key="index"
    >
      <van-row>
        <van-col span="5">
          <van-image round width="60px" height="60px" :src="item.head_url" />
        </van-col>
        <van-col span="19">
          <div>
            <span class="share-proveYes-people-listH-name">{{item.nickname}}</span>
            <b class="share-proveYes-people-listH-icon">{{item.relation}}</b>
          </div>
          <div class="share-proveYes-people-listH-cont">{{item.content}}</div>
        </van-col>
      </van-row>
    </van-cell-group>
    <div class="share-clear"></div>

    <!-- 公共 -->
    <div class="share-textS">爱心捐赠记录</div>
    <div class="share-survey">{{data.forwardNum}}次转发/{{data.helpNum}}次帮助</div>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell-group
        v-if="thankArray != undefined"
        v-for="(item,index) in thankArray"
        :key="index"
      >
        <van-row class="share-help">
          <van-col span="4">
            <van-image
              v-if="item.is_anonymity == 0"
              class="share-help-imgIs"
              fit="cover"
              src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
            >
              <template v-slot:error>加载失败</template>
            </van-image>
            <van-image v-else class="share-help-img" fit="cover" :src="item.head_url">
              <template v-slot:error>加载失败</template>
            </van-image>
          </van-col>
          <van-col span="20">
            <div class="share-help-text">
              <span v-if="item.is_anonymity == 0" class="share-help-text-org">爱心人士</span>
              <span v-else class="share-help-text-org">{{item.nickname}}</span>帮助了
              <span class="fundraising-help-text-red">{{item.money}}</span>元
            </div>
            <p class="share-help-texts">{{item.leaving_msg}}</p>
            <div class="share-help-reply" v-if="item.thank != '' && item.thank != undefined">
              <span class="share-help-reply-name">{{data.nickname}}：</span>
              <span class="share-help-reply-text">{{item.thank}}</span>
            </div>

            <div
              class="share-help-reply"
              v-if="item.reply.length != 0"
              v-for="(itemLi,i) in item.reply"
              :key="i"
            >
              <span class="share-help-reply-name">{{data.nickname}}：</span>
              <span class="share-help-reply-text">{{itemLi}}</span>
            </div>
            <div
              class="share-help-textb"
            >{{item.love_value}}爱心值 {{timeData(item.create_time.time)}}前</div>
          </van-col>
        </van-row>
      </van-cell-group>
    </van-list>

    <van-row class="share-bottom" v-if="fundraisingStatus == 1">
      <van-col span="12" @click="shareGuideShowFun">转发</van-col>
      <van-col span="12" class="share-bottom-right" @click="linkContribution">帮助TA</van-col>
    </van-row>

    <!-- 推广 -->
    <div class="share-extension" v-if="extensionShow">
      {{currentUserName}}请您现在帮助患者！您的爱心充满正能量！
      <img
        @click="extensionShow = false,bubblingBottom='60px'"
        src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/关闭.png"
        alt
      />
    </div>

    <!-- 举报须知 -->
    <van-popup v-model="showReport" round>
      <div class="share-report">
        <p class="share-report-title">举报须知</p>
        <div class="share-report-text">
          你应保证举报的行为属于善意，真实代表你个人意愿，医群筹作为中立的平台服务者，收到你的举报后，会尽快判断并进行处理，医群筹将采取严密的措施
          保护你的个人信息，除法律规定的情形外，不会向任何第三方公开、透露你的个人信息。
        </div>
        <van-row class="share-report-bottom">
          <van-col span="12">
            <span class="share-report-bottom-btn share-report-bottom-red" @click="linkReport">确认</span>
          </van-col>
          <van-col span="12">
            <span class="share-report-bottom-btn" @click="showReport = false">取消</span>
          </van-col>
        </van-row>
      </div>
    </van-popup>

    <!-- 短信验证 -->
    
      <van-popup v-model="showCode" round :close-on-click-overlay="false">
        <div class="launch-code">
          <p class="launch-code-title">验证手机号</p>
          <van-row class="launch-code-input">
            <van-col span="24">
              <van-field :error-message="phoneError" v-model="phoneVal" placeholder="请输入您的手机号" />
            </van-col>
          </van-row>
          <van-row class="launch-code-input">
            <van-col span="16">
              <van-field v-model="codeVal" maxlength="4" placeholder="请输入验证码" />
            </van-col>
            <van-col span="8">
              <span class="launch-code-input-btn" @click="obtainCode">{{ codeText }}</span>
            </van-col>
          </van-row>
          <div class="launch-code-btn" @click="commitCode">确认</div>
        </div>
      </van-popup>
   
    <!-- 冒泡层 -->
    <div v-if="bubblingData.length != 0" class="share-bubbling" :style="{bottom:bubblingBottom}">
      <div style="position: absolute;width: 160px;" :style="{top:bubblingTop}">
        <div class="share-bubbling-li" v-for="(item,index) in bubblingData" :key="index">
          <img v-if="item.is_anonymity == 1" :src="item.head_url" alt />
          <img
            v-else
            src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
            alt
          />
          <div class="share-bubbling-li-span">
            <span v-if="item.is_anonymity == 0 " class="share-bubbling-li-span-name">爱心人士</span>
            <span class="share-bubbling-li-span-name">{{item.nickname}}</span>
            <span class="share-bubbling-li-span-money">帮助了{{item.money}}元</span>
          </div>

          <div class="share-bubbling-li" v-if="bubblingData.length > 3">
            <img v-if="bubblingData[0].is_anonymity == 1" :src="bubblingData[0].head_url" alt />
            <img
              v-else
              src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
              alt
            />
            <div class="share-bubbling-li-span">
              <span
                v-if="bubblingData[0].is_anonymity == 1"
                class="share-bubbling-li-span-name"
              >爱心人士</span>
              <span v-else class="share-bubbling-li-span-name">{{bubblingData.nickname}}</span>
              <span class="share-bubbling-li-span-money">帮助了{{bubblingData.money}}元</span>
            </div>
          </div>
          <div class="share-bubbling-li" v-if="bubblingData.length > 3">
            <img v-if="bubblingData[1].is_anonymity == 1" :src="bubblingData[1].head_url" alt />
            <img
              v-else
              src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
              alt
            />
            <div class="share-bubbling-li-span">
              <span
                v-if="bubblingData[1].is_anonymity == 1"
                class="share-bubbling-li-span-name"
              >爱心人士</span>
              <span v-else class="share-bubbling-li-span-name">{{bubblingData[1].nickname}}</span>
              <span class="share-bubbling-li-span-money">帮助了{{bubblingData[1].money}}元</span>
            </div>
          </div>
          <div class="share-bubbling-li" v-if="bubblingData.length > 3">
            <img v-if="bubblingData[2].is_anonymity == 1" :src="bubblingData[2].head_url" alt />
            <img
              v-else
              src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
              alt
            />
            <div class="share-bubbling-li-span">
              <span
                v-if="bubblingData[2].is_anonymity == 1"
                class="share-bubbling-li-span-name"
              >爱心人士</span>
              <span v-else class="share-bubbling-li-span-name">{{bubblingData[2].nickname}}</span>
              <span class="share-bubbling-li-span-money">帮助了{{bubblingData[2].money}}元</span>
            </div>
          </div>
        </div>
        <!-- <div class="share-bubbling-li" v-if="bubblingData.length > 3">
          <img v-if="bubblingData[0].is_anonymity == 1" :src="bubblingData[0].head_url" alt />
          <img
            v-else
            src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
            alt
          />
          <div class="share-bubbling-li-span">
            <span v-if="item.is_anonymity == 1" class="share-bubbling-li-span-name">爱心人士</span>
            <span v-else class="share-bubbling-li-span-name">{{bubblingData[0].nickname}}</span>
            <span class="share-bubbling-li-span-money">帮助了{{bubblingData[0].money}}元</span>
          </div>
        </div>
        <div class="share-bubbling-li" v-if="bubblingData.length > 3">
          <img v-if="bubblingData[1].is_anonymity == 1" :src="bubblingData[1].head_url" alt />
          <img
            v-else
            src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
            alt
          />
          <div class="share-bubbling-li-span">
            <span v-if="item.is_anonymity == 1" class="share-bubbling-li-span-name">爱心人士</span>
            <span v-else class="share-bubbling-li-span-name">{{bubblingData[1].nickname}}</span>
            <span class="share-bubbling-li-span-money">帮助了{{bubblingData[1].money}}元</span>
          </div>
        </div>
        <div class="share-bubbling-li" v-if="bubblingData.length > 3">
          <img v-if="bubblingData[2].is_anonymity == 1" :src="bubblingData[2].head_url" alt />
          <img
            v-else
            src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png"
            alt
          />
          <div class="share-bubbling-li-span">
            <span v-if="item.is_anonymity == 1" class="share-bubbling-li-span-name">爱心人士</span>
            <span v-else class="share-bubbling-li-span-name">{{bubblingData[2].nickname}}</span>
            <span class="share-bubbling-li-span-money">帮助了{{bubblingData[2].money}}元</span>
          </div>
       
        </div>-->
      </div>
    </div>

    <!-- 爱心保障 -->
    <van-popup v-model="showLove" round>
      <div class="share-love">
        <p class="share-love-title">爱心保障</p>
        <div class="share-love-text">1、医群筹对每一项大病求助项目提交资料进行审核。</div>
        <div class="share-love-text">2、发起的大病求助项目如果经过举报，被判定为不真实项目，医群筹会将该项目已筹资金退还给对应的爱心人士。</div>
        <div class="share-love-text">3、医群筹坚持公益初心，保障每一份爱心持续传递！</div>
        <van-row>
          <div class="share-love-bottom" @click="showLove = false">好的</div>
        </van-row>
      </div>
    </van-popup>

    <!-- 爱心保障 -->
    <van-popup v-model="showRemind" round>
      <div class="share-love">
        <p class="share-love-title">筹款说明</p>
        <div class="share-love-text">筹到多少钱打款给求助人多少钱，医群筹不收 取任何手续费用（对支付通道产生的手续费全 额补贴，最终筹款金额的0.6%）</div>
        <van-row>
          <div class="share-love-bottom" @click="showRemind = false">我知道了</div>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Cell,
  Field,
  CellGroup,
  NoticeBar,
  Image,
  Popup,
  Toast,
  List,
  ImagePreview
} from "vant";
import shareGuide from "./../components/shareGuide.vue";
import tipsCom from "./../components/tipsCom.vue";
import consultHeader from "./../components/consultHeader.vue";
export default {
  name: "share",
  data() {
    return {
      name: "",
      idCard: "",
      showCode: false,
      phoneState: false,
      phoneVal: "",
      phoneError: "", //手机号格式错误
      codeVal: "",
      codeState: true,
      codeText: "获取验证码",

      extensionShow: true,
      showReport: false,
      bubblingBottom: "150px",
      data: null,
      height: "105px",
      moreShow: true,
      //短信验证
      showCode: false, // 短信验证
      phoneVal: "",
      phoneError: "", //手机号格式错误
      codeVal: "",
      codeState: true,
      codeText: "获取验证码",
      // 从此处到短信验证是有修改的部分
      materialShow: true,
      loading: false,
      finished: false,
      numData: 0,
      thankArray: [],
      bubblingData: [],
      bubblingTop: "2rem",
      corporationDonationsList: null,
      userAdopt: false,
      yqcLoginData: null,
      userData: null,
      userId: 1,
      currentUserId: 1, //当前登录的用户ID
      moreProveData: null,
      proveSize: 0,
      moreMaterialShow: false,
      showLove: false,
      fundraisingStatus: 1, //筹款是否结束  0是 1 否
      currentUserName: "",
      showRemind: false
    };
  },
  components: {
    shareGuide,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [NoticeBar.name]: NoticeBar,
    [Image.name]: Image,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [List.name]: List,
    [ImagePreview.name]: ImagePreview
  },
  mounted() {
    this.$wx.hideOptionMenu();
    // this.userData = JSON.parse(sessionStorage.getItem('yqcUserData'));
    // this.userId = JSON.parse(sessionStorage.getItem('yqcUserData')).id;
    // this.dataFun(this.userId);
    //短信验证
    // let yqcLoginData = JSON.parse(sessionStorage.getItem("yqcLoginData"));
    // this.yqcLoginData = yqcLoginData;
    // if (JSON.parse(sessionStorage.getItem("yqcLoginData")).phone == 1) {
    //   this.showCode = true;
    // }
    // let yqcLoginData = JSON.parse(sessionStorage.getItem('yqcLoginData'));
    // if(yqcLoginData.phone == 1){
    // 	this.showCode = true
    // }
    let yqcLoginData = JSON.parse(sessionStorage.getItem("yqcLoginData"));
    this.yqcLoginData = yqcLoginData;
    if (yqcLoginData.phone == 1) {
      this.showCode = true;
    }
    //结束
    this.currentUserId = JSON.parse(sessionStorage.getItem("yqcUserData")).id;
    this.currentUserName = JSON.parse(
      sessionStorage.getItem("yqcUserData")
    ).nickname;
    //短信验证
    // let yqcLoginData = JSON.parse(sessionStorage.getItem("yqcLoginData"));
    // this.yqcUserData = JSON.parse(sessionStorage.getItem("yqcUserData"));
    // this.yqcLoginData = yqcLoginData;

    this.getMyFundraising();
    this.bubblingFun();
    this.corporationDonations();
    this.getUserIdCard();
    this.getMoreProve();
    this.getUserDonation();
    // this.onLoad(0);
  },
  methods: {
    imgpreviewFun(list, index) {
      let imgList = new Array();
      for (let i = 0; i < list.length; i++) {
        imgList.push(list[i].url);
      }
      ImagePreview({
        images: imgList,
        startPosition: index,
        onClose() {
          // do something
        }
      });
    },
    linkPhone() {
      window.location.href = "tel:400	6099595";
    },
    linkCustomer() {
      window.location.href =
        "https://webchat.yuntongxun.com/wapchat.html?accessId=9ded0ec0-15a4-11ea-ba1b-71b245892110&fromUrl=在线咨询&urlTitle=医群筹网络科技&clientId=" +
        this.currentUserId +
        '&otherParams={"nickName":"' +
        this.currentUserName +
        '"}';
      //   "https://webchat.7moor.com/wapchat.html?accessId=9ded0ec0-15a4-11ea-ba1b-71b245892110&fromUrl=在线咨询&urlTitle=医群筹网络科技&clientId=" +
      // this.currentUserId +
      // '&otherParams={"nickName":"' +
      // this.currentUserName +
      // '"}';
    },
    linkCode() {
      this.$router.push({
        path: "/share/eqCode"
      });
    },
    shareGuideShowFun() {
      this.$refs.mychild.shareGuideShowFun();
    },
    // 爱心捐赠  ---  我捐赠的记录
    getUserDonation() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url:
            "/yqc/fundraising/getUserDonation?fundraisingId=" +
            _this.$route.query.id +
            "&userId=" +
            _this.currentUserId,
          responseType: "json"
        })
        .then(function(response) {
          console.log(response);
          if (response.data.ret) {
            for (let i = 0; i < response.data.data.length; i++) {
              _this.thankArray.push(response.data.data[i]);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    linkLaunch() {
      this.$router.push({
        path: "/launch"
      });
    },
    // 帮助  ---   捐款  /share/contribution
    linkContribution() {
      // <van-image round width="50px" height="50px" :src="data.headUrl" />
      // <span class="share-hide-name">{{data.nickname}}</span>
      // {{data.helpNote}}
      let _this = this;
      _this.$router.push({
        path: "/share/contribution",
        query: {
          id: _this.$route.query.id,
          headUrl: _this.data.headUrl,
          nickname: _this.data.nickname
        }
      });
    },
    //获取信息f

    //结束
    // 获取证明人信息
    getMoreProve() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url:
            "/yqc/user/getMoreProve?fundraisingId=" +
            _this.$route.query.id +
            "&pageSize=25&pageNum=0",
          responseType: "json"
        })
        .then(function(response) {
          if (response.data.ret) {
            _this.moreProveData = response.data.data.list;
            _this.proveSize = response.data.data.size;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    linkMoreProof() {
      let _this = this;
      _this.$router.push({
        path: "/share/moreProof",
        query: {
          nickname: _this.data.nickname,
          headUrl: _this.data.headUrl,
          id: _this.$route.query.id,
          currentUserId: _this.currentUserId,
          patientName: _this.data.patientName,
          userId: _this.$route.query.userId,
          userAdopt: _this.userAdopt
        }
      });
    },
    // 获取当前用户是否身份验证通过
    getUserIdCard() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/yqc/user/getUserIdCard?userId=" + _this.currentUserId,
          responseType: "json"
        })
        .then(function(response) {
          if (response.data.ret) {
            _this.userAdopt = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 跳转证明页面
    linkProve() {
      let _this = this;
      if (_this.userAdopt) {
        _this.$router.push({
          path: "/share/proveTwo",
          query: {
            id: _this.$route.query.id,
            currentUserId: _this.currentUserId,
            patientName: _this.data.patientName,
            userId: _this.$route.query.userId,
            several: 1
          }
        });
      } else {
        _this.$router.push({
          path: "/share/proveOne",
          query: {
            id: _this.$route.query.id,
            userId: _this.$route.query.userId,
            currentUserId: _this.currentUserId,
            patientName: _this.data.patientName,
            source: 1,
            several: 2
          }
        });
      }
    },
    // 跳转到举报页面
    linkReport() {
      let _this = this;
      this.showReport = false;
      if (_this.userAdopt) {
        _this.$router.push({
          path: "/share/report",
          query: {
            id: _this.$route.query.id,
            currentUserId: _this.currentUserId,
            userId: _this.$route.query.userId,
            several: 1
          }
        });
      } else {
        _this.$router.push({
          path: "/share/proveOne",
          query: {
            id: _this.$route.query.id,
            userId: _this.$route.query.userId,
            currentUserId: _this.currentUserId,
            patientName: _this.data.patientName,
            source: 0,
            several: 2
          }
        });
      }
    },
    // 获取企业捐款
    corporationDonations() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url:
            "/yqc/donation/corporationDonations?fundraisingId=" +
            _this.$route.query.id,
          responseType: "json"
        })
        .then(function(response) {
          if (response.data.ret) {
            _this.corporationDonationsList = response.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 冒泡数据
    bubblingFun() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url:
            "/yqc/fundraising/getMoreDonation?fundraisingId=" +
            _this.$route.query.id +
            "&pageSize=10&pageNum=0",
          responseType: "json"
        })
        .then(function(response) {
          if (response.data.ret) {
            _this.bubblingData = response.data.data.list;
            console.log(1);

            _this.bubblingPosition();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    bubblingPosition() {
      console.log(this.bubblingData);
      let _this = this,
        topNum = 0;
      if (_this.bubblingData.length == 1) {
        _this.bubblingTop = "2rem";
      } else if (_this.bubblingData.length == 2) {
        _this.bubblingTop = "1rem";
      } else if (_this.bubblingData.length == 3) {
        _this.bubblingTop = "0rem";
      } else {
        _this.bubblingTop = "0rem";
        let num = 0,
          interval;
        setInterval(() => {
          if (num % 3 == 0) {
            if (topNum > -(1 * _this.bubblingData.length)) {
              interval = setInterval(function() {
                topNum -= 0.1;
                _this.bubblingTop = topNum + "rem";
              }, 100);
            } else {
              topNum = 0;
              interval = setInterval(function() {
                topNum -= 0.1;
                _this.bubblingTop = topNum + "rem";
              }, 100);
            }
          } else {
            clearInterval(interval);
          }
          num += 1;
          // _this.bubblingTop = topNum+'px';
        }, 1100);
      }
    },
    onLoad(num) {
      // 异步更新数据
      let _this = this;
      if (num == 0) {
        _this.numData = 0;
        _this.thankArray = [];
        _this.finished = false;
      }
      setTimeout(() => {
        _this
          .$axios({
            method: "post",
            url:
              "/yqc/fundraising/getMoreDonation?fundraisingId=" +
              _this.$route.query.id +
              "&pageSize=25&pageNum=" +
              _this.numData,
            responseType: "json"
          })
          .then(function(response) {
            if (response.data.ret) {
              _this.numData += 1;
              for (let i = 0; i < response.data.data.list.length; i++) {
                if (_this.currentUserId != response.data.data.list[i].user_id) {
                  _this.thankArray.push(response.data.data.list[i]);
                }
              }
              // 加载状态结束
              _this.loading = false;

              // 数据全部加载完成
              if (_this.thankArray.length >= response.data.data.size) {
                _this.finished = true;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }, 500);
    },
    timeData(time) {
      let cha = Math.ceil((new Date().getTime() - time) / 60000);
      if (parseInt(cha / (60 * 24)) > 0) {
        return parseInt(cha / (60 * 24)) + "天";
      } else {
        if (parseInt((cha % (24 * 60)) / 60) > 0) {
          return parseInt((cha % (24 * 60)) / 60) + "小时";
        } else {
          return ((cha % (24 * 60)) % 60) + "分钟";
        }
      }
    },
    // 获取我的筹款信息
    getMyFundraising() {
      let _this = this;
      const toast = Toast.loading({
        forbidClick: false
      });
      _this
        .$axios({
          method: "post",
          url:
            "/yqc/fundraising/getMyFundraising?fundraisingId=" +
            _this.$route.query.id,
          responseType: "json"
        })
        .then(function(response) {
          console.log(response);
          if (response.data.ret) {
            let data = response.data.data;
            data.seekHelpImage = JSON.parse(response.data.data.seekHelpImage);
            _this.fundraisingStatus = data.fundraisingStatus;
            _this.data = data;
            if (
              data.userId ==
              JSON.parse(sessionStorage.getItem("yqcUserData")).id
            ) {
              _this.$router.replace({
                path: "/fundraising",
                query: {
                  id: _this.$route.query.id
                }
              });
            }
            _this.wxShareFun(
              window.location.href,
              data.fundraisingTitle,
              data.helpNote,
              data.seekHelpImage[data.seekHelpImage.length - 1].url,
              _this.$route.query.id
            );
            _this.$wx.showOptionMenu();
            if (data.fundraisingStatus == 0) {
              _this.$wx.hideOptionMenu();
            }
            if (
              data.credentialModel.identityAudit == 1 &&
              data.credentialModel.diseaseAudit == 1 &&
              data.credentialModel.payeeAudit == 1
            ) {
              _this.moreMaterialShow = true;
              _this.materialShow = false;
            }
            toast.clear();
          } else {
            Toast.fail(response.data.msg);
          }
        })
        .catch(function(error) {
          Toast.fail("筹款不存在！！");
          console.log(error);
        });
    },

    //结束
    obtainCode() {
      // 获取验证码
      let _this = this;
      if (_this.codeState) {
        _this.codeState = false;
        _this.countdown();
      } else {
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(_this.phoneVal)) {
        _this.phoneState = false;
        _this.phoneError = "手机号格式错误";
      } else {
        _this.phoneState = true;
        _this.phoneError = "";
        // 获取验证码
        _this
          .$axios({
            method: "post",
            url: "/yqc/user/sendSMS?phone=" + _this.phoneVal,
            responseType: "json"
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      // codeState =
    },
    // 短信验证  --  登录
    commitCode() {
      let _this = this;
      if (_this.codeVal.length == 4) {
        _this
          .$axios({
            method: "post",
            url:
              "/yqc/user/verificationCode?phone=" +
              _this.phoneVal +
              "&code=" +
              _this.codeVal +
              "&userId=" +
              JSON.parse(sessionStorage.getItem("yqcUserData")).id,
            responseType: "json"
          })
          .then(function(response) {
            console.log(response);
            if (response.data.ret) {
              _this.showCode = false;
            } else {
              Toast(response.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Toast("您还未填写手机号或验证码！！");
      }
    },
    countdown() {
      // 倒计时
      let num = 59,
        _this = this;
      let setIn = setInterval(function() {
        _this.codeText = num + "S";
        num--;
        if (num < 0) {
          clearInterval(setIn);
          _this.codeState = true;
          _this.codeText = "获取验证码";
        }
      }, 1000);
    },
    submitFun() {
      let _this = this;
      if (_this.name == "") {
        Toast("您还未填写您的姓名！");
        return false;
      }

      if (_this.idCard == "") {
        Toast("您还未填写您的身份证号！");
        return false;
      }

      _this
        .$axios({
          method: "post",
          url:
            "/yqc/user/idCardVerification?name=" +
            _this.name +
            "&idCard=" +
            _this.idCard +
            "&userId=" +
            _this.$route.query.currentUserId,
          responseType: "json"
        })
        .then(function(response) {
          console.log(response);
          if (response.data.ret) {
            Toast.success("身份验证成功");
            // source  0  举报   1  证明
            if (_this.$route.query.source == 0) {
              _this.$router.push({
                path: "/share/report",
                query: {
                  id: _this.$route.query.id,
                  userId: _this.$route.query.userId,
                  currentUserId: _this.$route.query.currentUserId,
                  patientName: _this.$route.query.patientName,
                  source: 0,
                  several: 2
                }
              });
            } else if (_this.$route.query.source == 1) {
              _this.$router.push({
                path: "/share/proveTwo",
                query: {
                  id: _this.$route.query.id,
                  userId: _this.$route.query.userId,
                  currentUserId: _this.$route.query.currentUserId,
                  patientName: _this.$route.query.patientName,
                  source: 1,
                  several: 2
                }
              });
            }
          } else {
            Toast.fail(response.data.msg);
          }
        })
        .catch(function(error) {
          Toast.fail("服务器异常！！");
          console.log(error);
        });
    },
    obtainCode() {
      // 获取验证码
      let _this = this;
      if (_this.codeState) {
        _this.codeState = false;
        _this.countdown();
      } else {
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(_this.phoneVal)) {
        _this.phoneState = false;
        _this.phoneError = "手机号格式错误";
      } else {
        _this.phoneState = true;
        _this.phoneError = "";
        // 获取验证码
        _this
          .$axios({
            method: "post",
            url: "/yqc/user/sendSMS?phone=" + _this.phoneVal,
            responseType: "json"
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      // codeState =
    },
    // 短信验证  --  登录
    commitCode() {
      let _this = this;
      if (_this.codeVal.length == 4) {
        _this
          .$axios({
            method: "post",
            url:
              "/yqc/user/verificationCode?phone=" +
              _this.phoneVal +
              "&code=" +
              _this.codeVal +
              "&userId=" +
              JSON.parse(sessionStorage.getItem("yqcUserData")).id,
            responseType: "json"
          })
          .then(function(response) {
            console.log(response);
            if (response.data.ret) {
              _this.showCode = false;
            } else {
              Toast(response.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Toast("您还未填写手机号或验证码！！");
      }
    },
    countdown() {
      // 倒计时
      let num = 59,
        _this = this;
      let setIn = setInterval(function() {
        _this.codeText = num + "S";
        num--;
        if (num < 0) {
          clearInterval(setIn);
          _this.codeState = true;
          _this.codeText = "获取验证码";
        }
      }, 1000);
    }
  }
};
</script>

<style scoped lang="less">
.share {
  font-size: 16px;
  padding: 105px 0 60px 0;
  &-love {
    width: 290px;
    padding: 0 15px;
    position: relative;
    &-title {
      text-align: center;
      font-size: 17px;
    }
    &-text {
      font-size: 14px;
      text-align: justify;
      line-height: 25px;
    }
    &-bottom {
      font-size: 16px;
      width: 100px;
      height: 38px;
      text-align: center;
      line-height: 38px;
      color: #fff;
      background: #ff5a5a;
      border-radius: 38px;
      margin: 35px auto 20px;
    }
  }
  &-dynamic {
    padding: 0 15px;
    &-title {
      font-size: 16px;
    }
    &-label {
      font-size: 12px;
      color: #666666;
      background: #f7f7f7;
      padding: 2px 4px;
      border-radius: 5px;
    }
    &-name {
      font-size: 14px;
      color: #ff5a5a;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 25px;
    }
    &-right {
      font-size: 14px;
      line-height: 25px;
    }
    &-text {
      font-size: 14px;
      line-height: 25px;
    }
  }
  &-report {
    width: 290px;
    height: 310px;
    padding: 0 15px;
    position: relative;
    &-title {
      text-align: center;
      font-size: 17px;
    }
    &-text {
      font-size: 14px;
      text-align: center;
      line-height: 25px;
    }
    &-bottom {
      position: absolute;
      bottom: 15px;
      width: 290px;
      &-btn {
        margin: 0 auto;
        height: 38px;
        width: 100px;
        text-align: center;
        display: block;
        line-height: 38px;
        border-radius: 38px;
        font-size: 16px;
        border: 1px solid #ff5a5a;
        color: #ff5a5a;
      }
      &-red {
        background: #ff5a5a;
        color: #fff;
      }
    }
  }
  &-extension {
    width: 335px;
    padding: 15px 25px;
    background: #ff5a5a;
    position: fixed;
    bottom: 65px;
    left: 20px;
    font-size: 15px;
    color: #fff;
    z-index: 1000;
    box-sizing: border-box;
    img {
      position: absolute;
      width: 19px;
      height: 19px;
      top: 5px;
      right: 5px;
    }
  }
  &-bubbling {
    width: 160px;
    height: 3rem;
    position: fixed;
    left: 15px;
    overflow: hidden;
    z-index: 1000;
    &-li {
      background: #fe672e;
      border-radius: 27.5px;
      width: 160px;
      overflow: hidden;
      height: 27.5px;
      font-size: 13px;
      color: #fff;
      margin-bottom: 10px;
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin: 1px 3px 1px 0;
        float: left;
        background: #fff;
      }
      &-span {
        padding: 5px 0;
        float: left;
        font-size: 13px;
        &-name {
          display: inline-block;
          max-width: 45px;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &-money {
          display: inline-block;
          max-width: 80px;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  &-bottom {
    height: 50px;
    width: 375px;
    position: fixed;
    bottom: 0;
    text-align: center;
    line-height: 50px;
    color: #ff5a5a;
    z-index: 1000;
    background: #fff;
    // box-shadow: 10px 10px 15px #000;
    font-size: 18px;
    box-shadow: 0px -1px 12px 1px rgba(34, 23, 20, 0.22);
    &-right {
      background: #ff5a5a;
      color: #fff;
    }
    &-blur {
      background: #dddddd;
      color: #666;
    }
  }
  &-help {
    padding: 15px;
    &-img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      overflow: hidden;
      vertical-align: top;
      margin-top: 12px;
    }
    &-imgIs {
      border-radius: 5px;
      overflow: hidden;
      vertical-align: top;
      margin-top: 12px;
    }
    &-text {
      font-size: 14px;
      margin-left: 5px;
      vertical-align: middle;
      &-org {
        color: #fe672e;
        display: inline-block;
        max-width: 150px;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-red {
        vertical-align: middle;
        color: #ff5a5a;
      }
    }
    &-texts {
      margin-left: 5px;
      font-size: 13px;
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
    }
    &-textb {
      margin-left: 5px;
      font-size: 13px;
      color: #999999;
      span {
        float: right;
        font-size: 15px;
      }
    }
    &-reply {
      background: #f7f7f7;
      padding: 15px;
      font-size: 13px;
      margin-bottom: 10px;
      line-height: 20px;
      &-name {
        color: #ff5a5a;
      }
    }
  }
  &-survey {
    width: 345px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 5px;
    background: #f7f7f7;
    margin: 0 auto;
    color: #ff5a5a;
  }
  &-textS {
    padding: 10px 15px;
    font-size: 16px;
  }
  &-proveYes {
    &-people {
      padding: 0 15px;
      font-size: 17px;
      &-red {
        color: #ff5a5a;
      }
      &-btn {
        width: 70px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        font-size: 12px;
        background: #ff5a5a;
        color: #fff;
        border-radius: 5px;
        float: right;
      }
      &-listW {
        padding: 15px 0;
      }
      &-listH {
        padding: 15px;
        &-name {
          font-size: 15px;
          color: #666666;
          display: inline-block;
          max-width: 150px;
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &-icon {
          font-size: 12px;
          display: inline-block;
          padding: 1px 7.5px;
          background: #ff5a5a;
          color: #fff;
          font-weight: 400;
          border-radius: 5px;
        }
        &-cont {
          font-size: 16px;
          margin-top: 10px;
        }
      }
    }
  }
  &-proveNo {
    padding: 0 15px;
    font-size: 13px;
    color: #666666;
    text-align: justify;
    &-btn {
      font-size: 14px;
      color: #ff5a5a;
      border-radius: 31px;
      padding: 5px 0;
      border: 1px solid #ff5a5a;
      width: 85px;
      float: right;
      text-align: center;
    }
  }
  &-material {
    width: 315px;
    padding: 0 15px;
    background: #f7f7f7;
    margin: 15px auto;
    border-radius: 5px;
    b {
      font-size: 16px;
      font-weight: 400;
    }
    &-name {
      color: #666666;
      font-size: 16px;
    }
    &-list {
      padding: 15px 0;
    }
    &-li {
      img {
        width: 14px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
      }
      span {
        font-size: 14px;
        color: #74c929;
        display: inline-block;
        vertical-align: middle;
      }
    }
    &-text {
      font-size: 14px;
      line-height: 25px;
    }
    &-clear {
      height: 10px;
    }
  }
  &-contact {
    width: 375px;
    min-height: 133px;
    background-image: url(https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/ferf.png);
    // background: url(https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/ferf.png) 100% 100% no-repeat;
    background-repeat: no-repeat;
    background-size: 100%;
    &-logo {
      display: block;
      width: 54px;
      height: 56px;
      margin: 15px 0 0 15px;
    }
    &-title {
      font-size: 16px;
      margin-top: 25px;
    }
    &-btn {
      font-size: 12px;
      color: #fff;
      display: inline-block;
      padding: 0px 5px;
      border-radius: 2px;
      background: #d6000f;
      margin-top: 25px;
    }
    &-text {
      font-size: 12px;
      margin: 5px 0 0 10px;
    }
    &-eCode {
      display: block;
      width: 60px;
      height: 60px;
      float: right;
      margin: 15px 15px 0 0;
    }
    &-icon {
      width: 100%;
      padding: 5px 0;
      text-align: center;
      margin-top: 15px;
      img {
        width: 22px;
        height: 22px;
        display: inline-block;
        vertical-align: middle;
      }
      span {
        font-size: 14px;
        font-weight: bold;
        margin-left: 5px;
      }
    }
    &-iconLeft {
      border-right: 1px solid #d2d2d2;
    }
  }
  &-text {
    padding: 0 15px;
    font-size: 13px;
    color: #666666;
  }
  &-phone {
    padding: 15px;
    &-img {
      width: 82px;
      height: 82px;
      border-radius: 5px;
      overflow: hidden;
    }
  }
  &-more {
    // width: 375px;
    padding: 10px 0;
    // height: auto;
    clear: both;
    text-align: center;
    span {
      font-size: 14px;
      color: #ff5a5a;
      display: inline-block;
      margin: 0 auto;
      img {
        display: inline-block;
        width: 10px;
        height: 6px;
        margin-left: 5px;
      }
    }
  }
  &-explain {
    // height: 105px;
    padding: 0 15px;
    font-size: 14px;
    text-align: justify;
    overflow: hidden;
    // text-overflow:ellipsis;
    // white-space: nowrap;
  }
  &-tips {
    font-size: 14px;
    padding: 0 40px;
    margin: 15px 0;
    background-image: url(https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/launch/感叹.png);
    background-size: 19px 19px;
    background-repeat: no-repeat;
    background-position: 15px 50%;
  }
  &-helpS {
    height: 180px;
    padding: 0.1px;
    background: #ff5a5a;
    &-tabs {
      margin-top: 40px;
      &-li {
        text-align: center;
        border-right: 1px solid #f4d5d5;
        p {
          margin-block-start: 0.2em;
          margin-block-end: 0.5em;
          font-size: 19px;
          color: #ff5a5a;
        }
        p:last-of-type {
          font-size: 13px;
          color: #666666;
          margin-block-start: 0.5em;
          margin-block-end: 0.2em;
        }
      }
      &-last {
        border: none;
      }
    }
  }
  &-title {
    padding: 0 15px;
    font-size: 20px;
    font-weight: 800;
    &-right {
      float: right;
      font-size: 15px;
      color: #ff5a5a;
      font-weight: 400;
      text-decoration: underline;
    }
    &-splic {
      padding: 0 15px;
      line-height: 25px;
      font-size: 15px;
      color: #ff5a5a;
      font-weight: bold;
    }
  }
  &-hide {
    padding: 15px 15px 0 15px;
    &-name {
      font-size: 18px;
      vertical-align: top;
      line-height: 50px;
      margin-left: 5px;
    }
    &-btn {
      width: 60px;
      height: 22px;
      font-size: 12px;
      text-align: center;
      line-height: 22px;
      border-radius: 5px;
      background: #ff5a5a;
      color: #fff;
      float: right;
      margin-top: 15px;
    }
  }
  &-clear {
    height: 10px;
    background: #f7f7f7;
  }
  &-nav {
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 1000;
    width: 375px;
    height: 105px;
  }
  &-header {
    padding: 15px;
    img {
      width: 105px;
      height: 30px;
    }
    &-btn {
      float: right;
      width: 100px;
      border-radius: 35px;
      text-align: center;
      padding: 6px 0;
      background: #ff5a5a;
      color: #fff;
      font-size: 14px;
    }
  }
  &-notice {
    span {
      display: inline-block;
      vertical-align: middle;
    }
    img {
      width: 19px;
      height: 16.5px;
      vertical-align: middle;
    }
  }
}

//短信
.launch {
  font-size: 16px;

  &-code {
    width: 320px;

    &-title {
      text-align: center;
      font-size: 17px;
      padding: 0 15px;
    }

    &-input {
      width: 290px;
      margin: 0 auto 15px;
      border-radius: 5px;
      border: 1px solid #d2d2d2;

      &-btn {
        display: block;
        width: 100%;
        height: 44px;
        font-size: 14px;
        color: #ff5a5a;
        line-height: 44px;
        border-left: 1px solid #d2d2d2;
        text-align: center;
      }
    }

    &-btn {
      width: 100px;
      background: #ff5a5a;
      height: 35px;
      border-radius: 35px;
      text-align: center;
      line-height: 35px;
      color: #fff;
      margin: 20px auto;
    }
  }

  &-fill {
    width: 320px;

    // height: 360px;
    &-nav {
      padding: 0 15px;

      div {
        font-size: 13px;
        line-height: 20px;
      }
    }

    &-title {
      text-align: center;
      font-size: 17px;
      padding: 0 15px;
    }

    &-tips {
      font-size: 14px;
      font-weight: bold;
      padding: 0 15px 15px 15px;
    }

    &-text {
      font-size: 13px;
    }

    &-btn {
      width: 100px;
      background: #ff5a5a;
      height: 35px;
      border-radius: 35px;
      text-align: center;
      line-height: 35px;
      color: #fff;
      margin: 20px auto;
    }
  }

  &-button {
    &-bottom {
      width: 100vw;
      height: 50px;
      line-height: 50px;
      background: #ff5a5a;
      position: fixed;
      bottom: 0;
      text-align: center;
      color: #fff;
      font-size: 18px;
    }

    &-placing {
      background: #ddd;
      color: #666;
    }
  }

  &-back {
    width: 90vw;
    background: #f7f7f7;
    margin: 0 auto;
    padding: 5px 0;
    border-radius: 5px;
  }

  &-text {
    font-size: 14px;
    color: #999999;
    padding: 5px 15px;
    line-height: 20px;
  }

  &-imgLoader {
    padding: 15px;
  }

  &-title {
    padding: 15px;
    vertical-align: bottom;

    &-main {
      font-size: 20px;
      font-weight: 900;
    }

    &-vice {
      font-size: 15px;
      margin-top: 5px;
      font-weight: 500;
      color: #ff5a5a;
      text-decoration: underline;
    }

    &-text {
      font-size: 15px;
      margin-top: 5px;
    }

    &-agreement {
      font-size: 12px;
      color: #666666;

      &-red {
        color: #ff5a5a;
        text-decoration: underline;
      }
    }
  }
}
</style>
<style>
.share .van-cell-group {
  background: rgba(0, 0, 0, 0);
}
.share .van-popup--center.van-popup--round {
  border-radius: 5px;
}
</style>
