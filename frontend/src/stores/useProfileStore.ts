import { defineStore } from "pinia";



export interface Profile {
    id: number;
    marker: string[];
    login: string;
    password: string | null;
    type: 'local' | 'LDAP';
}

export interface UpdateProfile {
    id: number,
    update: Partial<Profile>
}

type State = {
    profiles: Profile[]
};

export const useProfileStore = defineStore("profileStore", {
    state: (): State => ({
        profiles: [],
    }),
    actions: {
        addProfile():void {
            this.profiles.push({
                id: Math.floor(Math.random() * 1000000),
                marker: [],
                login: "",
                password: "",
                type: "local"
            });
            this.saveToLocalStorage();
        },

        updateProfile(changes: UpdateProfile):void {
            const index = this.profiles.findIndex(profile => profile.id === changes.id);
            if (index !== -1) {
                for (const key in changes.update) {
                    (this.profiles[index] as any)[key] = (changes.update as any)[key];
                }
            }
            this.saveToLocalStorage();
        },

        deleteProfile(profileId: number):void {
            this.profiles = this.profiles.filter(profile => profile.id !== profileId);
            this.saveToLocalStorage();
        },
        
        saveToLocalStorage(){
            localStorage.setItem('profileStore', JSON.stringify(this.profiles));
        },

        loadFromLocalStorage() {
            const data = localStorage.getItem('profileStore')
            if (data) {
                this.profiles = JSON.parse(data)
            }
        }
    }
})