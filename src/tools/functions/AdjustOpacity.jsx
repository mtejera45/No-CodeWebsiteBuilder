
export default function AdjustOpacity(rgba, newOpacity) {

  const parts = rgba?.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  
  if (parts) {
    const r = parts[1]
    const g = parts[2]
    const b = parts[3]
    return `rgba(${r}, ${g}, ${b}, ${newOpacity})`

  } else {

    return rgba
    
  }

}
