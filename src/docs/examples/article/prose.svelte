<script lang="ts">
	import { Article } from '$lib';
</script>

<Article title="Release notes" description="What changed in the console this week.">
	<p>
		The focus ring now follows the keyboard on every overlay. Dialogs open with a short scale, and
		the entry animation is skipped when reduced motion is requested.
	</p>
	<h2>Fixes</h2>
	<ul>
		<li>Select keeps the active option visible while filtering.</li>
		<li>Toast timers no longer close a newer message.</li>
	</ul>
	<pre><code>showToast('Deployed to production', 'success');</code></pre>
</Article>
