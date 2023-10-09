const { Router } = require('express');
const Cards = require('../models/Cards');
const router = Router();


// add new card
router.post('/add', async (req, res) => {
    try {

        const { newCard, userId } = req.body;

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

        // Пример использования:
        const bankCardNumber = generateBankCardNumber();

        const card = await new Cards({
            card: newCard,
            owner: userId,
            cardNumber: bankCardNumber
        });

        await card.save();
        res.json(card);


    } catch (error) {
        console.log(error);
    }
})


// get all cards
router.get('/', async (req, res) => {

    try {
        // get-i mej chka req.body, isk query-in axios-i zaprosn e
        const { userId } = req.query;

        const cards = await Cards.find({ owner: userId });

        res.json(cards);
    } catch (error) {
        console.log(error);
    }

})


router.get('/:id', async (req, res) => {

    try {
        // get-i mej chka req.body, isk query-in axios-i zaprosn e
        const { userId } = req.query;

        const card = await Cards.findOne({ _id: userId });
        res.json(card);

    } catch (error) {
        console.log(error);
    }

})


router.delete('/delete/:id', async (req, res) => {
    try {
        const cards = await Cards.findOneAndDelete({ _id: req.params.id });
        res.json(cards);
    } catch (error) {
        console.log(error);
    }
})


// edit card page - i hamar
router.put('/update/card/:id', async (req, res) => {
    try {
        await Cards.updateOne(
            { _id: req.params.id },
            {
                card: [
                    {
                        title: req.body.card[0].title,
                        price: req.body.card[0].price,
                        history: req.body.card[0].history,
                        bgColor: req.body.card[0].bgColor,
                    }
                ]
            },
        );

        res.json({ success: true });
    } catch (error) {
        console.log(error);
    }
})


// cash page - i hamar (input, output)
router.put('/cash/card/:id', async (req, res) => {
    try {

        await Cards.updateOne(
            { _id: req.params.id },
            {
                card: [
                    {
                        title: req.body.card.card[0].title,
                        price: req.body.card.card[0].price,
                        history: req.body.card.card[0].history,
                        bgColor: req.body.card.card[0].bgColor,
                    }
                ]
            },
        );

        res.json({ success: true });

    } catch (error) {
        console.log(error);
    }
})


module.exports = router;
