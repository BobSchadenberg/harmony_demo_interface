import { Component } from '@angular/core';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { MissionCmd } from 'src/models/mission_cmd.model';
import { MissionState, Location, Pose } from 'src/models/mission_state.model';
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
    "NAVIGATING_LEFT",
    "NAVIGATING_RIGHT",
    "NAVIGATING_BACK",
    "READY_TO_LOAD_UNLOAD",
    "LOADING_UNLOADING",
    "UNLOADING_WITH_ARM",
    "LOADING_COMPLETED",
    "ALARM"
  ];

  hriSequences = [
    "SEQUENCE_OBSTRUCTED",
    "STOP",
    "CANCEL"
  ];

  map_center : Pose = new Pose(54.3, 25.05);
  map_origin : Pose = new Pose(-25.4, -7.74);
  map_resolution : number = 0.05;

  locations: Location[] = [];

  constructor(public ros: RosService) { }

  ngOnInit(): void {
    this.ros.missionState().subscribe((msg: MissionState) => {

      this.missionState = msg;
      if (msg.priority)
        this.priority = this.missionState.priority

      if (msg.locations) {
        this.locations = [];
        msg.locations.forEach((l) => {
          this.locations.push(
            new Location(l.name, l.pose.x, l.pose.y, l.pose.yaw)
          );
        });
      }
    });

    this.ros.requestMissionState();
    //this.locations.push(new Location("origin", "Origin", 0.0, 0.0, 0));
  }

  robotPoseCSS() : string {
    return Pose.toCSS(
      this.missionState!.robot_pose!.x, 
      this.missionState!.robot_pose!.y,
      this.map_resolution, this.map_center, this.map_origin);
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
