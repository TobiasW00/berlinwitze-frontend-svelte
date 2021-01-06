
  export function getShortTitle(title) {
    if(title)
    {
    return title.split(" ").join("-").split("/").join("-").split(",").join("-").split("&").join("-").split("%20").join("-");
    }
    return "";
  }
  
