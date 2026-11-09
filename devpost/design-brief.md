---
status: approved
---

# Design brief: Lumi

## The one spatial moment
Uma pequena criatura virtual de estimação pousada numa mesa: Lumi, um dragão bebé curioso, brincalhão e um pouco trapalhão. A pessoa dá-lhe um petisco ou lança uma bola e vê uma reação curta, querida e expressiva, numa área pequena.

## Why it belongs on glasses
- Uses: draws in the world.
- O Lumi ocupa um lugar fixo na mesa e pode ser observado de diferentes ângulos ao mover a câmara. A presença da criatura no espaço é a principal vantagem espacial desta experiência (interpretação a confirmar na revisão).

## Product or overlay
- Type: product: a criatura virtual é a experiência.
- A versão real usaria uma superfície para colocação; o reconhecimento de mesas não faz parte desta versão.
- Stand-in for the preview: mesa virtual com marcador fixo e botão “Colocar Lumi”. Não depende de reconhecimento, óculos ou serviços externos.

## Where things live
- A pessoa olha para a mesa, ligeiramente abaixo dos olhos.
- Mesa virtual: tampo de 70 × 45 cm, a 75 cm do chão (default), centrado cerca de 100 cm à frente da posição inicial da câmara (default).
- Lumi: tamanho de uma chávena, aproximadamente 12 cm de altura (default), no tampo e fixo no mundo depois da colocação. Corpo arredondado azul, barriga e detalhes brancos, olhos grandes e asas pequenas; estilo 3D simples, querido e expressivo.
- Marcador: no ponto inicial do Lumi, no tampo; confirma uma posição predefinida, sem arrastar ou escolher outro ponto (default).
- Painel: junto à mesa, virado para a posição inicial de utilização (default), sem acompanhar a câmara. Botões grandes, aproximadamente 8 × 5 cm cada (default).
- Comida: petisco perto do Lumi, a cerca de 8 cm (default).
- Bola: lançamento curto sobre o tampo, com percurso de até 20 cm (default). A brincadeira mantém-se numa área pequena, sem sair da mesa.

## Hands and input
- Colocar Lumi: clique no botão para confirmar a posição mostrada pelo marcador.
- Alimentar: clique faz surgir o petisco e começa a sequência de cerca de 3 segundos: olha para a comida, inclina a cabeça, aproxima-se com um pequeno saltinho, come, fecha os olhos de satisfação, abana a cauda e bate as asinhas.
- Brincar: clique inicia um lançamento curto da bola; Lumi olha para ela, corre atrás com passos trapalhões, toca-lhe com o focinho, vira-se para a pessoa e dá um saltinho contente. Duração aproximada de 4 segundos (default).
- Durante qualquer uma destas sequências, Alimentar e Brincar ficam temporariamente desativados, com estado visual claro (default), impedindo ações sobrepostas.
- Reiniciar: fica disponível durante as animações; remove Lumi e objetos, cancela animações e ações pendentes e volta ao marcador com Colocar Lumi.
- Targets are big and highlight when aimed at.
- Voice: nenhuma. Todas as ações funcionam por clique no Interactive Preview.

## When things show
- Mesa: sempre visível.
- Estado inicial: marcador e Colocar Lumi; sem criatura, bola, comida ou painel de ações.
- Depois da colocação: marcador e Colocar Lumi desaparecem; surgem Lumi e o painel com Alimentar, Brincar e Reiniciar.
- Em repouso: Lumi fica no mesmo lugar, respira suavemente, pisca os olhos e abana a cauda de vez em quando.
- Petisco e bola: aparecem apenas durante a respetiva ação e desaparecem no fim.
- Depois de cada ação, Lumi regressa ao ponto de repouso por um movimento curto antes de reativar os botões (default), evitando deslocações acumuladas.
- Reiniciar restaura imediatamente o estado inicial, mesmo a meio de uma ação.
- If something needs attention out of view: none (default); não há eventos que exijam atenção fora da área da mesa.

## Done criteria
Each one can be checked in Lens Studio's preview.
1. Colocar o Lumi azul e branco na mesa e confirmar que fica no mesmo ponto ao mover a câmara.
2. Observar os movimentos em repouso: respirar, piscar os olhos e abanar a cauda.
3. Clicar em Alimentar e ver a sequência completa de cerca de 3 segundos, com o petisco a desaparecer no fim.
4. Clicar em Brincar e ver o Lumi seguir a bola, tocar-lhe com o focinho e celebrar, sem permitir ações sobrepostas. Alimentar e Brincar ficam desativados durante ambas as sequências; a bola desaparece no fim.
5. Clicar em Reiniciar, mesmo durante uma animação, e voltar ao marcador inicial sem objetos ou animações pendentes.

## Out of scope
- Mais criaturas ou superfícies; outras interações além de alimentar, brincar e reiniciar.
- Reconhecimento de superfícies reais, visão de câmara, serviços externos, IA e voz.
- Persistência entre sessões, multiplayer e necessidades contínuas como fome ou níveis (default).
- Lançamento manual por gesto: nesta versão, o botão inicia a brincadeira.
- Construção nesta fase: este documento é apenas o planeamento.

## Risks and open questions
- Conforto prolongado e qualidade real do seguimento das mãos: feel unproven; a validação será no preview.
- A mesa virtual representa a superfície real; não prova reconhecimento ou colocação numa mesa real.
- Dimensões, duração da brincadeira e regresso ao ponto de repouso assinalados como default devem ser revistos pela pessoa.
- A primeira versão deve ser pequena e terminada hoje; priorizar o fluxo e reações simples e legíveis.

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources

