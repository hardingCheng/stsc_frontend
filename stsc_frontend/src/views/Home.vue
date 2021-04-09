<template>
  <div>
    <router-view />
    {{list}}
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      list:[]
    }
  },
  mounted() {
    this.$axios.userList.login({
      username:'jack',
      password:'jack'
    }).then(res => {
      this.list = res.data
    })
  }
};
</script>

<style scoped lang="scss">

</style>
