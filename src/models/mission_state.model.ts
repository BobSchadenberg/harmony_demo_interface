export interface TrayState {
    name : string;
    locked : boolean;
    empty : boolean;
}

export class Pose {
    x: number;
    y: number;
    yaw: number;

    constructor (_x : number, _y : number, _yaw? : number) {
        this.x = _x;
        this.y = _y;
        if (_yaw !== null) {
            this.yaw = 0;
        } else {
            this.yaw = _yaw;
        }
    }

    toPixels(resolution : number, center : Pose, origin : Pose) : Pose {
        return new Pose((this.x - origin.x) / resolution, (this.y - origin.y) / resolution, this.yaw);
    }

    static toCSS(x: number, y: number, resolution : number, center : Pose, origin : Pose) : string {
        return (new Pose(x, y).toCSS(resolution, center, origin));
    }

    toCSS(resolution : number, center : Pose, origin : Pose) : string {
        var x = (-origin.x + this.x) / resolution;//center.x + 
        var y = -((-origin.y + this.y) - center.y) / resolution;
        return "left: " + x + "px; top: " + y + "px;";
    }
}

export class Location {

    name: string;
    pose: Pose;
    color?: string;

    constructor (_name : string, _x_pos : number, _y_pos : number, _yaw? : number, _color? : string) {
        this.name = _name;
        this.pose = new Pose(_x_pos, _y_pos, _yaw);
        this.color = _color;
    };
}

export class MissionState {
    mission_state?: string;
    mission_state_message?: string;
    warning_state?: string;
    warning_state_message?: string;
    trays?: TrayState[];
    robot_pose?: Pose;
    priority?: string;
    locations?: Location[];
}


/*
var mission_state = {
    "mission_state": "NAVIGATING", // "IDLE", "NAVIGATING", "READY_TO_LOAD_UNLOAD", "LOADING_UNLOADING", "LOADING_COMPLETED", "MISSION_COMPLETED"
    "mission_state_message": "Navigating to X",
    "warning_state": "NONE", // "NONE", "TRAY_ALARM", "BLOCKED"
    "warning_state_message": "Warning: Tray not locked...",
    "trays": [
        { name: "Front Tray", locked: true, empty: false },
        { name: "Back Bottom Tray", locked: true, empty: false },
        { name: "Back Top Tray", locked: true, empty: false }
    ],
    "x_pos": 0.5, // Normalized x position on map (0-1)
    "y_pos": 0.5, // Normalized y position on map (0-1)
    "priority": "BLOOD_SAMPLES" // "BLOOD_SAMPLES", "MEDICAL_SUPPLIES"
}
*/