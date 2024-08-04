import {createApp} from 'vue'
import App from "./App.vue";
import router from './router'

// const App = defineComponent({
//     setup() {
//         var dateTime = new DateTime(2024, 7, 17);
//         console.log(dateTime.toString())
//     }
// })

createApp(App).use(router).mount('#root')

function requestGet(url: string, callback: Function) {
    try {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                callback(JSON.parse(xhr.response))
            }
        }

        xhr.onerror = function (ev) {
            console.log(ev)
            callback({})
        }

        xhr.open('GET', url)
        xhr.send();
    } catch (e) {
        console.log(e)
        callback({})
    }
}
