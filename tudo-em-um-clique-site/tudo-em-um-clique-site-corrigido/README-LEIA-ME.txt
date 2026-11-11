TUDO EM UM CLIQUE — PACOTE CORRIGIDO

ESTRUTURA
- index.html: página pública
- style.css e app.js: visual e funcionamento
- data/products.json: catálogo inicial vazio
- admin/: painel Decap CMS
- images/uploads/: imagens adicionadas pelo painel
- netlify.toml: publicação estática na raiz

PUBLICAÇÃO NO NETLIFY
1. Extraia este ZIP no computador.
2. Envie TODOS os arquivos e pastas para a raiz do repositório GitHub (não envie o ZIP).
3. No Netlify, importe o repositório GitHub.
4. Branch: main
5. Build command: deixe vazio.
6. Publish directory: coloque apenas .
7. Publique.

ATIVAR O PAINEL ADMINISTRATIVO (NECESSÁRIO)
O site público pode abrir sem esta etapa. Para o painel /admin/ salvar alterações no GitHub:
1. No painel do site Netlify, abra Site configuration (ou Project configuration) > Identity.
2. Ative Enable Identity.
3. Em Registration, escolha Invite only.
4. Em Services > Git Gateway, ative Enable Git Gateway.
5. Em Identity, convide seu próprio e-mail e aceite o convite recebido.
6. Depois acesse SEU-ENDERECO-NETLIFY/admin/ e entre.

OBSERVAÇÃO IMPORTANTE
- O painel administrativo usa Decap CMS + Netlify Identity + Git Gateway. Ele depende de esses serviços estarem disponíveis e ativados no site Netlify.
- Se a opção Git Gateway não aparecer na sua conta, não significa que o site público esteja quebrado; será necessário configurar outro CMS/backend. Não publique links de afiliado falsos.
- Cadastre apenas links reais gerados pela sua conta de afiliado.
- O catálogo começa vazio de propósito; adicione seus produtos pelo painel depois de ativá-lo.
