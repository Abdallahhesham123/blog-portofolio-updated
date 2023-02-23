const endpoints ={
    


    addOneUser:(dataToSend)=>{
                    return {
                        url : `/auth/login`,
                        options:{
                            method: 'POST',
                            body: JSON.stringify(dataToSend),
                            headers: {'Content-Type': 'application/json'},
                        }
                    }

                },

}

export default endpoints;