Vue.component ('pagination', {
    props: {
        current: {
            type: Number,
        }, 
        size: {
            type: Number,
            default: 3
        },
        total: {
            type: Number,
            default: 0
        } 
    },
    
    computed: {
        maxPages() {
            if (this.total % this.size != 0 ) {
                return parseInt(this.total/this.size) + 1;
            } else {
                return parseInt(this.total/this.size);
            }
        },
        
    },
    
   template: `<div class="pagination-style">
                <div><a href="#!" @click.prevent="$emit('prev-page')" class=" waves-effect pagination-btn"><i class="material-icons">arrow_back</i></a></div>
                <span class="pagination-page">Страница {{ current }} из {{ maxPages }}</span>
                <div><a href="#!" @click.prevent="$emit('next-page')" class="pagination-btn waves-effect"><i class="material-icons">arrow_forward</i></a></div> <br>
            </div>`
})
