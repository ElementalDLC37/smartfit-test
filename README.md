# SmartfitTest

Projeto desenvolvido para um antigo teste técnico da Smart-Fit em tempos de pandemia, no qual era necessário criar uma página web que atenda as seguintes funcionalidades:
- Carrega unidades através do arquivo json `https://test-frontend-developer.s3.amazonaws.com/data/locations.json` com method `GET`
- Busca todas as unidades
- Busca unidades com filtros
- Mostra previsão de resultados encontrados
- Mostra unidades ao buscar

E atenda essas regras de negócio:
- Filtrar unidades abertas ou fechadas
- Filtrar unidades por período de funcionamento
- Caso não encontre unidades, mostrar uma menssagem ao usuário "Nenhuma unidade encontrada"
- Validar para mostrar ícones corretos de acordo com o status

O projeto foi realizado em Angular.
