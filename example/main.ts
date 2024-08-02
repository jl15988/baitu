import {createApp, defineComponent} from 'vue'
import {DateTime} from "../src/index";

const App = defineComponent({
    setup() {
        var dateTime = new DateTime(2024, 7, 17);
        console.log(dateTime.toString())
    }
})

createApp(App).mount('#root')

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
