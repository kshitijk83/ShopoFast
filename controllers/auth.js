exports.getLogin = (req, res, next)=>{
    const loggedIn = req.get('Cookie').trim().split('=')[1]==='true';
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: loggedIn
    });
}

exports.postLogin = (req, res, next)=>{
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
}