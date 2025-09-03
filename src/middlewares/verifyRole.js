//Middle de autorização confirmando role

function verifyRole(role){
    return (req, res, next) =>{
        if(!req.user){
            return res.status(401).json({message: "Usuário não autenticado, role invalido!"});
        }

        if(req.user.role !== role){
            //Vamos trabalhar com essa func "verifyRole", chamando para comparar se for difente do role aceito no endpoint.
            return res.status(403).json({message: "Acesso negado: sem premissão!"})
        }

        next();

    }
}

module.exports = verifyRole;