import { MongoObservable } from "meteor-rxjs";
import { Attendance } from "./model/attendance.model";

export const AttendanceCollection = new MongoObservable.Collection<Attendance>("attendance-collection");
