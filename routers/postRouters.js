const express = require("express");
const Post = require("../models/postModel");
const router = express.Router();

router.post('/', async(req, res)=>{
    try {
        const {name, level, isOnline} = req.body

        if(!name || typeof level !== 'number'){
            return res.status(400).json({message : 'name과 level은 필수입니다.'})
        }
        const newPost = new Post({
            name,
            level,
            isOnline: isOnline ?? false
        })

        const savePost = await newPost.save()

        res.status(200).json({message : '캐릭터 추가하기 성공', post : savePost})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'서버오류',error})
    }
})

module.exports = router