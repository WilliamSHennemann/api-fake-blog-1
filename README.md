[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://github.com/diegocandido/) 


# API ESTUDO

Por [Diego Candido](https://diegocandido.com)

Montei esse projeto bem básico para usar várias tecnologias de front-end em sala de aula e testar o conhecimento na prática de consumir algo real e publicado. 

O vídeo explicativo de como fazer algo semelhante está no [YouTube](https://www.youtube.com/watch?v=QVgRQ7fIZ_c) com todos os detalhes.


## URLs do projeto

Esse projeto está publicado no Heroku.

## Para listar TODAS as postagens:

```
https://api-fake-blog.onrender.com/postagens/
```

## Para listar UMA postagem:

```
https://api-fake-blog.onrender.com/postagem/1
```

## Para listar as categorias:

```
https://api-fake-blog.onrender.com/categorias
```

## Para listar as postagens da categoria games:

```
https://api-fake-blog.onrender.com/categoria/games
```

## Para criar uma categoria:

```http
POST /categorias
Content-Type: application/json

{
	"nome": "games"
}
```

## Para editar uma postagem:

```http
PUT /postagem/1
Content-Type: application/json

{
	"titulo": "Novo título",
	"conteudo": "Novo conteúdo",
	"categoria": "games"
}
```

Antes de publicar, execute o arquivo `supabase.sql` no SQL Editor do Supabase e configure `SUPABASE_SECRET_KEY` nas variáveis de ambiente do Render.


## Clonando o Repositório ##
Com o Git e o Node.js instalado na sua maquina e a **URL** do projeto em mãos, cria em algum lugar do seu pc uma pasta para criarmos uma copia do repositório, dentro dela abra o **cmd** ou **powershell** e digite os comandos abaixo:
```
git clone https://github.com/diegocandido/api-fake-blog.git
cd api-fake-blog
npm install
```
