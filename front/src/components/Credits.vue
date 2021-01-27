<template>
  <div :id="$options.name">
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            &copy; {{ year }} Evgeny Nizhibitsky
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'credits',
  data () {
    return {
      year: 2019
    }
  },
  created () {
    const today = new Date()
    this.year = today.getFullYear()
  }
}
</script>
