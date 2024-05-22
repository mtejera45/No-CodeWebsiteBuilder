export default function GetErrorMessages(errorData, settings) {

  const defaultPopUpTitle = settings?.language === "es" ? "¡Algo salió mal!" 
    : settings?.language === "en" ? "Something went wrong!" 
      : settings?.language === "kr" ? "문제가 발생했습니다!" 
        : ""
  
  const defaultPopUpMessage = settings?.language === "es" ? "Por favor, inténtelo de nuevo." 
    : settings?.language === "en" ? "Please try again." 
      : settings?.language === "kr" ? "다시 시도해주세요." 
        : ""
  
  return {
    popUpTitle: errorData.popUpTitle === undefined ? defaultPopUpTitle : errorData.popUpTitle,
    popUpMessage: errorData.popUpMessage === undefined ? defaultPopUpMessage : errorData.popUpMessage
  }

}
