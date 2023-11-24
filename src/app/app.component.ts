import { Component } from '@angular/core';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { MissionCmd } from 'src/models/mission_cmd.model';
import { MissionState } from 'src/models/mission_state.model';
import { RosService } from 'src/services/ros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'harmony_demo_interface';

  missionState?: MissionState;

  testCmd = "";

  priority?: string;
  priorityOptions : any[] = [
    { label: "Blood Samples", value: "BLOOD_SAMPLES" },
    { label: "Medical Supplies", value: "MEDICAL_SUPPLIES" }
  ];
  
  hriPresets = [
    "IDLE",
    "NAVIGATING",
    "READY_TO_LOAD_UNLOAD",
    "LOADING_UNLOADING",
    "LOADING_COMPLETED",
    "ALARM"
  ];

  hriSequences = [
    "SEQUENCE_OBSTRUCTED",
    "STOP",
    "CANCEL"
  ];


  constructor(public ros: RosService) { }

  ngOnInit(): void {
    this.ros.missionState().subscribe((msg: MissionState) => {
      this.missionState = msg;
      if (msg.priority)
        this.priority = this.missionState.priority
    });

    this.ros.requestMissionState();
  }

  priorityChanged(event : SelectButtonChangeEvent) {
    this.missionCmdStr("PRIORITY_"+event.value);

  }

  missionCmd(cmd : MissionCmd) {
    this.ros.sendMissionCmd(cmd);
  }

  missionCmdStr(cmd : string) {
    var cmdobj : MissionCmd = {};
    cmdobj.cmd = cmd;
    cmdobj.topic = "harmony/mission/cmd";
    this.missionCmd(cmdobj);
  }

  hriPreset(cmd : string) {
    var cmdobj : MissionCmd = {};
    cmdobj.cmd = cmd;
    cmdobj.topic = "harmony/screen/set_hri_preset";
    this.missionCmd(cmdobj);
  }

  hriSequence(cmd : string) {
    var cmdobj : MissionCmd = {};
    cmdobj.cmd = cmd;
    cmdobj.topic = "harmony/screen/set_hri_sequence";
    this.missionCmd(cmdobj);
  }

}
