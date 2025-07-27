<script lang="ts">
    import type { PageProps } from "./$types";
    import Card from "$lib/components/Card.svelte";
    import Button from "$lib/components/Button.svelte";
    import DocumentationInstanceSettings from "$lib/components/services/DocumentationInstanceSettings.svelte";

    import edit from "$lib/svg/edit.svg";
    import cross from "$lib/svg/cross.svg";

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

    let editing: boolean = $state(true);
</script>

<h1 class="text-xl">Your Documentation Instances</h1>
{#each data.docs.instances as doc}
    {#if editing}
        <div class="flex">
            <DocumentationInstanceSettings {doc} />
            <Button
                onclick={() => (editing = false)}
                fit={true}
                className="size-fit m-1 p-0.5 bg-gray-100 rounded-sm"
                useCardClasses={false}
            >
                <img class="size-4" src={cross} alt="X" />
            </Button>
        </div>
    {:else}
        <Card popOut={false} className="grid grid-cols-2 p-1 my-1">
            <div>
                <a class="px-1" href={`/services/docs/${doc.name}`}
                    >{doc.name}</a
                >
                <div class="px-2">
                    <p class="text-sm">
                        <span class="text-xs text-gray-500">repository:</span><a
                            href={`https://github.com/${doc.repoOwner}/${doc.repoName}/tree/${doc.repoRef}`}
                        >
                            {doc.repoOwner}/{doc.repoName}
                        </a>
                    </p>
                    <p class="text-sm">
                        <span class="text-xs text-gray-500">ref:</span
                        >{doc.repoRef}
                    </p>
                </div>
            </div>
            <div class="flex justify-end">
                <div class="flex flex-row items-center p-1">
                    <Button
                        onclick={() => (editing = true)}
                        fullWidth={true}
                        useCardClasses={false}
                        className="p-1 hover:bg-gray-200 click:gb-gray-500 rounded-sm text-sm"
                    >
                        <img src={edit} alt="edit" class="size-5" />
                    </Button>
                </div>
            </div>
        </Card>
    {/if}
{/each}
<p>{start}-{end}/{data.docs.count}; page {currentPage}/{totalPages}</p>
