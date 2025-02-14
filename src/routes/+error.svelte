<script lang="ts">
	import { page } from '$app/state';
</script>

<p class="text-8xl">{page.error?.status ? page.error.status : page.status}: {page.error?.message}</p>
