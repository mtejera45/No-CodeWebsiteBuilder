export default function GetContrastingColor(rgbaColor) {

  if(rgbaColor !== undefined && rgbaColor !== null && rgbaColor !== ""){

    // Extract R, G, B values from the RGBA color string
    const [r, g, b] = rgbaColor.match(/\d+/g).slice(0, 3).map(Number)
  
    // Calculate the relative luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b
  
    // Set the threshold value for deciding between white and black
    const threshold = 128
  
    // Return either white or black based on the luminance
    return luminance > threshold ? "black" : "white"
  
  }
    
}