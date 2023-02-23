import endpoint from "./endpoint"
const {getAll,getOnePost,deleteOnePost,addOnePost ,updatepost,getAllpostsdash,acceptedpost,
  removepost,
  restoreComment,
  searchpost

}= endpoint;
const requests = {
  getAll: async (page) => {
    const {url} = getAll(page);
    const response = await fetch(url);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  getpostsdash: async () => {
    const {url,options} = getAllpostsdash();
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  getOnePost: async (id ) => {
    const {url,options} = getOnePost(id );
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  deleteOnePost: async (id) => {
    const {url,options} = deleteOnePost(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  addOnePost: async(dataToSend )=>{
    const {url,options} = addOnePost(dataToSend );
    const response = await fetch(url,options);
    const data = await response.json();
    return new Promise((resolve, reject) => {
      data ? resolve({

        response: response,
        data : data
      })
       :
      
      reject(new Error("undefined"));
    });
  },
  updatepost:async(id , updatedataToSend )=>{
    const {url,options} = updatepost(id , updatedataToSend );
    const response = await fetch(url,options);
    const data = await response.json();
    return new Promise((resolve, reject) => {
      data ? resolve({

        response: response,
        data : data
      })
       :
      
      reject(new Error("undefined"));
    });
  },
  acceptedpost: async (id) => {
    const {url,options} = acceptedpost(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  removepost: async (id) => {
    const {url,options} = removepost(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  restoreComment: async (id) => {
    const {url,options} = restoreComment(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  searchpost: async (title) => {
    const {url,options} = searchpost(title);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  
};
export default requests;
