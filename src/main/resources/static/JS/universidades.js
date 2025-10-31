document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("universidadesContainer");
  const filterPanel = document.getElementById("filterPanel");
  const clearButton = document.querySelector('.filter-panel .btn-outline-secondary');

  let todasLasUniversidades = [];
  let universidadesFiltradas = [];
  let mostradas = 0;
  const cantidadPorPagina = 9;

  const verMasBtn = document.createElement("button");
  verMasBtn.className = "btn btn-primary mt-4 d-block mx-auto";
  verMasBtn.textContent = "Ver más";
  verMasBtn.style.display = "none";

  function mostrarUniversidades(universidades, reiniciar = false) {
    if (reiniciar) {
      contenedor.innerHTML = "";
      mostradas = 0;
    }

    if (!universidades || universidades.length === 0) {
      contenedor.innerHTML = '<p class="text-center text-muted mt-4">No se encontraron universidades.</p>';
      verMasBtn.style.display = "none";
      return;
    }

    const aMostrar = universidades.slice(mostradas, mostradas + cantidadPorPagina);
    mostradas += aMostrar.length;

    aMostrar.forEach(u => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4");
      card.innerHTML = `
        <div class="card info-card shadow-sm h-100">
          <img src="${u.imagen}" class="card-img-top" alt="${u.nombre}">
          <div class="card-body text-center">
            <h6 class="fw-bold">${u.nombre}</h6>
            <p><strong>Tipo:</strong> ${u.tipo}</p>
            <p><strong>Ubicación:</strong> ${u.ubicacion}</p>
            <p><strong>Modalidad:</strong> ${u.modalidad.join(", ")}</p>
            <p><strong>Nivel:</strong> ${u.nivel.join(", ")}</p>
            <p><strong>Áreas:</strong> ${u.area.join(", ")}</p>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    });

    if (mostradas < universidades.length) {
      verMasBtn.style.display = "block";
      if (!contenedor.parentElement.contains(verMasBtn)) {
        contenedor.parentElement.appendChild(verMasBtn);
      }
    } else {
      verMasBtn.style.display = "none";
    }
  }

  fetch("/universidades.json")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar el archivo JSON");
      return res.json();
    })
    .then(universidades => {
      todasLasUniversidades = universidades;
      universidadesFiltradas = universidades;
      mostrarUniversidades(universidadesFiltradas, true);
      llenarFiltros(universidades);
      filterPanel.addEventListener("change", aplicarFiltros);
    })
    .catch(err => {
      console.error("Error cargando JSON:", err);
      contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar las universidades.</p>`;
    });

  function llenarFiltros(universidades) {
    const tipos = [...new Set(universidades.map(u => u.tipo))];
    const ubicaciones = [...new Set(universidades.map(u => u.ubicacion))];
    const modalidades = [...new Set(universidades.flatMap(u => u.modalidad))];
    const niveles = [...new Set(universidades.flatMap(u => u.nivel))];
    const areas = [...new Set(universidades.flatMap(u => u.area))];

    const tipoSelect = filterPanel.querySelector('select[name="tipo"]');
    if (tipoSelect) {
      tipoSelect.innerHTML = '<option value="todos">Todos</option>' +
        tipos.map(t => `<option value="${t.toLowerCase()}">${t}</option>`).join('');
    }

    const ubicacionSelect = filterPanel.querySelector('select[name="ubicacion"]');
    if (ubicacionSelect) {
      ubicacionSelect.innerHTML = '<option value="todas">Todas</option>' +
        ubicaciones.map(u => `<option value="${u.toLowerCase()}">${u}</option>`).join('');
    }

    const modalContainer = filterPanel.querySelector("#modalidadContainer");
    if (modalContainer) {
      modalContainer.innerHTML = modalidades.map(m => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="modalidad" id="${m.toLowerCase()}">
          <label class="form-check-label" for="${m.toLowerCase()}">${m}</label>
        </div>
      `).join('');
    }

    const nivelContainer = filterPanel.querySelector("#nivelContainer");
    if (nivelContainer) {
      nivelContainer.innerHTML = niveles.map(n => `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="${n.toLowerCase()}">
          <label class="form-check-label" for="${n.toLowerCase()}">${n}</label>
        </div>
      `).join('');
    }

    const areaContainer = filterPanel.querySelector("#areaContainer");
    if (areaContainer) {
      areaContainer.innerHTML = areas.map(a => `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="${a.toLowerCase()}">
          <label class="form-check-label" for="${a.toLowerCase()}">${a}</label>
        </div>
      `).join('');
    }
  }

  function aplicarFiltros() {
    let filtradas = [...todasLasUniversidades];

    const tipo = filterPanel.querySelector('select[name="tipo"]')?.value.toLowerCase();
    const ubicacion = filterPanel.querySelector('select[name="ubicacion"]')?.value.toLowerCase();

    if (tipo && tipo !== "todos")
      filtradas = filtradas.filter(u => u.tipo.toLowerCase() === tipo);

    if (ubicacion && ubicacion !== "todas")
      filtradas = filtradas.filter(u => u.ubicacion.toLowerCase() === ubicacion);

    const modalidad = filterPanel.querySelector('input[name="modalidad"]:checked')?.id;
    if (modalidad)
      filtradas = filtradas.filter(u => u.modalidad.map(m => m.toLowerCase()).includes(modalidad));

    const niveles = Array.from(filterPanel.querySelectorAll("#nivelContainer input:checked"))
      .map(n => n.id);
    if (niveles.length > 0)
      filtradas = filtradas.filter(u => niveles.some(n => u.nivel.map(m => m.toLowerCase()).includes(n)));

    const areas = Array.from(filterPanel.querySelectorAll("#areaContainer input:checked"))
      .map(a => a.id);
    if (areas.length > 0)
      filtradas = filtradas.filter(u => areas.some(a => u.area.map(ar => ar.toLowerCase()).includes(a)));

    universidadesFiltradas = filtradas;
    mostrarUniversidades(universidadesFiltradas, true);
  }

  verMasBtn.addEventListener("click", () => {
    mostrarUniversidades(universidadesFiltradas);
  });

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      const selects = filterPanel.querySelectorAll("select");
      selects.forEach(select => select.selectedIndex = 0);

      const inputs = filterPanel.querySelectorAll("input[type='checkbox'], input[type='radio']");
      inputs.forEach(i => i.checked = false);

      universidadesFiltradas = [...todasLasUniversidades];
      mostradas = 0; // 🔥 reinicia contador
      mostrarUniversidades(universidadesFiltradas.slice(0, cantidadPorPagina), true); // 👈 muestra solo 9 por defecto
    });
  }
});
