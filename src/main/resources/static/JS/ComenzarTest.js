
    const questions = [
    // --- Tecnología ---
    { id: 1, text: 'Disfruto resolver problemas lógicos y trabajar con computadoras o matemática.', area: 'Tecnología' },
    { id: 2, text: 'Me gusta programar o entender cómo funcionan los sistemas digitales.', area: 'Tecnología' },
    { id: 3, text: 'Siento curiosidad por la inteligencia artificial y la automatización.', area: 'Tecnología' },
    { id: 4, text: 'Me interesa diseñar aplicaciones o sitios web.', area: 'Tecnología' },

    // --- Salud ---
    { id: 5, text: 'Me gusta ayudar a las personas y me interesa la salud y el bienestar.', area: 'Salud' },
    { id: 6, text: 'Me interesa aprender sobre el cuerpo humano y cómo cuidarlo.', area: 'Salud' },
    { id: 7, text: 'Disfruto escuchar y brindar apoyo emocional a los demás.', area: 'Salud' },
    { id: 8, text: 'Me gustaría trabajar en hospitales, clínicas o centros de salud.', area: 'Salud' },

    // --- Arte ---
    { id: 9, text: 'Me atrae crear, diseñar y expresar ideas artísticas.', area: 'Arte' },
    { id: 10, text: 'Disfruto dibujar, pintar, tocar instrumentos o actuar.', area: 'Arte' },
    { id: 11, text: 'Me inspiran los colores, las formas y la estética visual.', area: 'Arte' },
    { id: 12, text: 'Me interesa el diseño gráfico, la fotografía o la moda.', area: 'Arte' },

    // --- Administración ---
    { id: 13, text: 'Me interesa la gestión, los negocios y liderar equipos.', area: 'Administración' },
    { id: 14, text: 'Disfruto planificar proyectos y organizar recursos.', area: 'Administración' },
    { id: 15, text: 'Me motiva alcanzar metas y medir resultados.', area: 'Administración' },
    { id: 16, text: 'Tengo facilidad para tomar decisiones y resolver conflictos.', area: 'Administración' },

    // --- Ciencias ---
    { id: 17, text: 'Me fascina experimentar, investigar y el mundo de las ciencias.', area: 'Ciencias' },
    { id: 18, text: 'Disfruto analizar causas, efectos y resultados de fenómenos.', area: 'Ciencias' },
    { id: 19, text: 'Me interesa trabajar en laboratorios o investigaciones científicas.', area: 'Ciencias' },
    { id: 20, text: 'Soy curioso y me gusta aprender cómo funcionan las cosas.', area: 'Ciencias' },

    // --- Ingeniería ---
    { id: 21, text: 'Disfruto construir, reparar o trabajar en proyectos técnicos o de manufactura.', area: 'Ingeniería' },
    { id: 22, text: 'Me interesa diseñar estructuras, máquinas o sistemas eléctricos.', area: 'Ingeniería' },
    { id: 23, text: 'Tengo habilidad para el razonamiento espacial y el cálculo.', area: 'Ingeniería' },
    { id: 24, text: 'Me atraen los desafíos técnicos y la resolución de problemas prácticos.', area: 'Ingeniería' },

    // --- Turismo ---
    { id: 25, text: 'Me motiva viajar, comunicar y trabajar con culturas o turismo.', area: 'Turismo' },
    { id: 26, text: 'Disfruto conocer nuevas personas y lugares.', area: 'Turismo' },
    { id: 27, text: 'Me interesa aprender idiomas y comunicarme con diferentes culturas.', area: 'Turismo' },
    { id: 28, text: 'Me gustaría trabajar en hoteles, agencias o aerolíneas.', area: 'Turismo' },

    // --- Derecho ---
    { id: 29, text: 'Me interesa la ley, la justicia y el análisis crítico de normas.', area: 'Derecho' },
    { id: 30, text: 'Me gusta debatir, argumentar y defender ideas.', area: 'Derecho' },
    { id: 31, text: 'Creo en la importancia de los derechos humanos y la equidad.', area: 'Derecho' },
    { id: 32, text: 'Me gustaría trabajar como abogado, juez o asesor legal.', area: 'Derecho' },

    // --- Finanzas ---
    { id: 33, text: 'Me gusta trabajar con datos, números y análisis financiero.', area: 'Finanzas' },
    { id: 34, text: 'Tengo facilidad para administrar dinero o recursos.', area: 'Finanzas' },
    { id: 35, text: 'Me interesa el mundo de la economía, las inversiones y los negocios.', area: 'Finanzas' },
    { id: 36, text: 'Me gusta elaborar presupuestos y analizar balances.', area: 'Finanzas' },

    // --- Deportes ---
    { id: 37, text: 'Disfruto actividades al aire libre, deporte y trabajo dinámico.', area: 'Deportes' },
    { id: 38, text: 'Me gusta mantenerme activo y cuidar mi estado físico.', area: 'Deportes' },
    { id: 39, text: 'Tengo interés en enseñar o entrenar a otros en actividades físicas.', area: 'Deportes' },
    { id: 40, text: 'Me motiva la competencia y el trabajo en equipo.', area: 'Deportes' }
    ];

    const options = [
      {value:0,text:'Nunca'},
      {value:1,text:'Rara vez'},
      {value:2,text:'A veces'},
      {value:3,text:'Frecuentemente'},
      {value:4,text:'Siempre'}
    ];
    let answers = {};
    let currentIndex = 0;

    const totalQs = document.getElementById('total-qs');
    const progressBar = document.getElementById('progressBar');
    const questionArea = document.getElementById('questionArea');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const skipBtn = document.getElementById('skipBtn');
    totalQs.textContent = questions.length;

    function renderQuestion(i) {
      const q = questions[i];
      questionArea.innerHTML = `
        <div class="question-card">
          <h5>Pregunta ${i+1} de ${questions.length}</h5>
          <p class="text-muted">${q.text}</p>
          <div class="answers row g-2">
            ${options.map(opt => `
              <div class="col-6 col-md-4">
                <button class="btn ${answers[q.id]===opt.value?'btn-success':'btn-outline-light'}" data-qid="${q.id}" data-val="${opt.value}">
                  ${opt.text}
                </button>
              </div>`).join('')}
          </div>
        </div>`;
      document.querySelectorAll("[data-qid]").forEach(btn=>{
        btn.addEventListener('click', e=>{
          const id = +e.target.dataset.qid;
          const val = +e.target.dataset.val;
          answers[id] = val;
          renderQuestion(currentIndex);
          updateProgress();
        });
      });
      prevBtn.disabled = i===0;
      nextBtn.textContent = i===questions.length-1?"Finalizar":"Siguiente";
      updateProgress();
    }

    prevBtn.onclick = ()=>{ if(currentIndex>0){currentIndex--;renderQuestion(currentIndex);} };
    nextBtn.onclick = ()=>{ if(currentIndex<questions.length-1){currentIndex++;renderQuestion(currentIndex);} else finishTest(); };
    skipBtn.onclick = ()=>{ answers[questions[currentIndex].id]=0; if(currentIndex<questions.length-1){currentIndex++;renderQuestion(currentIndex);} else finishTest(); };

    function updateProgress(){
      const pct = Math.round(Object.keys(answers).length/questions.length*100);
      progressBar.style.width = pct+"%";
    }

    function finishTest(){
      const scores={};
      questions.forEach(q=>{scores[q.area]=(scores[q.area]||0)+(answers[q.id]||0);});
      const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
      const top=sorted.slice(0,3);
      questionArea.innerHTML=`
        <div class="p-4 rounded result-card">
          <h4>¡Casi listo! Tus áreas más destacadas:</h4>
          <ol>${top.map(a=>`<li>${a[0]} (puntaje: ${a[1]})</li>`).join('')}</ol>
          <p>Regístrate para obtener un informe completo con recomendaciones personalizadas.</p>
          <a href="/register" class="btn btn-success">Registrarme</a>
        </div>`;
    }

    renderQuestion(currentIndex);