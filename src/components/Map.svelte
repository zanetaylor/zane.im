<script>
  import { onMount } from 'svelte'

  import * as mgl from 'maplibre-gl'
  import 'maplibre-gl/dist/maplibre-gl.css'

  let loc = false
  let map

  onMount(() => {

    const latitude = 35.4832668,
      longitude = 12.9491635,
      zoom = 15.5,
      pitch = 65,
      mapLoaded = false

    const mapApiKey = "jB11OR9dfQrR5Kz4It89";
    const locApiKey =
      "BbfASGePwdDWBONIYVMcfRvgCVxWyuILDv9Vnekp08qxhJ82ztYe2jb4S244YSu3";

    const mapStyleLight = `https://api.maptiler.com/maps/d822cf9a-e7bd-46ec-ab0a-75dc9bf16d32/style.json?key=${mapApiKey}`;
    const mapStyleDark = `https://api.maptiler.com/maps/ed916e60-ca24-40fe-9984-6b1fa0ed1f19/style.json?key=${mapApiKey}`;

    let time = new Date();

    if (time.getHours() > 17 || time.getHours() < 6) {
      // dark = true;
      theme == 'dark'
    }

    map = new mgl.Map({
      // accessToken: this.accessToken,
      container: 'map',
      style: mapStyleLight,
      center: [longitude, latitude],
      zoom: zoom,
      pitch: pitch,
      attributionControl: false
    });

    if (localStorage.theme == 'dark') {
      // $('body').toggleClass('dark')
      // const body = document.querySelector("body");
      // body.classList.add("dark");
      map.setStyle(mapStyleDark);
    }

    // map.addControl(new mgl.NavigationControl());

    // new AttributionControl(options: Object?)

    map.on("load", () => {
      const locPromise = fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        // .then(data => { ip_lookup = data })
        .then((data) => {
          if (data.city) {
            loc = data.city;
          } else if (data.region) {
            loc = data.region;
          } else {
            if (data.country_code == "US") {
              loc = "somewhere in the " + data.country;
            } else {
              loc = "somewhere in " + data.country;
            }
          }

          map.jumpTo({
            center: [data.longitude, data.latitude],
          });
        });
    });

    map.once("moveend", () => {
      rotateCamera(0);
    });

  })

  function rotateCamera(timestamp) {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    map.rotateTo((timestamp / 600) % 360, { duration: 0 });
    // Request the next frame of the animation.
    window.requestAnimationFrame(rotateCamera);
  }
</script>

<div id="map" ref="map"></div>
<div class="overlay"></div>
<div class="greet font-serif" class:active={loc}>
  <p class="greeting">
    It looks like you're visiting from <span class="loc">{ loc }</span
    >.
  </p>
  <p class="greeting"><span class="hi">How's the weather?</span></p>
</div>

<style lang="scss">
  #map {
    @apply absolute w-full h-screen;
    /* opacity: .9; */
  }
  
  .mapboxgl-control-container {
    display: none !important;
  }
  
  .greet {
    position: absolute;
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
    @apply float-right m-0 text-sm text-right;
  
    .loc {
      position: relative;
      top: -1px;
      left: -2px;
      padding: 2px 4px;
      font-weight: 500;
      background: -webkit-linear-gradient(45deg, #7C4EFF, #A21CAF);
      color: #eee;
    }
  }
</style>  