import { createApp } from 'vue';
import App from './App.vue';
// 引入全局CSS文件
import './assets/style.css'; 

const app = createApp(App);
app.mount('#app');