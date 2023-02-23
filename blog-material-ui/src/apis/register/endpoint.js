const endpoints ={
    


    addOneUser:(dataToSend)=>{
                    return {
                        url : `/auth/register`,
                        options:{
                            method: 'POST',
                            body: JSON.stringify(dataToSend),
                            headers: {'Content-Type': 'application/json'},
                        }
                    }

                },

}

export default endpoints;