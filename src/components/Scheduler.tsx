import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Select } from "antd";
import styles from "./Scheduler.module.css";
import AvailabilityColumn from "./AvailabilityColumn";
import TimeSelect from "./TimeSelect";
import ProfessionalSelect from "./ProfessionalSelect";

function Scheduler() {
  const professionals = ["Doctor", "Assistant", "Hygenist"];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [professional, setProfessional] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [availabilities, setAvailabilities] = useState<any>({
    doctor: {},
    assistant: {},
    hygenist: {},
  });

  const handleProfessionalChange = (professional: any) => {
    setProfessional(professional);
  };

  const handleStartTimeChange = (time: any) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time: any) => {
    setEndTime(time);
  };

  const showModal = () => {
    setProfessional("");
    setStartTime("");
    setEndTime("");
    setIsModalVisible(true);
  };

  // useEffect(() => {
  //   console.log(availabilities);
  //   const professionalsAvailabilities = JSON.parse(
  //     localStorage.getItem("professionalAvailabilities")
  //   );
  //   setAvailabilities(professionalsAvailabilities);
  // }, []);

  const handleOk = () => {
    const timeInterval = {
      startTime: startTime,
      endTime: endTime,
    };
    const availabilitiesCopy = availabilities;

    availabilitiesCopy[professional] = timeInterval;

    setAvailabilities(availabilitiesCopy);
    localStorage.setItem(
      "professionalAvailabilities",
      JSON.stringify(availabilitiesCopy)
    );

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setProfessional("");
    setStartTime("");
    setEndTime("");
    setIsModalVisible(false);
  };

  return (
    <Col>
      <Row justify="end">
        <Button onClick={showModal}>ADD AVAILABILITY</Button>
      </Row>
      <Row className={styles.professionalTitleRow} gutter={[2, 2]}>
        <>
          <Col
            style={{
              width: "83.5px",
              border: "1px solid",
            }}
          >
            <Row
              style={{
                padding: "5px",
                height: "32px",
              }}
            ></Row>
          </Col>
          {professionals.map((professional) => {
            return (
              <Col span={3}>
                <Row className={styles.professionalTitle}>{professional}</Row>
              </Col>
            );
          })}
        </>
      </Row>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        gutter={[2, 2]}
      >
        <Col style={{ border: "1px solid" }}>
          {Array.from(Array(7)).map((row, index) => {
            return <Row className={styles.timeRow}>{`${index + 9}:00`}</Row>;
          })}
        </Col>
        <AvailabilityColumn data={availabilities["doctor"]} />
        <AvailabilityColumn data={availabilities["assistant"]} />
        <AvailabilityColumn data={availabilities["hygenist"]} />
      </Row>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        okText="Save"
        cancelButtonProps={{
          style: { display: "none" },
        }}
        // okButtonProps={{
        //   disabled:
        //     professional !== "" && startTime !== "" && endTime !== ""
        //       ? false
        //       : true,
        // }}
        onCancel={handleCancel}
      >
        <ProfessionalSelect
          label="Select a column"
          handleChange={handleProfessionalChange}
        />
        <TimeSelect
          label="Select a start time"
          handleChange={handleStartTimeChange}
        />
        <TimeSelect
          label="Select an end time"
          handleChange={handleEndTimeChange}
        />
      </Modal>
    </Col>
  );
}

export default Scheduler;
