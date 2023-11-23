import { Injectable } from '@angular/core';
import { MissionCmd } from '../models/mission_cmd.model'
import { MissionState } from '../models/mission_state.model'
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RosService {
  constructor(private socket: Socket) {}

  sendMissionCmd(msg: MissionCmd) {
    console.log("Emitting mission command: ", msg);
    this.socket.emit('mission_cmd', msg);
  }

  requestMissionState() {
    this.socket.emit('get_state', {});
  }

  missionState() {
    return this.socket.fromEvent('mission_state').pipe(map((data: any) => data))
  }

}
