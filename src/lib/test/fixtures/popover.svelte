<script lang="ts">
	import { Button, Popover } from '../../index.js';
</script>

<Button id="test-popover-anchor" variant="outline">Filters</Button>
<Popover anchor="#test-popover-anchor" placement="bottom" align="start">
	<p>Active filters</p>
</Popover>
