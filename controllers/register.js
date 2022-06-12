const handleRegister = (db, bcrypt)=> (req,res) =>{
    const { email, password, name } = req.body;

    if(!email || !password || !name){
        return res.status(400).json('Incorrect form submission')
    }

    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash,
            email
        })
        .into('login')
        .returning('email')
        .then(response=>{
            return trx('users')
            .returning('*') 
            .insert({
                email : response[0]?.email,
                name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(err))
}

module.exports ={
    handleRegister: handleRegister
}