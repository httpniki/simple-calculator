export default class Main {
   private readonly disabledKeysToDisplay = ['C', '=']
   private readonly $keys = document.querySelectorAll('.key') as NodeListOf<HTMLInputElement>
   private readonly $output = document.getElementById('output') as HTMLInputElement
   private output = ''
   constructor () {
      this.setup()
   }

   private setup (): void {
      this.$keys.forEach((key) => {
         key.addEventListener('click', (event) => {
            const target = event.target as HTMLInputElement
            const isDisabledToDisplay = !this.disabledKeysToDisplay.includes(key.value)

            if (target.value === key.value && isDisabledToDisplay)
               this.output = this.$output.value + target.value

            if (target.value === 'C') this.output = ''
            if (target.value === '=' && this.output) this.output = eval(this.$output.value).toString()

            this.$output.value = this.output
         })
      })
   }
}

new Main()
