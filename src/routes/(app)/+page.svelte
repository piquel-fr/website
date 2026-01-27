<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import NavButton from "$lib/components/NavButton.svelte";
    import type { LayoutProps } from "./$types";

    let { data }: LayoutProps = $props();
</script>

{#if data.profile?.role === "admin"}
    <p class="text-center rounded-xl p-5 text-white font-bold text-3xl mt-3" style="background-color: #404040;">Welcome to the Piquel zone !</p>
    <p class="text-center text-xl p-3"> Hub to all of the Piquel Network, So You Can Tickle Your Piquel in Peace </p>
    <div class="grow justify-center flex flex-wrap gap-1 w-full px-10">
        <Card className="bg-gray-400 p-5 m-1 grow size-full max-w-xl">
            <div class="text-center text-3xl pb-3">
                <h3 class="font-bold">Minecraft</h3>
            </div>
            <div class="grid grid-cols-2 grid-rows-2 text-center">
                <NavButton popOut={false} className="flex text-center justify-center items-center p-5 m-1" dest="http://piquel.fr:1101" newTab={true}>Holy Shit Dynmap</NavButton>
                <NavButton popOut={false} className="flex text-center justify-center items-center p-5 m-1" dest="http://piquel.fr:1102" newTab={true}>Greymane Dynmap</NavButton>
                <NavButton popOut={false} className="flex text-center justify-center items-center p-5 m-1" dest="http://piquel.fr:1100" newTab={true}>Stone Dynmap</NavButton>
                <NavButton popOut={false} className="flex text-center justify-center items-center p-5 m-1" dest="https://piquel-network-store.tebex.io" newTab={true}>Minecraft Server Store</NavButton>
            </div>
        </Card>
        <Card className="bg-gray-400 p-5 m-1 grow size-full max-w-xl">
            <div class="text-center text-3xl pb-3">
                <h3 class="font-bold">SNT</h3>
            </div>
            <div class="grid grid-cols-2 text-center">
                <NavButton popOut={false} className="flex text-center justify-center items-center p-5 m-1" dest="/snt/musset">Présentation de Alfred de Musset</NavButton>
                <NavButton popOut={false} className="flex text-center justify-center items-center p-5 m-1" dest="/snt/linus">Présentation de Linus Torvalds et de sa création: Linux</NavButton>
            </div>
        </Card>
    </div>
{/if}
