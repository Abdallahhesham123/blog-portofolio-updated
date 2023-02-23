import endpoint from "./endpoint"
const {addOneUser }= endpoint;
const requests = {

  addOneUser: async(dataToSend)=>{
    const {url,options} = addOneUser(dataToSend);
    const response = await fetch(url,options);
    const data = await response.json();
    console.log(data);
  
    return new Promise((resolve, reject) => {
      data ? resolve({

        response: response,
        data : data
      })
       :
      
      reject(new Error("undefined"));
    });
  },

};
export default requests;
