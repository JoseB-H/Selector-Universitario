document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.filter-toggle');
  const filterPanel = document.getElementById('filterPanel');
  const clearButton = document.querySelector('.filter-panel .btn-outline-secondary');
  const rangeInput = filterPanel ? filterPanel.querySelector('#rango') : null;
  const defaultRangeValue = rangeInput ? rangeInput.min : '0';
  const defaultRadio = filterPanel ? filterPanel.querySelector('#presencial') : null;

  // =======================
  // 🔹 PANEL LATERAL
  // =======================
  if (toggleBtn && filterPanel) {
    const handleToggle = () => {
      const isMobile = window.innerWidth < 992;
      if (isMobile) {
        filterPanel.classList.toggle('show');
        toggleBtn.innerHTML = filterPanel.classList.contains('show') ? '&#10094;' : '&#10095;';
      } else {
        filterPanel.classList.toggle('collapsed');
        toggleBtn.classList.toggle('collapsed');
        toggleBtn.innerHTML = filterPanel.classList.contains('collapsed') ? '&#10095;' : '&#10094;';
      }
    };

    toggleBtn.addEventListener('click', handleToggle);

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992) {
        filterPanel.classList.remove('show');
        filterPanel.classList.remove('collapsed');
        toggleBtn.classList.remove('collapsed');
        toggleBtn.innerHTML = '&#10094;';
      } else {
        if (!filterPanel.classList.contains('show')) {
          toggleBtn.innerHTML = '&#10095;';
        }
      }
    });

    window.dispatchEvent(new Event('resize'));
  }

  // =======================
  // 🔹 LIMPIAR FILTROS
  // =======================
  if (clearButton && filterPanel) {
    clearButton.addEventListener('click', () => {
      const selects = filterPanel.querySelectorAll('select');
      selects.forEach(select => select.selectedIndex = 0);

      const checkboxes = filterPanel.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => checkbox.checked = false);

      if (defaultRadio) defaultRadio.checked = true;
      if (rangeInput) rangeInput.value = defaultRangeValue;

      if (window.listaUniversidades) {
        const event = new Event('change');
        filterPanel.dispatchEvent(event);
      }
    });
  }
});
