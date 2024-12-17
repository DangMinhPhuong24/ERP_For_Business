import { useEffect, useRef } from 'react'

function useEffectWhenBothChanged(callback, dep1, dep2) {
  const prevDep1 = useRef(dep1)
  const prevDep2 = useRef(dep2)

  useEffect(() => {
    if (prevDep1.current !== dep1 && prevDep2.current !== dep2) {
      callback()
    }

    prevDep1.current = dep1
    prevDep2.current = dep2
  }, [dep1, dep2, callback])
}

export default useEffectWhenBothChanged
