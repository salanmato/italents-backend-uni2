//Comecei com as funções que resolvi utilizar. O processo começa na linha 45
const prompt = require('prompt-sync')()
//FUNÇÔES
///Cria um novo aluno
const criaAluno = (nome) => {
    return {
        nome: nome,
        materias: [],
        media: 0,
        situacao: null
    }
}

//Cria uma nova disciplina
const criaMateria = (nome) => {
    return {
        nome: nome,
        notas: [],
        faltas: 0,
    }
}

//Exibir aluno
const exibeAluno = (aluno) => {
    console.log('')
    console.log(`Nome: ${aluno.nome}`)
    console.log(`Média total: ${(aluno.materias.reduce((acc, materias) => acc + materias.media, 0) / aluno.materias.length).toFixed(2)}`)
    console.log('')
    console.log('')
    console.log('Matérias:')
    console.log(aluno.materias.forEach(materia => {
        console.log('--------------')
        console.log(materia.nome)
        //console.log(materia.notas) // nao precisa
        console.log(`Nota: ${materia.media.toFixed(2)}`)
        console.log(`Faltas: ${materia.faltas}`)
        console.log(materia.situacao)
        console.log('______________')
    }))
}


//COMEÇANDO O PROCESSO AQUI

console.log('Cadastro de aluno.')
console.log('')

let nome = prompt('Digite o nome do aluno: ')

let aluno = criaAluno(nome)

console.log('')
console.log('Vamos cadastrar suas matérias e  notas.')
console.log('')

let continuar = 's'
//o while para criar quantas matérias forem necessárias
while (continuar == 's') {
    //Aqui toda a criação de uma nova matéria
    let novaMateria = prompt('Digite o nome da matéria: ')
    let materia = criaMateria(novaMateria)
    let nota = -1
    let faltas = -1

    //Como a quantidade de notas é 3, resolvi usar um for
    for (let i = 0; i < 3; i++) {

        //Validando notas fora do padrão e não sendo números
        while (nota < 0 || nota > 10 || !Number(nota)) {
            nota = prompt(`Digite a ${i + 1}a nota: `)

             //Validando notas fora do padrão e não sendo números para enviar um alerta
            if (nota < 0 || nota > 10 || !Number(nota)) {
                console.log('')
                console.log('Você digitou uma nota inválida, preencha novamente!')
            }
        }
        //puxando novas notas para o array da materia
        materia.notas.push(nota)

        //resetando o valor da nota
        nota = -1

    }
    //

    console.log('')
    //lidando com faltas
    // Faço validações parecidas com as de notas
    while (faltas < 0 || !Number(faltas)) {
        faltas = prompt('Digite a quantidade de faltas: ')

        if (faltas < 0 || !Number(faltas)) {
            console.log('')
            console.log('Número de faltas inválido, preencha novamente!')
        }
    }

    //calculando media utilizando reduce
    materia.media = materia.notas.reduce((acc, nota) => acc + Number(nota), 0) / 3

    //atribuindo as faltas (penso que posso fazer isso direto)
    materia.faltas = faltas

    //checando o estado do aluno, se passou ou não
    materia.situacao = materia.faltas < 6 && materia.media > 6 ? 'Aprovado' : 'Reprovado'

    //associando as informações ao aluno
    aluno.materias.push(materia)

    //Como tinha um mínimo de 3 matérias, comecei só a checar a partir daí se queríamos adicionar novas matérias
    if (aluno.materias.length >= 3) {
        continuar = prompt('Deseja incluir uma nova matéria? s/n ')
    }
    console.log('')
}

console.log('')
console.log('Cadastro de aluno finalizado.')
console.log('')
console.log('')
console.log('###########')
console.log('')

//função para mostrar aluno
exibeAluno(aluno)

//Ao final da exibição, no meu terminal aparece um console.log(undefined), não o encontrei no código, se vê-lo, me avise
