// =========================================================
// CONFIGURACIÓN: cambia estos datos por los reales.
// El número va con prefijo de país (34 = España), sin "+" ni espacios.
// =========================================================
const WHATSAPP_NUMBER = "34600000000";
const WHATSAPP_MESSAGE = "Hola, me gustaría pedir una cita en la clínica dental.";

// Horario de apertura en formato 24 h. Los días van de 0 (domingo) a 6 (sábado).
// Cada día tiene una lista de tramos [apertura, cierre].
const OPENING_HOURS = {
  0: [],                              // domingo: cerrado
  1: [["09:00", "14:00"], ["16:00", "20:00"]],
  2: [["09:00", "14:00"], ["16:00", "20:00"]],
  3: [["09:00", "14:00"], ["16:00", "20:00"]],
  4: [["09:00", "14:00"], ["16:00", "20:00"]],
  5: [["09:00", "15:00"]],
  6: [["10:00", "13:00"]],
};

// ---------------------------------------------------------
// 1) Enlaces de WhatsApp
// Todos los elementos con la clase "js-whatsapp" abren el chat.
// ---------------------------------------------------------
const whatsappUrl =
  "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);

document.querySelectorAll(".js-whatsapp").forEach(function (link) {
  link.href = whatsappUrl;
  link.target = "_blank";
  link.rel = "noopener";
});

// ---------------------------------------------------------
// 2) Menú del móvil (botón hamburguesa)
// ---------------------------------------------------------
const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
  const isOpen = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

// Al pulsar un enlace del menú, lo cerramos.
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// ---------------------------------------------------------
// 3) Horarios: resaltar el día de hoy y decir si está abierto
// ---------------------------------------------------------
function toMinutes(hhmm) {
  const parts = hhmm.split(":");
  return Number(parts[0]) * 60 + Number(parts[1]);
}

function updateOpenStatus() {
  const now = new Date();
  const today = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  const todayRow = document.querySelector('.schedule tr[data-day="' + today + '"]');
  if (todayRow) todayRow.classList.add("is-today");

  const isOpen = OPENING_HOURS[today].some(function (slot) {
    return minutesNow >= toMinutes(slot[0]) && minutesNow < toMinutes(slot[1]);
  });

  const status = document.getElementById("estado");
  status.textContent = isOpen ? "Abierto 🟢" : "Cerrado 🔴";
  status.className = "status " + (isOpen ? "status--open" : "status--closed");
}

updateOpenStatus();

// ---------------------------------------------------------
// 4) Año actual en el pie de página
// ---------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();
