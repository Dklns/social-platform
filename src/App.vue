<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { online, offline } from './request/request';
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    if (this.currentUser) {
      online();
      window.addEventListener('beforeunload', () => {
        if (this.currentUser) {
          offline();
        }
      })
    }
  }
}

</script>

<style lang="scss"></style>