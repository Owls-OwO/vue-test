import { defineStore } from "pinia";



export interface Profile {
    id: number;
    marker: {text: string}[];
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
                marker: [{text: ""}],
                login: "",
                password: "",
                type: "local"
            });
            this.saveToLocalStorage();
        },

        updateProfile(changes: UpdateProfile):void {

            if(changes.update.type === "LDAP") {
                changes.update.password = null
            }

            const index = this.profiles.findIndex(profile => profile.id === changes.id)

            
            for(const [prop, value] of Object.entries(changes.update)){
                // @ts-ignore
                this.profiles[index][prop] = value
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