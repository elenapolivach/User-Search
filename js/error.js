Vue.component('error' , {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        setText(value) {
            if(value){
                return this.text = value;
            }else{
                return this.text = ''
            }
        },
    },
    template: `<div class="error-block" v-if="text">Ошибка поиска: {{ this.text }}.
                Пользователь не найден!
                </div>`
})