class RedLight {
  async run() {
    while (true) {
      // green 三秒
      // red 两秒
      // yellow 一秒
      this.light('green')
      await this.sleep(3000)
      this.light('yellow')
      await this.sleep(1000)
      this.light('red')
      await this.sleep(2000)
    }
  }
  // 亮灯方法 给dom添加css样式
  light(color) {
    ['green', 'red', 'yellow'].forEach(item => {
      if (item === color) {
        document.querySelector('.' + item).classList.toggle('off', false)
      } else {
        document.querySelector('.' + item).classList.toggle('off', true)
      }
    })
  }
  sleep(wait) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, wait);
    })
  }
}

const redLight = new RedLight();
redLight.run()