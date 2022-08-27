import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import styles from "./AvailabilityColumn.module.css";

function AvailabilityColumn({ data }: any) {
  const [teste, setTeste] = useState<any>({});

  function isEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  useEffect(() => {
    console.log("teste", data);
    if (!isEmpty(data)) {
      console.log(data);
      setTeste(data);
    }
  }, [data]);

  return (
    <Col span={3}>
      {Array.from(Array(7)).map((row, index) => {
        return (
          <Row
            className={
              index + 9 >= Number(teste.startTime) &&
              index + 9 <= Number(teste.endTime)
                ? styles.professionalRowSelected
                : styles.professionalRow
            }
          >
            {index + 9 >= Number(teste.startTime) &&
            index + 9 <= Number(teste.endTime)
              ? "Available"
              : index + 9}
          </Row>
        );
      })}
    </Col>
  );
}

export default AvailabilityColumn;
