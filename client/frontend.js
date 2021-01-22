import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'


Vue.component('loader', {
  template: `
    <div style="display: flex;justify-content: center;align-items: center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `
})

new Vue({
  el: '#app',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        secondName: "",
        departament:"",
        value: 0
        
      },
      credits: [
        
        {
        name: '',
        secondName: "",
        departament: "",
        value: 0
        
         }
      ]
    }
  }
  ,
  computed: {
    canCreate() {
      return this.form.secondName.trim()&&this.form.name.trim()&&this.form.departament.trim()
    }
  }
  ,
  methods: {
    async createCredit() {
      const {...credit} = this.form
      console.log("Запись сформирована FRONTEND",credit)
      const newCredit = await request('/api/credits', 'POST', credit)

 
    },
    
    async removeCredit(id) {
      await request(`/api/credits/${id}`, 'DELETE')
    }
  },
  async mounted() {
    this.loading = true
    this.credits = await request('/api/credits')
    this.loading = false
  }
})

async function request(url, method = 'GET', data = null, headers = {}) {
  try {
     let body
     if (data)
     {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(data)
    }

    const response = await fetch(url, {
      method,
      headers,
      body
    })
    return await response.json()
  } catch (e) {
    console.warn('Error Error Error:', e.message)
  }
}
