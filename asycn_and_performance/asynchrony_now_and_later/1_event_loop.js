// Сам по себе движок языка не включает механизм, позволяющий асинхронно выполнять код.
// В определенный момент времени выполняется определенный фрагмент кода.
// Но какой именно фрагмент определяет EventLoop.

// Именно механизм EventLoop определяет как будут выполнятся различные фрагменты 
// кода с течением времени. EventLoop формируется для каждой вкладки браузера.

// Например, при выполнении браузером Ajax-запроса,
// предполагаемые данные ответа сервера будут помещены в функцию обратного вызова (callback)
// и JS движок заявляет: "Эй, я собираюсь приостановить выполнение пока что, но когда этот запрос 
// будет выполнен и данные будут получены - эта функци должна быть вызывана обратно".
// Браузер ожидает ответа сервера и когда что-то есть, он помещает callback-функцию в EventLoop.

// EventLoop функционирует по принципу очереди (первый пришел - первый ушел)
// Концептуально это выглядт так:

var eventLoop = [];
var event;

while(true) {
  if (eventLoop.length > 0) {
    event = eventLoop.shift();
  }
  
  try {
    event();
  } catch (err) {
    reportError(err);
  }
}

// Каждая итерация такого ^ бесконечного цикла называется tick.
// Для каждого tick, если есть event который ожидает в очереди, 
// то он берется оттуда и выполняется. Эти events - функции обратного вызова.

// Нужно отметить, что setTimeout не помещает callback-функцию в EventLoop.
// Вместо этого, setTimeout устанавливает таймер, после завершения которого
// именно окружение (браузер, NodeJS и т.д) отправит callback-функцию в EventLoop,
// чтобы она затем выполнилась в одной из итераций tick, но только после всех остальных
// callback-функций, которые уже находятся в очереди. Это объясняет тот факт, что 
// setTimeout for n miliseconds не обязательно выполниться именно через n miliseconds. 

// Таким образом, программа разбивается на множество небольших фрагментов, 
// которые выполняются/происходят один за другим, следуя очереди EventLoop.

