<template>
    <div class="dev">
        <pre>{{profileStore.profiles}}</pre>

    </div>

    <div class="profile-window">
        <div class="profile-window__container">
            <div class="profile-window__button-wrapper">
                <span>Учетные записи</span>
                <button class="profile-window__button" @click="profileStore.addProfile">+</button>
            </div>
            <div class="profile-window__hint-wrapper">
                <span>?</span>
                <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ' ; '</span>
            </div>
            

            <div class="profile-table">
                <div class="profile-table__container">
                    <div class="profile-table__text-wrapper">
                        <div class="profile-table__text-marker">Метки</div>
                        <div class="profile-table__text-record-type">Тип записи</div>
                        <div class="profile-table__text-login">Логин</div>
                        <div class="profile-table__text-password">Пароль</div>
                        <div class="profile-table__empty-delete-column"></div>
                    </div>
                    <div class="profile-table__profiles-list">
                        <ProfileForm
                            v-for="profile in profileStore.profiles"
                            :key="profile.id"
                            :profile="profile"
                            @update:profile="profileStore.updateProfile"
                            @delete:profile="profileStore.deleteProfile"
                        />
                    </div>
                </div>
            </div>  


        </div>
    </div>

</template>

<script setup lang="ts">
import ProfileForm from '@/components/ProfileForm.vue';
import { useProfileStore } from '@/stores/useProfileStore';
import { onMounted } from 'vue';

const profileStore = useProfileStore();
onMounted(() => {
    profileStore.loadFromLocalStorage();
})


</script>

<style scoped>
    .dev{
        position: fixed;
        top: 20px;
        left: 40px;

        background-color: white;

        min-height: 30px;
        max-width: 500px;
        border-radius: 4px;
        padding: 8px;
    }
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        
        margin-top: 80px;
        margin-bottom: 80px;

    }

    .profile-window {
        width: 100%;
        max-width: 800px;
        background-color: rgb(243, 243, 243);
        border-radius: 20px;
    }
    .profile-window__container {
        padding: 20px;

    }

    .profile-window__button-wrapper {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-bottom: 8px;
    }

    .profile-window__button-wrapper span{
        font-size: 2rem;

    }
    .profile-window__button {
        min-width: 48px;
        min-height: 48px;
        font-size: 2.5rem;
        padding: 0px;
        color: #00000083;
        background: transparent;
        border: 2px solid #dddddd;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.2s;
    }
    .profile-window__button:hover {
        background: #dddddd;
    }

    .profile-window__hint-wrapper {
        display: flex;
        align-items: center;
        gap: 6px; 
        background-color: rgba(64, 140, 255, 0.219);
        border-radius: 4px;
        padding: 8px 12px;
    }
    .profile-window__hint-wrapper span:nth-child(1) {
        border: 2px solid #000000;
        display: flex;
        justify-content: center;
        align-items: center;

        width: 24px;
        height: 24px;
        border-radius: 30px;
        font-size: 1.5rem;
    }

    /* profile-table */
    .profile-table {
        margin-top: 24px;
    }
    .profile-table__text-wrapper {
        display: grid;
        color: rgba(0, 0, 0, 0.5);
        
        grid-template-columns: 1.1fr 0.9fr 1fr 1fr 0.1fr;
    }
    .profile-table__profiles-list {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

</style>