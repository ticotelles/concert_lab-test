# Concert Test

Este projeto é uma aplicação Angular para visualização de um dataset de imagens com anotações no formato COCO. Ele permite navegar por imagens, ver detalhes das annotations e explorar categorias associadas ao dataset localizado na pasta `public/dataset`.

## Visão geral

- Angular 21
- TypeScript
- Estilo CSS
- Dataset em JSON (`public/dataset/annotations_coco.json`)
- Visualização de imagens e modal de anotações

## Requisitos

Antes de rodar o projeto, verifique se você tem instalado:

- Node.js v20+ (recomendado v20 ou v22)
- npm v10+
- Git

Para verificar:

```bash
node -v
npm -v
```

Se esses comandos não retornarem versões válidas, instale o Node.js e o npm antes de continuar.

## Clonar o repositório

```bash
git clone <url-do-repositorio>
cd Concert-Test
```

Se você já estiver dentro da pasta do projeto, pode pular essa etapa.

## Instalar dependências

Na raiz do projeto, execute:

```bash
npm install
```

Esse comando instala todas as dependências do Angular e do projeto.

## Rodar localmente

Para iniciar o servidor de desenvolvimento:

```bash
npm run start
```


Depois que o servidor subir, abra no navegador:

```text
http://localhost:4200/
```

A aplicação vai recarregar automaticamente quando você alterar os arquivos do projeto.

## Estrutura principal

```text
Concert-Test/
public/
└── dataset/
    ├── annotations_yolo/
    ├── images/
    └── annotations_coco.json

src/
└── app/
    ├── core/
    │   ├── interfaces/
    │   └── services/
    │
    ├── features/
    │   └── dataset/
    │       └── components/
    │           ├── annotation-modal/
    │           ├── filter/
    │           ├── image-gallery/
    │           └── statistics/
    │
    ├── app.config.ts
    ├── app.css
    ├── app.html
    ├── app.routes.ts
    ├── app.spec.ts
    └── app.ts
```

## Como o projeto funciona

O dataset principal está em:

```text
public/dataset/annotations_coco.json
```

A aplicação carrega esse arquivo via `DatasetService` e exibe as imagens e detalhes das anotações na interface.




## Dicas de solução de problemas

### Erro de dependências ou módulos ausentes

Execute:

```bash
rm -rf node_modules package-lock.json
npm install
```

No Windows, use PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```



### Projeto não abre no navegador

Confirme se o terminal mostra uma mensagem como:

```text
** Angular Live Development Server is listening on localhost:4200 **
```

E acesse a URL informada.




## Parte 1: Critérios de Anotação e Dificuldades Encontradas

As anotações foram realizadas na ferramenta makesense.ai utilizando quatro classes: pessoa, capacete, colete e sem_capacete.

## Critérios Adotados

Ajuste das Bounding Boxes: As caixas delimitadoras foram traçadas o mais próximo possível das extremidades visíveis de cada objeto, evitando sobras excessivas de fundo ou cortes nas bordas.

Oclusões e Objetos Distantes: Objetos cobertos em mais de 80% por obstáculos/outras pessoas ou trabalhadores muito distantes ao fundo (com baixa resolução para distinguir o uso de EPI) foram desconsiderados para evitar ruído no treinamento.

Consistência entre Classes: Sempre que uma pessoa estava visível, a caixa pessoa envolvia todo o corpo visível, enquanto capacete, sem_capacete e colete foram marcados individualmente sobre a região específica correspondente.

## Principais Dificuldades na Anotação

Oclusões Parciais em Obras: Em fotos com equipes trabalhando próximas, ferramentas, andaimes e outros trabalhadores frequentemente cobriam parte dos coletes ou dos corpos, exigindo atenção redobrada para manter o padrão de marcar apenas a área visível.

Casos Ambíguos de Proteção na Cabeça: Em algumas imagens, trabalhadores utilizavam bonés, toucas ou capuzes sob o capacete (ou no lugar dele). Nesses casos, adotou-se o critério rigoroso de marcar sem_capacete sempre que não se tratava claramente de um capacete rígido de segurança.

Coletes Desabotoados ou Parcialmente Visíveis: Quando o trabalhador estava de perfil ou de costas com mochila/equipamentos, identificar e delimitar o colete refletivo exigiu análise cuidadosa para não confundir faixas de roupas comuns com EPI.

Algumas imagens tinha uma pessoa segurando no braço o capacete, surgiu a dúvida se deveria fazer a anotação como "Capacete", porque da a entender que a pessoa está usando o capacete corretamente.



## Parte 2: Decisões Técnicas da Aplicação Angular

A aplicação foi estruturada seguindo boas práticas de engenharia de software e reatividade moderna do Angular:

Arquitetura Baseada em Features (core/ e features/):

core/interfaces e core/services: Concentram a tipagem estrita da estrutura COCO (sem uso de any) e o DatasetService, responsável pelo carregamento HTTP, leitura via FileReader.

features/dataset/components: Componentes pequenos e desacoplados (statistics, filter, image-gallery e annotation-modal), comunicando-se exclusivamente via input() e output().


### Dificuldades Técnicas no Desenvolvimento

Dificuldade inicial de entender como o Angular funciona, sintaxes, etc.

Sincronização de IDs das Categorias: Como ferramentas de anotação geram os IDs das categorias conforme a ordem em que são criadas, foi necessário garantir o mapeamento dinâmico entre o array categories do JSON e os category_id presentes nas anotações, evitando divergências nos filtros e nas contagens estatísticas.


## O que eu faria de diferente com mais tempo

Testes Automatizados: Implementaria testes unitários para validar o parser do COCO JSON, os cálculos de estatísticas e o comportamento dos filtros em cenários de erro ou arquivos corrompidos.

File-upload: implementaria o componente para fazer o upload dos arquivos e fotos



## Processo de desenvolvimento

O desenvolvimento do projeto foi dividido em pequenas etapas, priorizando o aprendizado das tecnologias e a resolução gradual dos problemas.

1. **Planejamento:** utilizei IA para elaborar um plano de estudos e desenvolvimento, identificando os conhecimentos necessários para realizar o projeto.

2. **Estudo de anotação de imagens:** assisti a videoaulas e tutoriais sobre coleta e anotação de imagens utilizando a ferramenta [makesense.ai](https://www.makesense.ai/).

3. **Preparação do dataset:** realizei o download de 60 imagens e fiz manualmente as anotações dos objetos presentes em cada uma delas.

4. **Estudo do Angular:** como já possuía mais familiaridade com React, estudei os principais fundamentos do Angular por meio de videoaulas de aproximadamente 1 a 2 horas, concentrando nos conceitos necessários para o desenvolvimento.

5. **Desenvolvimento incremental:** dividi o problema em pequenas partes, estudando e implementando cada funcionalidade separadamente. Essa abordagem facilitou a compreensão da arquitetura do Angular e a resolução dos desafios encontrados durante o desenvolvimento.

### Uso de Inteligência Artificial

A Inteligência Artificial foi uma ferramenta importante durante o desenvolvimento, principalmente como apoio ao aprendizado do Angular, identificação e correção de bugs e a compreensão de conceitos.

Um dos métodos utilizados foi comparar conceitos do Angular com conhecimentos que eu já possuía em React. Por exemplo, compreender os Angular Signals por meio de uma comparação com o `useState` do React facilitou o aprendizado.

Também utilizei IA para auxiliar na criação das interfaces TypeScript a partir da estrutura do arquivo `annotations_coco.json`. Como o arquivo possui uma estrutura extensa e diversas propriedades aninhadas, esse auxílio facilitou a identificação dos tipos e reduziu a possibilidade de erros manuais na tipagem.

É importante destacar que a IA foi utilizada como ferramenta de apoio, não como substituta do desenvolvimento. As sugestões foram analisadas, testadas e, quando necessário, adaptadas para melhorar a compreensão do código e atender às necessidades do projeto.



