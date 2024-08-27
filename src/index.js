const situaciones = [
  "Ruidosa",
  "Callada",
  "Que hacen caso",
  "Que son todos saboteadores",
  "Pequeños",
  "Adolescentes ",
  "Hacen muchas preguntas",
];

const btnPedir = document.querySelector("#btnPedir");
const cartaTiuloHTML = document.querySelector("#cartaTitulo");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const generarNuevoColor = () => {
  const simbolos = "0123456789ABCDEF";
  let color = "#";

  for (var i = 0; i < 6; i++) {
    color = color + simbolos[Math.floor(Math.random() * 16)];
  }

  document.body.style.background = color;
};

async function* getSituacionGenerator() {
  for (const situacion of situaciones) {
    await sleep();
    yield situacion;
  }

  return "No hay mas";
}

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};

const ruleta = async () => {
  const generadorClases = getSituacionGenerator();
  let isFinished = false;
  do {
    const { value, done } = await generadorClases.next();
    isFinished = done;
    if (isFinished) break;

    generarNuevoColor();
    cartaTiuloHTML.innerHTML = value;
  } while (!isFinished);
};

const situacionRandom = () => {
  ruleta();
  const cantidad = situaciones.length;
  const palabra = getRandomInt(cantidad);
  cartaTiuloHTML.innerHTML = situaciones[palabra];
};

btnPedir.addEventListener("click", () => situacionRandom());

generarNuevoColor();
