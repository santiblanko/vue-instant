<template>
<div>
    <div class="main">
      <form novalidate="novalidate" onsubmit="return false;" :class="getFormClass">
        <div role="search" :class="getClassWrapper">
          <input type="search" name="search" :placeholder="getPlaceholder" autocomplete="off" required="required" :class="getClassInputPlaceholder">
          <input :disabled="disabled" @click="emitClickInput" @keyup='changeText' v-model='textVal' type="search" :name="name" placeholder="" autocomplete="off" required="required" :class="getClassInput" :autofocus="autofocus">
          <button @click="emitClickButton" type="submit" :class="getClassSubmit">
            <svg role="img" aria-label="Search">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="getSVGSearch"></use>
            </svg>
          </button>
          <button @click="reset" type="reset" :class="getClassReset">
            <svg role="img" aria-label="Reset">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="getSVGClear"></use>
            </svg>
          </button>
           <div v-if="modeIsFull" class='el-input-group__append'>
             <ul v-on-clickaway="away" v-if="suggestionsIsVisible && showSuggestions" class="vue-instant__suggestions">
                 <li @click="selectedAction(index)" v-for="(item, index) in similiarData" :class="getClassHighlighted(index)">{{item[suggestionAttribute]}}</li>
             </ul>
          </div>
        </div>
      </form>
      </div>

    <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
      <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-search-8" viewBox="0 0 40 40">
        <path d="M16 32c8.835 0 16-7.165 16-16 0-8.837-7.165-16-16-16C7.162 0 0 7.163 0 16c0 8.835 7.163 16 16 16zm0-5.76c5.654 0 10.24-4.586 10.24-10.24 0-5.656-4.586-10.24-10.24-10.24-5.656 0-10.24 4.584-10.24 10.24 0 5.654 4.584 10.24 10.24 10.24zM28.156 32.8c-1.282-1.282-1.278-3.363.002-4.643 1.282-1.284 3.365-1.28 4.642-.003l6.238 6.238c1.282 1.282 1.278 3.363-.002 4.643-1.283 1.283-3.366 1.28-4.643.002l-6.238-6.238z"
        fill-rule="evenodd" />
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-clear-4" viewBox="0 0 20 20">
        <path d="M11.664 9.877l4.485 4.485-1.542 1.54-4.485-4.485-4.485 4.485-1.54-1.54 4.485-4.485-4.485-4.485 1.54-1.54 4.485 4.484 4.485-4.485 1.54 1.542-4.484 4.485zM10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10z" fill-rule="evenodd"
        />
      </symbol>
    </svg>
</div>
</template>
<script>
  import { mixin as clickaway } from 'vue-clickaway'
  export default {
    name: 'vueInstant',
    mixins: [ clickaway ],
    props: {
      'value': {
        type: String,
        required: true
      },
      'suggestions': {
        type: Array,
        required: true
      },
      'suggestionAttribute': {
        type: String,
        required: true
      },
      'placeholder': {
        type: String,
        default: 'write something...'
      },
      'minMatch': {
        type: Number,
        default: 2
      },
      'name': {
        type: String,
        default: 'vueInstant'
      },
      'autofocus': {
        type: Boolean,
        default: true
      },
      'disabled': {
        type: Boolean
      },
      'type': {
        type: String,
        default: 'facebook'
      },
      'showAutocomplete': {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        selectedEvent: null,
        selectedSuggest: null,
        inputChanged: false,
        suggestionsIsVisible: true,
        highlightedIndex: 0,
        highlightedIndexMax: 7,
        textVal: this.value,
        similiarData: [],
        placeholderVal: this.placeholder,
        types: [{
          name: 'facebook',
          formClass: 'searchbox sbx-facebook',
          classWrapper: 'sbx-facebook__wrapper',
          classInput: 'sbx-facebook__input',
          classInputPlaceholder: 'sbx-facebook__input-placeholder',
          classSubmit: 'sbx-facebook__submit',
          svgSearch: '#sbx-icon-search-8',
          classReset: 'sbx-facebook__reset',
          svgClear: '#sbx-icon-clear-4',
          highlighClass: 'highlighted__facebook'
        },
        {
          name: 'google',
          formClass: 'searchbox sbx-google',
          classWrapper: 'sbx-google__wrapper',
          classInput: 'sbx-google__input',
          classInputPlaceholder: 'sbx-google__input-placeholder',
          classSubmit: 'sbx-google__submit',
          svgSearch: '#sbx-icon-search-8',
          classReset: 'sbx-google__reset',
          svgClear: '#sbx-icon-clear-4',
          highlighClass: 'highlighted__google'
        },
        {
          name: 'amazon',
          formClass: 'searchbox sbx-amazon',
          classWrapper: 'sbx-amazon__wrapper',
          classInput: 'sbx-amazon__input',
          classInputPlaceholder: 'sbx-amazon__input-placeholder',
          classSubmit: 'sbx-amazon__submit',
          svgSearch: '#sbx-icon-search-8',
          classReset: 'sbx-amazon__reset',
          svgClear: '#sbx-icon-clear-4',
          highlighClass: 'highlighted__amazon'
        },
        {
          name: 'twitter',
          formClass: 'searchbox sbx-twitter',
          classWrapper: 'sbx-twitter__wrapper',
          classInput: 'sbx-twitter__input',
          classInputPlaceholder: 'sbx-twitter__input-placeholder',
          classSubmit: 'sbx-twitter__submit',
          svgSearch: '#sbx-icon-search-8',
          classReset: 'sbx-twitter__reset',
          svgClear: '#sbx-icon-clear-4',
          highlighClass: 'highlighted__twitter'
        },
        {
          name: 'spotify',
          formClass: 'searchbox sbx-spotify',
          classWrapper: 'sbx-spotify__wrapper',
          classInput: 'sbx-spotify__input',
          classInputPlaceholder: 'sbx-spotify__input-placeholder',
          classSubmit: 'sbx-spotify__submit',
          svgSearch: '#sbx-icon-search-8',
          classReset: 'sbx-spotify__reset',
          svgClear: '#sbx-icon-clear-4',
          highlighClass: 'highlighted__spotify'
        },
        {
          name: 'custom',
          formClass: 'searchbox sbx-custom',
          classWrapper: 'sbx-custom__wrapper',
          classInput: 'sbx-custom__input',
          classInputPlaceholder: 'sbx-custom__input-placeholder',
          classSubmit: 'sbx-custom__submit',
          svgSearch: '#sbx-icon-search-8',
          classReset: 'sbx-custom__reset',
          svgClear: '#sbx-icon-clear-4',
          highlighClass: 'highlighted__custom'
        }
        ]
      }
    },
    computed: {
      getPlaceholder () {
        if (this.inputChanged || this.textValIsEmpty()) {
          return this.placeholderVal
        }
      },
      modeIsFull () {
        return this.showAutocomplete
      },
      showSuggestions () {
        return this.similiarData.length >= this.minMatch
      },
      getPropertiesClass () {
        var type = this.getType()
        return type.properties
      },
      getFormClass () {
        var type = this.getType()
        return type.formClass
      },
      getClassWrapper () {
        var type = this.getType()
        return type.classWrapper
      },
      getClassInput () {
        var type = this.getType()
        return type.classInput
      },
      getClassInputPlaceholder () {
        var type = this.getType()
        return type.classInputPlaceholder
      },
      getClassSubmit () {
        var type = this.getType()
        return type.classSubmit
      },
      getSVGSearch () {
        var type = this.getType()
        return type.svgSearch
      },
      getClassReset () {
        var type = this.getType()
        return type.classReset
      },
      getSVGClear () {
        var type = this.getType()
        return type.svgClear
      }
    },
    methods: {
      decrementHighlightedIndex () {
        this.highlightedIndex -= 1
      },
      incrementHighlightedIndex () {
        this.highlightedIndex += 1
      },
      escapeAction () {
        this.clearHighlightedIndex()
        this.clearSimilarData()
        this.clearSelected()
        this.setBlur()
        this.emitEscape()
      },
      arrowRightAction () {
        this.setPlaceholderAndTextVal()
        this.emitKeyRight()
      },
      arrowDownAction () {
        if (this.arrowDownValidation()) {
          this.incrementHighlightedIndex()
          this.setPlaceholderAndTextVal()
          this.emitKeyDown()
        } else {
          this.clearHighlightedIndex()
        }
      },
      arrowUpAction () {
        if (this.highlightedIndex > 0) {
          this.decrementHighlightedIndex()
          this.setPlaceholderAndTextVal()
          this.emitKeyUp()
        } else {
          this.clearHighlightedIndex()
        }
      },
      enterAction () {
        this.setFinalTextValue()
        this.clearHighlightedIndex()
        this.clearSimilarData()
        this.emitEnter()
      },
      selectedAction (index) {
        this.highlightedIndex = index
        this.setFinalTextValue()
        this.clearPlaceholder()
        this.clearSimilarData()
        this.emitSelected()
      },
      addRegister (o) {
        if (this.isSimilar(o) && this.textValIsNotEmpty()) {
          this.addSuggestion(o)
        }
      },
      addSuggestion (o) {
        if (!this.findSuggestionTextIsRepited(o)) {
          this.addToSimilarData(o)
        }
      },
      addToSimilarData (o) {
        if (this.canAddToSimilarData()) {
          this.placeholderVal = this.letterProcess(o)
          this.selectedSuggest = o
          this.emitSelected()
          this.similiarData.unshift(o)
        }
      },
      setTextValue (e) {
        if (e.target.value.trim()) {
          this.textVal = e.target.value
          this.emitChange()
        }
      },
      setSelectedAsTextValue () {
        this.textVal = this.selected
      },
      setInitialTextValue () {
        this.textVal = this.value
      },
      setFinalTextValue () {
        if (this.finalTextValueValidation()) {
          this.setPlaceholderAndTextVal()
          this.emitChange()
        } else {
          this.clearAll()
        }
      },
      setPlaceholderAndTextVal () {
        if (typeof this.similiarData[this.highlightedIndex] !== 'undefined') {
          var suggest = this.similiarData[this.highlightedIndex]
          this.placeholderVal = suggest[this.suggestionAttribute]
          this.textVal = suggest[this.suggestionAttribute]
          this.selectedSuggest = suggest
          this.emitSelected()
        }
      },
      setInitialPlaceholder () {
        this.placeholderVal = this.placeholder
      },
      setBlur () {
        this.$el.blur()
      },
      getType () {
        return this.types.find(this.isSameType)
      },
      getClassHighlighted (index) {
        if (this.highlightedIndex === index) {
          var type = this.getType()
          return type.highlighClass
        }
      },
      letterProcess (o) {
        var remoteText = o[this.suggestionAttribute].split('')
        var inputText = this.textVal.split('')
        inputText.forEach(function (letter, key) {
          if (letter !== remoteText[key]) {
            remoteText[key] = letter
          }
        })
        return remoteText.join('')
      },
      findSuggests () {
        if (this.suggestionsPropIsDefined()) {
          this.suggestions.forEach(this.addRegister)
        }
      },
      arrowDownValidation () {
        return this.highlightedIndex < this.highlightedIndexMax &&
               this.highlightedIndex < (this.similiarData.length - 1)
      },
      lowerFirst (string) {
        return string.charAt(0).toLowerCase() + string.slice(1)
      },
      controlEvents () {
        var uncaptz = this.lowerFirst(this.selectedEvent + 'Action')
        var fnName = (this[uncaptz])
        if (this.fnExists(fnName)) {
          fnName()
        }
      },
      findRepited (similarItem, o) {
        return (similarItem[this.suggestionAttribute] ===
        o[this.suggestionAttribute])
      },
      findSuggestionTextIsRepited (o) {
        return this.similiarData.find(this.findRepited.bind(this, o))
      },
      finalTextValueValidation () {
        return typeof this.similiarData[this.highlightedIndex] !== 'undefined' ||
            this.placeholderVal === '' && this.highlightedIndex !== 0
      },
      isSimilar (o) {
        if (o) {
          return o[this.suggestionAttribute]
                  .toLowerCase()
                  .startsWith(this.textVal.toLowerCase())
        }
      },
      isSameType (o) {
        return o.name === this.type
      },
      fnExists (fnName) {
        return typeof fnName === 'function'
      },
      canAddToSimilarData () {
        return this.similiarData.length < this.highlightedIndexMax
      },
      suggestionsPropIsDefined () {
        return typeof this.suggestions !== 'undefined'
      },
      notArrowKeysEvent () {
        return this.selectedEvent !== 'ArrowUp' &&
                this.selectedEvent !== 'ArrowDown' && this.selectedEvent !== 'ArrowRight'
      },
      notEnterKeyEvent () {
        return this.selectedEvent !== 'Enter'
      },
      textValIsEmpty () {
        return this.textVal === ''
      },
      textValIsNotEmpty () {
        return this.textVal !== ''
      },
      reset () {
        this.clearValue()
        this.clearSelected()
        this.clearPlaceholder()
        this.clearSimilarData()
        this.clearSelectedSuggest()
        this.emitClear()
        this.emitSelected()
      },
      clearAll () {
        this.clearSelected()
        this.clearPlaceholder()
        this.clearSimilarData()
        this.clearSelectedSuggest()
      },
      clearValue () {
        this.textVal = ''
      },
      clearSelected () {
        this.selected = null
      },
      clearSelectedSuggest () {
        this.selectedSuggest = null
      },
      clearSimilarData () {
        this.similiarData = []
      },
      clearPlaceholder () {
        if (this.textValIsEmpty()) {
          this.clearSimilarData()
          this.setInitialPlaceholder()
        } else {
          this.placeholderVal = ''
        }
      },
      clearHighlightedIndex () {
        this.highlightedIndex = 0
      },
      changeText (e) {
        this.selectedEvent = e.code
        this.setTextValue(e)
        this.processChangeText()
        this.controlEvents(e)
      },
      processChangeText (e) {
        if (this.notEnterKeyEvent()) {
          this.inputChanged = true
          this.suggestionsIsVisible = true
          this.clearAllAndFindSuggest()
        }
      },
      clearAllAndFindSuggest () {
        if (this.notArrowKeysEvent()) {
          this.clearAll()
          this.findSuggests()
        }
      },
      away () {
        this.suggestionsIsVisible = false
        this.emitSelected()
      },
      emitChange () {
        this.$emit('input', this.textVal)
      },
      emitClickInput (event) {
        this.$emit('click-input', event)
      },
      emitClickButton (event) {
        this.$emit('click-button', this.textVal)
      },
      emitEnter () {
        this.$emit('enter')
      },
      emitKeyUp () {
        this.$emit('key-up')
      },
      emitKeyDown () {
        this.$emit('key-down', this.selectedSuggest)
      },
      emitKeyRight () {
        this.$emit('key-right')
      },
      emitClear () {
        this.$emit('clear')
      },
      emitEscape () {
        this.$emit('escape')
      },
      emitSelected () {
        this.$emit('selected', this.selectedSuggest)
      }
    }
}

</script>

<style>
  .sbx-facebook {
  display: inline-block;
  position: relative;
  width: 450px;
  height: 27px;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: 13px;
}

.sbx-facebook__wrapper {
  width: 100%;
  height: 100%;
}

.sbx-facebook__input {
  position: absolute !important;
  left:0 !important;
  top: 0 !important;
  -webkit-transition: box-shadow .4s ease, background .4s ease;
  transition: box-shadow .4s ease, background .4s ease;
  border: 0;
  border-radius: 4px;
  box-shadow: inset 0 0 0 0px #CCCCCC;
  background: rgba(255, 255, 255, 0);
  padding: 0;
  padding-right: 62px;
  padding-left: 11px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  font-size: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}

.sbx-facebook__input-placeholder {
  -webkit-transition: box-shadow .4s ease, background .4s ease;
  transition: box-shadow .4s ease, background .4s ease;
  border: 0;
  border-radius: 4px;
  box-shadow: inset 0 0 0 0px #CCCCCC;
  background: #FFFFFF;
  padding: 0;
  padding-right: 62px;
  padding-left: 11px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  font-size: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}




.sbx-facebook__input::-webkit-search-decoration, .sbx-facebook__input::-webkit-search-cancel-button, .sbx-facebook__input::-webkit-search-results-button, .sbx-facebook__input::-webkit-search-results-decoration {
  display: none;
}

.sbx-facebook__input:hover {
  box-shadow: inset 0 0 0 0px #b3b3b3;
}

.sbx-facebook__input:focus, .sbx-facebook__input:active {
  outline: 0;
  box-shadow: inset 0 0 0 0px #3E82F7;
  background: rgba(255, 255, 255, 0)
}

.sbx-facebook__input::-webkit-input-placeholder {
  color: #AAAAAA;
}

.sbx-facebook__input::-moz-placeholder {
  color: #AAAAAA;
}

.sbx-facebook__input:-ms-input-placeholder {
  color: #AAAAAA;
}

.sbx-facebook__input::placeholder {
  color: #AAAAAA;
}

.sbx-facebook__submit {
  position: absolute;
  top: 0;
  right: 0;
  left: inherit;
  margin: 0;
  border: 0;
  border-radius: 0 3px 3px 0;
  background-color: #f6f7f8;
  padding: 0;
  width: 35px;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  font-size: inherit;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.sbx-facebook__submit::before {
  display: inline-block;
  margin-right: -4px;
  height: 100%;
  vertical-align: middle;
  content: '';
}

.sbx-facebook__submit:hover, .sbx-facebook__submit:active {
  cursor: pointer;
}

.sbx-facebook__submit:focus {
  outline: 0;
}

.sbx-facebook__submit svg {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  fill: #3C5BA2;
}

.sbx-facebook__reset {
  display: none;
  position: absolute;
  top: 3px;
  right: 41px;
  margin: 0;
  border: 0;
  background: none;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  fill: rgba(0, 0, 0, 0.5);
}

.sbx-facebook__reset:focus {
  outline: 0;
}

.sbx-facebook__reset svg {
  display: block;
  margin: 4px;
  width: 13px;
  height: 13px;
}

.sbx-facebook__input:valid ~ .sbx-facebook__reset {
  display: block;
  -webkit-animation-name: sbx-reset-in;
          animation-name: sbx-reset-in;
  -webkit-animation-duration: .15s;
          animation-duration: .15s;
}

@-webkit-keyframes sbx-reset-in {
  0% {
    -webkit-transform: translate3d(-20%, 0, 0);
            transform: translate3d(-20%, 0, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}

@keyframes sbx-reset-in {
  0% {
    -webkit-transform: translate3d(-20%, 0, 0);
            transform: translate3d(-20%, 0, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}



/* amazon*/

.sbx-amazon {
  display: inline-block;
  position: relative;
  width: 600px;
  height: 39px;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: 14px;
}

.sbx-amazon__wrapper {
  width: 100%;
  height: 100%;
}

.sbx-amazon__input {
  display: inline-block;
  position: absolute !important;
  left:0 !important;
  top:0 !important;
  -webkit-transition: box-shadow .4s ease, background .4s ease;
  transition: box-shadow .4s ease, background .4s ease;
  border: 0;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px #FFFFFF;
  background: rgba(255, 255, 255, 0);
  padding: 0;
  padding-right: 75px;
  padding-left: 11px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  font-size: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}

.sbx-amazon__input-placeholder {
  display: inline-block;
  -webkit-transition: box-shadow .4s ease, background .4s ease;
  transition: box-shadow .4s ease, background .4s ease;
  border: 0;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px #FFFFFF;
  background: #FFFFFF;
  padding: 0;
  padding-right: 75px;
  padding-left: 11px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  font-size: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}


.sbx-amazon__input::-webkit-search-decoration, .sbx-amazon__input::-webkit-search-cancel-button, .sbx-amazon__input::-webkit-search-results-button, .sbx-amazon__input::-webkit-search-results-decoration {
  display: none;
}

.sbx-amazon__input:hover {
  box-shadow: inset 0 0 0 1px #e6e6e6;
}

.sbx-amazon__input:focus, .sbx-amazon__input:active {
  outline: 0;
  box-shadow: inset 0 0 0 1px #FFBF58;
  background: rgba(255, 255, 255, 0)
}

.sbx-amazon__input::-webkit-input-placeholder {
  color: #AAAAAA;
}

.sbx-amazon__input::-moz-placeholder {
  color: #AAAAAA;
}

.sbx-amazon__input:-ms-input-placeholder {
  color: #AAAAAA;
}

.sbx-amazon__input::placeholder {
  color: #AAAAAA;
}

.sbx-amazon__submit {
  position: absolute;
  top: 0;
  right: 0;
  left: inherit;
  margin: 0;
  border: 0;
  border-radius: 0 3px 3px 0;
  background-color: #ffbf58;
  padding: 0;
  width: 47px;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  font-size: inherit;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.sbx-amazon__submit::before {
  display: inline-block;
  margin-right: -4px;
  height: 100%;
  vertical-align: middle;
  content: '';
}

.sbx-amazon__submit:hover, .sbx-amazon__submit:active {
  cursor: pointer;
}

.sbx-amazon__submit:focus {
  outline: 0;
}

.sbx-amazon__submit svg {
  width: 21px;
  height: 21px;
  vertical-align: middle;
  fill: #202F40;
}

.sbx-amazon__reset {
  display: none;
  position: absolute;
  top: 9px;
  right: 54px;
  margin: 0;
  border: 0;
  background: none;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  fill: rgba(0, 0, 0, 0.5);
}

.sbx-amazon__reset:focus {
  outline: 0;
}

.sbx-amazon__reset svg {
  display: block;
  margin: 4px;
  width: 13px;
  height: 13px;
}

.sbx-amazon__input:valid ~ .sbx-amazon__reset {
  display: block;
  -webkit-animation-name: sbx-reset-in;
          animation-name: sbx-reset-in;
  -webkit-animation-duration: .15s;
          animation-duration: .15s;
}

@-webkit-keyframes sbx-reset-in {
  0% {
    -webkit-transform: translate3d(-20%, 0, 0);
            transform: translate3d(-20%, 0, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}

@keyframes sbx-reset-in {
  0% {
    -webkit-transform: translate3d(-20%, 0, 0);
            transform: translate3d(-20%, 0, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}

/*  google */
.sbx-google {
  display: inline-block;
  position: relative;
  width: 500px;
  height: 41px;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: 14px;
}

.sbx-google__wrapper {
  width: 100%;
  height: 100%;
}

.sbx-google__input {
  display: inline-block;
  position: absolute !important;
  left: 0 !important;
  top:0 !important;
  -webkit-transition: box-shadow .4s ease, background .4s ease;
  transition: box-shadow .4s ease, background .4s ease;
  border: 0;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px #CCCCCC;
  background: rgba(255, 255, 255, 0);
  padding: 0;
  padding-right: 77px;
  padding-left: 11px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  font-size: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}

.sbx-google__input-placeholder {
  display: inline-block;
  -webkit-transition: box-shadow .4s ease, background .4s ease;
  transition: box-shadow .4s ease, background .4s ease;
  border: 0;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px #CCCCCC;
  background: #FFFFFF;
  padding: 0;
  padding-right: 77px;
  padding-left: 11px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  font-size: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}


.sbx-google__input::-webkit-search-decoration, .sbx-google__input::-webkit-search-cancel-button, .sbx-google__input::-webkit-search-results-button, .sbx-google__input::-webkit-search-results-decoration {
  display: none;
}

.sbx-google__input:hover {
  box-shadow: inset 0 0 0 1px #b3b3b3;
}

.sbx-google__input:focus, .sbx-google__input:active {
  outline: 0;
  box-shadow: inset 0 0 0 1px #3E82F7;
  background: rgba(255, 255, 255, 0)
}

.sbx-google__input::-webkit-input-placeholder {
  color: #AAAAAA;
}

.sbx-google__input::-moz-placeholder {
  color: #AAAAAA;
}

.sbx-google__input:-ms-input-placeholder {
  color: #AAAAAA;
}

.sbx-google__input::placeholder {
  color: #AAAAAA;
}

.sbx-google__submit {
  position: absolute;
  top: 0;
  right: 0;
  left: inherit;
  margin: 0;
  border: 0;
  border-radius: 0 3px 3px 0;
  background-color: #3e82f7;
  padding: 0;
  width: 49px;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  font-size: inherit;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.sbx-google__submit::before {
  display: inline-block;
  margin-right: -4px;
  height: 100%;
  vertical-align: middle;
  content: '';
}

.sbx-google__submit:hover, .sbx-google__submit:active {
  cursor: pointer;
}

.sbx-google__submit:focus {
  outline: 0;
}

.sbx-google__submit svg {
  width: 21px;
  height: 21px;
  vertical-align: middle;
  fill: #FFFFFF;
}

.sbx-google__reset {
  display: none;
  position: absolute;
  top: 10px;
  right: 56px;
  margin: 0;
  border: 0;
  background: none;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  fill: rgba(0, 0, 0, 0.5);
}

.sbx-google__reset:focus {
  outline: 0;
}

.sbx-google__reset svg {
  display: block;
  margin: 4px;
  width: 13px;
  height: 13px;
}

.sbx-google__input:valid ~ .sbx-google__reset {
  display: block;
  -webkit-animation-name: sbx-reset-in;
          animation-name: sbx-reset-in;
  -webkit-animation-duration: .15s;
          animation-duration: .15s;
}

@-webkit-keyframes sbx-reset-in {
  0% {
    -webkit-transform: translate3d(-20%, 0, 0);
            transform: translate3d(-20%, 0, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}

@keyframes sbx-reset-in {
  0% {
    -webkit-transform: translate3d(-20%, 0, 0);
            transform: translate3d(-20%, 0, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}


/* twitter */

.sbx-twitter {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 33px;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: 12px;
}

.sbx-twitter__wrapper {
  width: 100%;
  height: 100%;
}

.sbx-twitter__input {
  display: inline-block;
  position: absolute;
  left: 0 !important;
  top: 0 !important;
  -webkit-transition: box-shadow .4s ease, background .4s ease;
  transition: box-shadow .4s ease, background .4s ease;
  border: 0;
  border-radius: 17px;
  box-shadow: inset 0 0 0 1px #E1E8ED;
  background: rgba(255, 255, 255, 0);
  padding: 0;
  padding-right: 52px;
  padding-left: 16px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  font-size: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}

.sbx-twitter__input-placeholder {
  display: inline-block;
  -webkit-transition: box-shadow .4s ease, background .4s ease;
  transition: box-shadow .4s ease, background .4s ease;
  border: 0;
  border-radius: 17px;
  box-shadow: inset 0 0 0 1px #E1E8ED;
  background: rgba(255, 255, 255, 0);
  padding: 0;
  padding-right: 52px;
  padding-left: 16px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  font-size: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}


.sbx-twitter__input::-webkit-search-decoration, .sbx-twitter__input::-webkit-search-cancel-button, .sbx-twitter__input::-webkit-search-results-button, .sbx-twitter__input::-webkit-search-results-decoration {
  display: none;
}

.sbx-twitter__input:hover {
  box-shadow: inset 0 0 0 1px #c1d0da;
}

.sbx-twitter__input:focus, .sbx-twitter__input:active {
  outline: 0;
  box-shadow: inset 0 0 0 1px #D6DEE3;
  background: rgba(255, 255, 255, 0)
}

.sbx-twitter__input::-webkit-input-placeholder {
  color: #9AAEB5;
}

.sbx-twitter__input::-moz-placeholder {
  color: #9AAEB5;
}

.sbx-twitter__input:-ms-input-placeholder {
  color: #9AAEB5;
}

.sbx-twitter__input::placeholder {
  color: #9AAEB5;
}

.sbx-twitter__submit {
  position: absolute;
  top: 0;
  right: 0;
  left: inherit;
  margin: 0;
  border: 0;
  border-radius: 0 16px 16px 0;
  background-color: rgba(62, 130, 247, 0);
  padding: 0;
  width: 33px;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  font-size: inherit;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.sbx-twitter__submit::before {
  display: inline-block;
  margin-right: -4px;
  height: 100%;
  vertical-align: middle;
  content: '';
}

.sbx-twitter__submit:hover, .sbx-twitter__submit:active {
  cursor: pointer;
}

.sbx-twitter__submit:focus {
  outline: 0;
}

.sbx-twitter__submit svg {
  width: 13px;
  height: 13px;
  vertical-align: middle;
  fill: #657580;
}

.sbx-twitter__reset {
  display: none;
  position: absolute;
  top: 7px;
  right: 33px;
  margin: 0;
  border: 0;
  background: none;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  fill: rgba(0, 0, 0, 0.5);
}

.sbx-twitter__reset:focus {
  outline: 0;
}

.sbx-twitter__reset svg {
  display: block;
  margin: 4px;
  width: 11px;
  height: 11px;
}

.sbx-twitter__input:valid ~ .sbx-twitter__reset {
  display: block;
  -webkit-animation-name: sbx-reset-in;
          animation-name: sbx-reset-in;
  -webkit-animation-duration: .15s;
          animation-duration: .15s;
}

@-webkit-keyframes sbx-reset-in {
  0% {
    -webkit-transform: translate3d(-20%, 0, 0);
            transform: translate3d(-20%, 0, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}

@keyframes sbx-reset-in {
  0% {
    -webkit-transform: translate3d(-20%, 0, 0);
            transform: translate3d(-20%, 0, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}


/* spotify */

.sbx-spotify {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 25px;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: 12px;
}

.sbx-spotify__wrapper {
  width: 100%;
  height: 100%;
}

.sbx-spotify__input {
  display: inline-block;
  position: absolute;
  left: 0 !important;
  top: 0 !important;
  -webkit-transition: box-shadow .4s ease, background .4s ease;
  transition: box-shadow .4s ease, background .4s ease;
  border: 0;
  border-radius: 13px;
  box-shadow: inset 0 0 0 0px #FFFFFF;
  background: rgba(255, 255, 255, 0);
  padding: 0;
  padding-right: 20px;
  padding-left: 25px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  font-size: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}

.sbx-spotify__input-placeholder {
  display: inline-block;
  -webkit-transition: box-shadow .4s ease, background .4s ease;
  transition: box-shadow .4s ease, background .4s ease;
  border: 0;
  border-radius: 13px;
  box-shadow: inset 0 0 0 0px #FFFFFF;
  background: #FFFFFF;
  padding: 0;
  padding-right: 20px;
  padding-left: 25px;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  white-space: normal;
  font-size: inherit;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}


.sbx-spotify__input::-webkit-search-decoration, .sbx-spotify__input::-webkit-search-cancel-button, .sbx-spotify__input::-webkit-search-results-button, .sbx-spotify__input::-webkit-search-results-decoration {
  display: none;
}

.sbx-spotify__input:hover {
  box-shadow: inset 0 0 0 0px #e6e6e6;
}

.sbx-spotify__input:focus, .sbx-spotify__input:active {
  outline: 0;
  box-shadow: inset 0 0 0 0px #FFFFFF;
  background: rgba(255, 255, 255, 0)
}

.sbx-spotify__input::-webkit-input-placeholder {
  color: #AAAAAA;
}

.sbx-spotify__input::-moz-placeholder {
  color: #AAAAAA;
}

.sbx-spotify__input:-ms-input-placeholder {
  color: #AAAAAA;
}

.sbx-spotify__input::placeholder {
  color: #AAAAAA;
}

.sbx-spotify__submit {
  position: absolute;
  top: 0;
  right: inherit;
  left: 0;
  margin: 0;
  border: 0;
  border-radius: 12px 0 0 12px;
  background-color: rgba(255, 255, 255, 0);
  padding: 0;
  width: 25px;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  font-size: inherit;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.sbx-spotify__submit::before {
  display: inline-block;
  margin-right: -4px;
  height: 100%;
  vertical-align: middle;
  content: '';
}

.sbx-spotify__submit:hover, .sbx-spotify__submit:active {
  cursor: pointer;
}

.sbx-spotify__submit:focus {
  outline: 0;
}

.sbx-spotify__submit svg {
  width: 17px;
  height: 17px;
  vertical-align: middle;
  fill: #222222;
}

.sbx-spotify__reset {
  display: none;
  position: absolute;
  top: 2px;
  right: 2px;
  margin: 0;
  border: 0;
  background: none;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  fill: rgba(0, 0, 0, 0.5);
}

.sbx-spotify__reset:focus {
  outline: 0;
}

.sbx-spotify__reset svg {
  display: block;
  margin: 4px;
  width: 13px;
  height: 13px;
}

.sbx-spotify__input:valid ~ .sbx-spotify__reset {
  display: block;
  -webkit-animation-name: sbx-reset-in;
          animation-name: sbx-reset-in;
  -webkit-animation-duration: .15s;
          animation-duration: .15s;
}

@-webkit-keyframes sbx-reset-in {
  0% {
    -webkit-transform: translate3d(-20%, 0, 0);
            transform: translate3d(-20%, 0, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}

@keyframes sbx-reset-in {
  0% {
    -webkit-transform: translate3d(-20%, 0, 0);
            transform: translate3d(-20%, 0, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: none;
            transform: none;
    opacity: 1;
  }
}


.vue-instant__suggestions {
     position: absolute;
     left: 0;
     top: 110%;
     margin: 0;
     background-color: #fff;
     border: 1px solid #D3DCE6;
     width: 100%;
     padding: 6px 0;
     z-index: 10;
     border-radius: 2px;
     max-height: 280px;
     box-sizing: border-box;
     overflow: auto;
     box-shadow: 0 0 6px 0 rgba(0,0,0,.04), 0 2px 4px 0 rgba(0,0,0,.12);
     margin-top:3px;
 }

 .vue-instant__suggestions li {
     list-style: none;
     line-height: 36px;
     padding: 0 10px;
     margin: 0;
     cursor: pointer;
     color: #475669;
     font-size: 14px;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
 }

 .vue-instant__suggestions li.highlighted__spotify {
     background-color: black;
     color: #fff;
 }

 .vue-instant__suggestions li.highlighted__twitter {
     background-color: #20a0ff;
     color: #fff;
 }

 .vue-instant__suggestions li.highlighted__google {
     background-color: #EEEEEE;
     color: black;
 }

 .vue-instant__suggestions li.highlighted__facebook {
     background-color: #3e5da0;
     color: #fff;
 }

 .vue-instant__suggestions li.highlighted__amazon {
     background-color: #232F3E;
     color: #fff;
 }


 .el-input-group__append {
   border: 0px !important;
 }

.sbx-custom__input {
  position: absolute;
  left: 0 !important;
  background: rgba(255, 255, 255, 0) !important;
}
</style>
