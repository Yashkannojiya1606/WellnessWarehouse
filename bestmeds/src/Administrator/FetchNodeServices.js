var axios = require('axios')
var ServerURL = "http://localhost:5002"

const getData = async (url) => {
  try {
    // `${ServerURL}/${url}` backtick
    const response = await fetch(`${ServerURL}/${url}`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json;charset=utf-8" },

    });
    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }

}

const postDataImage = async (url, body) => {
  try {
    var response = await axios.post(`${ServerURL}/${url}`, body, { headers: { "content-type": "multipart/form-data" } })
    var result = await response.data
    return result
  }
  catch (e) {
    return null
  }

}
const postData = async (url, body) => {
  try {
    // `${ServerURL}/${url}` backtick
    const response = await fetch(`${ServerURL}/${url}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    return null;
  }

}


export { getData, postDataImage, postData, ServerURL }