const endpoints ={
    


    resetpassword:(dataToSend)=>{
                    return {
                        url : `/auth/resetpassword`,
                        options:{
                            method: 'PUT',
                            body: JSON.stringify(dataToSend),
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                              },
                        }
                    }

                },

}

export default endpoints;