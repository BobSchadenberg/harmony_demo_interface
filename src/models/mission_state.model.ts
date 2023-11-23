export interface TrayState {
    name : string;
    locked : boolean;
    empty : boolean;
}

export interface MissionState {
    mission_state?: string;
    mission_state_message?: string;
    warning_state?: string;
    warning_state_message?: string;
    trays?: TrayState[];
    x_pos?: number;
    y_pos?: number;
    priority?: string;
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