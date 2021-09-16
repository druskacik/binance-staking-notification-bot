<template>
    <div class="app-form__submit-section">
        <a-button
            type="primary"
            class="app-form__submit-button"
            :loading="loading"
            @click="onClick"
        >
            <span class="app-form__submit-button__text">
                {{ text }}
            </span>
        </a-button>
        <div
            v-if="showSign"
            class="app-form__submit-section--text"
        >
            It's free !
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppFormSubmitButton',
    props: {
        onClick: {
            type: Function,
            default () {
                return () => {};
            },
        },
        loading: Boolean,
        text: {
            default: 'Submit',
            type: String,
        },
        showSign: {
            default: true,
            type: Boolean,
        },
    },
};
</script>

<style scoped>

.app-form__submit-section {
    margin-top: 4rem;
    display: flex;
    align-items: baseline;
}

.app-form__submit-button {
    margin-left: 1rem;
    height: 3rem;
    border-radius: 15px;
    font-size: 1.2rem;
}

.app-form__submit-button__text {
    margin: 0 1rem;
}

.ant-btn-primary {
    background-color: #20BEAD;
    border-color: #20BEAD;
}

.ant-btn-primary:hover {
    background-color: #20BEAD;
    border-color: #20BEAD;
}

.ant-btn-primary:focus {
    background-color: #20BEAD;
    border-color: #20BEAD;
}

.app-form__submit-section--text {
    margin-left: 2rem;
    color: #B9B9B9;
}

@media screen and (max-width: 600px) {

    .app-form__submit-button {
        margin: 0;
        width: 50%;
    }

    .app-form__submit-section--text {
        margin: 0;
        width: 50%;
    }
}

</style>
