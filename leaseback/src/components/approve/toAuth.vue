<template>
  <div class="personal">
    <header class="fixheader">
      <a href="javascript:history.go(-1);">
        <img src="../../../static/img/backbtn.png" alt="">
      </a>
      <span>个人信息认证</span>
    </header>
    <div class="scrollmain">
      <div class="certify mainContent">
      请您确保填写的资料真实有效，以免影响您的审核
    </div>
      <ul class="userIfo">
      <li @click="showPicker2">
        <img src="../../../static/img/education.png" alt="">
        <input placeholder="学历信息"  v-model="params.education" id="education" onfocus="this.blur();">
        <img src="../../../static/img/go.png" alt="" class="choose">
      </li>
      <li @click="showPicker1" >
        <img src="../../../static/img/merry.png" alt="">
        <input placeholder="婚姻状况" v-model="marriage" id="marry" onfocus="this.blur();">
        <img src="../../../static/img/go.png" alt="" class="choose">
      </li>
      <li>
        <img src="../../../static/img/QQ2.png" alt="">
        <input placeholder="请填写您常用QQ" v-model="params.qq" @blur.prevent="writeEmail()">
      </li>
      <li>
        <img src="../../../static/img/e-mail.png" alt="">
        <input placeholder="请填写您常用有效电子邮箱" v-model="params.email" style="width: 80%">
      </li>
      <li>
        <img src="../../../static/img/wechat.png" alt="">
        <input placeholder="请填写您个人微信号码" v-model="params.weixin">
      </li>


      <li style="border-top:10px solid #eee;">
        <img src="../../../static/img/workspace.png" alt="">
        <input placeholder="请填写工作单位名称" v-model="params.workUnitName" >
      </li>
      <li  @click="showPicker3" >
        <img src="../../../static/img/unitProperty.png" alt="">
        <input placeholder="请选择单位性质"v-model="params.unitProperty" id="unitProperty" onfocus="this.blur();">
        <img src="../../../static/img/go.png" alt="" class="choose">
      </li>
      <li @click="showPicker4">
        <img src="../../../static/img/workPost.png" alt="">
        <input placeholder="请选择职务"  v-model="params.workPost" id="workPost" onfocus="this.blur();">
        <img src="../../../static/img/go.png" alt="" class="choose">
      </li>
      <li>
        <img src="../../../static/img/monthlyIncome.png" alt="">
        <input type="number" placeholder="请输入您的月收入"  v-model="params.monthlyIncome" style="width: 70%" >
      </li>
      <li style="border-top:10px solid #eee;" >
        <img src="../../../static/img/address1.png" alt="">
        <input @click="showPicker" style="width: 75%;"  placeholder="请选择单位地址省/市/区" v-model="workProvince" id="province" onfocus="this.blur();">
        <img src="../../../static/img/go.png" alt="" class="choose">
        <div>
          <transition name="fade">
            <div class="mask"  v-show="showChose" @click="closeAdd()"></div>
          </transition>
          <transition name="slide">
            <div class="showChose" v-show="showChose">
              <div class="address">
                <div class="title">
                  <h4>
                    单位地址
                    <span @click="closeAdd()" class="close">×</span>
                  </h4>
                  <div>
                    <div class="area" @click="provinceSelected()">{{Province}}</div>
                    <div class="area" @click="citySelected()" >{{City?City:'请选择'}}</div>
                    <div class="area" @click="districtSelected()"  v-show="City">{{District?District:'请选择'}}</div>
                  </div>
                </div>
                <ul style="padding-top: 56px">
                  <li class="addList" v-for="v in info" @click="getProvinceId(v.id,v.regionName)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.regionName}}</li>
                  <li class="addList" v-for="v in showCityList" @click="getCityId(v.id,v.regionName)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.regionName}}</li>
                  <li class="addList" v-for="v in showDistrictList" @click="getDistrictId(v.id,v.regionName)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.regionName}}</li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </li>
      <li>
        <img src="../../../static/img/address.png" alt="">
        <input placeholder="现工作单位详细地址及门牌号" v-model="params.workAddress" style="width: 80%" >
      </li>
    </ul>
     <div class="apply">
      <button @click="next" :disable = "disable">下一步<spinner type="crescent" style="position: relative;top: -2px;fill:#fff;stroke:#fff" v-show="disable"></spinner></button>
    </div>
    <awesome-picker
      ref="picker1"
      :textTitle="picker1.textTitle"
      :data="picker1.data"
      :anchor="picker1.anchor"
      @confirm="handlePicker1Confirm">
    </awesome-picker>
    <awesome-picker
      ref="picker2"
      :textTitle="picker2.textTitle"
      :data="picker2.data"
      :anchor="picker2.anchor"
      @confirm="handlePicker2Confirm">
    </awesome-picker>
    <awesome-picker
      ref="picker3"
      :textTitle="picker3.textTitle"
      :data="picker3.data"
      :anchor="picker3.anchor"
      @confirm="handlePicker3Confirm">
    </awesome-picker>
    <awesome-picker
      ref="picker4"
      :textTitle="picker4.textTitle"
      :data="picker4.data"
      :anchor="picker4.anchor"
      @confirm="handlePicker4Confirm">
    </awesome-picker>
</div>
  </div>
</template>
<script>
  import {inputFocus} from '../../../static/range.js'
  $('#marry,#province').focus(function(){
    document.activeElement.blur();

  });
//  import areaData from '../../../static/picker/area.js'
  const dataMarry = ['已婚', '未婚','离异'];
  const dataEducation = ['初中及以下', '高中','专科','本科','研究生及以上'];
  const dataUnitProperty = ['机关/事业单位', '社会团体','国有企业','	大型股份制企业','民营企业','个体工商户'];
  const dataWorkPost= ['股东/法人代表', '企业高管/副处级以上干部','中层管理岗','组长/领班等基层管理岗','专业技术人员','普通员工'];
  export default{
    data(){
      return{
        params:{
          qq:'',
          email:'',
          weixin:'',
          workUnitName:'',
          workProvinceId:'',
          workCityId:'',
          workCountryId:'',
          workAddress:'',
          marriageStatus:'',
          education:'',
          unitProperty:'',
          workPost:'',
          monthlyIncome:''
        },
        marriage:'',
        workProvince:'',

        disable:false,
        showChose: false,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showCityList: false,
        showDistrictList: false,
        District: '',
        Province: '',
        City: '',
        // v-for循环判断是否为当前
        selected: false,
        info: [],

//          picker4: {
//            anchor: [],
//            textTitle: '区域选择器',
//            data: areaData
//          },
        picker1: {
          marry: [],
          textTitle: '婚姻状况',
          data: [dataMarry]
        },
        picker2: {
          anchor: [],
          textTitle: '学历',
          data: [dataEducation]
        },
        picker3: {
          anchor: [],
          textTitle: '单位性质',
          data: [dataUnitProperty]
        },
        picker4: {
          anchor: [],
          textTitle: '职务',
          data: [dataWorkPost]
        }
      }
    },
    methods:{
//        婚姻状况
      showPicker1 () {
        this.$refs.picker1.show()
      },
      handlePicker1Confirm (v) {
        this.picker1.marriage = v;
        let a=eval(JSON.stringify(v));
        this.marriage = v ? a[0].value : null;
      },
//        学历选择
      showPicker2 () {
        this.$refs.picker2.show()
      },
      handlePicker2Confirm (v) {
        this.picker2.anchor = v;
        let a=eval(JSON.stringify(v));
        this.params.education = v ? a[0].value : null;
      },
      //单位性质
      showPicker3 () {
        this.$refs.picker3.show()
      },
      handlePicker3Confirm (v) {
        this.picker3.anchor = v;
        let a=eval(JSON.stringify(v));
        this.params.unitProperty = v ? a[0].value : null;
      },
      //职务
      showPicker4 () {
        this.$refs.picker4.show()
      },
      handlePicker4Confirm (v) {
        this.picker4.anchor = v;
        let a=eval(JSON.stringify(v));
        this.params.workPost = v ? a[0].value : null;
      },
      writeEmail(){
        this.params.email=this.params.qq+'@qq.com'
      },
//        下一步
      next(){
        const vm=this;
        if(vm.marriage=='已婚'){
          vm.params.marriageStatus="Y"
        }else if(vm.marriage=='未婚'){
          vm.params.marriageStatus="N"
        }else if(vm.marriage=='离异'){
          vm.params.marriageStatus="D"
        }
//          验证qq号
        var regqq = /^[1-9]\d{4,12}$/;
//          验证邮箱
//        var regemail=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        var regemail=/^\w+@\w+(\.\w+)+$/;
        //金额判断
        var regmoney= /^[1-9]{1}\d{0,8}(\.\d{1,3})?$/;
        if(vm.params.education==''){
          vm.$toast("请选择学历信息");
          return false;
        }
        if(vm.params.marriageStatus==''){
          vm.$toast("请选择婚姻状态");
          return false;
        }
        if( vm.params.qq=='' || !regqq.test(vm.params.qq)){
          vm.$toast("请检查您的qq号");
          return false;
        }
        if( vm.params.email=='' || !regemail.test(vm.params.email)){
          vm.$toast("请检查您的邮箱");
          return false;
        }

        if(vm.params.weixin==''){
          vm.$toast("请输入微信号");
          return false;
        }
        if(vm.params.workUnitName==''){
          vm.$toast("请填写工作单位");
          return false;
        }
        if(vm.params.unitProperty==''){
          vm.$toast("请选择单位性质");
          return false;
        }
        if(vm.params.workPost==''){
          vm.$toast("请选择您在单位的职务");
          return false;
        }
        if(vm.params.monthlyIncome=='' || !regmoney.test(vm.params.monthlyIncome)){
          vm.$toast("请检查您的收入");
          return false;
        }
        if(vm.workProvince==''){
          vm.$toast("请选择工作地址");
          return false;
        }
        if(vm.params.workAddress==''){
          vm.$toast("请填写工作单位详细地址");
          return false;
        }
        else{
          vm.disable = true
          vm.$http.post('../api/user/auth/userInfo',this.params).then(function (res) {
            if(res.data.code==0){
              vm.disable = false
              vm.$toast("个人信息认证成功");
              setTimeout(function () {
                vm.$router.push({path: '/approve'})
              }, 3000);
            }

            else{
              vm.disable = false
              if(res.data.msg){
                vm.$toast(res.data.msg);
              }
              else{
                vm.disable = false
                vm.$toast("啊哦,断网了，请稍后再试");
              }

            }
          },function () {
            vm.disable = false
            vm.$toast("啊哦,断网了，请稍后再试");
          })
        }


      },
      showPicker(){
        this.showChose = true
        this.$http.post('../api/user/auth/selectAreas',{parentId:1}).then(function (res) {
          if(res.data.code==0){
            this.info=res.data.data;
          }
        })
      },

      closeAdd: function() {
        this.showChose = false;
      },

      getProvinceId: function(id,name) {
        this.$http.post('../api/user/auth/selectAreas',{parentId:id}).then(function (res) {
          if (res.data.code == 0) {
            this.showCityList = res.data.data;
          }
        })
        this.province = id;
        this.Province = name;
        this.params.workProvinceId=id;
        this.showProvince=false;
        this.showCity=true;
        this.showDistrict = false;
      },
      provinceSelected: function() {
        // 清除市级和区级列表
        this.showCityList = false;
        this.showDistrictList = false;
        // 清除市级和区级选项
        this.City = false;
        this.District = false;
        // 选项页面的切换
        this.showProvince = true;
        this.showCity = false;
        this.showDistrict = false;
      },
      getCityId: function(id, name) {
        this.city = id;
        this.City = name;
        this.params.workCityId=id;
        console.log(id);
        this.$http.post('../api/user/auth/selectAreas',{parentId:id}).then(function (res) {
          if (res.data.code == 0) {
            this.showDistrictList = res.data.data;
          }
        })
        this.showProvince=false;
        this.showCity=false;
        this.showDistrict = true;
      },
      citySelected: function() {
        this.showProvince=false;
        this.showCity=true;
        this.showDistrict = false;
      },
      getDistrictId: function(id,name) {
        this.district = id;
        this.District = name;
        this.params.workCountryId=id
        this.showChose = false;
        this.workProvince=this.Province +' '+this.City+' '+ this.District
      },
      districtSelected: function() {
        this.showProvince=false;
        this.showCity=false;
        this.showDistrict = true;
      }
    },
    mounted(){
      inputFocus();
    }
  }
</script>
<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  input[type="number"]{-moz-appearance:textfield;}
  .certify{
    font-size: 12px;
    color: #2EC5A6;
    line-height: 16px;
    padding: 12px 10px 12px 30px;
    background:#fff url(../../../static/img/tips.png) 10px center no-repeat;
    background-size: 15px 15px;
  }
  .userIfo{
    margin-top: 10px;
  }
  .userIfo li{
    padding: 15px;
    font-size: 15px;
    color: #C3C3C3;
    border-bottom: 1px solid #eee;
    background: #fff;
  }
  .userIfo li img{
    width: auto;
    height:22px;
    margin-right: 5px;
    vertical-align: middle;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
  }

  /* slide */
  .slide-enter, .slide-leave-to {
    opacity: 0.5;
    transform: translate3d(0, 270px, 0)
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .3s ease;
  }
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0,0,0,.2);
  }
  .showChose{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 270px;
    z-index: 10000;
    background: #fff;
    overflow: scroll;
  }
  .title{
    position: fixed;
    height: 45px;
    min-width: 320px;
    max-width: 780px;
    width: 100%;
    background: #fff;
    text-align: center;
  }
  h4{
    font-size: 15px;
    color: #666666;
    margin: 5px 0;
  }
  .area{
    float: left;
    width: 30%;
    font-size: 14px;
    color: #333333;
  }
  .close{
    float: right;
    width: 25px;
    font-size: 24px;
    margin-top: -5px;
  }
  .address ul .addList{
    padding: 10px 15px;
    font-size: 14px;
    color: #666666;
    border-bottom: 1px solid #eee;
    background: #fff;
  }
  .userIfo li .choose{
    float: right;
    height: 13px;
    margin-top: 6px;
  }
  input{
    font-size: 15px;
  }
</style>
