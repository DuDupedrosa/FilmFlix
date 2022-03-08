export default function apiFilm() {
  const filmDescription = document.querySelector('[data-filme="description"]');
  const filmBody = document.querySelector('[data-filme="body"]');
  const filmName = document.querySelector('[data-filme="name"]');
  const buttonStart = document.querySelector('[data-filme="button"]');
  const filmImgTag = document.querySelector('[data-filme="img"]');
  const filmBoxTrue = document.querySelector('[data-filme="true"]');
  const filmBoxError = document.querySelector('[data-filme="erro"]');
  const events = ["touchstart", "click"];

  async function getApi(event) {
    event.preventDefault();
    // const que retorna um número aleatório de 100 até 1000
    // para preencher a api e retornar o filme referente
    // ao id que foi passado
    // caso queira agrupar mais resultados
    // somente alterar o numero de 1000 para
    // um máx maior
    const number = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    // const que retorna a promessa

    try {
      const api = await fetch(
        `https://api.themoviedb.org/3/movie/${number}?api_key=9cf8a3aee6bf319ad78e276d1883e56a&language=pt-BR`
      );

      // pegamos a resposta da promessa acima
      // e transformamos em um objeto
      // para facilitar o acesso aos dados
      // do documento json que retorna
      // da resposta da promessa acima.
      // fazemos a verificação para garantir, caso
      // não encontre um filme e que fique dando undefined
      // na tela do usuário
      if (api.status !== 404 && api.ok !== false) {
        // retorna o objeto com os dados do filme
        const apiObject = await api.json();
        // retorna o caminho da imagem relacionada ao seu filme
        // buscando esse caminho dentro do objeto que é retornado
        // na promessa
        const apiImg = apiObject.poster_path;
        // retorna o titulo do filme
        const filmTitle = apiObject.title;
        // retorna a descrição do filme
        const filmText = apiObject.overview;
        // setamos o src da imagem no dom
        // de acordo com o url dado pela api
        filmImgTag.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w500/${apiImg}`
        );
        // colocando o nome do filme
        filmName.innerHTML = filmTitle;
        // setando o valor do texto
        filmDescription.innerHTML = filmText;

        // add as classes para surgir os respectivos
        // estilos de acordo com o css
        filmBoxTrue.classList.add("active");
        filmBody.classList.add("active-body");
        filmBoxError.classList.remove("active");
      } else {
        filmBody.classList.add("active-body");
        filmBoxTrue.classList.remove("active");
        filmBoxError.classList.add("active");
      }
    } catch (erro) {
      // deixando especifico aqui
      // para caso dem erro
      // mostre esse erro na tela
      console.log(erro);
    }
  }

  // add event
  events.forEach((evento) => {
    buttonStart.addEventListener(evento, getApi);
  });
}
