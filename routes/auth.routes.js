const { Router } = require('express')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/user')
const router = Router()


router.post(
  '/register',
  [
    check('email', 'Некорректный Email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        err: errors.array(),
        message: 'Некорректные данные для регистрации'
      })
    }
    try {
      let { email, password } = req.body
      email = email.toString()
      password = password.toString()
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)



      const user = new User({ email, password: hashedPassword })
      await user.save()

      res.status(201).json({ message: 'Аккаунт создан' })
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  })


router.post(
  '/login',
  [
    check('email', 'Введите корректный Email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        err: errors.array(),
        message: 'Некорректные данные для входе в систему'
      })
    }
    try {
      let { email, password } = req.body
      email = email.toString()
      password = password.toString()
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так' })
    }
  })

module.exports = router