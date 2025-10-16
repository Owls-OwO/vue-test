<template>
    <div class="profile-table">
        <div class="profile-table__container">
            <div class="profile-table__text-wrapper">
                <div class="profile-table__text-marker">Метки</div>
                <div class="profile-table__text-record-type">Тип записи</div>
                <div class="profile-table__text-login">логин</div>
                <div class="profile-table__text-password">Пароль</div>
            </div>
            <ProfileForm/>
        </div>
    </div>    

</template>

<script setup lang="ts">
import ProfileForm from './ProfileForm.vue';


</script>

<style scoped>

.profile-table__text-wrapper {
    display: flex;
    color: rgba(0, 0, 0, 0.5);

}
.profile-table__text-marker {
    flex-basis: 25%;
}
.profile-table__text-record-type {
    flex-basis: 25%;
}
.profile-table__text-login {
    flex-basis: 25%;
}
.profile-table__text-password {
    flex-basis: 25%;
}
</style>