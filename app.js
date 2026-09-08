const express = require('express')
const cors = require('cors')
const app = express()
const supabase = require('./db.js')


app.use(cors())


const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.use('/img', express.static(__dirname + '/public/images'));

//PAGINA INICIAL
app.get('/', (req,res)=>{
    res.json({ mensagem: 'API Fake Blog funcionando' })
})


//LISTAR TODAS AS POSTAGENS
app.get('/postagens', async (req,res)=>{
    const { data, error } = await supabase
        .from('postagens')
        .select('*')

    if (error) return res.status(500).json({ erro: error.message })
    res.json(data)
})

//LISTAR TODAS AS CATEGORIAS
app.get('/categorias', async (req,res)=>{
    const { data, error } = await supabase
        .from('categorias')
        .select('*')

    if (error) return res.status(500).json({ erro: error.message })
    res.json(data)
})

//EDITAR UMA POSTAGEM
app.put('/postagem/:index', async (req,res) =>{
    const { index } = req.params;
    const { titulo, conteudo, categoria } = req.body;
    const { data, error } = await supabase
        .from('postagens')
        .update({ titulo, conteudo, categoria })
        .eq('id', index)
        .select()
        .single()

    if (error) return res.status(500).json({ erro: error.message })
    return res.json(data)
})

//LISTAR UMA POSTAGEM
app.get('/postagem/:index', async (req,res) =>{
    const { index } = req.params;
    const { data, error } = await supabase
        .from('postagens')
        .select('*')
        .eq('id', index)
        .single()

    if (error) return res.status(500).json({ erro: error.message })
    return res.json(data)
})

//LISTAR CATEGORIA GAMES
app.get('/categoria/games', async (req,res) =>{
    const { data, error } = await supabase
        .from('postagens')
        .select('*')
        .eq('categoria', 'games')

    if (error) return res.status(500).json({ erro: error.message })
    res.json(data)
})

//CRIAR CATEGORIA
app.post('/categorias', async (req,res) =>{
    const { nome } = req.body
    const { data, error } = await supabase
        .from('categorias')
        .insert({ nome })
        .select()
        .single()

    if (error) return res.status(500).json({ erro: error.message })
    res.status(201).json(data)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))