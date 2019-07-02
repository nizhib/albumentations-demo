<template>
  <div :id="$options.name">
    <div class="field">
      <p v-if="image" class="control">
        <button @click="request" class="button is-link"
                :class="{'is-loading': state === 'processing'}"
                :disabled="state === 'processing'">
          {{ cta }}
        </button>
      </p>
    </div>

    <div class="columns">
      <div class="column is-one-fifth">
        <h2 class="subtitle is-4">
          Settings
        </h2>

        <label class="label">Repeats</label>
        <integer :max="24" :default="8" ref="repeats" />

        <label class="label">Transforms</label>
        <div v-for="transform in transforms" class="field">
          <label class="checkbox">
            <input type="checkbox" :id="transform" :value="transform" v-model="chosen">
            {{ transform }}
          </label>
        </div>
      </div>

      <div v-if="result['data']" class="column">
        <h2 class="subtitle is-4">
          Result
        </h2>

        <label class="label">Zoom</label>
        <integer :max="6" :default="3" ref="zoom" />

        <div class="container">
          <div class="columns is-multiline is-mobile">
            <div v-for="albumentized in result['data']['albumentized']"
                 :class="'column is-' + ($refs['zoom'] ? zooms[$refs['zoom'].value - 1] : 3)">
              <div class="field">
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-square">
                      <img :src="'data:image/jpeg;base64,' + albumentized">
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiRoot } from '@/settings'

import Integer from '@/components/Integer.vue'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: 'request',
  components: {
    Integer
  },
  data () {
    return {
      state: 'ready',
      result: '',

      transforms: [
        'CLAHE',
        'RandomRotate90',
        'Transpose',
        'ShiftScaleRotate',
        'Blur',
        'OpticalDistortion',
        'GridDistortion',
        'HueSaturationValue'
      ],
      chosen: [],
      zooms: [1, 2, 3, 4, 6, 12]
    }
  },
  props: {
    method: {
      type: String,
      required: true
    },
    cta: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
  },
  methods: {
    async request() {
      const vm = this;

      vm.state = 'processing';
      vm.result = '';

      const input = {
        'image': vm.image,
        'albumentations': vm.chosen,
        'repeats': vm.$refs.repeats.value
      };

      this.axios.post(`${apiRoot}${vm.method}`, input, {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(response => {
        vm.result = response.data;
      })
      .catch(error => {
        vm.result = error;
      })
      .finally(() => {
        vm.state = 'ready';
      });
    }
  },
  created() {
    this.chosen = this.transforms;
  }
}
</script>
