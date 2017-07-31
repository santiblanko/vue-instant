<template>
  <div id="app">
    <label>{{selectedEvent}}</label>
    <vue-instant :suggestion-attribute="suggestionAttribute" v-model="value" :disabled="false"  @input="changed" @click-input="clickInput" @click-button="clickButton" @selected="selected"  @enter="enter" @key-up="keyUp" @key-down="keyDown" @key-right="keyRight" @clear="clear"  @escape="escape" :show-autocomplete="true" :autofocus="false" :suggestions="suggestions" name="customName" placeholder="custom placeholder" type="google"></vue-instant>
  </div>
</template>

<script>
import Vue from 'vue'
import VueInstant from 'vue-instant'
import 'vue-instant/dist/vue-instant.css'
import axios from 'axios'

Vue.use(VueInstant)

export default {
  name: 'app',
  data () {
    return {
        value: '',
        suggestionAttribute: 'original_title',
        suggestions: [],
        selectedEvent: ""
    }
  },
  methods: {
    clickInput () {
      this.selectedEvent = 'click input'
    },
    clickButton () {
      this.selectedEvent = 'click button'
    },
    selected () {
      this.selectedEvent = 'selection changed'
    },
    enter () {
      this.selectedEvent = 'enter'
    },
    keyUp: function() {
      this.selectedEvent = 'keyup pressed'
    },
    keyDown: function() {
      this.selectedEvent = 'keyDown pressed'
    },
    keyRight: function() {
      this.selectedEvent = 'keyRight pressed'
    },
    clear: function() {
      this.selectedEvent = 'clear input'
    },
    escape: function() {
      this.selectedEvent = 'escape'
    },
    changed: function() {
      var that = this
      this.suggestions = []
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=342d3061b70d2747a1e159ae9a7e9a36&query=' + this.value)
          .then(function(response) {
          response.data.results.forEach(function(a) {
              that.suggestions.push(a)
          })
      })
    }
  }
}
</script>

