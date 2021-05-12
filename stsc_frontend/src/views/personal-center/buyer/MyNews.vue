<template>
  <div class="my-news">
    <Message
        inform="1111"
        no_manage="2222"
        other="3333"
    >
    </Message>
  </div>
</template>

<script>
import Message from "../../../components/Message";

export default {
  name: "MyNews",
  components:{Message},
  data() {
    return {
      activeName: 'first',
      activeNames: ['']
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>

<style lang="scss" scoped>
.my-news {
  width:100%;
  .delete{
    padding: 8px;
    font-size: 12px;
    margin-top: 20px;
  }
}
</style>
