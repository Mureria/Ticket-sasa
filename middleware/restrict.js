

 const restrict = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role){
            res.status(401).send('You do not have permission to perform this action!');
            next();
        }
        return next();
    }
};

module.exports =  restrict;
