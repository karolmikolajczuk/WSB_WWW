// dane wypełniające tabelę minimum 4x8 + nagłówek i stopka wygenerowane w JS
var tableData = [
  [1,   "Polska",     "Gdańsk",       3500,   1300],
  [2,   "Polska",     "Warszawa",     6000,   1700],
  [3,   "Niemcy",     "Berlin",       11000,  5000],
  [4,   "Niemcy",     "Monachium",    7600,   3900],
  [5,   "Anglia",     "Londyn",       13000,  4200],
  [6,   "Anglia",     "Liverpool",    6000,   2100],
  [7,   "USA",        "Boston",       20000,  4000],
  [8,   "USA",        "Miami",        8000,   1111],
  [9,   "Hiszpania",  "Madryt",       7500,   2314],
  [10,  "Hiszpania",  "Barcelona",    31000,  5153],
  [11,  "Austria",    "Wiedeń",       2300,   3313],
  [12,  "Szwajcaria", "Berno",        18000,  2146]
];

// wywołanie tabelki
buildWebsite(tableData)

// stwórz nagłówek tabeli
function buildTableHead(ID="head_table") {
  _html="<tr><td>lp.</td><td>Państwo</td><td>Miasto</td><td>Ludność</td><td>Obszar</td></tr>";
  document.getElementById(ID).innerHTML=_html;
}

// stwórz ciało tabeli
function buildTable(tableData, ID="body_table") {
  _html="";
  for(i=0; i<tableData.length; i++) {
    _html+="<tr>";
    for(j=0; j<tableData[i].length; j++) {
      _html+="<td>";
      _html+=tableData[i][j];
      _html+="</td>";
    }
    _html+="</tr>";
  }
  document.getElementById(ID).innerHTML=_html;
}

// stwórz stopkę tabeli z danymi zbiorczymi
function buildTableFooter(tableData, ID="foot_table") {

  // zacznij pisać kod html stopki
  _html="";
  _html+="<tr><td></td>";

  // weź tablicę jako obiekt
  var _table = document.getElementById("table_full");
  var _table_rows_length = _table.rows.length;

  // z danych tabeli posumuj ludność i obszar
  var _table_peoples_sume = 0;
  var _table_land_sume = 0;
  for (i=1; i<_table_rows_length; i++) {

    console.log(i);
    console.log("Ludność: " + _table.rows[i].cells[3].innerHTML);
    console.log("Ląd: " + _table.rows[i].cells[4].innerHTML);

    if (!isNaN(_table.rows[i].cells[3].innerHTML)) {
      _table_peoples_sume += parseInt(_table.rows[i].cells[3].innerHTML);
    }
    if (!isNaN(_table.rows[i].cells[4].innerHTML)){
      _table_land_sume += parseInt(_table.rows[i].cells[4].innerHTML);
    }

    console.log("Suma ludności: " + _table_peoples_sume);
    console.log("Suma obszaru: " + _table_land_sume);
    console.log("_____________________________");
  }

  var _table_average_people = (_table_peoples_sume/(_table_rows_length-2));
  var _table_average_land = (_table_land_sume/(_table_rows_length-2));

  console.log(_table_peoples_sume);
  console.log(_table_land_sume);
  // łączna suma ludności
  _html+="<td>"; _html+=("Suma ludności:<br>" + _table_peoples_sume); _html+="</td>";

  // łączna suma obszaru zajmowanego
  _html+="<td>"; _html+=("Suma obszaru:<br>" + _table_land_sume); _html+="</td>";

  // średnia ludności
  _html+="<td>"; _html+=("Średnia ludności:<br>" + _table_average_people); _html+="</td>";

  // średnia obszaru zajmowanego
  _html+="<td>"; _html+=("Średnia obszaru:<br>" + _table_average_land); _html+="</td>";

  // osobne dane dla wszystkich i osobne dla filtra
  // te dane ^ nie zmieniają się gdy sortujesz
  // automatyzacja
  _html+="</tr>";

  document.getElementById(ID).innerHTML=_html;
}

// sortowanie tabeli względem... rosnąco/malejąco
function sortTableData(column, rosn) {
  var columnId = 0;

  if (column === "lp_sort") columnId = 0;
  else if (column === "country_sort") columnId = 1;
  else if (column === "town_sort") columnId = 2;
  else if (column === "ppl_sort") columnId = 3;
  else columnId = 4;

  if (columnId === 1 || columnId === 2) {
    // rosnąco
    if (rosn === "rosn") {
      tableData.sort(
        function(a, b) {
          return a[columnId].toString().localeCompare(b[columnId].toString());
        }
      );
    }
    // malejąco
    else {
      tableData.sort(
        function(a, b) {
          return a[columnId].toString().localeCompare(b[columnId].toString())*(-1);
        }
      );
    }
  }
  else {
    // rosnąco
    if (rosn === "rosn") {
      tableData.sort(
        function(a, b) { return a[columnId] - b[columnId]; }
      );
    }
    // malejąco
    else {
      tableData.sort(
        function(a, b) { return b[columnId] - a[columnId]; }
      );
    }
  }

  // postaw stronę jeszcze raz posortowane
  filterTableData(document.getElementById('filtruj').value);
}

// filtrowanie tabeli
function filterTableData(data_value) {
  if (data_value === "") {
    buildWebsite(tableData);
  }
  else {
    buildWebsite(tableData.filter(
      function(dataArg) {
        return data_value.includes(dataArg[2]);
      }
    ));
  }
}

// zbuduj stronę(tabelę)
function buildWebsite(tableData) {
  buildTableHead();
  buildTable(tableData);
  buildTableFooter(tableData);
}
