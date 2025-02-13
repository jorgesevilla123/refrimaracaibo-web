import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';
import { WebSocket } from 'ws'
import { takeLast } from 'rxjs/internal/operators/takeLast';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  subject: Subject<any> = webSocket('ws://localhost:400')
  chat = []


  constructor() { }

  connect() {
   
    this.subject.subscribe({
      next: msg => {
        this.chat.push(msg)
        console.log(this.chat)
      
       
        console.log(msg)}, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });



  }




  getLastMessage(): Observable<any> {
    return this.subject
  }





  sendMessage(message) {
    this.subject.next(message)
    

    


  }

  close() {
    this.subject.complete()
  }




  // connect(): Observable<any> {
  //   return this.store.pipe(select(getApiUrl)).pipe(
  //     filter(apiUrl => !!apiUrl),
  //     // https becomes wws, http becomes ws
  //     map(apiUrl => apiUrl.replace(/^http/, 'ws') + '/stream'),
  //     switchMap(wsUrl => {
  //       if (this.connection$) {
  //         return this.connection$;
  //       } else {
  //         this.connection$ = webSocket(wsUrl);
  //         return this.connection$;
  //       }
  //     }),
  //     retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS)))
  //   );
  // }







}






