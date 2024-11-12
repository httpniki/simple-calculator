export default class Main {
   private readonly $output: HTMLInputElement
   private readonly $buttonList: NodeListOf<HTMLButtonElement>
   private readonly keys: string[]
   private value = ''

   constructor () {
      this.$output = document.getElementById('output') as HTMLInputElement
      this.$buttonList = document.querySelectorAll('.key') as NodeListOf<HTMLButtonElement>
      this.keys = [...Array(10).keys(), '*', '/', '-', '+', '.'].map(key => key.toString())
   }

   public setup(): void {
      document.addEventListener('click', (event) => {
         const target = event.target as HTMLButtonElement
         const isNumberKey = target.classList.contains('number-key')
         const isOperationKey = target.classList.contains('operation-key')

         if (isNumberKey || isOperationKey) {
            this.renderInput(target.textContent as string)
         }

         if (target.textContent === 'C') {
            this.clearOutput()
         }

         if (target.textContent === '=') {
            this.solve()
         }
      })

      document.addEventListener('keydown', (event) => {
         const key = event.key.toString()

         this.$buttonList.forEach((button) => {
            const isEqualKey = (key === '=' || key === 'Enter') && button.textContent === '='
            const isClearKey = (key === 'Escape' || key === 'Backspace') && button.textContent === 'C'
            const isNumberKey = this.keys.some(el => el === key) && button.textContent === key

            if (isEqualKey || isClearKey || isNumberKey) {
               button.classList.add('isActive')
            }
         })

         switch (event.key) {
         case this.keys.filter(key => key === event.key)[0]:
            this.renderInput(event.key)
            break
         case 'Enter':
            this.solve()
            break
         case '=':
            this.solve()
            break
         case 'Backspace':
            this.clearOutput()
            break
         case 'Escape':
            this.clearOutput()
            break
         }
      })

      document.addEventListener('keyup', () => {
         this.$buttonList.forEach((button) => { button.classList.remove('isActive') })
      })
   }

   private renderInput(value: string): void {
      let newValue: string = this.value

      if (this.$output.value === '0') newValue = value
      if (this.$output.value !== '0') newValue = newValue + value

      this.$output.value = newValue
      this.value = newValue
   }

   private clearOutput(): void {
      this.value = '0'
      this.$output.value = '0'
   }

   private solve(): void {
      try {
         const result = eval(this.value).toString()

         this.$output.value = result
         this.value = result
      } catch (error) {
         console.log('Ups, Nothing to resolve ;)')
      }
   }
}

new Main().setup()
