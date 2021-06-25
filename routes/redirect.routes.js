const {Router} = require('express')
const router = Router()
const Link = require('../models/link')

router.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({code: req.params.code}) 
    if(link) {
      link.clicks++ 
      console.log(link)
      await link.save()
      return res.redirect(link.from)
    } 
    res.status(404).json('Ссылка не найдена')
    
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
})

module.exports = router