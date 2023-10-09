const User = require('../models/User');
const Cards = require('../models/Cards');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const router = Router();

router.post('/registration',
    [
        check('name', 'Name field is required').notEmpty(),  // Name-i dasht@ partadir e
        check('email', 'Incorrect email.').isEmail(),   // Nekorektni email
        check('password', 'Incorrect password.').isLength({ min: 6 }),  // Nekorektni parol
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during registration.',
                    // Nekorektnie dannie pri registracii
                })
            }

            const { name, email, password } = req.body;
            const isUsed = await User.findOne({ email });

            if (isUsed) {
                return res.status(300).json({ message: 'This mail is already busy, try another one.' });
                // Ays email-@ arden zbaxvac e, pordzeq urish@
            }

            const hachedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                name,
                email,
                password: hachedPassword,
                avatar: 'fa-solid fa-circle-user',
            });

            await user.save();
            res.status(201).json({ message: 'User created.' });
            // Akaunt@ stexcvec



            // -------------------------------------------------
            // add 3 default cards -- Savings, Donations, Goals
            function generateBankCardNumber() {
                let cardNumber = '';
                const groups = 4; // Количество групп цифр
                const digitsPerGroup = 4; // Количество цифр в каждой группе

                for (let i = 0; i < groups; i++) {
                    for (let j = 0; j < digitsPerGroup; j++) {
                        // Генерируем случайную цифру от 0 до 9
                        const digit = Math.floor(Math.random() * 10);
                        cardNumber += digit;
                    }

                    if (i < groups - 1) {
                        cardNumber += ' '; // Добавляем пробел между группами
                    }
                }

                return cardNumber;
            }

            const defaultCards = [
                {
                    owner: user._id,
                    cardNumber: generateBankCardNumber(),
                    card: [
                        {
                            title: 'Savings',
                            price: 0,
                            history: [],
                            bgColor: 'rgb(239 68 68)'
                        }
                    ]
                },

                {
                    owner: user._id,
                    cardNumber: generateBankCardNumber(),
                    card: [
                        {
                            title: 'Donations',
                            price: 0,
                            history: [],
                            bgColor: 'rgb(37 99 235)'
                        }
                    ]
                },

                {
                    owner: user._id,
                    cardNumber: generateBankCardNumber(),
                    card: [
                        {
                            title: 'Goals',
                            price: 0,
                            history: [],
                            bgColor: 'rgb(255 163 0)'
                        }
                    ]
                },
            ]

            await Cards.insertMany(defaultCards);

        } catch (error) {
            console.log('Add default cards error - ', error);
        }
    }
)

router.post('/login',
    [
        check('email', 'Incorrect email.').isEmail(),   // Nekorektni email
        check('password', 'Incorrect password').exists(), // Nekorektni parol
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login details',  // Nekorektnie dannie pri vxode
                })
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res
                  .status(400)
                  .json({ message: "You don't have an Account. Please Create an Account." });
                    // Takovo email v baze net
            }

            const user_name = user.name;

            const isMatched = bcrypt.compare(password, user.password);

            if (!isMatched) {
                return res.status(400).json({ message: 'Incorrect password.' });  // Neverni parol
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id, user });
        } catch (error) {
            console.log(error);
        }
    }
)

router.put('/edit/profile/:id', async (req, res) => {
    try {
        const { userName, logoAvatar } = req.body;

        await User.findByIdAndUpdate(
            req.params.id,
            { name: userName, avatar: logoAvatar },
            { new: true }
        );

        res.json({ success: true });

    } catch (error) {
        console.log(error);
    }
})

router.delete('/delete/user/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const deletedCards = await Cards.deleteMany({ owner: req.params.id });

        if (deletedCards.deletedCount === 0) {
            return res.status(404).json({ error: 'No cards found for the owner' });
        }

        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
    }
})

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
    }
})

// transfer between users
router.post('/transfer/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { input, card, friendUserId, userId } = req.body;
        const friendCard = await Cards.find({ owner: friendUserId });

        const myUser = await User.find({ _id: userId });
        const frinedUser = await User.find({ _id: friendUserId });

        const date = new Date();
        const month = String(date.getMonth()).length === 1 ? '0' + (date.getMonth() + 1) :
            date.getMonth() + 1;
        const day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate();
        const today = `${month}.${day}.${date.getFullYear()}`;

        const newFromHistory = [`to account of ${frinedUser[0].name}`, today, `-$${input}`];
        const newFriendHistory = [`from account of ${myUser[0].name}`, today, `+$${input}`];


        // փոխանցող user
        await Cards.updateOne(
            { _id: id },
            {
                card: [
                    {
                        title: card.card[0].title,
                        price: card.card[0].price - input,
                        history: [newFromHistory, ...card.card[0].history],
                        bgColor: card.card[0].bgColor,
                    }
                ]
            },
        );


        // փոխանցվող user, friendUserId
        await Cards.updateOne(
            { owner: friendUserId, 'card[0].title': friendCard[0].card.title },
            {
                card: [
                    {
                        title: friendCard[0].card[0].title,
                        price: friendCard[0].card[0].price + +input,
                        history: [newFriendHistory, ...friendCard[0].card[0].history],
                        bgColor: friendCard[0].card[0].bgColor,
                    }
                ]
            },
        );

        // send to friend email to about of transfer
        const html = `
            <h1>Message from "My Own Bank"</h1>
            <p>${input} dollars has been sent to your account from " ${myUser[0].name} " account in the ${today}.</p>
        `;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_LOGIN,
            to: frinedUser[0].email,
            subject: 'Message from "My Own Bank"',
            html,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Ошибка при отправке письма:', error);
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.log(error);
    }
})

// user forgoted password
router.post('/forgot/password', async (req, res) => {
    let date = new Date();

    // send to friend email to about of transfer
    const html = `
        <h1>Message from "My Own Bank" - forgot user</h1>
        <h2>Email of user: ${req.body.email} </h2>
        <p><b>${req.body.email}</b> - This user has forgoten their pin and wants to reset it.</p>
        <p>Date of dispatch: ${date.toISOString().split('T')[0]} </p>
        <p>Time of dispatch: ${date.toISOString().split('T')[1]} </p>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: true,
        auth: {
            user: process.env.EMAIL_LOGIN,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_LOGIN,
        to: process.env.EMAIL_LOGIN,
        subject: 'Message from "My Own Bank" - forgot user',
        html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Ошибка при отправке письма:', error);
        }
    });

    res.json({message: 'Success'});
})

module.exports = router;