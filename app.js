// 🔑 Datos de tu proyecto Supabase
const SUPABASE_URL = "https://cjbpeqecydxlpkthavcw.supabase.co";
const SUPABASE_KEY = "sb_publishable_OPma3k8ds8QWXahsZg288w_mwyo7z_Y";

// Crear cliente
const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const form = document.getElementById("gastoForm");
const lista = document.getElementById("listaGastos");

// Guardar gasto
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const descripcion = document.getElementById("descripcion").value;
  const monto = document.getElementById("monto").value;

  const { error } = await supabase
    .from("gastos_demo")
    .insert([{ descripcion, monto }]);

  if (error) {
    alert("Error guardando gasto");
    console.error(error);
  } else {
    form.reset();
    cargarGastos();
  }
});

// Cargar gastos
async function cargarGastos() {
  const { data, error } = await supabase
    .from("gastos_demo")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  lista.innerHTML = "";
  data.forEach(gasto => {
    const li = document.createElement("li");
    li.textContent = `${gasto.descripcion} - $${gasto.monto}`;
    lista.appendChild(li);
  });
}

// Cargar al iniciar
cargarGastos();
