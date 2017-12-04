


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Sedes', 'Total de alumnas'],
    ['Arequipa', 30],
    ['Santiago de Chile', 95],
    ['Ciudad de México', 70],
    ['Lima', 66],
  ]);

  var options = {
    title: 'Total de alumnas por sedes'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);

  google.charts.load('current', {packages:['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Desercion', 'Total y porcentaje'],
      ['Arequipa', 51],
      ['Santiago de Chile', 27],
      ['Ciudad de México', 18],
      ['Lima', 59],
    ]);

    var options = {
      title: 'Total de alumnas que desertaron por sede',
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  };
};

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