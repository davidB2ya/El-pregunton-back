const Player = require('../db/models/Player');
const { success, error } = require('../helpers/response');

const playersRouter = require('express').Router();

// Get all players
playersRouter.get('/all-players', async (req, res) => {
    try {
        const players = await Player.find().sort({historyScore: -1})
        success(req, res, players, 200);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

// Post create a player
playersRouter.post('/new-player', async (req, res) => {
    try {
        const { nickname } = req.body;

        if (!nickname)
            return error(req, res, 'Nickname is required', 400, 'Falta el Nickname')

        const player = await Player.findOne({ nickname });

        if (player)
            return success(req, res, 'This nickname already exists.', 201, 'Ya exite el Nickname')

        const newPlayer = new Player({
            nickname
        });

        await newPlayer.save();

        success(req, res, 'Player has been create!', 200);
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

//  Put update a player
playersRouter.put('/update-player', async (req, res) => {
    
    const { nickname, score } = req.body

    const player = await Player.findOne({ nickname });
    console.log(player)
    Player.updateOne(
        { nickname: nickname },
        {
            $set: {
                nickname: nickname,
                historyScore: player.historyScore + score,
                attempts: player.attempts + 1,
            }
        },
    )
        .then(function () {
            success(req, res, 'Player updated successfully!', 200)
        })
        .catch(err => res.status(500).json({ msg: err.message }))
})

// Get search a PLayer
playersRouter.get('/one/:id', async (req, res) => {
    let id = req.params.id
    const getOnePlayer = await Player.findById({ nickname: id })
    success(req, res, getOnePlayer, 200)

})


module.exports = {
    playersRouter
}