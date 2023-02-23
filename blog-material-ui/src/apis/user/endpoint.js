const endpoints = {
  getAllUser: () => {
    return {
      url: `/user/`,
      options: {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      },
    };
  },
  getOneuser: () => {
    return {
      url: `/user/getUserById/`,
      options: {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      },
    };
  },

  updatepost: (updatedataToSend) => {
    return {
      url: `/user/findByIdAndUpdate/`,
      options: {
        method: "PUT",
        body: JSON.stringify(updatedataToSend),
        // headers: {'Content-Type': 'application/json'},
        headers: {
         "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      },
    };
  },

  deleteOneUser: (id) => {
    return {
      url: `/user/softDelete/${id}`,
      options: {
        method: "PUT",
        // body: JSON.stringify(updatedataToSend),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      },
    };
  },
  getAllTrashedUser: () => {
    return {
      url: `/user/getAllTrashedUsers`,
      options: {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      },
    };
  },

  deletefromdatabase: (id) => {
    return {
      url: `/user/findOneAndDelete/${id}`,
      options: {
        method: "DELETE",
        // headers: {'Content-Type': 'application/json'},
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      },
    };
  },
  restoretodatabase: (id) => {
    return {
      url: `/user/restoretodatabase/${id}`,
      options: {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      },
    };
  },
  changeRole: (id) => {
    return {
      url: `/user/changeRole/${id}`,
      options: {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      },
    };
  },
  RestoreRole: (id) => {
    return {
      url: `/user/RestoreRole/${id}`,
      options: {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      },
    };
  },
  
};

export default endpoints;
