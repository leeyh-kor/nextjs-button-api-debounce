import React, { useCallback, useRef } from 'react'

type DebouncedButtonProps = {
  onClick: () => void
  children: string
}

const DebouncedButton: React.FC<DebouncedButtonProps> = ({
  onClick,
  children,
}) => {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  const handleClick = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      onClick()
    }, 200)
  }, [onClick])

  return <button onClick={handleClick}>{children}</button>
}

export default DebouncedButton
