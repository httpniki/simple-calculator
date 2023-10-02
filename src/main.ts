export default class Main {
   private readonly disabledKeysToDisplay = ['C', '=']
   private readonly $keys = document.querySelectorAll('.key') as NodeListOf<HTMLInputElement>
   private readonly $output = document.getElementById('output') as HTMLInputElement
   private valueToRender = ''
   constructor () {
      this.setup()
      this.keybinds()
   }

   private setup(): void {
      this.$keys.forEach((key) => {
         key.addEventListener('click', (event) => {
            const target = event.target as HTMLInputElement
            if (target.value !== key.value) return

            if (target.value === 'C') this.clearOutput()
            if (target.value === '=' && this.valueToRender) this.solve()

            this.updateOutputValue(target.value)
            this.showOutputValue()
         })
      })
   }

   private keybinds(): void {
      const keys = [...Array(10).keys(), '*', '/', '-', '+'].map(key => key.toString())

      document.addEventListener('keydown', (event) => {
         switch (event.key) {
         case keys.filter(key => key === event.key)[0]:
            this.updateOutputValue(event.key)
            this.showOutputValue()
            break
         case 'Enter':
            this.solve()
            this.showOutputValue()
            break
         }
      })
   }

   private updateOutputValue(value: string): void {
      if (this.disabledKeysToDisplay.includes(value)) return

      if (this.$output.value === '0') this.valueToRender = value
      if (this.$output.value !== '0') this.valueToRender = this.$output.value + value
   }

   private showOutputValue(): void {
      this.$output.value = this.valueToRender
   }

   private clearOutput(): void {
      this.valueToRender = '0'
   }

   private solve(): void {
      this.valueToRender = eval(this.$output.value).toString()
   }
}

new Main()
