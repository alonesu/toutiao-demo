<template>

    <img src="../../assets/images/welcome.jpg" alt="">

</template>

<script>
export default {
  created () {
    this.$http.get('/articles').then(res => {
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>
img {
    display: block;
    margin: 0 auto;
}
</style>
