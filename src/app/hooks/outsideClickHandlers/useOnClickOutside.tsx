import { RefObject } from 'react'
import useEventListener from './useEventListener'

type Handler = (event: MouseEvent) => void

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  sideEffect?: (e: any) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, event => {
    const el = ref?.current
    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      console.log('here')
      sideEffect?.(event);
      return
    }
    handler(event)
  })
}

export default useOnClickOutside