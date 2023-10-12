import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import ServicesAPI from '../api/ServicesAPI'

export const useServicesSrore = defineStore('services', () => {


    onMounted(async () => {
        try {
            const { data } = await ServicesAPI.all()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    })

    return {

    }
})