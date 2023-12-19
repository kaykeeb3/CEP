// Função principal que é chamada ao clicar no botão "Consultar"
async function consultarCEP() {
    // Obtém o valor do campo de entrada do CEP
    const cep = document.getElementById('cep').value;
    // Obtém a referência à div onde serão exibidos os resultados
    const resultadoDiv = document.getElementById('resultado');

    try {
        // Realiza uma requisição para a API ViaCEP com o CEP fornecido
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        // Converte a resposta para o formato JSON
        const data = await response.json();

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            // Chama a função para obter a mensagem do estado com base no UF
            const estadoMensagem = obterMensagemEstado(data.uf);

            // Cria o bloco de informações do endereço com formatação HTML
            const endereco = `
                <div class="bg-white p-4 rounded-md shadow-md mb-4">
                    <p class="text-lg font-semibold mb-2">Informações do Endereço:</p>
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                    <p><strong>IBGE:</strong> ${data.ibge}</p>
                    <p><strong>DDD:</strong> ${data.ddd}</p>
                    <p><strong>Siafi:</strong> ${data.siafi}</p>
                    <p class="mt-4"><strong>Mensagem do Estado:</strong> ${estadoMensagem}</p>
                </div>
            `;

            // Exibe o bloco de informações na div de resultados
            resultadoDiv.innerHTML = endereco;
        } else {
            // Se a resposta não foi bem-sucedida, exibe uma mensagem de erro
            resultadoDiv.innerHTML = `<p class="text-red-500">CEP não encontrado. Verifique e tente novamente.</p>`;
        }
    } catch (error) {
        // Se ocorrer um erro durante a requisição, exibe uma mensagem de erro
        resultadoDiv.innerHTML = `<p class="text-red-500">Ocorreu um erro. Tente novamente mais tarde.</p>`;
    }
}

// Função para obter a mensagem do estado com base no UF
function obterMensagemEstado(uf) {
    // Mapeia mensagens por estado usando um objeto
    const mensagensPorEstado = {
        'AC': 'Acre, o celeiro da Amazônia.',
        'AL': 'Alagoas, mais verde entre as flores.',
        'AP': 'Amapá, onde o Brasil começa.',
        'AM': 'Amazonas, pulmão do mundo.',
        'BA': 'Bahia, terra da alegria.',
        'CE': 'Ceará, terra da luz.',
        'DF': 'Distrito Federal, coração do Brasil.',
        'ES': 'Espírito Santo, onde o Brasil começa.',
        'GO': 'Goiás, o Brasil começa aqui.',
        'MA': 'Maranhão, região dos grandes lagos.',
        'MT': 'Mato Grosso, o Brasil de todos.',
        'MS': 'Mato Grosso do Sul, Brasil central.',
        'MG': 'Minas Gerais, queijos e montanhas.',
        'PA': 'Pará, a borda do Brasil.',
        'PB': 'Paraíba, sol nascente.',
        'PR': 'Paraná, o estado que mais cresce.',
        'PE': 'Pernambuco, o Brasil em movimento.',
        'PI': 'Piauí, a terra do sol.',
        'RJ': 'Rio de Janeiro, Cidade Maravilhosa.',
        'RN': 'Rio Grande do Norte, orgulho de ser potiguar.',
        'RS': 'Rio Grande do Sul, o melhor para viver.',
        'RO': 'Rondônia, união e trabalho.',
        'RR': 'Roraima, Brasil verde.',
        'SC': 'Santa Catarina, aqui é Brasil.',
        'SP': 'São Paulo, a locomotiva do Brasil.',
        'SE': 'Sergipe, o melhor lugar do mundo.',
        'TO': 'Tocantins, o novo horizonte do Brasil.',
        'default': 'Mensagem sem estado.'
    };

    // Retorna a mensagem correspondente ao estado ou uma mensagem padrão
    return mensagensPorEstado[uf] || mensagensPorEstado['default'];
}
