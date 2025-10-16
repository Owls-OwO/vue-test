<template>
    <div class="profile-form">
        <div class="profile-form__container">
            
            <div class="profile-form__field-wrapper">
                <input class="profile-form__marker-input" type="text" placeholder="XXX;YYY;III">
            </div>

            <div class="profile-form__field-wrapper">
                <select class="profile-form__record-type-selecter" id="record-type" v-model="selectedType">
                    <option value="local">Локальная</option>
                    <option value="LDAP">LDAP</option>
                </select>
            </div>

            <div class="profile-form__field-wrapper" :class="{'field--wide': !isVisible}">
                <input class="profile-form__login-input" type="text" placeholder="значение">
            </div>

            <div class="profile-form__field-wrapper" :class="{'field--hidden': !isVisible}">
                <input class="profile-form__password-input" type="password" placeholder=" * * * ">
            </div>

            
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

let selectedType = ref('local');

const isVisible = computed(() => selectedType.value === 'local')
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


.field--hidden {
    display: none;
}
.field--wide {
    grid-column: span 2;
}
</style>