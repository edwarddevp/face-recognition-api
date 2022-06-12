const handleProfileGet = (db)=> (req,res) =>{
    const { id } = req.params;
    console.log(id)
    let found = false;
    db.select('*')
    .from('users')
    .where({id})
    .then(user =>{
        if(user.length){
            res.json(user)
        }else{
            res.status(400).json('Not Found')
        }
    }).catch(err =>res.status(400).json('Error getting user'))

}

module.exports = {
    handleProfileGet: handleProfileGet
}