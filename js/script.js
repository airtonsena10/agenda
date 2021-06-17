//Contato
class Contato {
  constructor(id, nome, telefone, email, dataNascimento) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.dataNascimento = dataNascimento;
  }
}

//guarda os contatos
let contatos = [
  new Contato(0, "Airton", "757433335543", "airtotn@gmail.com", "1995-06-13"),
];

// Variável
let id = null;

//referências dos elementos
const nome = document.querySelector("#nome");
const telefone = document.querySelector("#telefone");
const email = document.querySelector("#email");
const dataNascimento = document.querySelector("#dataNascimento");
const lista = document.querySelector("#lista");

// Configura Data de Nascimento
dataNascimento.min = new Date(-2208988800000).toISOString().slice(0, 10); // Ajusta a data para 1900-01-01
dataNascimento.max = new Date().toISOString().slice(0, 10);

console.log(new Date(-2208988800000).toISOString().slice(0, 10));

// Criar lista
listar = () => {
  lista.innerHTML = contatos
    .map((contato) => {
      let li = `<li id="contato-${contato.id}">
                <div class="container">
                    <div class="contato row justify-content-between">

                        <div class="col-12 col-lg-6 h-100">
                            <disv class="row">

                                <div class="col col-lg align-self-center nome">
                                    <div class="row">
                                        <div class="col-12 p-lg-1">
                                            <h6>${contato.nome}</h6>
                                        </div>
                                        <div class="col p-lg-0">
                                            <span id="telefone-${contato.id}">${contato.telefone}</span>
                                            <span> | </span>
                                            <span id="data-${contato.id}">${contato.dataNascimento}</span>
                                            <span> | </span>
                                            <span>${contato.email}</span>
                                        </div>
                                    </div>
                                </div>

                            </disv>
                        </div>

                        <div class="col-12 col-lg-3 mt-5 mt-lg-0 opcoes">

                                <div class="col-auto align-self-center p-0">
                                    <button type="button" class="btn" onclick="editar(${contato.id})">
                                        <strong>Editar</strong>
                                    </button>
                                </div>

                                <div class="col-auto align-self-center p-0">
                                    <button type="button" class="btn" onclick="excluir(${contato.id})">
                                    <strong>Excluir</strong>
                                        
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </li>`;
      return li;
    })
    .join("");
  mascaraTelefones();
  mascaraDatas();
  contarContatos();
};

identificarContato = (idContato) => {
  return contatos.find((contato) => contato.id === idContato);
};

limparValores = () => {
  id = null;
  nome.value = "";
  telefone.value = "";
  email.value = "";
  dataNascimento.value = "";
};
// Inserir contato
cadastrar = () => {
  const idContato = id !== null ? id : contatos.length;
  contatos[idContato] = new Contato(
    idContato,
    nome.value,
    telefone.value,
    email.value,
    dataNascimento.value,
  );
  limparValores();
  listar();
};

editar = (idContato) => {
  contato = identificarContato(idContato);
  id = contato.id;
  nome.value = contato.nome;
  telefone.value = contato.telefone;
  email.value = contato.email;
  dataNascimento.value = contato.dataNascimento;
  nome.focus;
};

excluir = (idContato) => {
  contatos.splice(idContato, 1);
  listar();
};



mascaraTelefones = () => {
  for (const contato of contatos) {
    document.getElementById(`telefone-${contato.id}`).innerHTML =
      formatarTelefone(contato.telefone);
  }
};

formatarTelefone = (telefone) => {
  if (telefone) {
    telefone = telefone.replace(/\D/g, "");
    if (telefone.length > 11) {
      return telefone
        .substring(0, 0)
        .concat("(")
        .concat(telefone.substring(0, 2))
        .concat(") ")
        .concat(telefone.substring(2, 7))
        .concat("-")
        .concat(telefone.substring(7, 11))
        .concat("");
    }
    if (telefone.length === 11) {
      return telefone
        .substring(0, 0)
        .concat("(")
        .concat(telefone.substring(0, 2))
        .concat(") ")
        .concat(telefone.substring(2, 7))
        .concat("-")
        .concat(telefone.substring(7, 11));
    }
    if (telefone.length >= 10) {
      return telefone
        .substring(0, 0)
        .concat("(")
        .concat(telefone.substring(0, 2))
        .concat(") ")
        .concat(telefone.substring(2, 6))
        .concat("-")
        .concat(telefone.substring(6, 10));
    }
    if (telefone.length >= 6) {
      return telefone
        .substring(0, 0)
        .concat("(")
        .concat(telefone.substring(0, 2))
        .concat(") ")
        .concat(telefone.substring(2, 7))
        .concat("-");
    }
    if (telefone.length >= 2) {
      return telefone
        .substring(0, 0)
        .concat("(")
        .concat(telefone.substring(0, 2))
        .concat(") ");
    }
    if (telefone.length === 0) {
      return telefone.substring(0, 0).concat("(");
    }
  }
  return telefone;
};

mascaraDatas = () => {
  for (const contato of contatos) {
    document.getElementById(`data-${contato.id}`).innerHTML = formatarData(
      contato.dataNascimento,
    );
  }
};

formatarData = (data) => {
  let d = new Date(data);
  return d.toLocaleDateString();
};

listar();


