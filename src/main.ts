export default class Main {
   private readonly disabledKeysToDisplay = ['C', '=']
   private readonly $keys = document.querySelectorAll('.key') as NodeListOf<HTMLInputElement>
   private readonly $output = document.getElementById('output') as HTMLInputElement
   private valueToDisplay = ''
   constructor () {
      this.setup()
   }

   private setup (): void {
      this.$keys.forEach((key) => {
         key.addEventListener('click', (event) => {
            const target = event.target as HTMLInputElement
            const isDisabledToDisplay = !this.disabledKeysToDisplay.includes(key.value)

            if (target.value !== key.value) return
            if (this.$output.value === '0') this.valueToDisplay = target.value

            if (isDisabledToDisplay && this.$output.value !== '0')
               this.valueToDisplay = this.$output.value + target.value

            if (target.value === 'C') this.valueToDisplay = '0'
            if (target.value === '=' && this.valueToDisplay) this.valueToDisplay = eval(this.$output.value).toString()

            this.$output.value = this.valueToDisplay
         })
      })
   }
}

new Main()
