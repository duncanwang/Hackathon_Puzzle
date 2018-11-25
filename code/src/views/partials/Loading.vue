<!--  -->
<template>
  <!-- <div > -->
    <div class='loading'>
        <div class="loading_box">
              <div class="loading-container">
                <div class="loding-animation-holder">
                  <div class="loading-animator"></div>
                  <div class="loading-animator"></div>
                  <div class="loading-animator"></div>
                  <div class="loading-animator"></div>
                  <div class="middle-circle"></div>
                </div>
              </div>
            </div>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted() {}
}

</script>
<style type="text/css" lang="scss">
.loading{
    position: fixed;
    top: 70px;
    width: 100%;
    height: 100%;
    // min-width: 320px;
    // /* background-color: #000000; */
    background: linear-gradient(#0e161b, #121d23, #0e161b);
    z-index: 999;
    .loading_box {
      width: 100%;
      height: 100%;
      position: absolute;


      /*LOADING*/
      .loading-container {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 100;
        // background: #3c4a5c;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-transition: opacity 1s cubic-bezier(.83, .01, .75, .71);
        -moz-transition: opacity 1s cubic-bezier(.83, .01, .75, .71);
        -ms-transition: opacity 1s cubic-bezier(.83, .01, .75, .71);
        -o-transition: opacity 1s cubic-bezier(.83, .01, .75, .71);
        transition: opacity 1s cubic-bezier(.83, .01, .75, .71);
      }

      .loding-animation-holder {
        width: 70px;
        height: 70px;
        transform: rotate(45deg);
        position: relative;
      }

      .loading-animator {
        width: 50%;
        height: 50%;
        float: left;
        background: #8A9498;
        transform: rotate(0deg);
        position: relative;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        opacity: 1;
        border-radius: 4px;
      }

      .loading-animator:nth-child(1) {
        transform-origin: bottom right;
        animation: loading 3s cubic-bezier(.46, -0.1, .2, 1.5) infinite;
      }

      .loading-animator:nth-child(2) {
        transform-origin: bottom left;
        animation: loading 3s 0.3s cubic-bezier(.46, -0.1, .2, 1.5) infinite;
      }

      .loading-animator:nth-child(3) {
        transform-origin: top right;
        animation: loading 3s 0.5s cubic-bezier(.46, -0.1, .2, 1.5) infinite;
      }

      .loading-animator:nth-child(4) {
        transform-origin: top left;
        animation: loading 3s 0.4s cubic-bezier(.46, -0.1, .2, 1.5) infinite;
      }

      @keyframes loading {
        0% {
          transform: rotate(0deg);
          opacity: 1;
        }

        25% {
          transform: rotate(90deg);
          opacity: 0;
        }

        35% {
          transform: rotate(-90deg);
          opacity: 0;
        }

        65% {
          transform: rotate(0deg);
          opacity: 1;
        }
      }

      .middle-circle {
        width: 5px;
        height: 5px;
        position: absolute;
        top: 32.5px;
        left: 32.5px;
        border-radius: 100%;
        border: 1px solid #8A9498;
        background: #8A9498;
      }
    }
}
</style>
