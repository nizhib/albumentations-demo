<template>
  <div :id="$options.name">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <span class="navbar-item">
            <img src="@/assets/images/logo.png">
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>
