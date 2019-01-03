<template>
    <div >
      <header class="fixheader">
        <span>我要借款</span>
      </header>
      <div class="scrollmain">
      <div class="borrowmain mainContent">
        <div class="limit">
          <p>申请额度</p>
          <p class="money">￥ <span class="value">3000</span></p>
          <div class="purpose">
            急用钱就上快周转
          </div>

        </div>
        <div class="rangSlide">
          <input type="text" id="range" value="" name="range" />
        </div>
        <div class="cont">
          <ul class="borrow">
            <li>
              <span>借款天数</span>
              <span>{{stage}}天</span>
            </li>
            <li @click="showPicker1">
              <span>借款用途</span>
              <div style="  width: 70%;text-align: right;">
                <input placeholder="请选择借款用途"  v-model="purpose"  onfocus="this.blur();" style="width:30%;font-size: 16px;text-align: right;">
                <img src="../../static/img/go.png" alt="" class="choose">
              </div>
            </li>
            <!--<li>-->
            <!--<span>预计还款日</span>-->
            <!--<span id="time"></span>-->
            <!--</li>-->
          </ul>
        </div>
        <div v-transfer-dom>
          <x-dialog v-model="show" class="dialog-demo">
            <div class="img-box">
              <img :src="platformImageAddr" style="max-width:100%" @click="jump()">
            </div>
            <div @click="show = false">
              <span class="vux-close" style="font-size: 30px;">×</span>
            </div>
          </x-dialog>
        </div>
        <div class="footer" style="margin-top: 30px;padding-bottom: 70px">
          <button class="j-borrow-submit" :disabled="disabled" @click="toConfirm">
            申请提现
            <spinner type="crescent" style="position: relative;top: -2px;fill:#fff;stroke:#fff" v-show="disabled"></spinner>
          </button>
        </div>
        </div>
      <Myfooter :idx="0"></Myfooter>
      <awesome-picker
        ref="picker1"
        :textTitle="picker1.textTitle"
        :data="picker1.data"
        :anchor="picker1.anchor"
        @confirm="handlePicker1Confirm">
      </awesome-picker>
    </div>
</div>
</template>
<script>
  import { XDialog,TransferDomDirective as TransferDom} from 'vux'
  import Myfooter from '@/components/Myfooter';
  import global_ from '../components/Global/global.vue'
  import {range} from '../../static/range.js'
  const data1 = ['买手机','购物','生活','救急','工作']
    export default{
      data(){
        return{
          purpose:'买手机',
          picker1: {
            anchor: [],
            textTitle: '借款用途',
            data: [data1],
          },
          platformImageAddr:"",
          platformLink:'',
          platformId:'',
          show:false,
          msg:false,
          stage:'',
          disabled:false
        }
      },
      directives: {
        TransferDom
      },
      components: {
        XDialog
      },
      methods:{
        showPicker1 () {
          this.$refs.picker1.show()
        },
        handlePicker1Confirm (v) {
          this.picker1.anchor = v;
          let a=eval(JSON.stringify(v));
          this.purpose = v ? a[0].value : null;
        },
        jump(){
          var fd = new FormData()
          fd.append('platformId', this.platformId)
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$http.post('api/user/order/insertPlatformRecord',fd,config).then(function (res) {
            if(res.data.code ===0){
              this.$router.push({path:'/orderList/link',query:{href:this.platformLink}});
            }
          })
        },
        hmd(){
          this.$http.post('api/user/order/getImportPlatform').then(function (res) {
                if(res.data.code ===0){
                    this.platformImageAddr = res.data.data.platformImageAddr
                    this.platformLink = res.data.data.platformLink
                    this.platformId = res.data.data.platformId
                    this.show=true
                } else {
                  this.msg = true
                  this.toConfirm()
                }
          })
        },
        toConfirm(){
          this.disabled = true
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//          if(isAndroid==true){
//            window.Android.showEquipmentInformation();
//          }
//          if(isiOS==true){
//            window.Oc.showEquipmentInformation()
//          window.webkit.messageHandlers.showEquipmentInformation.postMessage({})
//          };

          var value=$('.value').text();
          const vm = this;
          if(vm.purpose==''){
            vm.$toast('请选择借款用途');
          }
          else{
            vm.$http.post('api/user/order/ajaxCheckUserSale').then(function (res) {
              this.disabled = false
              if(res.data.code==0){
                vm.$router.push({name:"orderConfirm",params:{money:value}})
              } else if(res.data.code==10303){
                vm.$toast(res.data.msg);
                setTimeout(function () {
                  vm.$router.push({path: '/orderList'})
                }, 1500);
              } else if(res.data.code==10402){
                if(this.msg === true){
                  vm.$toast(res.data.msg);
                } else{
                  vm.hmd()
                }
              }else if(res.data.code==88888){
                var aprovedata=JSON.parse(res.data.data) ;
                if(aprovedata[50]==false){
                  vm.$toast('请先进行身份证认证');
                  setTimeout(function () {
                    if(isAndroid==true){
                      window.Android.showIDAuthentication();
                    }
                    if(isiOS==true){
                      window.webkit.messageHandlers.showIDAuthentication.postMessage({})
                    };
                  }, 1500);
                } else if(aprovedata[51]==false){
                  vm.$toast('请先进行人脸认证');
                  setTimeout(function () {
                    if(isAndroid==true){
                      window.Android.showIDAuthentication();
                    }
                    if(isiOS==true){
                      window.webkit.messageHandlers.showIDAuthentication.postMessage({})
                    };
                  }, 1500);
                }
                else if(aprovedata[52]==false){
                  vm.$toast('请先进行银行卡认证');
                  setTimeout(function () {
                    vm.$router.push({path: '/approve/toBank'});
                  }, 1500);
                }else if(aprovedata[0]==false){
                  vm.$toast('请先进行个人信息认证');
                  setTimeout(function () {
                    vm.$router.push({path: '/approve/toAuth'});
                  }, 1500);
                }else if(aprovedata[2]==false){
                  vm.$toast('请先进行联系人认证');
                  setTimeout(function () {
                    if(isAndroid==true){
                      window.Android.showContactsAuthentication();
                    }
                    if(isiOS==true){
                      window.webkit.messageHandlers.showContactsAuthentication.postMessage({})
                    };
                  }, 1500);
                }else if(aprovedata[40]==false){
                  vm.$toast('请先进行运营商认证');
                  var gettoken=localStorage.getItem("token");
                  setTimeout(function () {
                    window.location.href=global_.serverSrc+"member/operator/trailAuth?token="+gettoken;
                  }, 1500);
                }
              }
              else{
                vm.$toast(res.data.msg);
              }

            })
          }

        }
      },

      mounted(){
        range();
        this.$http.get('api/index/getRate').then(function (res) {
          if(res.data.code==0){
            this.stage=res.data.data;
          }

        })
        var phoneType =JSON.parse(localStorage.getItem('phoneInfo'))  ;
        if(phoneType==null){
          this.$http.get('api/index/getDevice').then(function (res) {
            if(res.data.code==0){
              this.params=res.data.data;
              localStorage.setItem('phoneInfo',JSON.stringify(this.params));
            }

          })
        }

      },


      components: {
        Myfooter
      }
    }
</script>
<style scoped>
  @import '/static/ion.rangeSlider.css';
  @import '/static/ion.rangeSlider.skinFlat.css';
  input {
    border: none;
    outline: none; }
  .header {
    position: fixed;
    top: 0;
    min-width: 320px;
    max-width: 780px;
    width: 100%;
    height: 42px;
    line-height: 42px;
    text-align: center;
    overflow: hidden;
    background: #fff;
    z-index: 99; }
  .header .back {
    width: 10px;
    position: absolute;
    top: 13px;
    left: 12px; }
  .header span {
    font-size: 17px;
    color: #333333; }
  .footer {
    text-align: center;
    padding: 15px 12px; }
  .footer button {
    width: 100%;
    border: none;
    outline: none;
    font-size: 17px;
    color: #FFFFFF;
    background: #2EC5A6;
    border-radius: 4px;
    line-height: 45px; }
  .limit {
    padding: 20px;
    background: #fff url(../../static/img/borrowbg.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    color: #fff;
    border-top: 1px solid #eee;
    font-size: 14px; }
  .limit .money {
    font-size: 20px;
    margin: 30px; }
  .limit .money span {
    font-size: 40px; }
  .limit .purpose {
    text-align: center;
    font-size: 18px;
    color: #FFFFFF;
    padding: 14px;
    border-top: 2px solid #fff; }

  .borrow {
    background: #fff;
    padding-left: 0;
    margin-top: 0;
    border-radius: 20px;
  }
  .borrow li {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    margin: 0 15px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #999999; }
  .borrow li span:nth-child(2) {
    color: #000; }

  .apply {
    margin: 50px 20px 0 20px; }

  .apply button {
    width: 100%;
    line-height: 40px;
    background: #2EC5A6;
    border-radius: 4px;
    color: #fff;
    font-size: 17px; }

  .rangSlide {
    background: #fff;
    padding: 0px 15px 10px 15px; }


.choose{
  width: 8px;
  margin-left: 5px;
  vertical-align: middle;
}
  .cont{
    background: #FFFFFF;
    border: 1px solid #EFEFEF;
    border-radius: 20px;
    margin: 15px;
  }

</style>
