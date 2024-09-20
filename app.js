const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

const { User } = require("./models/User");

// {
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/first', (req, res) => {
//     res.send('test')
// })

// app.get('/status', (req, res) => {
//     res.status(201).json({
//         status: 'ok',
//     })
// })
// }

app.get("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
  return res.status(200).json(user);
});



// CREATE
app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body)
        await user.reload()
        return res.status(201).json(user)
    } catch (e) {
        return res.status(400)
    }
})

// READ
app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll({})
        return res.status(200).json({
            data: users,
            meta: {
                page: 1,
                per_page: 10,
                totalItems: users.length
            }
        })
    } catch (e) {
        return res.status(400).json({ message: e.message })
    }
});

// UPDATE
app.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (user) {
            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
        }
        await user.save()
        return res.status(200).json(user)
    } catch (e) {
        return res.status(400).json({ message: e.message })
    }
})

// DELETE
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        await user.destroy()
        return res.status(204).json()
    } catch (e) {
        return res.status(400).json({ message: e.message })
    }
})



app.listen(port, async () => {
  try {
    await User.sync({
      alter: true,
      force: false,
    });
  } catch (e) {
    console.log(e);
  }
});
