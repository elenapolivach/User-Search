const api = `https://api.github.com`

const app = new Vue ({
    el: '#app',
    data: {
        userName: '',
        urlName: '',
        urlRepos: '',
        dataName: {},
        dataRepos: [],
        totalRepos: 0,
        sizePage: 3,
        currentPage: 1,
        maxPages: 0, 
        filtered: [],
        star: false,
        name: false
    },

    methods: {
        init(userName) {
            this.dataName = {},
            this.dataRepos = []
            this.currentPage = 1;
            this.urlName = `/users/${userName}`
            this.urlRepos = `/users/${userName}/repos`
            this.fetchData(),
            this.fetchRepos()
            this.userName = ''
        },

        fetchData() {
            fetch(`${api + this.urlName}`)
            .then(result => result.json())
            .then(data => {
                this.dataName = data;
                this.$refs.error.setText(this.dataName.message);
                console.log('dataName', this.dataName)
            })
            .catch(error => console.log(error)); 
        },

        fetchRepos() {
            fetch(`${api + this.urlRepos + `?page=${this.currentPage}&per_page=${this.sizePage}`}`)
            .then(result => result.json())
            .then(data => {
                this.dataRepos= [...data];
                this.filtered = this.dataRepos;
                console.log('dataRepos', this.dataRepos);
            })
            .catch(error => console.log(error));
        },

        noUser() {
            if(!this.dataName.created_at){
                return true;
            }else{
                return false;
            }
        },

        maxRepos(){
            return this.totalRepos = this.dataName.public_repos;
        },

        maxPagesNumber() {
            this.maxRepos()
            return this.maxPages = Math.ceil(this.totalRepos/this.sizePage);
        },

        nextPage () {
            this.maxPagesNumber()
            if(this.maxPages > this.currentPage){
                this.currentPage++;
                fetch(`${api + this.urlRepos + `?page=${this.currentPage}&per_page=${this.sizePage}`}`)
                .then(result => result.json())
                .then(data => {
                    this.dataRepos= [...data];
                    this.filtered = this.dataRepos;
                    console.log(this.dataRepos);
                })
                    .catch(error => console.log(error));
                    return;
            }else {
                return this.currentPage;
           }  
        },
        prevPage() {
            this.maxPagesNumber()
            if(this.currentPage > 1){
                this.currentPage--;
                fetch(`${api + this.urlRepos + `?page=${this.currentPage}&per_page=${this.sizePage}`}`)
                .then(result => result.json())
                .then(data => {
                this.dataRepos= [...data];
                this.filtered = this.dataRepos;
                console.log(this.dataRepos);
            })
                .catch(error => console.log(error));
                return
           }else {
                return this.currentPage;
           }
        },
        filterName(){
            if(!this.name) {
                this.name=!this.name;
                this.filtered.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                })
            }else{
                this.name=!this.name;
                this.filtered.sort((a, b) => {
                    if (b.name < a.name) {
                        return -1;
                    }
                })
            } 
        },
        filterStar(){
            if(!this.star) {
                this.star=!this.star;
                this.filtered.sort((a, b) => {
                    return b.stargazers_count - a.stargazers_count;
                })
            }else{
                this.star=!this.star;
                this.filtered.sort((a, b) => {
                    return a.stargazers_count - b.stargazers_count;
                }) 
            }
        }
    }      
})




