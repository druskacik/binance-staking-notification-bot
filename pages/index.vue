<template>
  <div class="home">
    <div class="home__description-and-form">
      <div class="home__description-and-form__element">
        <app-description />
      </div>
      <div class="home__description-and-form__element">
        <app-form
          :optionsLocked="optionsLocked"
          :optionsDefi="optionsDefi"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
    async asyncData ({ $axios, $config }) {
        const url = `${$config.baseUrl}/api/get-staking-info`;
        const response = await $axios.$get(url);

        const optionsLocked = response.assetsLocked.map(asset => ({
            label: asset.asset_name,
            value: asset.id,
        }));
        optionsLocked.sort((a, b) => {
            if (a.label < b.label) { return -1; }
            if (a.label > b.label) { return 1; }
            return 0;
        });

        const optionsDefi = response.assetsDefi.map(asset => ({
            label: asset.asset_name,
            value: asset.id,
        }));
        optionsDefi.sort((a, b) => {
            if (a.label < b.label) { return -1; }
            if (a.label > b.label) { return 1; }
            return 0;
        });

        return {
            optionsLocked,
            optionsDefi,
        };
    },
};
</script>

<style scoped>

.home__description-and-form {
    display: flex;
    flex-direction: row;
}

.home__description-and-form__element {
    width: 50%;
}

@media screen and (max-width: 900px) {

    .home__description-and-form {
        flex-direction: column;
    }

    .home__description-and-form__element {
        width: 100%;
    }
}

</style>
