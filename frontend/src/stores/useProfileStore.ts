import { defineStore } from "pinia";

export const useProfileStore = defineStore("profileStore", {
    state: () => ({
        profiles: [
            { id: 1, marker: "User", login: "user1", password: "pass1", type: "local" },
            { id: 2, marker: "Admin", login: "admin", password: "adminpass", type: "local" },
            { id: 3, marker: "Guest", login: "guest", password: "guestpass", type: "local" },
        
        ]

    })

})