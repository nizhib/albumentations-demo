<template>
  <div id="app">
    <Navbar />
    <Hero />
    <main id="main">
      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <Upload
                @attached="attach"
                @reset="reset"
                ref="upload"
              />
            </div>
            <div
              v-show="image"
              class="column"
            >
              <Request
                :image="image"
                method="albumentize"
                cta="Albumentize!"
                ref="request"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
    <Credits />
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import Upload from './components/Upload.vue'
import Request from './components/Request.vue'
import Credits from './components/Credits.vue'

export default {
  name: 'albumentations',
  components: {
    Navbar,
    Hero,
    Upload,
    Request,
    Credits
  },
  data () {
    return {
      image: null,
      total: null,
      error: null,
      result: null
    }
  },
  methods: {
    reset () {
      this.image = null
      this.total = null
      this.error = null
      this.result = null
      this.$refs.request.result = ''
    },
    attach (image) {
      this.reset()
      this.image = image
    }
  },
  async mounted () {
    await this.$refs.upload.lucky()
  }
}
</script>
