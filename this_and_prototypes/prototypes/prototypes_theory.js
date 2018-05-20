// [[Prototype]] - это просто ссылка на другой объект

// в JavaScript нет такого понятие как класс (как в традиционных ОО-языках)
// есть только объекты

// каждая функция имеет неперечисляемое свойство prototype, 
// которое ссылается на некий объект

// этот объект обычно зовется прототип Foo, потому что мы получаем доступ к нему
// через свойство, которое называется Foo.prototype (не совсем удачно)*  
// и которое является ссылкой на этот объект

// пусть этот объект (для меньшей путаницы) назовем Foo dot prototype
// в итоге каждый объект, созданный с помощью new Foo()
// в конечном итоге некоторым образом будет связан с этим объектом Foo dot prototype

function Foo() {}

// во время создания объекта через конструктор, одно из действий - 
// установка в myNewObject внутреней ссылки [[Prototype]] на объект, 
// на который указывает Foo.prototype
var myNewObject = new Foo();

// в данном контексте Foo.prototype - это объект, о котором идет речь выше - Foo dot prototype
// но способ, ссылка, чтобы получить этот объект, выглядит так же*
Object.getPrototypeOf(myNewObject) === Foo.prototype;
