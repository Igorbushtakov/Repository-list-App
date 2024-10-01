import {createApp} from 'vue'
import '@/style.css'
import App from '@/App.vue'
import pointerDown from "@/directives/pointerdown.js";

const app = createApp(App)
app.directive('long-click', pointerDown);
app.mount('#app')
