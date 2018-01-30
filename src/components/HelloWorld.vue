<template>
  <div>
    Hello word
  </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      user_name: 'getzhu',
      password: '123456'
    }
  },
  created () {
    this.$store.dispatch('login', this.loginFrom)
  }
}
</script>

<style lang="scss" scoped>
</style>
