<template>
    <div>
        <div class="app-header">
            <div class="logo">
                <NuxtLink to="/" style="text-decoration: none; color: inherit;">
                    BinanceStaking<span class="app-header__logo--black">Watcher</span>
                </NuxtLink>
            </div>
            <div class="app-header__menu">
                <div class="app-header__menu--pc">
                    <NuxtLink to="/history" class="app-header__menu__link" style="text-decoration: none; color: inherit;">
                        Historical data
                    </NuxtLink>
                    <NuxtLink to="/blog" class="app-header__menu__link" style="text-decoration: none; color: inherit;">
                        Blog
                    </NuxtLink>
                </div>
                <div class="app-header__menu--mobile">
                    <div
                        class="app-header__menu__hamburger"
                        @click="hamburgerMenuClick"
                    >
                        <img
                            src="../assets/hamburger-menu.svg"
                            alt="menu"
                            class="app-header__menu__hamburger--icon"
                        >
                    </div>
                </div>
            </div>
        </div>
        <div
            class="app-header__menu--mobile__content"
            :class="{
                'app-header__menu--mobile__content--open': mobileMenuOpen
            }"
        >
            <NuxtLink to="/history" class="app-header__menu__link app-header__menu__link--mobile" style="text-decoration: none; color: inherit;">
                Historical data
            </NuxtLink>
            <NuxtLink to="/blog" class="app-header__menu__link app-header__menu__link--mobile" style="text-decoration: none; color: inherit;">
                Blog
            </NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppHeader',
    data () {
        return {
            mobileMenuOpen: false,
        };
    },
    methods: {
        hamburgerMenuClick () {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
    },
    watch: {
        $route () {
            this.mobileMenuOpen = false;
        },
    },
};
</script>

<style scoped>

.app-header {
    display: flex;
    /* text-align: left; */
    justify-content: space-between;
    background-color: #F7FAFB;
}

.logo {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #20BEAD;
    padding: 1rem 0 1rem 2rem;
    font-weight: 700;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
}

.app-header__logo--black {
    color: #000000;
}

.app-header__menu--pc {
    display: flex;
    text-align: right;
    padding: 1rem 0 1rem 2rem;
}

.app-header__menu__link {
    font-size: 1.2rem;
    margin-right: 2rem;
}

.app-header__menu__link:hover {
    color: #BCBCBC !important;
}

.app-header__menu__link--mobile {
    margin-right: 0;
    text-align: left;
    padding: 0.3rem 0 0.3rem 2rem;
}

.app-header__menu--mobile {
    display: none;
}

.app-header__menu__hamburger {
    cursor: pointer;
}

.app-header__menu__hamburger--icon {
    height: 4.2rem;
}

.app-header__menu--mobile__content {
    display: none;
}

@media screen and (max-width: 600px) {
    .logo {
        padding: 1rem 0 0.8rem 1.3rem;
    }

    .app-header__menu--pc {
        display: none;
    }

    .app-header__menu--mobile {
        display: unset;
    }

    .app-header__menu--mobile__content--open {
        display: flex;
        flex-direction: column;
    }
}

</style>
