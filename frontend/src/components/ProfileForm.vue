<template>
    <div class="profile-form">
        <div class="profile-form__container">
            
            <div class="profile-form__field-wrapper">
                <input class="profile-form__input profile-form__input--marker" 
                type="text" 
                placeholder="XXX;YYY;III" 
                v-model="profile.marker" 
                @blur="updateProfile('marker')"
                :class="{ 'profile-form__input--error': !validatedInputs.marker }">
            </div>

            <div class="profile-form__field-wrapper">
                <select class="profile-form__record-type-selecter" 
                v-model="profile.type" 
                @click="updateProfile('type')">
                    <option value="local">Локальная</option>
                    <option value="LDAP">LDAP</option>
                </select>
            </div>

            <div class="profile-form__field-wrapper" :class="{'field--wide': isPasswordHidden}">
                <input class="profile-form__input profile-form__input--login" 
                type="text" placeholder="Значение" 
                v-model="profile.login" 
                @blur="updateProfile('login')"
                :class="{'profile-form__input--error': !validatedInputs.login}">
            </div>

            <div class="profile-form__field-wrapper" v-show="!isPasswordHidden">
                <input class="profile-form__input profile-form__input--password"
                :class="{ 'profile-form__input--error': !validatedInputs.password }"
                type="password"
                placeholder=" * * * * * * * * * " 
                v-model="profile.password" 
                @blur="updateProfile('password')">
            </div>
            <div class="profile-form__delete-button-wrapper">
                <button class="profile-form__delete-button" @click="handleClickDelete">🗑️</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateProfile } from '@/composables/utils/useProfileValidator';
import type { Profile, UpdateProfile} from '@/stores/useProfileStore';
import { computed, ref} from 'vue';

const props = defineProps<{
    profile: Profile;
}>();

// Делаем объект с ключами пропса Profile, все по дефолту true
// Если true -> Ничего
// Если false -> Подсветка красной обводкой
const validatedInputs = ref(Object.fromEntries(Object.keys(props.profile).map(key => [key, true])) as Record<string, boolean>)

const original = ref({ ...props.profile, marker: props.profile.marker.map(item => item.text).join(';') });
const profile = ref({
    ...props.profile,
    marker: props.profile.marker.map(item => item.text).join(';')
    });

const isPasswordHidden = computed(() => profile.value.type === 'LDAP')



/* eslint-disable @typescript-eslint/no-unused-vars */
const emit = defineEmits<{
    (e: 'update:profile', payload: UpdateProfile): void;
    (e: 'delete:profile', id: number): void;
}>();



function updateProfile(input: string) {
    for (const key in profile.value) {
        // Сравнение измененых полей, входные данные будет одно измененное поле
        if (profile.value[key as keyof Profile] !== original.value[key as keyof Profile]) {

            let changedField: Partial<Profile> = {}
            
            // Если ключ 'marker', то тогда мы стрингу из модалки делим по ';', затем все элементы добавляем в объект {text: string}
            if (key === 'marker') {
                const changedMarker: {text: string}[] = profile.value.marker.split(';').map(item => { return {text: item.trim()}});
                changedField = {marker: changedMarker}
            } else {
                changedField = {[key]: profile.value[key as keyof Profile]}
                
                // Очищаем поле модалки если выбран тип LDAP
                if (changedField.type && changedField.type === 'LDAP') {profile.value.password = null}
                
            }

            // Проверка валидации, затем обновление валидируемых данных, иначе ошибка
            if (validateProfile(changedField) || key === 'type') {
                if (!validatedInputs.value[key]) {validatedInputs.value[key] = !validatedInputs.value[key]}
                emit('update:profile', {
                    id: profile.value.id,
                    update: changedField
                });
            } else {
                validatedInputs.value[key] = false
            }
            
            // Обновляем original экземпляр объекта Profile
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

.dev-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
    padding: 8px;
    border: 1px solid black;
    font-size: 1.2rem;
    max-width: 300px;
    max-height: 200px;
    overflow: auto;
    z-index: 1000;
}



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
.profile-form__input {
    border: 2px solid rgba(0, 86, 156, 0.25);
    border-radius: 4px;
    background: transparent;
    height: 100%;
    width: 100%;
    padding-left: 4px;
    box-sizing: border-box;
    transition: 0.2s;
}

.profile-form__input:focus-visible {
    outline: none;
    border: 2px solid rgba(10, 136, 240, 0.75);
    transition: 0.2s;
}
.profile-form__field-wrapper {
    height: 32px;
    padding-right: 16px;
}

.profile-form__input--error {
    border: 2px solid rgba(240, 10, 10, 0.5);
    transition: 0.2s;
}
.profile-form__input--error:focus-visible {
    border: 2px solid rgba(240, 10, 10, 0.85);
}


.profile-form__container{
    display: grid;
    grid-template-columns: 1.1fr 0.9fr 1fr 0.9fr 0.1fr;

}

.field--wide {
    grid-column: span 2;
}

</style>