<template>
  <div id="map"></div>
  <div class="overlay"></div>
  <div class="greet" :class="{ active: loc }">
    <p class="greeting">It looks like you're visiting from <span class="loc"></span>.</p>
    <p class="greeting"><span class="hi">How's the weather?</span></p>
</div>
</template>

<script>

  import { mapboxgl } from 'mapbox-gl'
  // import $ from 'cash-dom'

  export default {
    data() {
      return {
        loc: '',
        mapLoaded: false
      }
    },
    created() {
      this.map = null;
    },
    mounted() {
      let dark = false
      let time = new Date()

      if(time.getHours() > 17 || time.getHours() < 6) {
        dark = true
      }

      const accessToken = 'pk.eyJ1Ijoiem90dGVyZGFzIiwiYSI6ImNrNzd2ZTZ6cTAyMTAzbG51eG41dDV5c2QifQ.Gt6NSuWV9kymSGDvs4VlMQ';

      this.map = new mapboxgl.Map({
        accessToken: accessToken,
        container: 'map', // container id
        style: 'mapbox://styles/zotterdas/ckbv7kvf6172m1ivo731ifecs',
        // center: [-74.5, 40], // starting position [lng, lat]
        zoom: 15.5,
        pitch: 60
      })

      if(dark) {
        // $('body').toggleClass('dark')
        this.map.setStyle('mapbox://styles/zotterdas/ckbxvs6p12h081inbbgko2edn')
      }

      this.map.addControl(new mapboxgl.NavigationControl())

      this.map.on('load', ()=> {

        const locationPromise = fetch('https://freegeoip.app/json/')
          .then(response => response.json())
          // .then(data => { ip_lookup = data })
          .then(data => {

            if(data.city) {
              this.loc = data.city
            } else if(data.region_name) {
              this.loc = data.region_name
            } else {
              if(data.country_code == 'US') {
                this.loc = 'somewhere in the ' + data.country_code
              } else {
                this.loc = 'somewhere in ' + data.country_name
              }
            }

            // $('.greeting').toggleClass('active')

            this.map.jumpTo({
              center: [data.longitude, data.latitude],
              // zoom: 12,
              // minZoom: 8,
              // speed: 4
            })

          })
      })

      // map.on('render', ()=> {
      //   if(map.loaded()) {
      //     $('.overlay').addClass('loaded')
      //   }
      // })

      this.map.once('moveend', ()=> {
        this.rotateCamera(map, 0)
      })
    },
    methods: {
      rotateCamera(map, timestamp) {
        // clamp the rotation between 0 -360 degrees
        // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
        map.rotateTo((timestamp / 500) % 360, { duration: 0 });
        // Request the next frame of the animation.
        window.requestAnimationFrame(this.rotateCamera);
      }
    }
  }

</script>

<style lang="scss">

#map {
  position: absolute;
  width: 100vw;
  height: 100vh;
  /* opacity: .9; */
}

.mapboxgl-control-container {
  display: none !important;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #efefef;
  opacity: .6;
  transition: all .3s;

  // &.loaded {
  //   opacity: .6;
  // }
}

body.dark .overlay {
  background: #111;
}

.greet {
  position: fixed;
  top: .75rem;
  right: .75rem;
  color: #eee;
  max-width: 420px;
}
.greeting {
  float: right;
  margin: 0;
  padding: .2rem .5rem;
  font-size: 0.75rem;
  text-align: right;
  background: rgba(0,0,0,.5);
  opacity: 0;
  transition: all .3s;
}
.greeting.active {
  opacity: 1;
}
.greeting:last-child {
  padding-top: 0;
}
.greeting .loc {
  font-weight: 500;
  background: #7C4EFF;
  color: #fff;
}

</style>