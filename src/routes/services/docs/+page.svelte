<script lang="ts">
    import type { PageProps } from "./$types";
    import { page } from "$app/state";
    import DocumentationInstance from "$lib/components/services/docs/DocumentationInstance.svelte";
    import NavButton from "$lib/components/NavButton.svelte";
    import plus from "$lib/svg/plus.svg";

    let { data }: PageProps = $props();

    let totalPages = $derived(Math.ceil(data.docs.count / data.docs.limit));
    let currentPage = $derived(data.docs.offset / data.docs.limit + 1);
    let start = $derived((currentPage - 1) * data.docs.limit + 1);
    let end = $derived(start + data.docs.limit);

    $effect(() => {
        if (end > data.docs.count) {
            end = data.docs.count;
        }
    });

    let prevUrl: string = $derived(
        `/services/docs?limit=${data.docs.limit}&offset=${start - data.docs.limit}`,
    );
    let nextUrl: string = $derived(
        `/services/docs?limit=${data.docs.limit}&offset=${end + 1}`,
    );
</script>

<div class="flex mr-0.5">
    <h1 class="text-xl mr-auto">Your Documentation Instances</h1>
    <NavButton
        popOut={false}
        className="p-1 bg-gray-200"
        dest="/services/docs/new"
        ><img src={plus} alt="New" class="size-5" /></NavButton
    >
</div>
<div class="mt-4 mb-3">
    {#if data.docs.count == 0}
        <NavButton
            dest="/services/docs/new"
            popOut={false}
            className="w-full my-1 p-4"
        >
            <img src={plus} alt="New" class="size-20 mx-auto" />
            <p class="w-fit mx-auto">Create your first instance</p>
        </NavButton>
    {/if}
    {#each data.docs.instances as doc}
        <DocumentationInstance {doc} />
    {/each}
</div>
<div class="grid grid-cols-3 pt-0.5 mx-1">
    <a
        class="hover:text-gray-600 size-fit"
        href={currentPage === 1 ? page.url.href : prevUrl}>prev</a
    >
    <p class="m-auto">
        {start}-{end}/{data.docs.count}; page {currentPage}/{totalPages}
    </p>
    <a
        href={currentPage === totalPages ? page.url.href : nextUrl}
        class="hover:text-gray-600 ml-auto">next</a
    >
</div>
