
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/style.css'
import App from './App.vue'



const app = createApp(App)

app.use(Toast, {
  position: 'top-right',
  timeout: 2000,
})

app.mount("#app");
