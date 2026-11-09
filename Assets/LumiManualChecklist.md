# Lumi — verificação manual no Interactive Preview

Projeto: Lumi523, Lens Studio 5.23.2. Brief aprovado preservado em devpost/design-brief.md (SHA-256 37AE3CB4C075F21A69DA13E464690EFEE289C166ACDEC2EF00F63D56D7FED6EF).

Backup integral anterior à remoção de LEAF: ../Lumi523_backup_before_LEAF_removal_20261109_201835.

## Estado LEAF

Todos os cinco critérios LEAF estão BLOQUEADOS / NÃO EXECUTADOS. Nenhum passou. Leaf 4.0.0 importava InteractionKit.lspkg, ausente neste projeto com SpectaclesInteractionKit 2.0.0. O pacote incompatível foi removido mediante autorização. SIK e a versão do projeto foram mantidos. As verificações seguintes são manuais no preview, não são testes LEAF.

## Como demonstrar

Abrir Interactive Preview e clicar no botão visível com o rato. Quando se muda o alvo, apontar primeiro e clicar depois. Colocar Lumi revela Alimentar, Brincar e Reiniciar. A mesa e o painel ficam fixos no mundo. Não há reconhecimento de superfícies.

## Critérios e evidências observadas em 09/11/2026

1. Colocar: VERIFICADO por clique real SIK/Interactive Preview e captura. Antes: marcador, Colocar Lumi, sem criatura. Depois: dragão azul/branco, sem marcador, três ações visíveis. Revisão visual final: captura frontal com a câmara orientada para (0,-20,-100), seguida de deslocamento lateral de 25 cm para (25,0,0) e orientação para o mesmo alvo. A perspetiva mudou; Lumi manteve-se no centro da mesa e o painel permaneceu fixo no mundo.
2. Repouso: animações implementadas (respiração, piscar a cada 3,7 s e cauda). Captura em repouso obtida; piscar dos olhos e comparação completa dos movimentos em dois momentos ainda não foram confirmados visualmente. Não declarar cobertura LEAF.
3. Alimentar: VERIFICADO por clique real e estados de runtime temporariamente observados. Às 20:29:01, feeding elapsed 1,377 s, comida visível e Alimentar/Brincar inativos. Às 20:29:02, elapsed 2,405 s, comida já consumida. Às 20:29:03, idle, completedFeeds=1, comida ausente e botões ativos. Sequência total configurada em 3 s incluindo regresso.
4. Brincar: VERIFICADO por clique real, captura durante ação e runtime. Captura mostra Lumi orientado para a bola rosa, com controlos de ação inativos. Às 20:29:35/36/37, playing elapsed 0,885/1,916/2,978 s e bola visível. Às 20:29:38, idle, completedPlays=1, bola ausente e ações reativadas. Percurso da bola de -10 a +10 cm, 20 cm totais; sequência 4 s incluindo regresso. Estado exclusivo impede sobreposição; os dois botões ficam inativos em ambas as ações.
5. Reiniciar: VERIFICADO durante Alimentar. Lote de cliques iniciou feeding (20:30:00, elapsed 0,448 s) e acionou Reiniciar antes dos 3 s. Captura posterior confirmou marcador e Colocar Lumi, sem dragão/comida/bola; a mesma situação permaneceu após mais de 20 s, sem reaparecimento. Não usa callbacks temporizados pendentes: apenas a máquina de estados do UpdateEvent. Reiniciar durante Brincar ainda não foi verificado manualmente.

## Escala e persistência

Mesa confirmada por AABB: X[-35,35], Y[-32,-30], Z[-122,5,-77,5] cm, tampo 70 x 2 x 45 cm. Pernas de 74 cm; piso virtual a -105 cm, topo a -30 cm (75 cm de altura). Centro a 100 cm da câmara inicial. Lumi com cerca de 12 cm de altura. Cena e referências guardadas por project.save().

## Revisão visual final

Confirmados visualmente: estado inicial com marcador/Colocar e sem criatura; estado colocado com dragão azul/branco, UI legível e mesa; perspetiva lateral com ancoragem mantida após deslocar a câmara 25 cm. Não declarar os cinco critérios integralmente provados: piscar e reset durante Brincar continuam por confirmar, e LEAF está bloqueado.

## Limites

Logic proven apenas para os estados e interações acima observados. Conforto prolongado e qualidade real do seguimento das mãos: feel unproven, sem óculos disponíveis. LEAF não passou em nenhum critério. Nada foi publicado. A instrumentação de diagnóstico foi removida dos scripts após esta verificação.

