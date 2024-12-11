export const generateString = () => {
  const numbers = '0123456789'
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let randomString = ''

  for (let i = 0; i < 3; i++) {
    randomString += numbers[Math.floor(Math.random() * numbers.length)]
  }

  for (let i = 0; i < 5; i++) {
    randomString += letters[Math.floor(Math.random() * letters.length)]
  }

  let finalString = ''
  const arrayOfString = randomString.split('')

  for (let i = arrayOfString.length; i > 0; i--) {
    const index = Math.floor(Math.random() * i)
    finalString += arrayOfString[index]
    arrayOfString.splice(index, 1)
  }
  return finalString
}
