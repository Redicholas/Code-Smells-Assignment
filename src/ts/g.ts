import { User } from "./models/User";
import { Student } from "./models/Student";
import { Product } from "./models/Product";
import { Temp } from "./models/Temp";

/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getTotalJumpLengthInCM(jumpLengthsInCM: number[]): number {
  return jumpLengthsInCM.reduce(
    (previousValue, currentValue) => previousValue + currentValue, 0);
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

function getStudentStatus(student: Student): string {
  student.passed = student.handedInOnTime ? true : false;
  
  return student.passed ? `${student.name} fick VG` : `${student.name} fick IG`;
}
    
/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

function getAverageWeeklyTemperature(dailyHighTempsInCelsius: Temp[]): number {
  const oneWeekAgo = new Date(Date.now()- 604800000);

  const locationOfTemps = "Stockholm"

  const sumOfDailyHighTempsLastSevenDays = dailyHighTempsInCelsius
    .filter(dailyTemp => dailyTemp.time > oneWeekAgo && dailyTemp.location === locationOfTemps )
    .reduce((previousValue, currentValue) => previousValue + currentValue.tempInCelsius , 0);

  const averageWeeklyHighTemp = sumOfDailyHighTempsLastSevenDays / 7;
  
  return averageWeeklyHighTemp;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

function showProduct(product: Product) {
  product.parent.innerHTML += `
    <div>
      <h4>${product.name}</h4>
      <img src="${product.imageUrl}" />
      <strong>${product.price}</strong>
    </div>
  `;
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function presentStudents(students: Student[]) {
  students.forEach(student => {
    const listOfStudents = document.querySelector(
      student.handedInOnTime ? "ul#passedstudents" : "ul#failedstudents"
    ); 

    if (listOfStudents) {
      listOfStudents.innerHTML += `
        <li>
          <input type="checkbox" ${student.handedInOnTime ? "checked" : ""} />
          ${student.name}
        </li>
      `;
    }
  });
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

function concatenateStrings() {
  return ["Lorem", "ipsum", "dolor", "sit", "amet"].join(" ");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

function createUser(user: User) {
  // Validation

  const userAge = Math.floor((Date.now() - user.birthday.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  console.log(userAge);

  if (userAge >= 20) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
