export interface availabilityTimeType {
  startTime: string;
  endTime: string;
}

export interface availabilitiesType {
  doctor: availabilityTimeType | {};
  assistant: availabilityTimeType | {};
  hygenist: availabilityTimeType | {};
}
