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
const editarPostagem = async (req,res) =>{
    const { index } = req.params;
    const titulo = req.body.titulo || req.body.title;
    const conteudo = req.body.conteudo || req.body.description;
    const categoria = req.body.categoria || req.body.category;
    const alteracoes = {};

    if (titulo !== undefined) alteracoes.titulo = titulo;
    if (conteudo !== undefined) alteracoes.conteudo = conteudo;
    if (categoria !== undefined) alteracoes.categoria = categoria;

    if (Object.keys(alteracoes).length === 0) {
        return res.status(400).json({ erro: 'Informe ao menos um campo para editar' })
    }

    const { data, error } = await supabase
        .from('postagens')
        .update(alteracoes)
        .eq('id', index)
        .select()
        .single()

    if (error) {
        if (error.code === 'PGRST116') {
            return res.status(404).json({ erro: 'Postagem não encontrada' })
        }
        return res.status(500).json({ erro: error.message })
    }
    return res.json(data)
}

app.put('/postagem/:index', editarPostagem)
app.put('/postagens/:index', editarPostagem)

//LISTAR UMA POSTAGEM
const listarPostagem = async (req,res) =>{
    const { index } = req.params;
    const { data, error } = await supabase
        .from('postagens')
        .select('*')
        .eq('id', index)
        .single()

    if (error) {
        if (error.code === 'PGRST116') {
            return res.status(404).json({ erro: 'Postagem não encontrada' })
        }
        return res.status(500).json({ erro: error.message })
    }
    return res.json(data)
}

app.get('/postagem/:index', listarPostagem)
app.get('/postagens/:index', listarPostagem)

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