export const statToStr = (count: number, str: string): string => {
  switch (count) {
    case 0:
      return ''
    case 1:
      return `${str}, `
    default:
      return `${count} ${str}, `
  }
}
