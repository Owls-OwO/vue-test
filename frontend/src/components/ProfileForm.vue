<template>
    <div class="profile-form">
        <div class="profile-form__container">
            
            <div class="profile-form__field-wrapper">
                <input class="profile-form__marker-input" type="text" placeholder="XXX;YYY;III" v-model="profile.marker" @blur="updateProfile">
            </div>

            <div class="profile-form__field-wrapper">
                <select class="profile-form__record-type-selecter" v-model="profile.type" @click="updateProfile">
                    <option value="local">Локальная</option>
                    <option value="LDAP">LDAP</option>
                </select>
            </div>

            <div class="profile-form__field-wrapper" :class="{'field--wide': isPasswordHidden}">
                <input class="profile-form__login-input" type="text" placeholder="значение" v-model="profile.login" @blur="updateProfile">
            </div>

            <div class="profile-form__field-wrapper" v-show="!isPasswordHidden">
                <input class="profile-form__password-input" type="password" placeholder=" * * * " v-model="profile.password" @blur="updateProfile">
            </div>
            <div class="profile-form__delete-button-wrapper">
                <button class="profile-form__delete-button" @click="handleClickDelete">🗑️</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Profile, UpdatedProfile } from '@/stores/useProfileStore';
import { computed, ref} from 'vue';

const props = defineProps<{
    profile: Profile;
}>();

const original = ref({ ...props.profile, marker: props.profile.marker.join(';')});
const profile = ref({
    ...props.profile,
    marker: props.profile.marker.join(';')
     });
const isPasswordHidden = computed(() => profile.value.type === 'LDAP')

const emit = defineEmits<{
    (e: 'update:profile', payload: UpdatedProfile): void;
    (e: 'delete:profile', id: number): void;
}>();



function updateProfile() {
    for (const key in profile.value) {
        if (profile.value[key as keyof Profile] !== original.value[key as keyof Profile]) {
            const changedField = {} as Record<keyof Profile, Profile[keyof Profile]>;
            changedField[key as keyof Profile] = key === 'marker' ? profile.value.marker.split(';') : profile.value[key as keyof Profile];

            emit('update:profile', {
                id: profile.value.id,
                update: changedField
            });
            original.value = { ...profile.value };
            break;
        }
    }
}

function handleClickDelete() {
    emit('delete:profile', profile.value.id);
}


</script>

<style scoped>
.profile-form__delete-button-wrapper{  
    display: flex;
    justify-content: center;
    align-items: center;
    

}
.profile-form__delete-button {
    background: transparent;
    border: 2px solid rgba(0, 86, 156, 0.25);
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
    height: 32px;
    
    transition: 0.2s;
}
.profile-form__delete-button:hover {
    background: red;
}

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
    grid-template-columns: 1.1fr 0.9fr 1fr 0.9fr 0.1fr;

}

.field--wide {
    grid-column: span 2;
}
</style>