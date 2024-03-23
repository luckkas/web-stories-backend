import { BadRequestError } from '../error/semantic.error'

interface Props {
  [key: string]: string | number | undefined
}

export function CheckProps<T extends Props>(propertyNames: (keyof T)[]) {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value as (...args: [T]) => Promise<unknown>

    descriptor.value = async function (...args: [T]) {
      const props: T = args[0]
      for (const propName of propertyNames) {
        if (!props[propName] || String(props[propName]).trim() === '') {
          throw new BadRequestError(`${String(propName)} cannot be empty`)
        }
      }

      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}
