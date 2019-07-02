<template>
  <div :id="$options.name">
    <div class="field is-grouped">
      <div class="control">
        <button @click="lucky" :disabled="state !== 'ready'"
                class="button is-link is-outlined"
                :class="{'is-loading': state === 'loading'}">
          I'm lucky
        </button>
      </div>

      <div class="control">
        <div class="file has-name">
          <label class="file-label">
            <input type="file" @change="attach" :disabled="state !== 'ready'" hidden>
            <span class="file-cta">
              <span class="file-label">
                Upload…
              </span>
            </span>
            <span v-if="name" class="file-name">
              {{ name }}
            </span>
          </label>
        </div>
      </div>
    </div>

    <template v-if="src" >
      <h2 class="subtitle is-4">
        Preview
      </h2>
      <div class="card">
        <div class="card-image">
          <figure class="image is-square">
            <img :src="src">
          </figure>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function untilLoaded(obj) {
  await new Promise(resolve => {
    obj.onload = () => resolve(obj);
  });
}

async function srcToDataUri(src, width, height) {
  const img = new Image();
  img.src = src;
  await untilLoaded(img);

  // create an off-screen canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // set its dimension to target size
  canvas.width = width;
  canvas.height = height;

  // draw source image into the off-screen canvas:
  ctx.drawImage(img, 0, 0, width, height);

  // encode image to data-uri with base64 version of compressed image
  return canvas.toDataURL('image/jpeg', 0.9);
}

export default {
  name: 'upload',
  data() {
    return {
      state: 'ready',
      name: null,
      src: null,
      numSamples: 5,
      size: 512
    }
  },
  methods: {
    reset() {
      this.name = null;
      this.src = null;
      this.$emit('reset');
    },
    async lucky() {
      this.reset();
      this.state = 'loading';

      const idx = randInt(this.numSamples) + 1;

      await fetch(`/samples/${idx}.jpg`)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        const vm = this;
        reader.onload = async function() {
          const src = this.result;
          const encoded = await srcToDataUri(src, vm.size, vm.size);
          vm.src = encoded;
          vm.$emit('attached', encoded.split('base64,')[1]);
          vm.state = 'ready';
        };
        reader.readAsDataURL(blob);
      });
    },
    async attach(e) {
      this.reset();
      this.state = 'loading';

      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.name = files[0].name;
      const reader = new FileReader();

      reader.onload = async (e) => {
        const src = e.target['result'];
        const encoded = await srcToDataUri(src, this.size, this.size);
        this.src = encoded;
        this.$emit('attached', encoded.split('base64,')[1]);
        this.state = 'ready';
      };
      reader.readAsDataURL(files[0]);
    }
  }
}
</script>
