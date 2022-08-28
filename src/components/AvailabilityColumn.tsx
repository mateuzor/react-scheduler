import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import styles from "./AvailabilityColumn.module.css";
import { availabilityTimeType } from "./@types/availabilitiesType";

interface AvailabilityColumnProps {
  timeInterval: { startTime: string; endTime: string };
  workingHours: string[];
}

function AvailabilityColumn({
  timeInterval: { startTime, endTime },
  workingHours,
}: any) {
  const [availability, setAvailability] = useState<
    availabilityTimeType | undefined
  >();

  useEffect(() => {
    if (startTime && endTime) {
      setAvailability({ startTime, endTime });
    }
  }, [startTime, endTime]);

  return (
    <Col span={3}>
      {workingHours.map((_, index: number) => {
        return (
          <Row
            key={index}
            className={
              Number(index + workingHours[0]) >=
                Number(availability?.startTime) &&
              Number(index + workingHours[0]) <= Number(availability?.endTime)
                ? styles.professionalRowSelected
                : styles.professionalRow
            }
          >
            {Number(index + workingHours[0]) >=
              Number(availability?.startTime) &&
            Number(index + workingHours[0]) <= Number(availability?.endTime)
              ? "Available"
              : ""}
          </Row>
        );
      })}
    </Col>
  );
}

export default AvailabilityColumn;
