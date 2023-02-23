import endpoint from "./endpoint"
const {updatepost,
  getOneuser ,
  getAllUser,deleteOneUser,
  getAllTrashedUser
  ,deletefromdatabase
  ,restoretodatabase ,changeRole ,RestoreRole}= endpoint;
const requests = {
  getAllUser: async () => {
    const {url,options} = getAllUser();
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  getOneuser: async () => {
    const {url,options} = getOneuser();
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  updateuser:async( updatedataToSend )=>{
    const {url,options} = updatepost( updatedataToSend);
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

  deleteOneUser: async (id) => {
    const {url,options} = deleteOneUser(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },

  getAllTrashedUser: async () => {
    const {url,options} = getAllTrashedUser();
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  deletefromdatabase: async (id) => {
    const {url,options} = deletefromdatabase(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  restoretodatabase: async (id) => {
    const {url,options} = restoretodatabase(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  changeRole: async (id) => {
    const {url,options} = changeRole(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  RestoreRole: async (id) => {
    const {url,options} = RestoreRole(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  
};
export default requests;
