<template>
  <div id="map" ref="map"></div>
  <div class="overlay"></div>
  <div class="greet" :class="{ active: loc }">
    <p class="greeting">
      It looks like you're visiting from <span class="loc">{{ loc }}</span
      >.
    </p>
    <p class="greeting"><span class="hi">How's the weather?</span></p>
  </div>
</template>

<script>
// import * as mgl from 'mapbox-gl'
import * as mgl from "maplibre-gl";

export default {
  data() {
    return {
      // accessToken: 'pk.eyJ1Ijoiem90dGVyZGFzIiwiYSI6ImNrNzd2ZTZ6cTAyMTAzbG51eG41dDV5c2QifQ.Gt6NSuWV9kymSGDvs4VlMQ',
      // mapStyle: 'mapbox://styles/zotterdas/ckbv7kvf6172m1ivo731ifecs',
      // apiKey: "jB11OR9dfQrR5Kz4It89",
      // mapStyle: `https://api.maptiler.com/maps/streets/style.json?key=${this.apiKey}`,
      latitude: 35.4832668,
      longitude: 12.9491635,
      zoom: 15.5,
      pitch: 65,
      loc: "",
      mapLoaded: false,
    };
  },
  created() {
    this.map = null;
  },
  mounted() {
    const mapApiKey = "jB11OR9dfQrR5Kz4It89";
    const locApiKey =
      "BbfASGePwdDWBONIYVMcfRvgCVxWyuILDv9Vnekp08qxhJ82ztYe2jb4S244YSu3";

    const mapStyleLight = `https://api.maptiler.com/maps/d822cf9a-e7bd-46ec-ab0a-75dc9bf16d32/style.json?key=${mapApiKey}`;
    const mapStyleDark = `https://api.maptiler.com/maps/ed916e60-ca24-40fe-9984-6b1fa0ed1f19/style.json?key=${mapApiKey}`;

    let dark = false;
    let time = new Date();

    if (time.getHours() > 17 || time.getHours() < 6) {
      dark = true;
    }

    this.map = new mgl.Map({
      // accessToken: this.accessToken,
      container: this.$refs.map,
      style: mapStyleLight,
      center: [this.longitude, this.latitude],
      zoom: this.zoom,
      pitch: this.pitch,
    });

    if (dark) {
      // $('body').toggleClass('dark')
      const body = document.querySelector("body");
      body.classList.add("dark");
      this.map.setStyle(mapStyleDark);
    }

    this.map.addControl(new mgl.NavigationControl());

    this.map.on("load", () => {
      const locPromise = fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        // .then(data => { ip_lookup = data })
        .then((data) => {
          if (data.city) {
            this.loc = data.city;
          } else if (data.region) {
            this.loc = data.region;
          } else {
            if (data.country_code == "US") {
              this.loc = "somewhere in the " + data.country;
            } else {
              this.loc = "somewhere in " + data.country;
            }
          }

          this.map.jumpTo({
            center: [data.longitude, data.latitude],
          });
        });
    });

    this.map.once("moveend", () => {
      this.rotateCamera(0);
    });
  },
  methods: {
    rotateCamera(timestamp) {
      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      this.map.rotateTo((timestamp / 500) % 360, { duration: 0 });
      // Request the next frame of the animation.
      window.requestAnimationFrame(this.rotateCamera);
    },
  },
};
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
  @apply absolute w-full h-full;

  background: rgb(239, 239, 239);
  background: linear-gradient(
    180deg,
    rgba(239, 239, 239, 0.4) 0%,
    rgba(255, 255, 255, 1) 90%
  );
  backdrop-filter: blur(5px);
  mask: linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.15) 50%, black 80%);
}

body.dark {
  .overlay {
    // background: #111;
    background: rgb(17, 17, 17);
    background: linear-gradient(
      180deg,
      rgba(17, 17, 17, 0.3) 0%,
      rgba(17, 17, 17, 1) 90%
    );
  }
  .greet {
    color: #eee;
  }
}

.greet {
  position: fixed;
  top: 0.75rem;
  right: 0.75rem;
  color: #222;
  max-width: 420px;
  opacity: 0;
  transition: all 0.3s;

  &.active {
    opacity: 0.75;
  }
}
.greeting {
  float: right;
  margin: 0;
  // padding: .2rem .5rem;
  font-size: 0.75rem;
  text-align: right;

  .loc {
    font-weight: 500;
    background: #7c4eff;
    color: #eee;
  }
}
</style>
