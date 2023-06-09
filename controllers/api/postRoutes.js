const router = require('express').Router();
const {Post, User}= require('../../models')
const withAuth = require('../../utils/auth');

router.post('/',withAuth,  async(req, res)=>{
    try {
        const newPost = Post.create({
            ...req.body,
            user_id:req.session.user_id
        })
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.delete('/:id', withAuth , async (req, res)=>{
    try {
        const postData = Post.destroy({
            where:{
                id: req.params.id,
                user_id: req.session.user_id
            }
        })
        if (!postData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
          } else{
            res.status(200).json(postData)
          }
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;
