/*
 * Funcionalidad de tu producto
 */

// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);
// Evento load
window.addEventListener('load', function(event) {
  // Variables que contienen elementos a utilizar
  // Variable que almacena al elemento select cuyo id es navbar
  var select = document.getElementById('navbar');
  // Variable que almacena el array con las keys del objeto data --> Las sedes en sí: Arequipa --> index: 0, Ciudad de México --> index: 1, Lima --> index: 2 y Chile --> index: 3
  var sedes = Object.keys(data);
  // Variable que almacena el array que contiene los objetos, que a su vez, contienen a las generaciones --> Las generaciones de Arequipa --> index: 0, las de  Ciudad de México --> index: 1, las de Lima --> index: 2 y las de Chile --> index: 3
  var generations = Object.values(data);
  // Estas 3 variables almacenan elementos li que contienen el porcentaje de promoters, passive y detractors
  var promotersContainer = document.getElementById('promoters');
  var passiveContainer = document.getElementById('passive');
  var detractorsContainer = document.getElementById('detractors');
  // Variables que almacenan elementos span o div que contienen datos como el promedio de jedis, porcentaje de estudiantes satisfechos, total de estudiantes, etc. (ver ID's)
  var score1 = document.getElementById('total-students-container');
  var score2 = document.getElementById('percent-no-students-container');
  var score5 = document.getElementById('nps');
  var score8 = document.getElementById('satisfied-students');
  var score9 = document.getElementById('average-score-for-teachers');
  var score10 = document.getElementById('average-score-for-jedi');
  // Evento click al select donde se encuentran las sedes
  select.addEventListener('click', function(event) {
    // Variables vuyos valores cambian segun la sede y generación
    var office;
    var arrayOfGenerations;
    var specificGeneration;
    if (true) { // Puse true para que me asegure que funcione que reciba algo (un click en este caso)
      if (select.value === 'aq-2016-2') { // Primero, el select.value me sacará todos los valores que tengan los atributos value del select, por eso es que hago esta comparacion, para que me arroje el que quiero. Segundo, en el atributo value de cada option aparecen estos valores que indican la sede y generacion (aq --> Arequipa, cm --> Ciudad de Mexico, lm y ch --> Lima y Chile respectivamente
        var sentence = select.value; // Aquí encierro el valo de select que es un string para aplicarle el método splice después
        var generation = sentence.slice(3, 9); // slice para que del valor almacenado en sentence (en este caso : aq-2016-2) me saque solo la generacion para 'invocarla' luego --> ver màs abajo
        office = Object.keys(data)[0]; // Arequipa --> index: 0, Ciudad de México --> index: 1, Lima --> index: 2 y Chile --> index: 3
        arrayOfGenerations = Object.values(data)[0]; // Las generaciones de Arequipa --> index: 0, las de  Ciudad de México --> index: 1, las de Lima --> index: 2 y las de Chile --> index: 3
        specificGeneration = arrayOfGenerations[generation]; // Para obtener la generación segun la sede escogida, no necesito un for ya que con el método splice la puedo sacar del valor del value
        /* Esta variable me permite obtenr el key / array con todas las estudiantes de esa generacion y sus datos*/
        var arrayOfStudents = specificGeneration['students'];
        // Variables contadoras que me permitiran almacenar la cantidad de estudiantes activos e inactivos
        var activeStudents = 0;
        var noActiveStudents = 0;
        // for para recorrer el array students
        for (var i = 0; i < 15; i++) { // La cantidad de valores que puede tomar i depende de la generacion y sede --> En Arequipa ambas generaciones tienen 15 estudiantes(la ultima estudiante de cada generacion tiene como index 14) por lo que i no puede pasar de 15 (i < 15) pero en Ciudad de Mexico, por ejemplo,  i es menor a 24 (i < 24) en la generación del 2017-I que tiene 24 estudiantes(la estudiante 24 aparece en este array con un índex/índice 23), pero en la del 2017-II son 46 estudiantes (la estudiante 46 aparece en este array con un índex/índice 45), por lo que i es menor a 46(i < 46)
          // Aquí accedemos al key active cuyos valores pueden ser true (activa) o false (desertó). En este caso si es true sumara 1 a la variable activeStudents
          if (arrayOfStudents[i]['active'] === true) {
            activeStudents += 1;
          } else { // Sino sumara 1 a la variable noActiveStudents. Por qué uno?  Por cada vuelta el for recoge un estudiante, y como es solo uno y no son 2 o 3, entonces le suma 1 a una variable segun la condicion que cumpla --> activo e inactivo
            noActiveStudents += 1;
          }
        }
        var totalStudents = activeStudents + noActiveStudents; // SUma la cantidad de estudiantes activos e inactivos para obtener el total de estudiantes que utilizare más adelante
        score1.textContent = activeStudents; // Agrego la cantidad de estudiantes activos como contenido para el div almacenado en la variable score1
        var percentNoActiveStudents = (noActiveStudents / totalStudents) * 100; // Me pedian el porcentaje de alumnas que desertaron, asi que por eso dividí la cantidad de estudiantes inactivas entre el total de estudiantes por cien
        score2.textContent = percentNoActiveStudents.toFixed(2) + '%'; // toFixed.(n) Permite que se muestre la cantidad de decimales que quieres. n toma el valor de esta cantidad --> En este caso solo quero que se me muestren 2 decimales, asi que n = 2 --> toFixed(2)
        /* Esta variable que almacena este key y objeto a la vez me permitirá resolver los puntos indicados en el LMS relacionados con el rating */
        var ratings = specificGeneration['ratings'];
        /* Variables */
        /* Para el punto 5 --> ver LMS(no aparecen enumerados, asi que tienen que contarlos)*/
        var totalPromoters = 0;
        var totalPassive = 0;
        var totalDetractors = 0;
        /* Para el punto 8 */
        var dontMeet = 0;
        var meet = 0;
        var exceed = 0;
        /* Para el punto 9 */
        var averageScoreForTeachers = 0;
        /* Para el punto 10 */
        var averageScoreForJedi = 0;
        /* Recorriendo con un for el object ratings */
        for (var i = 0; i < ratings.length; i++) {
          /* Obteniendo el Net Promoter Score (NPS) promedio de los sprints cursados. */
          totalPromoters += ratings[i]['nps']['promoters'];
          totalPassive += ratings[i]['nps']['passive'];
          totalDetractors += ratings[i]['nps']['detractors'];
          /* Obteniendo el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria. */
          dontMeet += ratings[i]['student']['no-cumple'];
          meet += ratings[i]['student']['cumple'];
          exceed += ratings[i]['student']['supera'];
          /* Obteniendo la puntuación de los jedi */
          var jediScore = ratings[i]['jedi'];
          averageScoreForJedi += jediScore;
          /* Obteniendo la puntuación de los teachers*/
          var teacherScore = ratings[i]['teacher'];
          averageScoreForTeachers += teacherScore;
        }
        /* El Net Promoter Score (NPS) promedio de los sprints cursados */
        var totalScore = totalPromoters + totalPassive + totalDetractors;
        var promoters = (totalPromoters / totalScore) * 100;
        var passive = (totalPassive / totalScore) * 100;
        var detractors = (totalDetractors / totalScore) * 100;
        var nps = promoters - detractors;
        promotersContainer.textContent = promoters.toFixed(2) + ' %' + ' Promoters'; // toFixed.(n) Permite que se muestre la cantidad de decimales que quieres. n toma el valor de esta cantidad --> En este caso solo quero que se me muestren 2 decimales, asi que n = 2 --> toFixed(2)
        passiveContainer.textContent = passive.toFixed(2) + ' %' + ' Passive'; // Concateno un % ya que el valor es númerico no me aparece con ese simbolo
        detractorsContainer.textContent = detractors.toFixed(2) + ' %' + ' Detractors';
        score5.textContent = nps.toFixed(2) + '%';
        /* Porcentaje de estudiantes satisfechas */
        var total = dontMeet + meet + exceed;
        var happyStudents = meet + exceed;
        var satisfiedStudents = (happyStudents * 100) / total;
        score8.textContent = satisfiedStudents.toFixed(2);
        /* Puntuación promedio de los teachers */
        var averageScore2 = Math.round(averageScoreForTeachers / 4); // Math.round redondea, en este caso lo considere necesario ya que habalamos de un promedio
        score9.textContent = averageScore2;
        /* Puntuación promedio de los jedi */
        var averageScore = Math.round(averageScoreForJedi / 4); // Math.round redondea, en este caso lo considere necesario ya que habalamos de un promedio
        score10.textContent = averageScore;
      }
      if (select.value === 'aq-2017-1') {
        var sentence = select.value;
        var generation = sentence.slice(3, 9);
        office = Object.keys(data)[0];
        arrayOfGenerations = Object.values(data)[0];
        specificGeneration = arrayOfGenerations[generation];
        var arrayOfStudents = specificGeneration['students'];
        var activeStudents = 0;
        var noActiveStudents = 0;
        for (var i = 0; i < 15; i++) {
          if (arrayOfStudents[i]['active'] === true) {
            activeStudents += 1;
          } else {
            noActiveStudents += 1;
          }
        }
        var totalStudents = activeStudents + noActiveStudents;
        score1.textContent = activeStudents;
        var percentNoActiveStudents = (noActiveStudents / totalStudents) * 100;
        score2.textContent = percentNoActiveStudents.toFixed(2) + '%';
        /* Los puntos indicados en el LMS relacionados con el rating */
        var ratings = specificGeneration['ratings'];
        /* Variables*/
        /* Para el punto 5 */
        var totalPromoters = 0;
        var totalPassive = 0;
        var totalDetractors = 0;
        /* Para el punto 8 */
        var dontMeet = 0;
        var meet = 0;
        var exceed = 0;
        /* Para el punto 9 */
        var averageScoreForTeachers = 0;
        /* Para el punto 10 */
        var averageScoreForJedi = 0;
        /* Recorriendo con un for el object ratings */
        for (var i = 0; i < ratings.length; i++) {
          /* Obteniendo el Net Promoter Score (NPS) promedio de los sprints cursados. */
          totalPromoters += ratings[i]['nps']['promoters'];
          totalPassive += ratings[i]['nps']['passive'];
          totalDetractors += ratings[i]['nps']['detractors'];
          /* Obteniendo el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria. */
          dontMeet += ratings[i]['student']['no-cumple'];
          meet += ratings[i]['student']['cumple'];
          exceed += ratings[i]['student']['supera'];
          /* Obteniendo la puntuación de los jedi */
          var jediScore = ratings[i]['jedi'];
          averageScoreForJedi += jediScore;
          /* Obteniendo la puntuación de los teachers*/
          var teacherScore = ratings[i]['teacher'];
          averageScoreForTeachers += teacherScore;
        }
        /* El Net Promoter Score (NPS) promedio de los sprints cursados */
        var totalScore = totalPromoters + totalPassive + totalDetractors;
        var promoters = (totalPromoters / totalScore) * 100;
        var passive = (totalPassive / totalScore) * 100;
        var detractors = (totalDetractors / totalScore) * 100;
        var nps = promoters - detractors;
        promotersContainer.textContent = promoters.toFixed(2) + ' %' + ' Promoters';
        passiveContainer.textContent = passive.toFixed(2) + ' %' + ' Passive';
        detractorsContainer.textContent = detractors.toFixed(2) + ' %' + ' Detractors';
        score5.textContent = nps.toFixed(2) + '%';
        /* Porcentaje de estudiantes satisfechas */
        var total = dontMeet + meet + exceed;
        var happyStudents = meet + exceed;
        var satisfiedStudents = (happyStudents * 100) / total;
        score8.textContent = satisfiedStudents.toFixed(2);
        /* Puntuación promedio de los teachers */
        var averageScore2 = Math.round(averageScoreForTeachers / 4);
        score9.textContent = averageScore2;
        /* Puntuación promedio de los jedi */
        var averageScore = Math.round(averageScoreForJedi / 4);
        score10.textContent = averageScore;
      }
      if (select.value === 'cm-2017-1') {
        var sentence = select.value;
        var generation = sentence.slice(3, 9);
        office = Object.keys(data)[1];
        arrayOfGenerations = Object.values(data)[1];
        specificGeneration = arrayOfGenerations[generation];
        var arrayOfStudents = specificGeneration['students'];
        var activeStudents = 0;
        var noActiveStudents = 0;
        for (var i = 0; i < 24; i++) {
          if (arrayOfStudents[i]['active'] === true) {
            activeStudents += 1;
          } else {
            noActiveStudents += 1;
          }
        }
        var totalStudents = activeStudents + noActiveStudents;
        score1.textContent = activeStudents;
        var percentNoActiveStudents = (noActiveStudents / totalStudents) * 100;
        score2.textContent = percentNoActiveStudents.toFixed(2) + '%';
        /* Los puntos indicados en el LMS relacionados con el rating */
        var ratings = specificGeneration['ratings'];
        /* Variables*/
        /* Para el punto 5 */
        var totalPromoters = 0;
        var totalPassive = 0;
        var totalDetractors = 0;
        /* Para el punto 8 */
        var dontMeet = 0;
        var meet = 0;
        var exceed = 0;
        /* Para el punto 9 */
        var averageScoreForTeachers = 0;
        /* Para el punto 10 */
        var averageScoreForJedi = 0;
        /* Recorriendo con un for el object ratings */
        for (var i = 0; i < ratings.length; i++) {
          /* Obteniendo el Net Promoter Score (NPS) promedio de los sprints cursados. */
          totalPromoters += ratings[i]['nps']['promoters'];
          totalPassive += ratings[i]['nps']['passive'];
          totalDetractors += ratings[i]['nps']['detractors'];
          /* Obteniendo el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria. */
          dontMeet += ratings[i]['student']['no-cumple'];
          meet += ratings[i]['student']['cumple'];
          exceed += ratings[i]['student']['supera'];
          /* Obteniendo la puntuación de los jedi */
          var jediScore = ratings[i]['jedi'];
          averageScoreForJedi += jediScore;
          /* Obteniendo la puntuación de los teachers*/
          var teacherScore = ratings[i]['teacher'];
          averageScoreForTeachers += teacherScore;
        }
        /* El Net Promoter Score (NPS) promedio de los sprints cursados */
        var totalScore = totalPromoters + totalPassive + totalDetractors;
        var promoters = (totalPromoters / totalScore) * 100;
        var passive = (totalPassive / totalScore) * 100;
        var detractors = (totalDetractors / totalScore) * 100;
        var nps = promoters - detractors;
        promotersContainer.textContent = promoters.toFixed(2) + ' %' + ' Promoters';
        passiveContainer.textContent = passive.toFixed(2) + ' %' + ' Passive';
        detractorsContainer.textContent = detractors.toFixed(2) + ' %' + ' Detractors';
        score5.textContent = nps.toFixed(2) + '%';
        /* Porcentaje de estudiantes satisfechas */
        var total = dontMeet + meet + exceed;
        var happyStudents = meet + exceed;
        var satisfiedStudents = (happyStudents * 100) / total;
        score8.textContent = satisfiedStudents.toFixed(2);
        /* Puntuación promedio de los teachers */
        var averageScore2 = Math.round(averageScoreForTeachers / 4);
        score9.textContent = averageScore2;
        /* Puntuación promedio de los jedi */
        var averageScore = Math.round(averageScoreForJedi / 4);
        score10.textContent = averageScore;
      }
      if (select.value === 'cm-2017-2') {
        var sentence = select.value;
        var generation = sentence.slice(3, 9);
        office = Object.keys(data)[1];
        arrayOfGenerations = Object.values(data)[1];
        specificGeneration = arrayOfGenerations[generation];
        var arrayOfStudents = specificGeneration['students'];
        var activeStudents = 0;
        var noActiveStudents = 0;
        for (var i = 0; i < 46; i++) {
          if (arrayOfStudents[i]['active'] === true) {
            activeStudents += 1;
          } else {
            noActiveStudents += 1;
          }
        }
        var totalStudents = activeStudents + noActiveStudents;
        score1.textContent = activeStudents;
        var percentNoActiveStudents = (noActiveStudents / totalStudents) * 100;
        score2.textContent = percentNoActiveStudents.toFixed(2) + '%';
        /* Los puntos indicados en el LMS relacionados con el rating */
        var ratings = specificGeneration['ratings'];
        /* Variables*/
        /* Para el punto 5 */
        var totalPromoters = 0;
        var totalPassive = 0;
        var totalDetractors = 0;
        /* Para el punto 8 */
        var dontMeet = 0;
        var meet = 0;
        var exceed = 0;
        /* Para el punto 9 */
        var averageScoreForTeachers = 0;
        /* Para el punto 10 */
        var averageScoreForJedi = 0;
        /* Recorriendo con un for el object ratings */
        for (var i = 0; i < ratings.length; i++) {
          /* Obteniendo el Net Promoter Score (NPS) promedio de los sprints cursados. */
          totalPromoters += ratings[i]['nps']['promoters'];
          totalPassive += ratings[i]['nps']['passive'];
          totalDetractors += ratings[i]['nps']['detractors'];
          /* Obteniendo el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria. */
          dontMeet += ratings[i]['student']['no-cumple'];
          meet += ratings[i]['student']['cumple'];
          exceed += ratings[i]['student']['supera'];
          /* Obteniendo la puntuación de los jedi */
          var jediScore = ratings[i]['jedi'];
          averageScoreForJedi += jediScore;
          /* Obteniendo la puntuación de los teachers*/
          var teacherScore = ratings[i]['teacher'];
          averageScoreForTeachers += teacherScore;
        }
        /* El Net Promoter Score (NPS) promedio de los sprints cursados */
        var totalScore = totalPromoters + totalPassive + totalDetractors;
        var promoters = (totalPromoters / totalScore) * 100;
        var passive = (totalPassive / totalScore) * 100;
        var detractors = (totalDetractors / totalScore) * 100;
        var nps = promoters - detractors;
        promotersContainer.textContent = promoters.toFixed(2) + ' %' + ' Promoters';
        passiveContainer.textContent = passive.toFixed(2) + ' %' + ' Passive';
        detractorsContainer.textContent = detractors.toFixed(2) + ' %' + ' Detractors';
        score5.textContent = nps.toFixed(2) + '%';
        /* Porcentaje de estudiantes satisfechas */
        var total = dontMeet + meet + exceed;
        var happyStudents = meet + exceed;
        var satisfiedStudents = (happyStudents * 100) / total;
        score8.textContent = satisfiedStudents;
        /* Puntuación promedio de los teachers */
        var averageScore2 = Math.round(averageScoreForTeachers / 4);
        score9.textContent = averageScore2;
        /* Puntuación promedio de los jedi */
        var averageScore = Math.round(averageScoreForJedi / 4);
        score10.textContent = averageScore;
      }
      if (select.value === 'lm-2016-2') {
        var sentence = select.value;
        var generation = sentence.slice(3, 9);
        office = Object.keys(data)[2];
        arrayOfGenerations = Object.values(data)[2];
        specificGeneration = arrayOfGenerations[generation];
        var arrayOfStudents = specificGeneration['students'];
        var activeStudents = 0;
        var noActiveStudents = 0;
        for (var i = 0; i < 35; i++) {
          if (arrayOfStudents[i]['active'] === true) {
            activeStudents += 1;
          } else {
            noActiveStudents += 1;
          }
        }
        var totalStudents = activeStudents + noActiveStudents;
        score1.textContent = activeStudents;
        var percentNoActiveStudents = (noActiveStudents / totalStudents) * 100;
        score2.textContent = percentNoActiveStudents.toFixed(2) + '%';
        /* Los puntos indicados en el LMS relacionados con el rating */
        var ratings = specificGeneration['ratings'];
        /* Variables*/
        /* Para el punto 5 */
        var totalPromoters = 0;
        var totalPassive = 0;
        var totalDetractors = 0;
        /* Para el punto 8 */
        var dontMeet = 0;
        var meet = 0;
        var exceed = 0;
        /* Para el punto 9 */
        var averageScoreForTeachers = 0;
        /* Para el punto 10 */
        var averageScoreForJedi = 0;
        /* Recorriendo con un for el object ratings */
        for (var i = 0; i < ratings.length; i++) {
          /* Obteniendo el Net Promoter Score (NPS) promedio de los sprints cursados. */
          totalPromoters += ratings[i]['nps']['promoters'];
          totalPassive += ratings[i]['nps']['passive'];
          totalDetractors += ratings[i]['nps']['detractors'];
          /* Obteniendo el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria. */
          dontMeet += ratings[i]['student']['no-cumple'];
          meet += ratings[i]['student']['cumple'];
          exceed += ratings[i]['student']['supera'];
          /* Obteniendo la puntuación de los jedi */
          var jediScore = ratings[i]['jedi'];
          averageScoreForJedi += jediScore;
          /* Obteniendo la puntuación de los teachers*/
          var teacherScore = ratings[i]['teacher'];
          averageScoreForTeachers += teacherScore;
        }
        /* El Net Promoter Score (NPS) promedio de los sprints cursados */
        var totalScore = totalPromoters + totalPassive + totalDetractors;
        var promoters = (totalPromoters / totalScore) * 100;
        var passive = (totalPassive / totalScore) * 100;
        var detractors = (totalDetractors / totalScore) * 100;
        var nps = promoters - detractors;
        promotersContainer.textContent = promoters.toFixed(2) + ' %' + ' Promoters';
        passiveContainer.textContent = passive.toFixed(2) + ' %' + ' Passive';
        detractorsContainer.textContent = detractors.toFixed(2) + ' %' + ' Detractors';
        score5.textContent = nps.toFixed(2) + '%';
        /* Porcentaje de estudiantes satisfechas */
        var total = dontMeet + meet + exceed;
        var happyStudents = meet + exceed;
        var satisfiedStudents = (happyStudents * 100) / total;
        score8.textContent = satisfiedStudents.toFixed(2);
        /* Puntuación promedio de los teachers */
        var averageScore2 = Math.round(averageScoreForTeachers / 4);
        score9.textContent = averageScore2;
        /* Puntuación promedio de los jedi */
        var averageScore = Math.round(averageScoreForJedi / 4);
        score10.textContent = averageScore;
      }
      if (select.value === 'lm-2017-1') {
        var sentence = select.value;
        var generation = sentence.slice(3, 9);
        office = Object.keys(data)[2];
        arrayOfGenerations = Object.values(data)[2];
        specificGeneration = arrayOfGenerations[generation];
        var arrayOfStudents = specificGeneration['students'];
        var activeStudents = 0;
        var noActiveStudents = 0;
        for (var i = 0; i < 17; i++) {
          if (arrayOfStudents[i]['active'] === true) {
            activeStudents += 1;
          } else {
            noActiveStudents += 1;
          }
        }
        var totalStudents = activeStudents + noActiveStudents;
        score1.textContent = activeStudents;
        var percentNoActiveStudents = (noActiveStudents / totalStudents) * 100;
        score2.textContent = percentNoActiveStudents.toFixed(2) + '%';
        /* Los puntos indicados en el LMS relacionados con el rating */
        var ratings = specificGeneration['ratings'];
        /* Variables*/
        /* Para el punto 5 */
        var totalPromoters = 0;
        var totalPassive = 0;
        var totalDetractors = 0;
        /* Para el punto 8 */
        var dontMeet = 0;
        var meet = 0;
        var exceed = 0;
        /* Para el punto 9 */
        var averageScoreForTeachers = 0;
        /* Para el punto 10 */
        var averageScoreForJedi = 0;
        /* Recorriendo con un for el object ratings */
        for (var i = 0; i < ratings.length; i++) {
          /* Obteniendo el Net Promoter Score (NPS) promedio de los sprints cursados. */
          totalPromoters += ratings[i]['nps']['promoters'];
          totalPassive += ratings[i]['nps']['passive'];
          totalDetractors += ratings[i]['nps']['detractors'];
          /* Obteniendo el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria. */
          dontMeet += ratings[i]['student']['no-cumple'];
          meet += ratings[i]['student']['cumple'];
          exceed += ratings[i]['student']['supera'];
          /* Obteniendo la puntuación de los jedi */
          var jediScore = ratings[i]['jedi'];
          averageScoreForJedi += jediScore;
          /* Obteniendo la puntuación de los teachers*/
          var teacherScore = ratings[i]['teacher'];
          averageScoreForTeachers += teacherScore;
        }
        /* El Net Promoter Score (NPS) promedio de los sprints cursados */
        var totalScore = totalPromoters + totalPassive + totalDetractors;
        var promoters = (totalPromoters / totalScore) * 100;
        var passive = (totalPassive / totalScore) * 100;
        var detractors = (totalDetractors / totalScore) * 100;
        var nps = promoters - detractors;
        promotersContainer.textContent = promoters.toFixed(2) + ' %' + ' Promoters';
        passiveContainer.textContent = passive.toFixed(2) + ' %' + ' Passive';
        detractorsContainer.textContent = detractors.toFixed(2) + ' %' + ' Detractors';
        score5.textContent = nps.toFixed(2) + '%';
        /* Porcentaje de estudiantes satisfechas */
        var total = dontMeet + meet + exceed;
        var happyStudents = meet + exceed;
        var satisfiedStudents = (happyStudents * 100) / total;
        score8.textContent = satisfiedStudents.toFixed(2);
        /* Puntuación promedio de los teachers */
        var averageScore2 = Math.round(averageScoreForTeachers / 4);
        score9.textContent = averageScore2;
        /* Puntuación promedio de los jedi */
        var averageScore = Math.round(averageScoreForJedi / 4);
        score10.textContent = averageScore;
      }
      if (select.value === 'lm-2017-2') {
        var sentence = select.value;
        var generation = sentence.slice(3, 9);
        office = Object.keys(data)[2];
        arrayOfGenerations = Object.values(data)[2];
        specificGeneration = arrayOfGenerations[generation];
        var arrayOfStudents = specificGeneration['students'];
        var activeStudents = 0;
        var noActiveStudents = 0;
        for (var i = 0; i < 14; i++) {
          if (arrayOfStudents[i]['active'] === true) {
            activeStudents += 1;
          } else {
            noActiveStudents += 1;
          }
        }
        var totalStudents = activeStudents + noActiveStudents;
        score1.textContent = activeStudents;
        var percentNoActiveStudents = (noActiveStudents / totalStudents) * 100;
        score2.textContent = percentNoActiveStudents.toFixed(2) + '%';
        /* Los puntos indicados en el LMS relacionados con el rating */
        var ratings = specificGeneration['ratings'];
        /* Variables*/
        /* Para el punto 5 */
        var totalPromoters = 0;
        var totalPassive = 0;
        var totalDetractors = 0;
        /* Para el punto 8 */
        var dontMeet = 0;
        var meet = 0;
        var exceed = 0;
        /* Para el punto 9 */
        var averageScoreForTeachers = 0;
        /* Para el punto 10 */
        var averageScoreForJedi = 0;
        /* Recorriendo con un for el object ratings */
        for (var i = 0; i < ratings.length; i++) {
          /* Obteniendo el Net Promoter Score (NPS) promedio de los sprints cursados. */
          totalPromoters += ratings[i]['nps']['promoters'];
          totalPassive += ratings[i]['nps']['passive'];
          totalDetractors += ratings[i]['nps']['detractors'];
          /* Obteniendo el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria. */
          dontMeet += ratings[i]['student']['no-cumple'];
          meet += ratings[i]['student']['cumple'];
          exceed += ratings[i]['student']['supera'];
          /* Obteniendo la puntuación de los jedi */
          var jediScore = ratings[i]['jedi'];
          averageScoreForJedi += jediScore;
          /* Obteniendo la puntuación de los teachers*/
          var teacherScore = ratings[i]['teacher'];
          averageScoreForTeachers += teacherScore;
        }
        /* El Net Promoter Score (NPS) promedio de los sprints cursados */
        var totalScore = totalPromoters + totalPassive + totalDetractors;
        var promoters = (totalPromoters / totalScore) * 100;
        var passive = (totalPassive / totalScore) * 100;
        var detractors = (totalDetractors / totalScore) * 100;
        var nps = promoters - detractors;
        promotersContainer.textContent = promoters.toFixed(2) + ' %' + ' Promoters';
        passiveContainer.textContent = passive.toFixed(2) + ' %' + ' Passive';
        detractorsContainer.textContent = detractors.toFixed(2) + ' %' + ' Detractors';
        score5.textContent = nps.toFixed(2) + '%';
        /* Porcentaje de estudiantes satisfechas */
        var total = dontMeet + meet + exceed;
        var happyStudents = meet + exceed;
        var satisfiedStudents = (happyStudents * 100) / total;
        score8.textContent = satisfiedStudents.toFixed(2);
        /* Puntuación promedio de los teachers */
        var averageScore2 = Math.round(averageScoreForTeachers / 4);
        score9.textContent = averageScore2;
        /* Puntuación promedio de los jedi */
        var averageScore = Math.round(averageScoreForJedi / 4);
        score10.textContent = averageScore;
      }
      if (select.value === 'ch-2016-2') {
        var sentence = select.value;
        var generation = sentence.slice(3, 9);
        office = Object.keys(data)[3];
        arrayOfGenerations = Object.values(data)[3];
        specificGeneration = arrayOfGenerations[generation];
        var arrayOfStudents = specificGeneration['students'];
        var activeStudents = 0;
        var noActiveStudents = 0;
        for (var i = 0; i < 11; i++) {
          if (arrayOfStudents[i]['active'] === true) {
            activeStudents += 1;
          } else {
            noActiveStudents += 1;
          }
        }
        var totalStudents = activeStudents + noActiveStudents;
        score1.textContent = activeStudents;
        var percentNoActiveStudents = (noActiveStudents / totalStudents) * 100;
        score2.textContent = percentNoActiveStudents.toFixed(2) + '%';
        /* Los puntos indicados en el LMS relacionados con el rating */
        var ratings = specificGeneration['ratings'];
        /* Variables*/
        /* Para el punto 5 */
        var totalPromoters = 0;
        var totalPassive = 0;
        var totalDetractors = 0;
        /* Para el punto 8 */
        var dontMeet = 0;
        var meet = 0;
        var exceed = 0;
        /* Para el punto 9 */
        var averageScoreForTeachers = 0;
        /* Para el punto 10 */
        var averageScoreForJedi = 0;
        /* Recorriendo con un for el object ratings */
        for (var i = 0; i < ratings.length; i++) {
          /* Obteniendo el Net Promoter Score (NPS) promedio de los sprints cursados. */
          totalPromoters += ratings[i]['nps']['promoters'];
          totalPassive += ratings[i]['nps']['passive'];
          totalDetractors += ratings[i]['nps']['detractors'];
          /* Obteniendo el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria. */
          dontMeet += ratings[i]['student']['no-cumple'];
          meet += ratings[i]['student']['cumple'];
          exceed += ratings[i]['student']['supera'];
          /* Obteniendo la puntuación de los jedi */
          var jediScore = ratings[i]['jedi'];
          averageScoreForJedi += jediScore;
          /* Obteniendo la puntuación de los teachers*/
          var teacherScore = ratings[i]['teacher'];
          averageScoreForTeachers += teacherScore;
        }
        /* El Net Promoter Score (NPS) promedio de los sprints cursados */
        var totalScore = totalPromoters + totalPassive + totalDetractors;
        var promoters = (totalPromoters / totalScore) * 100;
        var passive = (totalPassive / totalScore) * 100;
        var detractors = (totalDetractors / totalScore) * 100;
        var nps = promoters - detractors;
        promotersContainer.textContent = promoters.toFixed(2) + ' %' + ' Promoters';
        passiveContainer.textContent = passive.toFixed(2) + ' %' + ' Passive';
        detractorsContainer.textContent = detractors.toFixed(2) + ' %' + ' Detractors';
        score5.textContent = nps.toFixed(2) + '%';
        /* Porcentaje de estudiantes satisfechas */
        var total = dontMeet + meet + exceed;
        var happyStudents = meet + exceed;
        var satisfiedStudents = (happyStudents * 100) / total;
        score8.textContent = satisfiedStudents.toFixed(2);
        /* Puntuación promedio de los teachers */
        var averageScore2 = Math.round(averageScoreForTeachers / 4);
        score9.textContent = averageScore2;
        /* Puntuación promedio de los jedi */
        var averageScore = Math.round(averageScoreForJedi / 4);
        score10.textContent = averageScore;
      }
      if (select.value === 'ch-2017-1') {
        var sentence = select.value;
        var generation = sentence.slice(3, 9);
        office = Object.keys(data)[3];
        arrayOfGenerations = Object.values(data)[3];
        specificGeneration = arrayOfGenerations[generation];
        var arrayOfStudents = specificGeneration['students'];
        var activeStudents = 0;
        var noActiveStudents = 0;
        for (var i = 0; i < 23; i++) {
          if (arrayOfStudents[i]['active'] === true) {
            activeStudents += 1;
          } else {
            noActiveStudents += 1;
          }
        }
        var totalStudents = activeStudents + noActiveStudents;
        score1.textContent = activeStudents;
        var percentNoActiveStudents = (noActiveStudents / totalStudents) * 100;
        score2.textContent = percentNoActiveStudents.toFixed(2) + '%';
        /* Los puntos indicados en el LMS relacionados con el rating */
        var ratings = specificGeneration['ratings'];
        /* Variables*/
        /* Para el punto 5 */
        var totalPromoters = 0;
        var totalPassive = 0;
        var totalDetractors = 0;
        /* Para el punto 8 */
        var dontMeet = 0;
        var meet = 0;
        var exceed = 0;
        /* Para el punto 9 */
        var averageScoreForTeachers = 0;
        /* Para el punto 10 */
        var averageScoreForJedi = 0;
        /* Recorriendo con un for el object ratings */
        for (var i = 0; i < ratings.length; i++) {
          /* Obteniendo el Net Promoter Score (NPS) promedio de los sprints cursados. */
          totalPromoters += ratings[i]['nps']['promoters'];
          totalPassive += ratings[i]['nps']['passive'];
          totalDetractors += ratings[i]['nps']['detractors'];
          /* Obteniendo el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria. */
          dontMeet += ratings[i]['student']['no-cumple'];
          meet += ratings[i]['student']['cumple'];
          exceed += ratings[i]['student']['supera'];
          /* Obteniendo la puntuación de los jedi */
          var jediScore = ratings[i]['jedi'];
          averageScoreForJedi += jediScore;
          /* Obteniendo la puntuación de los teachers*/
          var teacherScore = ratings[i]['teacher'];
          averageScoreForTeachers += teacherScore;
        }
        /* El Net Promoter Score (NPS) promedio de los sprints cursados */
        var totalScore = totalPromoters + totalPassive + totalDetractors;
        var promoters = (totalPromoters / totalScore) * 100;
        var passive = (totalPassive / totalScore) * 100;
        var detractors = (totalDetractors / totalScore) * 100;
        var nps = promoters - detractors;
        promotersContainer.textContent = promoters.toFixed(2) + ' %' + ' Promoters';
        passiveContainer.textContent = passive.toFixed(2) + ' %' + ' Passive';
        detractorsContainer.textContent = detractors.toFixed(2) + ' %' + ' Detractors';
        score5.textContent = nps.toFixed(2) + '%';
        /* Porcentaje de estudiantes satisfechas */
        var total = dontMeet + meet + exceed;
        var happyStudents = meet + exceed;
        var satisfiedStudents = (happyStudents * 100) / total;
        score8.textContent = satisfiedStudents.toFixed(2);
        /* Puntuación promedio de los teachers */
        var averageScore2 = Math.round(averageScoreForTeachers / 4);
        score9.textContent = averageScore2;
        /* Puntuación promedio de los jedi */
        var averageScore = Math.round(averageScoreForJedi / 4);
        score10.textContent = averageScore;
      }
      if (select.value === 'ch-2017-2') {
        var sentence = select.value;
        var generation = sentence.slice(3, 9);
        office = Object.keys(data)[3];
        arrayOfGenerations = Object.values(data)[3];
        specificGeneration = arrayOfGenerations[generation];
        var arrayOfStudents = specificGeneration['students'];
        var activeStudents = 0;
        var noActiveStudents = 0;
        for (var i = 0; i < 61; i++) {
          if (arrayOfStudents[i]['active'] === true) {
            activeStudents += 1;
          } else {
            noActiveStudents += 1;
          }
        }
        var totalStudents = activeStudents + noActiveStudents;
        score1.textContent = activeStudents;
        var percentNoActiveStudents = (noActiveStudents / totalStudents) * 100;
        score2.textContent = percentNoActiveStudents.toFixed(2) + '%';
        /* Los puntos indicados en el LMS relacionados con el rating */
        var ratings = specificGeneration['ratings'];
        /* Variables*/
        /* Para el punto 5 */
        var totalPromoters = 0;
        var totalPassive = 0;
        var totalDetractors = 0;
        /* Para el punto 8 */
        var dontMeet = 0;
        var meet = 0;
        var exceed = 0;
        /* Para el punto 9 */
        var averageScoreForTeachers = 0;
        /* Para el punto 10 */
        var averageScoreForJedi = 0;
        /* Recorriendo con un for el object ratings */
        for (var i = 0; i < ratings.length; i++) {
          /* Obteniendo el Net Promoter Score (NPS) promedio de los sprints cursados. */
          totalPromoters += ratings[i]['nps']['promoters'];
          totalPassive += ratings[i]['nps']['passive'];
          totalDetractors += ratings[i]['nps']['detractors'];
          /* Obteniendo el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria. */
          dontMeet += ratings[i]['student']['no-cumple'];
          meet += ratings[i]['student']['cumple'];
          exceed += ratings[i]['student']['supera'];
          /* Obteniendo la puntuación de los jedi */
          var jediScore = ratings[i]['jedi'];
          averageScoreForJedi += jediScore;
          /* Obteniendo la puntuación de los teachers*/
          var teacherScore = ratings[i]['teacher'];
          averageScoreForTeachers += teacherScore;
        }
        /* El Net Promoter Score (NPS) promedio de los sprints cursados */
        var totalScore = totalPromoters + totalPassive + totalDetractors;
        var promoters = (totalPromoters / totalScore) * 100;
        var passive = (totalPassive / totalScore) * 100;
        var detractors = (totalDetractors / totalScore) * 100;
        var nps = promoters - detractors;
        promotersContainer.textContent = promoters.toFixed(2) + ' %' + ' Promoters';
        passiveContainer.textContent = passive.toFixed(2) + ' %' + ' Passive';
        detractorsContainer.textContent = detractors.toFixed(2) + ' %' + ' Detractors';
        score5.textContent = nps.toFixed(2) + '%';
        /* Porcentaje de estudiantes satisfechas */
        var total = dontMeet + meet + exceed;
        var happyStudents = meet + exceed;
        var satisfiedStudents = (happyStudents * 100) / total;
        score8.textContent = satisfiedStudents.toFixed(2);
        /* Puntuación promedio de los teachers */
        var averageScore2 = Math.round(averageScoreForTeachers / 4);
        score9.textContent = averageScore2;
        /* Puntuación promedio de los jedi */
        var averageScore = Math.round(averageScoreForJedi / 4);
        score10.textContent = averageScore;
      }
    }
  });
});


//Funcion de los tabs de main section
var showHide = function(e) {
  var tabSelected = e.target.dataset.tabSelected;
  var overview = document.getElementById('container-overview');
  var students = document.getElementById('container-students');
  var teachers = document.getElementById('container-teachers');

  if(tabSelected === 'tabOverview') {
      console.log('This is overview section');
      //ocultar students, teachers  
      students.style.display ='none';
      teachers.style.display ='none';
      // mostrar solo overview
      overview.style.display = 'block';
  }else if(tabSelected === 'tabStudents') {
      console.log('This is students section');
      //ocultar overview, teachers
      overview.style.display ='none';
      teachers.style.display ='none';
      // mostrar solo students
      students.style.display ='block';
  }else if(tabSelected === 'tabTeachers') {
      console.log('This is teachers section');
      //ocultar overview, students 
      overview.style.display ='none';
      students.style.display ='none';
      // mostrar solo teachers
      teachers.style.display = 'block';
  }
}

var loadPage = function(){
  var overview = document.getElementById('container-overview');
  var students = document.getElementById('container-students');
  var teachers = document.getElementById('container-teachers'); 
  overview.style.display ='none';
  students.style.display ='none';
  teachers.style.display ='none';
  var tabElements = document.getElementsByClassName('tab');
  for(var i = 0;i < tabElements.length; i++) {
      tabElements[i].addEventListener('click', showHide)
  }
}
loadPage();

//Funcion de los tabs de main section
var showHide = function(e) {
  var tabSelected = e.target.dataset.tabSelected;
  var overview = document.getElementById('container-overview');
  var students = document.getElementById('container-students');
  var teachers = document.getElementById('container-teachers');

  if(tabSelected === 'tabOverview') {
      console.log('This is overview section');
      //ocultar students, teachers  
      students.style.display ='none';
      teachers.style.display ='none';
      // mostrar solo overview
      overview.style.display = 'block';
  }else if(tabSelected === 'tabStudents') {
      console.log('This is students section');
      //ocultar overview, teachers
      overview.style.display ='none';
      teachers.style.display ='none';
      // mostrar solo students
      students.style.display ='block';
  }else if(tabSelected === 'tabTeachers') {
      console.log('This is teachers section');
      //ocultar overview, students 
      overview.style.display ='none';
      students.style.display ='none';
      // mostrar solo teachers
      teachers.style.display = 'block';
  }
}

var loadPage = function(){
  var overview = document.getElementById('container-overview');
  var students = document.getElementById('container-students');
  var teachers = document.getElementById('container-teachers'); 
  overview.style.display ='none';
  students.style.display ='none';
  teachers.style.display ='none';
  var tabElements = document.getElementsByClassName('tab');
  for(var i = 0;i < tabElements.length; i++) {
      tabElements[i].addEventListener('click', showHide)
  }
}
loadPage();