<template>
    <div class="profile-form">
        <div class="profile-form__container">
            
            <div class="profile-form__field-wrapper">
                <input class="profile-form__marker-input" type="text" placeholder="XXX;YYY;III" v-model="markerInput">
            </div>

            <div class="profile-form__field-wrapper">
                <select class="profile-form__record-type-selecter" v-model="selectedType">
                    <option value="local">Локальная</option>
                    <option value="LDAP">LDAP</option>
                </select>
            </div>

            <div class="profile-form__field-wrapper" :class="{'field--wide': isPasswordHidden}">
                <input class="profile-form__login-input" type="text" placeholder="значение" v-model="loginInput">
            </div>

            <div class="profile-form__field-wrapper" v-show="!isPasswordHidden">
                <input class="profile-form__password-input" type="password" placeholder=" * * * " v-model="passwordInput">
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref} from 'vue';

const props = defineProps<{
    marker?: string;
    login?: string;
    password?: string;
    type?: string;
}>();




const selectedType = ref(props.type || 'local');
const markerInput = ref(props.marker || '');
const loginInput = ref(props.login || '');
const passwordInput = ref(props.password || '');


const isPasswordHidden = computed(() => selectedType.value === 'LDAP')




</script>

<style scoped>

.profile-form__record-type-selecter {
    border: 2px solid rgba(0, 86, 156, 0.25);
    border-radius: 4px;
    background: transparent;
    height: 100%;
    width: 100%;
}
.profile-form__container input {
    border: 2px solid rgba(0, 86, 156, 0.25);
    border-radius: 4px;
    background: transparent;
    height: 100%;
    width: 100%;
    padding-left: 4px;
    box-sizing: border-box;
    
}

.profile-form__field-wrapper {
    height: 32px;
    padding-right: 16px;
}


.profile-form__container{
    display: grid;
    grid-template-columns: 1.1fr 0.9fr 1fr 1fr;

}

.field--wide {
    grid-column: span 2;
}
</style>