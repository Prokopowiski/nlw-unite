let participantes = [
    {
      nome: "Leonardo Prokopowiski",
      email: "prokodev@gmail.com",
      dataInscricao: new Date(2024, 2, 22, 23, 20),
      dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
      nome: "Diego Fernandes",
      email: "diego@gmail.com",
      dataInscricao: new Date(2024, 1, 2, 19, 23),
      dataCheckIn: new Date(2024, 1, 5, 22, 20)
    },
    {
      nome: "Mariana Silva",
      email: "mariana@example.com",
      dataInscricao: new Date(2024, 0, 10, 15, 30),
      dataCheckIn: new Date(2024, 0, 15, 18, 0)
    },
    {
      nome: "Pedro Souza",
      email: "pedro@example.com",
      dataInscricao: new Date(2023, 11, 5, 10, 15),
      dataCheckIn: null
    },
    {
      nome: "Ana Oliveira",
      email: "ana@example.com",
      dataInscricao: new Date(2023, 10, 1, 8, 0),
      dataCheckIn: null
    },
    {
      nome: "Gabriel Santos",
      email: "gabriel@example.com",
      dataInscricao: new Date(2023, 9, 12, 17, 45),
      dataCheckIn: new Date(2023, 9, 17, 20, 15)
    },
    {
      nome: "Juliana Lima",
      email: "juliana@example.com",
      dataInscricao: new Date(2023, 8, 20, 12, 10),
      dataCheckIn: new Date(2023, 8, 25, 14, 45)
    },
    {
      nome: "Rafaela Martins",
      email: "rafaela@example.com",
      dataInscricao: new Date(2023, 7, 3, 9, 5),
      dataCheckIn: null
    },
    {
      nome: "Fernando Costa",
      email: "fernando@example.com",
      dataInscricao: new Date(2023, 6, 15, 14, 20),
      dataCheckIn: new Date(2023, 6, 20, 17, 0)
    },
    {
      nome: "Amanda Rodrigues",
      email: "amanda@example.com",
      dataInscricao: new Date(2023, 5, 28, 18, 50),
      dataCheckIn: new Date(2023, 6, 3, 21, 10)
    }
  ]
  
  const criarNovoParticipante = (participante) => { 
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  
    if(participante.dataCheckIn == null) {
      dataCheckIn = `
      <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
      `
    }
    return `
    <tr>
      <td>
        <strong>${participante.nome}</strong>
        <br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
      </tr>
    `
  }
  
  const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
      output = output + criarNovoParticipante(participante)
    }
    document.querySelector('tbody').innerHTML = output
  }
  
  atualizarLista(participantes)
  
  const adicionarParticipante = (event) => {
    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)
  
    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
    }
  
    const participanteExiste = participantes.find(
    (p) => p.email == participante.email
    )
  
    if (participanteExiste){ 
      alert('Email já cadastrado!')
      return
    }
  
    participantes = [participante, ...participantes]
    atualizarLista(participantes)
  
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
  }
  
  const fazerCheckIn = (event) => {  
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  
    if(confirm(mensagemConfirmacao) == false) {
      return 
    }
  
    const participante = participantes.find(
      (p) => p.email == event.target.dataset.email
    )
    participante.dataCheckIn = new Date()
  
    atualizarLista(participantes)
  }