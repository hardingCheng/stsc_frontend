<template>
  <div class="service-evaluation">
    <div class="serve_company">
      <img src="http://p1-q.mafengwo.net/s12/M00/C4/A1/wKgED1vB9ZCABuKMADUYcGrLRP871.jpeg?imageMogr2%2Fthumbnail%2F%21690x450r%2Fgravity%2FCenter%2Fcrop%2F%21690x450%2Fquality%2F90%7Cwatermark%2F1%2Fimage%2FaHR0cDovL2IxLXEubWFmZW5nd28ubmV0L3MxMS9NMDAvNDQvOUIvd0tnQkVGc1A1UnlBRHY3cEFBQUhaWlVQUmxROTkwLnBuZw%3D%3D%2Fgravity%2FSouthEast%2Fdx%2F10%2Fdy%2F11"  class="img_style">
      <div class="company_detail">
        <ul>
          <li>
            服务商名称:<span>xxx</span>
          </li>
          <li>
            所属机构:<span>xxx</span>
          </li>
          <li>
            联系方式:<span>xxx</span>
          </li>
          <li>
            地址:<span>xxx</span>
          </li>
        </ul>

      </div>
    </div>

    <div class="serve_order"></div>
  </div>
</template>

<script>
export default {
  name: "ServiceEvaluation"
}
</script>

<style scoped lang="scss">
.service-evaluation{
  .serve_company{
    height: 150px;

    background: pink;
    .img_style{
      height: 130px;
      width: 130px;
      float: left;
      margin-top: 10px;
      margin-left: 10px;
    }
    .company_detail{
      height: 130px;
      margin-top: 10px;
      margin-left: 20px;
      background: #42b983;
      float: left;
      ul>li{
        line-height: 30px;
      }
    }
  }
  .serve_order{
    height: 500px;
    margin-top: 10px;
    background: #7caced;
  }
}

</style>
