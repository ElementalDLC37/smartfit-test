# SmartfitTest

### Projeto desenvolvido para um antigo teste técnico da Smart-Fit em tempos de pandemia, no qual era necessário criar uma página web que atenda as seguintes funcionalidades:
- Carrega unidades através do arquivo json `https://test-frontend-developer.s3.amazonaws.com/data/locations.json` com method `GET`
- Busca todas as unidades
- Busca unidades com filtros
- Mostra previsão de resultados encontrados
- Mostra unidades ao buscar

### E atenda essas regras de negócio:
- Filtrar unidades abertas ou fechadas
- Filtrar unidades por período de funcionamento
- FIltrar caso abra aos sábados e/ou domingos
- Caso não encontre unidades, mostrar uma menssagem ao usuário "Nenhuma unidade encontrada"
- Validar para mostrar ícones corretos de acordo com o status

O projeto foi realizado em Angular, com auxílio do Angular CLI versão 18.0.7.

### Servidor de desenvolvimento
Execute ng serve para iniciar um servidor de desenvolvimento. Navegue até `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

### Criação de código
Execute ng generate component nome-do-componente para gerar um novo componente. Você também pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Compilação
Execute ng build para compilar o projeto. Os artefatos de compilação serão armazenados no diretório `dist/`.
