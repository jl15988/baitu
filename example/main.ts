import {createApp, defineComponent} from 'vue'

const App = defineComponent({
    setup() {

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
