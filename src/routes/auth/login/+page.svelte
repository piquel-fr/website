<script lang="ts">
    import { PUBLIC_API } from "$env/static/public";
    import Card from "$lib/components/Card.svelte";
    import NavButton from "$lib/components/NavButton.svelte";

    import google from "$lib/svg/google.svg";
    import github from "$lib/svg/github.svg";
    import { page } from "$app/state";
</script>

<div class="flex justify-center items-center m-12">
    <Card
        popOut={false}
        className="flex flex-col justify-center items-center gap-3 p-5 m-1"
    >
        <p class="text-3xl">Login</p>
        <p class="text-xl">Select a provider to login with</p>

        <NavButton
            dest={`${PUBLIC_API}/auth/github?redirectTo=${page.url.searchParams.get("redirectTo")}`}
            popOut={false}
            className="px-5 py-3 border flex gap-2
                border-slate-200 rounded-lg text-slate-700 hover:border-slate-400
                hover:text-slate-900 hover:shadow transition duration-150"
        >
            <img src={github} alt="github" class="size-8" />
            <span class="text-2xl">Login with GitHub</span>
        </NavButton>
        <NavButton
            dest={`${PUBLIC_API}/auth/google?redirectTo=${page.url.searchParams.get("redirectTo")}`}
            popOut={false}
            className="px-5 py-3 border flex gap-2
                    border-slate-200 rounded-lg text-slate-700 hover:border-slate-400
                    hover:text-slate-900 hover:shadow transition duration-150"
        >
            <img src={google} alt="google" class="size-8" />
            <span class="text-2xl">Login with Google</span>
        </NavButton>
    </Card>
</div>
