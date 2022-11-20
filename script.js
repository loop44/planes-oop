class Plane {
  constructor(name, maxSpeed) {
    this.name = name;
    this.maxSpeed = maxSpeed;
    // Статус самолете - на земле || в воздухе
    this._isPlaneLanded = false;
  }

  // Взлёт
  takeoff() {
    alert(`Самолет ${this.name} взлетает`);
    this._isPlaneLanded = false;
  }

  // Посадка
  land() {
    alert(`Самолет ${this.name} садится`);
    this._isPlaneLanded = true;
  }

  showStatus() {
    alert(`Самолет ${this.name} находится ${this._isPlaneLanded ? 'на земле' : 'в воздухе'}`);
  }
}

class MiG extends Plane {
  constructor(modelName, maxSpeed) {
    super(`МиГ-${modelName}`, maxSpeed);
  }

  attack() {
    alert(`Самолет ${this.name} атакует`);
  }
}

class Tu extends Plane {
  constructor(modelName, maxSpeed) {
    super(`Ту-${modelName}`, maxSpeed);
  }
}

class Airport {
  constructor(name) {
    this.name = name;
    this.parking = [];
  }

  // Вспомогательный метод который выгончет самолет с парковки
  _getOutFromParking(plane) {
    this.parking = this.parking.filter((p) => {
      if (p === plane) {
        return false;
      } else {
        return true;
      }
    });
  }

  // Принять самолет
  takePlane(plane) {
    plane.land();
    alert(`Аэропот ${this.name} принял самолет ${plane.name}`);
  }

  // Самолет ушел на стоянку
  parkPlane(plane) {
    this.parking.push(plane);
    alert(`Самолет ${plane.name} припаркован`);
  }

  // Самолет готов взлетать
  preparePlaneToTakeoff(plane) {
    this._getOutFromParking(plane);
    alert(`Самолет ${plane.name} к взлету готов`);
  }

  // Самолет освободил место и улетел
  preparePlaneAndTakeoff(plane) {
    this._getOutFromParking(plane);
    alert(`Самолет ${plane.name} освободил место и взлетает`);
    plane.takeoff();
  }

  // Дополнительные методы (два своих)
  // Проврка есть ли самолет на парковке
  isPlaneOnParking(plane) {
    const findPlane = this.parking.find((p) => {
      if (p === plane) {
        return true;
      } else {
        return false;
      }
    });

    if (findPlane) {
      alert(`Самолет ${plane.name} на парковке`);
    } else {
      alert(`Самолета ${plane.name} парковке нет`);
    }
  }

  // Самый скоростной самолет на парковке
  showFastestOnParking() {
    let fatestSpeed = 0;
    let fastestPlane = null;

    this.parking.forEach((p) => {
      if (p.maxSpeed > fatestSpeed) {
        fatestSpeed = p.maxSpeed;
        fastestPlane = p;
      }
    });

    alert(
      `Самый быстрый самолет на парковке - ${fastestPlane.name}, летает со скоростью ${fastestPlane.maxSpeed} км/ч`
    );
  }
}

// Пример работы с классами

/* Самолет класса МиГ
- создадим самолет класса МиГ 
- проверим добавленный метод атаки
- проверим унаследованный метод показать статус
- создадим тестовый аэропорт
- попробуем принять самолет, припарковать и проверить статус
- попробуем отправить самолет снова в небо и проверить статус
- попробуем проверить есть ли на парковке самолет
*/

alert('Пример 1');

const mig29 = new MiG(29, 2246);

mig29.attack();

const testAirport = new Airport('Учебный-172');

testAirport.takePlane(mig29);
testAirport.parkPlane(mig29);

mig29.showStatus();
testAirport.preparePlaneAndTakeoff(mig29);
mig29.showStatus();
testAirport.isPlaneOnParking(mig29);

/* Два самолета класса МиГ и класса Ту
- создадим самолет класса МиГ 
- создадим самолет класса Ту 
- создадим тестовый аэропорт
- попробуем принять оба самолет, припарковать МиГ и проверить статус у обоих
- припаркуем Ту
- проверим метод по поиску самого быстрого самолета на парковке аэропорта
- попробуем отправить самолет Ту снова в небо и проверить статус у обоих
*/

alert('Пример 2');

const mig31m = new MiG('31М', 3000);
const tu154 = new Tu(154, 850);

const testAirport2 = new Airport('Новый-001');

testAirport2.takePlane(mig31m);
testAirport2.takePlane(tu154);

testAirport2.parkPlane(mig31m);

mig31m.showStatus();
tu154.showStatus();

testAirport2.parkPlane(tu154);

testAirport2.showFastestOnParking();

testAirport2.preparePlaneAndTakeoff(tu154);

mig31m.showStatus();
tu154.showStatus();
