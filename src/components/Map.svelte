<script>
	export let foo;

	// Values that are passed in as props
	// are immediately available
	console.log({ foo });
</script>

<div id="map" ref="map"></div>
<div class="overlay"></div>
<div class="greet" :class="{ active: loc }">
  <p class="greeting">
    It looks like you're visiting from <span class="loc">{{ loc }}</span
    >.
  </p>
  <p class="greeting"><span class="hi">How's the weather?</span></p>
</div>