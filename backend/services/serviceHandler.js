export const serviceHandler = (callback) =>{

    return async (req,res) =>{
        try{
            await callback(req,res)
        }catch(err){
            res.status(500).send({error:"Internal error occured"})
            console.log(err)

        }
    }
}