<template>
  <div id="app">
    <navbar/>
    <hero/>
    <div id="main">
      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <upload @attached="attach"
                      @reset="reset"
                      ref="upload" />
            </div>
            <div class="column" v-show="image">
              <request :image="image"
                       method="albumentize"
                       cta="Albumentize!"
                       ref="request" />
            </div>
          </div>
        </div>
      </section>
    </div>
    <credits/>
  </div>
</template>

<script>
import navbar from './components/NavBar.vue'
import hero from './components/Hero.vue'
import upload from './components/Upload.vue'
import request from './components/Request.vue'
import credits from './components/Credits.vue'

export default {
  name: 'albumentations',
  components: {
    navbar,
    hero,
    upload,
    request,
    credits
  },
  data() {
    return {
      state: 'ready',

      image: null,
      total: null,
      error: null,
      result: null
    }
  },
  methods: {
    reset() {
      this.image = null;
      this.total = null;
      this.error = null;
      this.result = null;
      this.$refs.request.result = '';
    },
    attach(image) {
      this.reset();
      this.image = image;
    }
  },
  async mounted() {
    await this.$refs.upload.lucky()
  }
}
</script>
