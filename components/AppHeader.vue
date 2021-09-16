<template>
    <div class="app-header">
        <div class="logo">
            <NuxtLink to="/" style="text-decoration: none; color: inherit;">
                BinanceStaking<span class="app-header__logo--black">Watcher</span>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>

.app-header {
    text-align: left;
    background-color: #F7FAFB;
}

.logo {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #20BEAD;
    padding: 1rem 0 1rem 2rem;
    font-weight: 700;
    font-size: 1.3rem;
}

.app-header__logo--black {
    color: #000000;
}

@media screen and (max-width: 600px) {
  .logo {
    padding: 1rem 0 0.8rem 1.3rem;
  }
}

</style>
