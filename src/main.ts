export default class Main {
   private readonly disabledKeysToDisplay = ['C', '=']
   private readonly $keys = document.querySelectorAll('.key') as NodeListOf<HTMLInputElement>
   private readonly $output = document.getElementById('output') as HTMLInputElement
   private valueToRender = ''
   constructor () {
      this.setup()
   }

   private setup(): void {
      this.$keys.forEach((key) => {
         key.addEventListener('click', (event) => {
            const target = event.target as HTMLInputElement

            if (target.value !== key.value) return

            if (target.value === 'C') this.clearOutput()
            if (target.value === '=' && this.valueToRender) this.solve()

            this.showOutputValue(target.value)
         })
      })
   }

   private clearOutput(): void {
      this.valueToRender = '0'
   }

   private solve(): void {
      this.valueToRender = eval(this.$output.value).toString()
   }

   private showOutputValue(value: string = ''): void {
      const isDisabledToDisplay = !this.disabledKeysToDisplay.includes(value)

      if (isDisabledToDisplay && this.$output.value === '0') this.valueToRender = value
      if (isDisabledToDisplay && this.$output.value !== '0') this.valueToRender = this.$output.value + value

      this.$output.value = this.valueToRender
   }
}

new Main()
