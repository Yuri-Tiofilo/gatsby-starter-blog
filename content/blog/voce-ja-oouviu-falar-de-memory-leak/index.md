---
title: Você já ouviu falar de Memory Leak?
date: "2022-06-05T12:00:32.169Z"
description: Você já ouviu falar de Memory Leak? Não? Então bora ver do que se trata isso.
---

# Memory Leak

Um vazamento de memória (Memory leak) é um tipo de vazamento de recursos que ocorre quando um programa de computador gerencia incorretamente as alocações de memória de forma que a memória que não é mais necessária não é liberada. Ou seja a memória além ser preenchida não tem o seu devido espaço liberado, quando ão mais necessária. Um vazamento de memória também pode ocorrer quando um objeto é armazenado na memória, mas não pode ser acessado pelo código em execução. Simplificando, diz-se que um vazamento de memória ocorre sempre que existem dados inacessíveis ou não referenciados na memória.

De modo geral ela prejudica o desempenho do projeto, pois ela:

- Trava o software
- retarda o carregamento da aplicaticação
- reduz a quantidade de memória disponível em sua aplicação

No React em especifico este “Vazamento de informação” irá aparecer de forma:

<aside>
🚨 Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

</aside>

Vazamentos de memória em aplicativos React são principalmente resultado do não cancelamento de assinaturas feitas quando um componente foi montado antes do componente ser desmontado, por meio de um UseEffect. Essas assinaturas podem de eventos DOM, uma assinatura Sockets ou até mesmo uma chamada para uma API.

Aqui está um cenário normal que causa esse problema de vazamento de memória:

1) O usuário executa uma ação que aciona um manipulador de eventos para buscar dados de uma API.
2) Depois disso, um usuário clica em um link, que navega para outra página antes de concluir a etapa 1.
3) Agora, a primeira ação completa e passa os dados recuperados da API e chama a função, que atualiza o estado.

Um exemplo disso é um código assim:

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchEndpoint } from '../utils/fetchs';

const Greeting = () => {
	const [value, setValue] = useState('VALUE');
	useEffect(() => {
		fetchEndpoint().then(() => {
			setValue("VALUE API");
		});
	}, []);

	return (
		<>
        <pre>{value}</pre>
        <Link to = '/outher-page'>Another Interesting Page</Link>
    </>
	)
}

export { Greeting };

```

Tá, mais pq o código acima não é seguro o pode haver um vazamento de memória?

A resposta para isso se dá, pois não sabemos se o componente que será renderizado nesta pagína, irá ter uma ação quando não estiver mais sendo montado, e não há uma função para desmontar este componente que esta sendo renderizado. Isso também pode ocorrer devido a banda de internet do usuário não tenha renderizado os dados da API, e assim ele irá clicar no link antes mesmo da informação do `state` ter carregado.

Tendo um código semelhante a este e tendo um mesmo passo a passo colocado acima, temos o aviso de erro no console.

### Mais como resolver?

Temos diversas opções mais as mais utilizada seria, utilizar o hooks `useRef`, para assim controlar a renderização do componente e assim determinar uma função de desmontar o componente. Segue abaixo o exemplo: 

```jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { fetchEndpoint } from '../utils/fetchs';

const Greeting = () => {
	const _isMounted = useRef(true);
	const [value, setValue] = useState('VALUE');
	useEffect(() => {
		if (_isMounted.current) {
			fetchEndpoint().then(() => {
				setValue("VALUE API");
			});
		}

		return () => {
			_isMounted.current = false;
		}
		
	}, []);

	return (
		<>
        <pre>{value}</pre>
        <Link to = '/outher-page'>Another Interesting Page</Link>
    </>
	)
}

export { Greeting };
```

Outra forma de evitar esse vazamento de memoria é utilizar o `AbortController`. De acordo com o [MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) , o `AbortController` representa um objeto controlador que permite abortar uma ou mais solicitações da Web como e quando desejado. Assim o código ficaria mais ou menos assim:

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Greeting = () => {
	const [value, setValue] = useState('VALUE');
	
	useEffect(() => {
    let abortController;
    (async () => {
      abortController = new AbortController();
      let signal = abortController.signal;    

      const { data } = await axios.get(
        'https://endpoint.com.br',
        { signal: signal }
      );
      setValue(data);
    });
    
    return () => abortController.abort();
	}, []);

	return (
		<>
      <pre>{value}</pre>
      <Link to = '/outher-page'>Another Interesting Page</Link>
    </>
	)
}

export { Greeting };
```

Aqui neste exemplo eu mexi em algumas bibliotecas para facilitar a explicação, porém deste modo funciona de forma extremamente acertiva, para evitar problemas de vazamento da memória.

E só explicando o return que temos do `abortController.abort()`, ele não gera nenhum erro simplesmente não executa nenhuma ação em uma solicitação já concluída.

Portanto se realizarmos essas duas trativas, poderemos assim melhorar o desempenho das nossas aplicações Web e assim evitar Memory Leak (Vazamentos de memória). De modo geral, recomendo muito utilizar pois assim você terá uma melhor qualidade em todos os seus sistemas.

Obrigado por ler aqui aqui ❤️❤️❤️