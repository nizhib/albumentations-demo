<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column">
            <h1 class="is-2 title">
              {{ title }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'hero',
  props: {
    title: {
      type: String,
      default: 'Albumentations Demo'
    }
  }
}
</script>
