<template>
    <div class="history-form">
        <h1>Export Historical Data</h1>
        <div>
            Data will be exported in xlsx format.
            For locked staking, each row in the export represents a timestamp at which the staking project became sold out or available.
            For defi staking, each row represents a timestamp with two values: how much currency is available for staking and whether or not the project is sold out.
            These timestamps are logged once every minute.
        </div>
        <div class="history-form__type">
            <a-radio-group
                v-model="selectedStakingType"
                button-style="outline"
                @change="clearForm"
            >
                <a-radio-button value="locked">
                    Locked Staking
                </a-radio-button>
                <a-radio-button value="defi">
                    DeFi Staking
                </a-radio-button>
                <a-radio-button value="locked-savings">
                    Locked Savings
                </a-radio-button>
            </a-radio-group>
        </div>
        <div class="history-form__asset">
            <div v-if="selectedStakingType === 'locked'">
                <div class="history-form__field">
                    <div>
                        Currency:
                    </div>
                    <a-select
                        id="selectLocked"
                        v-model="selectedAsset"
                        placeholder="Select a currency"
                        class="history-form__select"
                        @change="currencySelectChange"
                    >
                        <a-select-option
                            v-for="option in optionsLocked"
                            :key="option.id"
                            :value="JSON.stringify(option)"
                        >
                            {{ option.asset_name }}
                        </a-select-option>
                    </a-select>
                </div>
                <div class="history-form__field history-form__field--radio">
                    <div>
                        Duration:
                    </div>
                    <a-radio-group
                        v-model="selectedDuration"
                        class="history-form__radio-group"
                    >
                        <a-radio
                            v-for="duration in durationsLocked"
                            :key="duration"
                            :value="duration"
                            class="history-form__radio-group__box"
                        >
                            {{ duration }}
                        </a-radio>
                    </a-radio-group>
                </div>
                <div class="history-form__field">
                    <div>
                        Number of days:
                    </div>
                    <a-radio-group
                        v-model="selectedNumDays"
                        class="history-form__radio-group"
                    >
                        <a-radio
                            v-for="numDaysOption in numDaysOptions"
                            :key="numDaysOption.label"
                            :value="numDaysOption.value"
                            class="history-form__radio-group__box"
                        >
                            {{ numDaysOption.label }}
                        </a-radio>
                    </a-radio-group>
                </div>
            </div>
            <div v-else-if="selectedStakingType === 'defi'">
                <div class="history-form__field">
                    <div>
                        Currency:
                    </div>
                    <a-select
                        id="selectDefi"
                        v-model="selectedAsset"
                        placeholder="Select a currency"
                        class="history-form__select"
                        @change="currencyDefiSelectChange"
                    >
                        <a-select-option
                            v-for="option in optionsDefi"
                            :key="option.id"
                            :value="option.asset_name"
                        >
                            {{ option.asset_name }}
                        </a-select-option>
                    </a-select>
                </div>
                <div class="history-form__field">
                    <div>
                        Number of days:
                    </div>
                    <a-radio-group
                        v-model="selectedNumDays"
                        class="history-form__radio-group"
                    >
                        <a-radio
                            v-for="numDaysOption in numDaysOptions"
                            :key="numDaysOption.label"
                            :value="numDaysOption.value"
                            class="history-form__radio-group__box"
                        >
                            {{ numDaysOption.label }}
                        </a-radio>
                    </a-radio-group>
                </div>
            </div>
            <div v-else>
                <div class="history-form__field">
                    <div>
                        Currency:
                    </div>
                    <a-select
                        id="selectLocked"
                        v-model="selectedAsset"
                        placeholder="Select a currency"
                        class="history-form__select"
                        @change="currencySelectChange"
                    >
                        <a-select-option
                            v-for="option in optionsLockedSavings"
                            :key="option.id"
                            :value="JSON.stringify(option)"
                        >
                            {{ option.asset_name }}
                        </a-select-option>
                    </a-select>
                </div>
                <div class="history-form__field history-form__field--radio">
                    <div>
                        Duration:
                    </div>
                    <a-radio-group
                        v-model="selectedDuration"
                        class="history-form__radio-group"
                    >
                        <a-radio
                            v-for="duration in durationsLocked"
                            :key="duration"
                            :value="duration"
                            class="history-form__radio-group__box"
                        >
                            {{ duration }}
                        </a-radio>
                    </a-radio-group>
                </div>
                <div class="history-form__field">
                    <div>
                        Number of days:
                    </div>
                    <a-radio-group
                        v-model="selectedNumDays"
                        class="history-form__radio-group"
                    >
                        <a-radio
                            v-for="numDaysOption in numDaysOptions"
                            :key="numDaysOption.label"
                            :value="numDaysOption.value"
                            class="history-form__radio-group__box"
                        >
                            {{ numDaysOption.label }}
                        </a-radio>
                    </a-radio-group>
                </div>
            </div>
        </div>
        <app-form-submit-button
            :on-click="submitRequest"
            :loading="loading"
            text="Export"
            :show-sign="false"
        />
    </div>
</template>

<script>

import { Modal } from 'ant-design-vue';

import AppFormSubmitButton from './AppFormSubmitButton.vue';

export default {
    name: 'HistoryForm',
    components: {
        AppFormSubmitButton,
    },
    props: {
        optionsLocked: {
            type: Array,
            default () {
                return [];
            },
        },
        optionsDefi: {
            type: Array,
            default () {
                return [];
            },
        },
        optionsLockedSavings: {
            type: Array,
            default () {
                return [];
            },
        },
    },
    data () {
        return {
            durationsLocked: [],
            selectedDuration: undefined,
            selectedAsset: undefined,
            selectedNumDays: 7,
            selectedStakingType: 'locked',
            numDaysOptions: [
                {
                    label: 7,
                    value: 7,
                },
                {
                    label: 14,
                    value: 14,
                },
                {
                    label: 'all',
                    value: null,
                },
            ],
            loading: false,
        };
    },
    methods: {
        async submitRequest () {
            if (!this.selectedAsset) {
                this.warning('Please select a currency !');
                return;
            }
            if (this.selectedStakingType !== 'defi' && !this.selectedDuration) {
                this.warning('Please select a staking duration to export !');
                return;
            }
            try {
                this.loading = true;
                const response = await this.$axios.get(`${this.$config.baseUrl}/api/history/${this.selectedStakingType}`, {
                    params: {
                        assetName: this.selectedAsset,
                        duration: this.selectedDuration,
                        numDays: this.selectedNumDays,
                    },
                    responseType: 'blob',
                });

                const filename = this.getFilenameFromHeader(response.headers);

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
            } catch (err) {
                console.log(err);
                // TODO: show error
            } finally {
                this.loading = false;
            }
        },
        getFilenameFromHeader (headers) {
            try {
                const contentDisposition = headers['content-disposition'];
                const filename = contentDisposition.split('"')[1];
                return filename;
            } catch (err) {
                return 'export.xlsx';
            }
        },
        warning (message) {
            Modal.warning({
                title: message,
            });
        },
        currencySelectChange (value) {
            // value is JSON stringified object
            // this is a workaround since Ant Design does not support object type as value in select option
            const option = JSON.parse(value);
            this.durationsLocked = option.durations;
            this.selectedDuration = null;
            this.selectedAsset = option.asset_name;
        },
        currencyDefiSelectChange (value) {
            this.selectedAsset = value;
        },
        clearForm () {
            this.selectedAsset = undefined;
            this.selectedDuration = undefined;
            this.durationsLocked = [];
        },
    },
};
</script>

<style scoped>

.history-form {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 2.4rem auto 0 auto;
    padding: 2rem 2rem 0 2rem;
    padding: 2rem 2rem;
    background-color: white;
    border-radius: 1.8rem;
}

.history-form__type {
    margin-top: 2rem;
    display: flex;
}

.history-form__asset {
    margin-top: 1.4rem;
    margin-bottom: 2rem;
}

.history-form__field {
    margin-top: 1rem;
    display: flex;
    align-items: baseline;
}

.history-form__select {
    margin-left: 1.4rem;
    width: 10rem;
}

.history-form__radio-group {
    margin-left: 1.4rem;
}

@media screen and (max-width: 600px) {

    .history-form {
        width: 100%;
        border-radius: 0;
    }

    .history-form__radio-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .history-form__radio-group__box {
        line-height: 2rem;
    }
}

</style>
