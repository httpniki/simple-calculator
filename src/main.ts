import { type DisplayKeysValue } from './types/types.js'

export default class Main {
   private readonly disabledToDisplayKeys = ['=', 'C']
   private readonly $keys = document.querySelectorAll('.key') as NodeListOf<HTMLInputElement>
   private readonly $output = document.getElementById('output') as HTMLInputElement

   constructor () {
      this.setup()
   }

   private setup (): void {
      this.$keys.forEach((key) => {
         key.addEventListener('click', (event) => {
            const target = event.target as HTMLInputElement
            const hasDisabledToDisplayKey = this.disabledToDisplayKeys.some((el) => el === target.value)

            if (!target || !this.$output) return
            if (target.value !== key.value || hasDisabledToDisplayKey) return

            this.displayKeysValue({ target })
         })
      })
   }

   private displayKeysValue ({ target }: DisplayKeysValue): void {
      this.$output.value = this.$output.value + target.value
   }
}

new Main()
