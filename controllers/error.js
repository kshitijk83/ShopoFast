exports.err404 = (req, res, next)=>{
    res.status(404).render('error', { pageTitle: 'Error', path: '/404' });
}