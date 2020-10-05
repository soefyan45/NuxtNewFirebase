<template>
  <div class="col-lg-6 mx-auto my-4">
      <div class="card">
          <div class="card-header">
              <h3>Profile</h3>
              <div class="card-body">
                  <h3>{{user.email}}</h3>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus fuga veritatis sint rem minus dolore. Corporis quis ad iure debitis, est voluptatum esse blanditiis eligendi. Aperiam facilis autem dicta ut.</p>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import {
    mapState
} from 'vuex'
export default {
  layout: 'fire',
    data() {
      return {
        title: 'Profile Page'
      }
    },
    computed: {
        ...mapState('users',{
            user: state => state.user,
        }),
    },
    head() {
      return {
        title: this.title+' '+this.user.email,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }

}
</script>

<style>

</style>