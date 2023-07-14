export const isString = async (value) => {
  const regex = /^[a-zA-Z0-9\s]+$/

  if (typeof value !== 'string') {
    throw new Error('Value need to be a String')
  }

  if (!regex.test(value)) {
    throw new Error('Value cant contain symbols')
  }
}
