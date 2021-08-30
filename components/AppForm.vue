<template>
    <div class="app-form">
        <h1>Set up notifications</h1>
        <div class="app-form__description">
            Email notifications support was dropped due to high traffic and full features of the bot are now available only on Telegram.
            However, as a legacy, you can set up email notifications for new listings of staking options on Binance.
        </div>
        <div class="app-form__email-input">
            <label class="app-form__label">Email address: </label>
            <a-input
                v-model="email"
                type="email"
                class="app-form__email-input__field"
                placeholder="@"
            />
        </div>
        <div class="app-form__part">
            <h4>Locked Staking</h4>
            <div class="app-form__new-assets-checkbox">
                <a-checkbox
                    v-model="subscribeNewAssetsLocked"
                >
                    Notify me when locked staking of a new currency becomes available
                </a-checkbox>
            </div>
        </div>
        <div class="app-form__part">
            <h4>DeFi Staking</h4>
            <div class="app-form__new-assets-checkbox">
                <a-checkbox
                    v-model="subscribeNewAssetsDefi"
                >
                    Notify me when DeFi staking of a new currency becomes available
                </a-checkbox>
            </div>
        </div>
        <div class="app-form__part">
            <h4>Activities</h4>
            <div class="app-form__assets-checkbox-group__label">
                This concerns tab Activities at
                <a href="https://www.binance.com/en/savings" target="_blank">
                    https://www.binance.com/en/savings
                </a>.
            </div>
            <div class="app-form__new-assets-checkbox">
                <a-checkbox
                    v-model="subscribeActivities"
                >
                    Notify me when new lending activity appears on Binance
                </a-checkbox>
            </div>
        </div>
        <app-form-submit-button
            :onClick="submitRequest"
            :loading="loading"
            class="umami--click--submit-button"
        />
    </div>
</template>

<script>

import { Modal } from 'ant-design-vue';

import AppFormSubmitButton from './AppFormSubmitButton.vue';

export default {
    components: {
        AppFormSubmitButton,
    },
    name: 'app-form',
    data () {
        return {
            email: '',
            subscribeNewAssetsLocked: false,
            subscribeNewAssetsDefi: false,
            subscribeActivities: false,
            loading: false,
        };
    },
    methods: {
        async submitRequest () {
            try {
                if (!this.emailIsValid(this.email)) {
                    this.warning('Please enter valid email address !');
                    return;
                }

                if (this.formIsEmpty()) {
                    this.warning('Please select at least something which you will subscribe !');
                    return;
                }

                this.loading = true;

                const parameters = {
                    email: this.email,
                    subscribeNewAssetsLocked: this.subscribeNewAssetsLocked,
                    subscribeNewAssetsDefi: this.subscribeNewAssetsDefi,
                    subscribeActivities: this.subscribeActivities,
                };

                const url = `${this.$config.baseUrl}/api/subscription/create`;
                await this.$axios.$post(url, parameters);

                this.loading = false;

                this.success();
            } catch (err) {
                this.loading = false;
                this.error();
            }
        },
        success() {
            Modal.success({
                title: 'Success',
                content: <div><p>To confirm notification subscription, click on the link in the email we just sent you.</p></div>
            });
        },
        error() {
            Modal.error({
                title: 'Error !',
                content:
                    <div>
                        <p>
                            Something went wrong, please try again later.
                        </p>
                    </div>
            });
        },
        warning(message) {
            Modal.warning({
                title: message,
            });
        },
        emailIsValid (email) {
            if (email.length === 0) {
                return false;
            }
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        },
        formIsEmpty () {
            return !this.subscribeNewAssetsLocked && !this.subscribeNewAssetsDefi && !this.subscribeActivities;
        },
    },
};
</script>

<style scoped>

.app-form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 2.4rem auto 0 auto;
    padding: 2rem 2rem 0 2rem;
    padding: 2rem 2rem;
    background-color: white;
    border-radius: 1.8rem;
}

.app-form__description {
    text-align: left;
}

.app-form__email-input {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.app-form__label {
    margin-right: 1rem;
}

.app-form__part {
    margin-top: 1.2rem;
}

.app-form__email-input__field {
    max-width: 20rem;
}

.app-form__new-assets-checkbox {
    text-align: left;
    margin: 1rem 0 0 0;
}

.app-form__assets-checkbox-group__label {
    margin: 1rem 0 1rem 0.2rem;
    text-align: left;
}

h4 {
    font-weight: bold;
    text-align: left;
    margin: 1.4rem 0 0 0;
}

@media screen and (max-width: 600px) {

    .app-form {
        width: 100%;
        border-radius: 0;
    }

    .app-form__part {
        margin-top: 0.1rem;
    }

    .app-form__email-input {
        margin-top: 2rem;
        flex-direction: column;
        align-items: flex-start;
    }

    .app-form__email-input__field {
        margin-top: 0.2rem;
    }
}

</style>
