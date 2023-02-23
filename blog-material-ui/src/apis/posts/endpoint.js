const endpoints = {
  getAll: (page) => {
    return {
      url: `/blog/?page=${page}`,
    };
  },
  getAllpostsdash: () => {
    return {
      url: `/blog/dash`,
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

  getOnePost: (id) => {
    return {
      url: `/blog/${id}`,
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
  deleteOnePost: (id) => {
    return {
      url: `/blog/deleteBlog/${id}`,
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
  addOnePost: (dataToSend) => {
    return {
      url: `/blog/`,
      options: {
        method: "POST",
        body: JSON.stringify(dataToSend),
        // headers: {'Content-Type': 'application/json'},
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      },
    };
  },
  updatepost: (id, updatedataToSend) => {
    return {
      url: `/blog/updateBlog/${id}`,
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
  acceptedpost: (id) => {
    return {
      url: `/blog/acceptedpost/${id}`,
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
  removepost: (id) => {
    return {
      url: `/blog/removepost/${id}`,
      options: {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      },
    };
  },
  restoreComment: (id) => {
    return {
      url: `/blog/restoreComment/${id}`,
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
  searchpost: (title) => {
    return {
      url: `/blog/search?title=${title}`,
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

 
  
};

export default endpoints;
